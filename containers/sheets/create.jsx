import { Formik } from 'formik';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';

import {
  Button,
  Breadcrumb,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
} from 'antd';

import validate from '../../helpers/validate';
import { sheetCreate } from '../../actions/sheet/create';
import { getSheetCreateError, getSheetCreateSuccess } from '../../selectors/sheet';

const initialValues = {
  date: moment(),
  isPublished: false,
  title: '',
};

class CreateSheetContainer extends Component {
  static propTypes = {
    createSheet: PropTypes.func.isRequired,
    createSheetError: PropTypes.bool,
    createSheetSuccess: PropTypes.bool,
  };

  static defaultProps = {
    createSheetError: false,
    createSheetSuccess: false,
  };

  componentDidUpdate() {
    const { createSheetError, createSheetSuccess } = this.props;
    if (createSheetSuccess) message.success('Sheet has been created');
    if (createSheetError) message.error('Sheet could not be created');
  }

  render() {
    const { createSheet } = this.props;
    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href="/">
              <a>
                Expense Sheets
              </a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Create
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              createSheet(values);
              resetForm(initialValues);
            }}
            validationSchema={validate}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Form.Item
                  help={errors.title && touched.title ? errors.title : ''}
                  label="Title *"
                  validateStatus={errors.title && touched.title ? 'error' : undefined}
                >
                  <Input
                    autoComplete="off"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.title}
                  />
                </Form.Item>
                <Form.Item
                  help={errors.date && touched.date ? errors.date : ''}
                  label="Date *"
                  validateStatus={errors.date && touched.date ? 'error' : undefined}
                >
                  <DatePicker
                    defaultValue={values.date}
                    name="date"
                    onBlur={handleBlur}
                    onChange={(_, dateString) => setFieldValue('date', dateString)}
                  />
                </Form.Item>
                <Form.Item>
                  <Checkbox
                    checked={values.isPublished}
                    name="isPublished"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.isPublished}
                  >
                    Published
                  </Checkbox>
                </Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                >
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createSheet: (values) => {
    dispatch(sheetCreate(values));
  },
});

const mapStateToProps = state => ({
  createSheetError: getSheetCreateError(state),
  createSheetSuccess: getSheetCreateSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSheetContainer);
