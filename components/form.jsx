/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { FieldArray, Field } from 'formik';
import moment from 'moment';

import {
  Button,
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

import itemTypes from '../config/item-types';
import { currency } from '../helpers/parsers';

const { Option } = Select;

const initialItem = {
  date: moment(),
  price_gross: 0,
  price_vat: 0,
  title: '',
};

const ExpenseForm = ({
  errors,
  handleBlur,
  handleChange,
  handleRemoveItem,
  handleSubmit,
  setFieldTouched,
  setFieldValue,
  report,
  touched,
  updateCalculation,
  values,
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Item
      help={errors.title && touched.title ? 'Enter a title' : ''}
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
      help={errors.date && touched.date ? 'Enter a date' : ''}
      label="Date *"
      validateStatus={errors.date && touched.date ? 'error' : undefined}
    >
      <DatePicker
        defaultValue={moment(values.date, 'YYYY-MM-DD')}
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
                          <Form.Item
                            help={errors.items && errors.items[index] && errors.items[index].title && touched.items && touched.items[index] && touched.items[index].title ? 'Enter a title' : ''}
                            validateStatus={errors.items && errors.items[index] && errors.items[index].title && touched.items && touched.items[index] && touched.items[index].title ? 'error' : undefined}
                          >
                            <Select
                              {...field}
                              disabled={values.isPublished}
                              onBlur={() => setFieldTouched(`items[${index}].title`, true)}
                              onChange={value => setFieldValue(`items[${index}].title`, value)}
                              showSearch
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
                          <Form.Item
                            help={errors.items && errors.items[index] && errors.items[index].date && touched.items && touched.items[index] && touched.items[index].date ? 'Enter a date' : ''}
                            validateStatus={errors.items && errors.items[index] && errors.items[index].date && touched.items && touched.items[index] && touched.items[index].date ? 'error' : undefined}
                          >
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
                          <Form.Item
                            help={errors.items && errors.items[index] && errors.items[index].price_vat && touched.items && touched.items[index] && touched.items[index].price_vat ? 'Enter the VAT price' : ''}
                            validateStatus={errors.items && errors.items[index] && errors.items[index].price_vat && touched.items && touched.items[index] && touched.items[index].price_vat ? 'error' : undefined}
                          >
                            <Input
                              {...field}
                              addonBefore="£"
                              disabled={values.isPublished}
                              min={0}
                              onBlur={() => updateCalculation(values)}
                              onChange={handleChange}
                              type="text"
                            />
                          </Form.Item>
                        )}
                      />
                    </Col>
                    <Col span={5}>
                      <Field
                        name={`items.${index}.price_gross`}
                        render={({ field }) => (
                          <Form.Item
                            help={errors.items && errors.items[index] && errors.items[index].price_gross && touched.items && touched.items[index] && touched.items[index].price_gross ? 'Enter the gross price' : ''}
                            validateStatus={errors.items && errors.items[index] && errors.items[index].price_gross && touched.items && touched.items[index] && touched.items[index].price_gross ? 'error' : undefined}
                          >
                            <Input
                              {...field}
                              addonBefore="£"
                              disabled={values.isPublished}
                              min={0}
                              onBlur={() => updateCalculation(values)}
                              onChange={handleChange}
                              type="text"
                            />
                          </Form.Item>
                        )}
                      />
                    </Col>
                    <Col span={4}>
                      <Button
                        disabled={values.isPublished}
                        icon="minus-circle-o"
                        onClick={() => handleRemoveItem(arrayHelpers, index, values)}
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
                    {currency(report.totalVat)}
                  </Col>
                  <Col span={5}>
                    Gross Total:&nbsp;
                    {currency(report.totalGross)}
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
  </Form>
);

export default ExpenseForm;
