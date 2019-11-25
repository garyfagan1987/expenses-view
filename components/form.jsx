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
  Tooltip,
  Typography,
} from 'antd';

import itemTypes from '../config/item-types';
import vehicleTypes from '../config/vehicles';
import { currency } from '../helpers/parsers';

const { Text } = Typography;

const { Option } = Select;

const initialItem = {
  date: moment(),
  description: '',
  miles: 0,
  price_gross: 0,
  price_net: 0,
  price_vat: 0,
  title: '',
  vehicle: '',
};

const ExpenseForm = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldTouched,
  setFieldValue,
  report,
  touched,
  updateCalculation,
  updateNetCalculation,
  values,
}) => {
  const handleChangeItemVehicle = (index, value) => {
    // todo, need to call updateCalculation once setFieldValue has completed: https://github.com/jaredpalmer/formik/issues/529
    const { advisoryFuelRate } = vehicleTypes.find(x => x.id === value);
    const grossPerMile = values.items[index].miles * 0.45;
    const advisoryFuelRatePerMile = advisoryFuelRate * values.items[index].miles;
    const advisoryFuelRateVatPerMile = (advisoryFuelRatePerMile / 1.2) * 0.2;
    const advisoryFuelRateNetPerMile = grossPerMile - advisoryFuelRateVatPerMile;
    setFieldValue(`items.${index}.price_gross`, grossPerMile.toFixed(2));
    setFieldValue(`items.${index}.price_vat`, advisoryFuelRateVatPerMile.toFixed(2));
    setFieldValue(`items.${index}.price_net`, advisoryFuelRateNetPerMile.toFixed(2));
    setFieldValue(`items[${index}].vehicle`, value);
  };

  const handleChangeItemMiles = (index, value) => {
    // todo, need to call updateCalculation once setFieldValue has completed: https://github.com/jaredpalmer/formik/issues/529
    const { advisoryFuelRate } = vehicleTypes.find(x => x.id === values.items[index].vehicle);
    const grossPerMile = value * 0.45;
    const advisoryFuelRatePerMile = advisoryFuelRate * value;
    const advisoryFuelRateVatPerMile = (advisoryFuelRatePerMile / 1.2) * 0.2;
    const advisoryFuelRateNetPerMile = grossPerMile - advisoryFuelRateVatPerMile;

    setFieldValue(`items.${index}.price_gross`, grossPerMile.toFixed(2));
    setFieldValue(`items.${index}.price_vat`, advisoryFuelRateVatPerMile.toFixed(2));
    setFieldValue(`items.${index}.price_net`, advisoryFuelRateNetPerMile.toFixed(2));
    setFieldValue(`items[${index}].miles`, value);
  };

  const handleChangeItemTitle = (index, value) => {
    setFieldValue(`items.${index}.title`, value);
    if (value !== 'Mileage Allowance') {
      setFieldValue(`items[${index}].vehicle`, '');
      setFieldValue(`items[${index}].miles`, 0);
    }
  };

  const removeItem = (arrayHelpers, index, removeValues) => {
    const { items } = removeValues;
    const updatedItems = items.slice(0, index).concat(items.slice(index + 1, items.length));
    arrayHelpers.remove(index);
    if (items.length > 1) {
      updateCalculation({ ...removeValues, items: [...updatedItems] });
    }
  };

  const copyItem = (arrayHelpers, index, item, copyValues) => {
    const { items } = copyValues;
    const copiedItems = [...items];
    copiedItems.push(item);
    updateCalculation({ ...copyValues, items: [...copiedItems] });
    arrayHelpers.insert(index, item);
  };


  return (
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
            {values.items && values.items.length < 1 && (
              <Card>
                <Empty description={<span>You have no items</span>}>
                  <Button
                    disabled={values.isPublished}
                    onClick={() => arrayHelpers.push(initialItem)}
                    type="primary"
                  >
                    Add an item
                  </Button>
                </Empty>
              </Card>
            )}
            {values.items && values.items.length > 0 && (
              <React.Fragment>
                <Card style={{ backgroundColor: '#EEE' }}>
                  <Row gutter={15}>
                    <Col span={5}>
                      <Text strong>Title</Text>
                    </Col>
                    <Col span={3}>
                      <Text strong>Date</Text>
                    </Col>
                    <Col span={4}>
                      <Text strong>Description</Text>
                    </Col>
                    <Col span={3}>
                      <Text strong>Net</Text>
                    </Col>
                    <Col span={3}>
                      <Text strong>VAT</Text>
                    </Col>
                    <Col span={3}>
                      <Text strong>Gross</Text>
                    </Col>
                    <Col span={3}>
                      <Text strong>Actions</Text>
                    </Col>
                  </Row>
                </Card>
                {values.items.map((item, index) => (
                  <Card>
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
                                onChange={value => handleChangeItemTitle(index, value)}
                                showSearch
                              >
                                {itemTypes.map((type, index) => (
                                  <Option key={index} value={type}>{type}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          )}
                        />
                        {values.items[index].title === 'Mileage Allowance' && (
                          <React.Fragment>
                            <Row gutter={15}>
                              <Col span={7}>Vehicle *</Col>
                              <Col span={17}>
                                <Field
                                  name={`items[${index}].vehicle`}
                                  render={({ field }) => (
                                    <Form.Item
                                      help={errors.items && errors.items[index] && errors.items[index].vehicle && touched.items && touched.items[index] && touched.items[index].vehicle ? 'Enter a vehicle' : ''}
                                      validateStatus={errors.items && errors.items[index] && errors.items[index].vehicle && touched.items && touched.items[index] && touched.items[index].vehicle ? 'error' : undefined}
                                    >
                                      <Select
                                        {...field}
                                        disabled={values.isPublished}
                                        onBlur={() => updateCalculation(values)}
                                        onChange={value => handleChangeItemVehicle(index, value)}
                                        showSearch
                                      >
                                        {vehicleTypes.map((type, index) => (
                                          <Option key={index} value={type.id}>{type.label}</Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  )}
                                />
                              </Col>
                            </Row>
                            {values.items[index].vehicle && (
                              <Row key={index} gutter={15}>
                                <Col span={7}>Miles *</Col>
                                <Col span={17}>
                                  <Field
                                    name={`items[${index}].miles`}
                                    render={({ field }) => (
                                      <Form.Item
                                        help={errors.items && errors.items[index] && errors.items[index].miles && touched.items && touched.items[index] && touched.items[index].miles ? 'Enter a miles' : ''}
                                        validateStatus={errors.items && errors.items[index] && errors.items[index].miles && touched.items && touched.items[index] && touched.items[index].miles ? 'error' : undefined}
                                      >
                                        <Input
                                          {...field}
                                          disabled={values.isPublished}
                                          min={0}
                                          onBlur={() => updateCalculation(values)}
                                          onChange={e => handleChangeItemMiles(index, e.target.value)}
                                          type="number"
                                        />
                                      </Form.Item>
                                    )}
                                  />
                                </Col>
                              </Row>
                            )}
                          </React.Fragment>
                        )}
                      </Col>
                      <Col span={3}>
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
                      <Col span={4}>
                        <Field
                          name={`items.${index}.description`}
                          render={({ field }) => (
                            <Form.Item
                              help={errors.items && errors.items[index] && errors.items[index].description && touched.items && touched.items[index] && touched.items[index].description ? 'Enter the description' : ''}
                              validateStatus={errors.items && errors.items[index] && errors.items[index].description && touched.items && touched.items[index] && touched.items[index].description ? 'error' : undefined}
                            >
                              <Input
                                {...field}
                                disabled={values.isPublished}
                                type="text"
                              />
                            </Form.Item>
                          )}
                        />
                      </Col>
                      <Col span={3}>
                        <Field
                          name={`items.${index}.price_net`}
                          render={({ field }) => (
                            <Form.Item
                              help={errors.items && errors.items[index] && errors.items[index].price_net && touched.items && touched.items[index] && touched.items[index].price_net ? 'Enter the net price' : ''}
                              validateStatus={errors.items && errors.items[index] && errors.items[index].price_net && touched.items && touched.items[index] && touched.items[index].price_net ? 'error' : undefined}
                            >
                              <Input
                                {...field}
                                addonBefore="£"
                                disabled={values.isPublished}
                                readOnly
                                type="text"
                              />
                            </Form.Item>
                          )}
                        />
                      </Col>
                      <Col span={3}>
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
                                onBlur={() => {
                                  // todo, need to call updateCalculation once setFieldValue has completed: https://github.com/jaredpalmer/formik/issues/529
                                  setFieldValue(`items.${index}.price_net`, updateNetCalculation(values.items[index].price_vat, values.items[index].price_gross));
                                  updateCalculation(values);
                                }}
                                onChange={handleChange}
                                readOnly={values.items[index].title === 'Mileage Allowance'}
                                type="text"
                              />
                            </Form.Item>
                          )}
                        />
                      </Col>
                      <Col span={3}>
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
                                onBlur={() => {
                                  // todo, need to call updateCalculation once setFieldValue has completed: https://github.com/jaredpalmer/formik/issues/529
                                  setFieldValue(`items.${index}.price_net`, updateNetCalculation(values.items[index].price_vat, values.items[index].price_gross));
                                  updateCalculation(values);
                                }}
                                onChange={handleChange}
                                readOnly={values.items[index].title === 'Mileage Allowance'}
                                type="text"
                              />
                            </Form.Item>
                          )}
                        />
                      </Col>
                      <Col span={3}>
                        <Tooltip title="Copy item">
                          <Button
                            disabled={values.isPublished}
                            icon="copy"
                            onClick={() => copyItem(arrayHelpers, index, values.items[index], values)}
                            style={{ fontSize: '24px', position: 'relative', top: '2px' }}
                            type="link"
                          />
                        </Tooltip>
                        <Tooltip title="Remove item">
                          <Button
                            disabled={values.isPublished}
                            icon="minus-circle-o"
                            onClick={() => removeItem(arrayHelpers, index, values)}
                            style={{ fontSize: '24px', position: 'relative', top: '2px' }}
                            type="link"
                          />
                        </Tooltip>
                        {values.items.length === (index + 1) && (
                          <Tooltip title="Add item">
                            <Button
                              disabled={values.isPublished}
                              icon="plus-circle-o"
                              onClick={() => arrayHelpers.push(initialItem)}
                              style={{ fontSize: '24px', position: 'relative', top: '2px' }}
                              type="link"
                            />
                          </Tooltip>
                        )}
                      </Col>
                    </Row>
                  </Card>
                ))}
                <Card>
                  <Row gutter={15}>
                    <Col span={12} />
                    <Col span={3}>
                      Net Total:&nbsp;
                      {currency(report.totalNet)}
                    </Col>
                    <Col span={3}>
                      VAT Total:&nbsp;
                      {currency(report.totalVat)}
                    </Col>
                    <Col span={3}>
                      Gross Total:&nbsp;
                      {currency(report.totalGross)}
                    </Col>
                  </Row>
                </Card>
              </React.Fragment>
            )}
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
        <Checkbox
          checked={values.isPaid}
          disabled={!values.isPublished}
          name="isPaid"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.isPaid}
        >
          Paid
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
};

export default ExpenseForm;
