import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Formik } from 'formik';
import {
  Button, Form, Icon, Input, PageHeader, Spin,
} from 'antd';
import PropTypes from 'prop-types';

import { userRegister } from '../actions/user/register';
import { authenticate as validate } from '../helpers/validate';
import { getIsLoading } from '../selectors/authenticate';

const initialRegisterValues = {
  email: '',
  name: '',
  password: '',
};

const RegisterPage = ({ isLoading, register }) => (
  <React.Fragment>
    <Head>
      <title>Expenses</title>
    </Head>
    <Spin spinning={isLoading} tip="Beep-boop">
      <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
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
    </Spin>
  </React.Fragment>
);

RegisterPage.propTypes = {
  isLoading: PropTypes.bool,
  register: PropTypes.func.isRequired,
};

RegisterPage.defaultProps = {
  isLoading: false,
};

const mapDispatchToProps = dispatch => ({
  register: (values) => {
    dispatch(userRegister(values));
  },
});

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterPage);
