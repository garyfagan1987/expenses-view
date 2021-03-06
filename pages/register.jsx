import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { Formik } from 'formik';
import {
  Button, Form, Icon, Input, PageHeader, Spin,
} from 'antd';
import PropTypes from 'prop-types';

import { userRegister } from '../actions/user/register';
import { userSchema } from '../helpers/validate';
import { getIsLoading } from '../selectors/authenticate';
import messages from '../config/messages';

const initialValues = {
  businessName: '',
  email: '',
  name: '',
  password: '',
};

const message = messages.register;

const Register = ({ isLoading, register }) => (
  <React.Fragment>
    <Head>
      <title>{message.title}</title>
    </Head>
    <Spin spinning={isLoading} tip={message.spinner}>
      <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
        <PageHeader title={message.heading}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              register(values);
            }}
            validationSchema={userSchema}
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
                  help={errors.email && touched.email ? errors.email : ''}
                  validateStatus={errors.email && touched.email ? 'error' : undefined}
                >
                  <Input
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={message.form.fields.email.placeholder}
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
                    placeholder={message.form.fields.password.placeholder}
                    prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} type="lock" />}
                    type="password"
                    value={values.password}
                  />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">{message.form.button}</Button>
                </Form.Item>
              </Form>
            )}
          </Formik>
        </PageHeader>
      </div>
    </Spin>
  </React.Fragment>
);

Register.propTypes = {
  isLoading: PropTypes.bool,
  register: PropTypes.func.isRequired,
};

Register.defaultProps = {
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
)(Register);
