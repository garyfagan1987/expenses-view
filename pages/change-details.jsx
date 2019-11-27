import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import nextCookie from 'next-cookies';
import Head from 'next/head';
import { Formik } from 'formik';
import {
  Alert,
  Button,
  Form,
  Input,
  PageHeader,
  Spin,
} from 'antd';
import PropTypes from 'prop-types';

import { changeDetailsSchema } from '../helpers/validate';
import { getUserFetchError, getUserFetchSuccess, getUserFetchLoading } from '../selectors/user';
import { userFetch } from '../actions/user/user';
import { userUpdate } from '../actions/user/update';
import messages from '../config/messages';

const message = messages.changeDetails;

class ChangeDetails extends Component {
  static propTypes = {
    cookies: PropTypes.shape().isRequired,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    updateUser: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    error: false,
    loading: false,
  };

  static async getInitialProps(ctx) {
    const { store: { dispatch } } = ctx;
    const cookies = ctx.isServer ? nextCookie(ctx) : Cookies.get();
    const { token } = cookies;
    dispatch(userFetch(token));
    return { cookies };
  }

  render() {
    const {
      cookies: { token }, error, loading, updateUser, user,
    } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>{message.title}</title>
        </Head>
        <Spin spinning={loading} tip={message.spinner}>
          <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
            <PageHeader title={message.heading}>
              {error ? (
                <Alert message={message.error} type="error" />
              ) : (
                <Formik
                  initialValues={user}
                  onSubmit={(values) => {
                    updateUser(values, token);
                  }}
                  validationSchema={changeDetailsSchema}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    touched,
                    values,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Form.Item
                        help={errors.name && touched.name ? errors.name : ''}
                        validateStatus={errors.name && touched.name ? 'error' : undefined}
                      >
                        <Input
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={message.form.fields.name.placeholder}
                          type="text"
                          value={values.name}
                        />
                      </Form.Item>
                      <Form.Item
                        help={errors.businessName && touched.businessName ? errors.businessName : ''}
                        validateStatus={errors.businessName && touched.businessName ? 'error' : undefined}
                      >
                        <Input
                          name="businessName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={message.form.fields.businessName.placeholder}
                          type="text"
                          value={values.businessName}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType="submit" type="primary">{message.form.button}</Button>
                      </Form.Item>
                    </Form>
                  )}
                </Formik>
              )}
            </PageHeader>
          </div>
        </Spin>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: (values, token) => {
    dispatch(userUpdate(values, token));
  },
});

const mapStateToProps = state => ({
  error: getUserFetchError(state),
  loading: getUserFetchLoading(state),
  user: getUserFetchSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeDetails);
