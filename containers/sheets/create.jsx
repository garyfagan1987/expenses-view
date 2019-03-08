import { Formik, FieldArray, Field } from 'formik';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';

import {
  Button,
  Breadcrumb,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Empty,
  Form,
  Icon,
  Input,
  message,
  Row,
} from 'antd';

import validate from '../../helpers/validate';
import { sheetCreate } from '../../actions/sheet/create';
import { sheetUpdateCalculation } from '../../actions/sheet/update';
import { getSheetCreateError, getSheetCreateSuccess, getSheetFetchSuccess } from '../../selectors/sheet';

const initialValues = {
  date: moment(),
  isPublished: false,
  items: [],
  title: '',
};

const initialItem = {
  date: moment(),
  price_gross: 0,
  price_net: 0,
  price_vat: 0,
  title: '',
};

class CreateSheetContainer extends Component {
  static propTypes = {
    createSheet: PropTypes.func.isRequired,
    createSheetError: PropTypes.bool,
    createSheetSuccess: PropTypes.bool,
    sheet: PropTypes.shape().isRequired,
    updateCalculation: PropTypes.func.isRequired,
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

  handleRemoveItem = (arrayHelpers, index, values) => {
    // @todo, add updateCalculation(values) to remove callback
    // open PR - https://github.com/jaredpalmer/formik/issues/1253
    // const { updateCalculation } = this.props;
    arrayHelpers.remove(index);
    // updateCalculation(values);
  }

  render() {
    const { createSheet, updateCalculation, sheet } = this.props;
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
                <FieldArray
                  name="items"
                  render={arrayHelpers => (
                    <React.Fragment>
                      <Card>
                        {values.items.length < 1 && (
                          <Empty description={<span>You have no items</span>}>
                            <Button
                              onClick={() => arrayHelpers.push(initialItem)}
                              type="primary"
                            >
                              Add an item
                            </Button>
                          </Empty>
                        )}
                        {values.items.length > 0 && (
                          <React.Fragment>
                            <Row gutter={15}>
                              <Col span={4}>Title *</Col>
                              <Col span={4}>Date *</Col>
                              <Col span={4}>Net *</Col>
                              <Col span={4}>VAT *</Col>
                              <Col span={4}>Gross *</Col>
                              <Col span={4}>Actions</Col>
                            </Row>
                            {values.items.map((item, index) => (
                              <Row gutter={15} key={index}>
                                <Col span={4}>
                                  <Field
                                    autoComplete="off"
                                    name={`items[${index}].title`}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    render={({ field }) => (
                                      <Form.Item>
                                        <Input {...field} />
                                      </Form.Item>
                                    )}
                                    type="text"
                                  />
                                </Col>
                                <Col span={4}>
                                  <Field
                                    render={() => (
                                      <Form.Item>
                                        <DatePicker
                                          defaultValue={moment(item.date, 'YYYY-MM-DD')}
                                          name={`items[${index}].date`}
                                          onBlur={handleBlur}
                                          onChange={(_, dateString) => setFieldValue(`items.${index}.date`, dateString)}
                                        />
                                      </Form.Item>
                                    )}
                                  />
                                </Col>
                                <Col span={4}>
                                  <Field
                                    name={`items.${index}.price_net`}
                                    render={({ field }) => (
                                      <Form.Item>
                                        <Input
                                          {...field}
                                          min={0}
                                          onBlur={() => updateCalculation(values)}
                                          onChange={handleChange}
                                          type="number"
                                        />
                                      </Form.Item>
                                    )}
                                  />
                                </Col>
                                <Col span={4}>
                                  <Field
                                    name={`items.${index}.price_vat`}
                                    render={({ field }) => (
                                      <Form.Item>
                                        <Input
                                          {...field}
                                          min={0}
                                          onBlur={() => updateCalculation(values)}
                                          onChange={handleChange}
                                          type="number"
                                        />
                                      </Form.Item>
                                    )}
                                  />
                                </Col>
                                <Col span={4}>
                                  <Field
                                    name={`items.${index}.price_gross`}
                                    render={({ field }) => (
                                      <Form.Item>
                                        <Input
                                          {...field}
                                          min={0}
                                          onBlur={() => updateCalculation(values)}
                                          onChange={handleChange}
                                          type="number"
                                        />
                                      </Form.Item>
                                    )}
                                  />
                                </Col>
                                <Col span={4}>
                                  <Icon
                                    onClick={() => this.handleRemoveItem(arrayHelpers, index, values)}
                                    style={{ fontSize: '24px', position: 'relative', top: '8px' }}
                                    type="minus-circle-o"
                                  />
                                  {values.items.length === (index + 1) && (
                                    <Icon
                                      onClick={() => arrayHelpers.push(initialItem)}
                                      style={{
                                        fontSize: '24px',
                                        marginLeft: '10px',
                                        position: 'relative',
                                        top: '8px',
                                      }}
                                      type="plus-circle-o"
                                    />
                                  )}
                                </Col>
                              </Row>
                            ))}
                            <Row gutter={15}>
                              <Col span={8} />
                              <Col span={4}>
                                Net Total:&nbsp;
                                {sheet.total_net}
                              </Col>
                              <Col span={4}>
                                VAT Total:&nbsp;
                                {sheet.total_vat}
                              </Col>
                              <Col span={8}>
                                Gross Total:&nbsp;
                                {sheet.total_gross}
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </Card>
                    </React.Fragment>
                  )}
                />
                <Button
                  htmlType="submit"
                  style={{ marginTop: '20px' }}
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

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const mapDispatchToProps = dispatch => ({
  createSheet: (values) => {
    dispatch(sheetCreate(values));
  },
  updateCalculation: (values) => {
    const grossCalculation = values.items.map(item => item.price_gross).reduce(reducer);
    const netCalculation = values.items.map(item => item.price_net).reduce(reducer);
    const vatCalculation = values.items.map(item => item.price_vat).reduce(reducer);
    dispatch(sheetUpdateCalculation({
      ...values,
      total_gross: grossCalculation,
      total_net: netCalculation,
      total_vat: vatCalculation,
    }));
  },
});

const mapStateToProps = state => ({
  createSheetError: getSheetCreateError(state),
  createSheetSuccess: getSheetCreateSuccess(state),
  sheet: getSheetFetchSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateSheetContainer);
