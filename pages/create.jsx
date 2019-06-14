import { Formik, FieldArray, Field } from 'formik';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import nextCookie from 'next-cookies';
import PropTypes from 'prop-types';

import {
  Button,
  Breadcrumb,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Select,
} from 'antd';

import { sheetCreate } from '../actions/sheet/create';
import { sheetUpdateCalculation } from '../actions/sheet/update';
import { getSheetFetchSuccess } from '../selectors/sheet';
import { sheetsPath } from '../config/paths';
import itemTypes from '../config/item-types';
import validate from '../helpers/validate';
import { currency } from '../helpers/parsers';

const { Option } = Select;

const initialValues = {
  date: moment(),
  isPublished: false,
  items: [],
  title: '',
};

const initialItem = {
  date: moment(),
  price_gross: 0,
  price_vat: 0,
  title: '',
};

class Home extends Component {
  static propTypes = {
    cookies: PropTypes.shape().isRequired,
    createSheet: PropTypes.func.isRequired,
    sheet: PropTypes.shape().isRequired,
    updateCalculation: PropTypes.func.isRequired,
  };

  static async getInitialProps(ctx) {
    const cookies = ctx.isServer ? nextCookie(ctx) : Cookies.get();
    return { cookies };
  }

  // eslint-disable-next-line no-unused-vars
  handleRemoveItem = (arrayHelpers, index, values) => {
    // @todo, add updateCalculation(values) to remove callback
    // open PR - https://github.com/jaredpalmer/formik/issues/1253
    // const { updateCalculation } = this.props;
    arrayHelpers.remove(index);
    // updateCalculation(values);
  }

  render() {
    const {
      createSheet, updateCalculation, sheet, cookies: { token },
    } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Expenses | Create Sheet</title>
        </Head>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href={sheetsPath}>
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
              createSheet(values, token);
              resetForm(initialValues);
            }}
            validationSchema={validate}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldTouched,
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
                    disabled={values.isPublished}
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
                    disabled={values.isPublished}
                    name="date"
                    onBlur={handleBlur}
                    onChange={(_, dateString) => setFieldValue('date', dateString)}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <FieldArray
                  name="items"
                  render={arrayHelpers => (
                    <React.Fragment>
                      <Card>
                        {values.items.length < 1 && (
                          <Empty description={<span>You have no items</span>}>
                            <Button
                              disabled={values.isPublished}
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
                              <Col span={5}>Title *</Col>
                              <Col span={5}>Date *</Col>
                              <Col span={5}>VAT *</Col>
                              <Col span={5}>Gross *</Col>
                              <Col span={4}>Actions</Col>
                            </Row>
                            {values.items.map((item, index) => (
                              <Row key={index} gutter={15}>
                                <Col span={5}>
                                  <Field
                                    name={`items[${index}].title`}
                                    render={({ field }) => (
                                      <Form.Item>
                                        <Select
                                          {...field}
                                          disabled={values.isPublished}
                                          onBlur={() => setFieldTouched(`items[${index}].title`, true)}
                                          onChange={value => setFieldValue(`items[${index}].title`, value)}
                                        >
                                          {itemTypes.map((type, index) => (
                                            <Option key={index} value={type}>{type}</Option>
                                          ))}
                                        </Select>
                                      </Form.Item>
                                    )}
                                  />
                                </Col>
                                <Col span={5}>
                                  <Field
                                    render={() => (
                                      <Form.Item>
                                        <DatePicker
                                          defaultValue={moment(item.date, 'YYYY-MM-DD')}
                                          disabled={values.isPublished}
                                          name={`items[${index}].date`}
                                          onBlur={handleBlur}
                                          onChange={(_, dateString) => setFieldValue(`items.${index}.date`, dateString)}
                                          style={{ width: '100%' }}
                                        />
                                      </Form.Item>
                                    )}
                                  />
                                </Col>
                                <Col span={5}>
                                  <Field
                                    name={`items.${index}.price_vat`}
                                    render={({ field }) => (
                                      <Form.Item>
                                        <Input
                                          {...field}
                                          addonBefore="£"
                                          disabled={values.isPublished}
                                          min={0}
                                          onBlur={() => updateCalculation(values)}
                                          onChange={handleChange}
                                          type="number"
                                        />
                                      </Form.Item>
                                    )}
                                  />
                                </Col>
                                <Col span={5}>
                                  <Field
                                    name={`items.${index}.price_gross`}
                                    render={({ field }) => (
                                      <Form.Item>
                                        <Input
                                          {...field}
                                          addonBefore="£"
                                          disabled={values.isPublished}
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
                                  <Button
                                    disabled={values.isPublished}
                                    icon="minus-circle-o"
                                    onClick={() => this.handleRemoveItem(arrayHelpers, index, values)}
                                    style={{ fontSize: '24px', position: 'relative', top: '2px' }}
                                    type="link"
                                  />
                                  {values.items.length === (index + 1) && (
                                    <Button
                                      disabled={values.isPublished}
                                      icon="plus-circle-o"
                                      onClick={() => arrayHelpers.push(initialItem)}
                                      style={{ fontSize: '24px', position: 'relative', top: '2px' }}
                                      type="link"
                                    />
                                  )}
                                </Col>
                              </Row>
                            ))}
                            <Row gutter={15}>
                              <Col span={10} />
                              <Col span={5}>
                                VAT Total:&nbsp;
                                {currency(sheet.totalVat)}
                              </Col>
                              <Col span={5}>
                                Gross Total:&nbsp;
                                {currency(sheet.totalGross)}
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </Card>
                    </React.Fragment>
                  )}
                />
                <Form.Item style={{ marginTop: '20px' }}>
                  <Checkbox
                    checked={values.isPublished}
                    name="isPublished"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.isPublished}
                  >
                    Publish
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

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const mapDispatchToProps = dispatch => ({
  createSheet: (values, token) => {
    dispatch(sheetCreate(values, token));
  },
  updateCalculation: (values) => {
    const grossCalculation = values.items.map(item => item.price_gross).reduce(reducer);
    const vatCalculation = values.items.map(item => item.price_vat).reduce(reducer);
    dispatch(sheetUpdateCalculation({
      ...values,
      totalGross: grossCalculation,
      totalVat: vatCalculation,
    }));
  },
});

const mapStateToProps = state => ({
  sheet: getSheetFetchSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
