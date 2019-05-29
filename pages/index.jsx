import React, { Component } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Formik } from 'formik';
import {
  Button, Form, Icon, Input, message, PageHeader,
} from 'antd';
import PropTypes from 'prop-types';

import { userAuthenticate } from '../actions/user/authenticate';
import { userRegister } from '../actions/user/register';
import { authenticate as validate } from '../helpers/validate';

import { getAuthenticateError, getAuthenticateSuccess } from '../selectors/authenticate';
import { getRegisterError, getRegisterSuccess } from '../selectors/register';

const initialLoginValues = {
  email: '',
  password: '',
};

const initialRegisterValues = {
  email: '',
  name: '',
  password: '',
};

class Login extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired,
    authenticateError: PropTypes.bool,
    authenticateSuccess: PropTypes.bool,
    register: PropTypes.func.isRequired,
    registerError: PropTypes.bool,
    registerSuccess: PropTypes.bool,
  };

  static defaultProps = {
    authenticateError: false,
    authenticateSuccess: false,
    registerError: false,
    registerSuccess: false,
  };

  // TODO, can this be done in the saga instead?
  componentDidUpdate() {
    const { authenticateError, authenticateSuccess, registerError, registerSuccess } = this.props;
    if (authenticateError) message.error('Unable to log in');
    if (authenticateSuccess) message.success('Logged in');
    if (registerError) message.success('Unable to register');
    if (registerSuccess) message.success('Registered');
  }

  render() {
    const { authenticate, register } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Expenses</title>
        </Head>
        <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
          <PageHeader title="Log in">
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
          <PageHeader title="Register">
            <Formik
              initialValues={initialRegisterValues}
              onSubmit={(values) => {
                register(values);
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
                    help={errors.name && touched.name ? errors.name : ''}
                    validateStatus={errors.name && touched.name ? 'error' : undefined}
                  >
                    <Input
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Name"
                      type="text"
                      value={values.name}
                    />
                  </Form.Item>
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
                      Register
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
  register: (values) => {
    dispatch(userRegister(values));
  },
});

const mapStateToProps = state => ({
  authenticateError: getAuthenticateError(state),
  authenticateSuccess: getAuthenticateSuccess(state),
  registerError: getRegisterError(state),
  registerSuccess: getRegisterSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
