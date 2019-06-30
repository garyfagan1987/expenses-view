import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Formik } from 'formik';
import {
  Button, Form, Icon, Input, PageHeader, Spin,
} from 'antd';
import PropTypes from 'prop-types';

import { userAuthenticate } from '../actions/user/authenticate';
import { authenticate as validate } from '../helpers/validate';
import { getIsLoading } from '../selectors/authenticate';
import messages from '../config/messages';

const initialLoginValues = {
  email: '',
  password: '',
};

const Login = ({ authenticate, isLoading }) => (
  <React.Fragment>
    <Head>
      <title>{messages.login.title}</title>
    </Head>
    <Spin spinning={isLoading} tip={messages.login.spinner}>
      <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
        <PageHeader title={messages.login.heading}>
          <Formik
            initialValues={initialLoginValues}
            onSubmit={(values) => {
              authenticate(values);
            }}
            validationSchema={validate}
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
                  help={errors.email && touched.email ? errors.email : ''}
                  validateStatus={errors.email && touched.email ? 'error' : undefined}
                >
                  <Input
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={messages.login.form.fields.email.placeholder}
                    prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} type="user" />}
                    value={values.email}
                  />
                </Form.Item>
                <Form.Item
                  help={errors.password && touched.password ? errors.password : ''}
                  validateStatus={errors.password && touched.password ? 'error' : undefined}
                >
                  <Input
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={messages.login.form.fields.password.placeholder}
                    prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} type="lock" />}
                    type="password"
                    value={values.password}
                  />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">{messages.login.form.button}</Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </PageHeader>
      </div>
    </Spin>
  </React.Fragment>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Login.defaultProps = {
  isLoading: false,
};

const mapDispatchToProps = dispatch => ({
  authenticate: (values) => {
    dispatch(userAuthenticate(values));
  },
});

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
