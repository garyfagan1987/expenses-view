import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Formik } from 'formik';
import {
  Button, Form, Icon, Input, message, PageHeader,
} from 'antd';
import PropTypes from 'prop-types';

import { userAuthenticate } from '../actions/user/authenticate';
import { authenticate as validate } from '../helpers/validate';

import { getAuthenticateError, getAuthenticateSuccess } from '../selectors/authenticate';

const initialValues = {
  email: '',
  password: '',
};

class Login extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired,
    authenticateError: PropTypes.bool,
    authenticateSuccess: PropTypes.bool,
  };

  static defaultProps = {
    authenticateError: false,
    authenticateSuccess: false,
  };

  componentDidUpdate() {
    const { authenticateError, authenticateSuccess } = this.props;
    if (authenticateError) message.error('Unable to log in');
    if (authenticateSuccess) message.success('Logged in');
  }

  render() {
    const { authenticate } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Expenses | Login</title>
        </Head>
        <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
          <PageHeader title="Log in">
            <Formik
              initialValues={initialValues}
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
                      placeholder="Email"
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
                      placeholder="Password"
                      prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} type="lock" />}
                      type="password"
                      value={values.password}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </Formik>
          </PageHeader>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticate: (values) => {
    dispatch(userAuthenticate(values));
  },
});

const mapStateToProps = state => ({
  authenticateError: getAuthenticateError(state),
  authenticateSuccess: getAuthenticateSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
