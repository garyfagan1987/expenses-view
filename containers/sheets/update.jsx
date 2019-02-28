import { Formik, FieldArray, Field } from 'formik';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import validate from '../../helpers/validate';
import { sheetUpdate, sheetUpdateCalculation } from '../../actions/sheet/update';
import {
  getSheetFetchError, getSheetFetchSuccess, getSheetUpdateError, getSheetUpdateSuccess,
} from '../../selectors/sheet';
import Alert from '../../components/atoms/Alert/Alert';
import Button from '../../components/atoms/Button/Button';
import colors from '../../styles/colors';
import FlexRow from '../../components/atoms/Flex/FlexRow';
import Input from '../../components/atoms/Input/Input';
import Label from '../../components/atoms/Label/Label';
import Margin from '../../components/atoms/Margin/Margin';
import Text from '../../components/atoms/Text/Text';
import Well from '../../components/atoms/Well/Well';

const UpdateSheetContainer = ({
  sheet, updateCalculation, updateSheet, updateSheetError, updateSheetSuccess,
}) => (
  <div>
    <Margin>
      <FlexRow justifyContent="space-between">
        <Text as="h2" bold>
          Update Sheet
        </Text>
        <Button as="a" href="/" secondary>
          Back
        </Button>
      </FlexRow>
    </Margin>
    {updateSheetSuccess && (
      <Margin>
        <Alert color={colors.white} type={colors.success}>
          Sheet has been updated
        </Alert>
      </Margin>
    )}
    {updateSheetError && (
      <Margin>
        <Alert color={colors.white} type={colors.danger}>
          Sheet could not be updated
        </Alert>
      </Margin>
    )}
    <Formik
      initialValues={sheet}
      onSubmit={(values) => {
        updateSheet(values);
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
        <form onSubmit={handleSubmit}>
          <Margin>
            <Label>
              Title *
            </Label>
            <Input
              autoComplete="off"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.title}
            />
            {errors.title && touched.title && (
              <Text color={colors.danger}>
                Please enter a title
              </Text>
            )}
          </Margin>
          <Margin>
            <Label>
              Date *
            </Label>
            <Input
              name="date"
              onBlur={handleBlur}
              onChange={handleChange}
              type="date"
              value={dayjs(values.date).format('YYYY-MM-DD')}
            />
            {errors.date && touched.date && (
              <Text color={colors.danger}>
                Please enter a date
              </Text>
            )}
          </Margin>
          <Margin>
            <Label>
              Published
            </Label>
            <Input
              checked={values.isPublished}
              name="isPublished"
              onBlur={handleBlur}
              onChange={handleChange}
              type="checkbox"
              value={values.isPublished}
            />
          </Margin>
          <Margin>
            <Well>
              <FieldArray
                name="items"
                render={arrayHelpers => (
                  <React.Fragment>
                    {values.items.length < 1 && (
                      <Alert color={colors.white} type={colors.warning}>
                        You have no items
                        <Button
                          onClick={() => arrayHelpers.push({ date: '', title: '' })}
                          type="button"
                        >
                          Add an item
                        </Button>
                      </Alert>
                    )}
                    {values.items.length > 0 && (
                      <table style={{ tableLayout: 'fixed' }} width="100%">
                        <tbody>
                          <tr>
                            <th align="left">Item</th>
                            <th align="left">Date</th>
                            <th align="left">Net</th>
                            <th align="left">VAT</th>
                            <th align="left">Gross</th>
                            <th align="right">Actions</th>
                          </tr>
                          {values.items.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <Field name={`items[${index}].title`} type="text" />
                              </td>
                              <td>
                                <Field name={`items.${index}.date`} type="date" value={dayjs(item.date).format('YYYY-MM-DD')} />
                              </td>
                              <td>
                                <Field
                                  min={0}
                                  name={`items.${index}.price_net`}
                                  onBlur={() => updateCalculation(values)}
                                  type="number"
                                />
                              </td>
                              <td>
                                <Field
                                  min={0}
                                  name={`items.${index}.price_vat`}
                                  onBlur={() => updateCalculation(values)}
                                  type="number"
                                />
                              </td>
                              <td>
                                <Field
                                  min={0}
                                  name={`items.${index}.price_gross`}
                                  onBlur={() => updateCalculation(values)}
                                  type="number"
                                />
                              </td>
                              <td align="right">
                                <Button
                                  onClick={() => arrayHelpers.remove(index)}
                                  secondary
                                  type="button"
                                >
                                  -
                                </Button>
                                {values.items.length === (index + 1) && (
                                  <Button
                                    onClick={() => arrayHelpers.push({
                                      date: '',
                                      price_gross: '',
                                      price_net: '',
                                      price_vat: '',
                                      title: '',
                                    })}
                                    type="button"
                                  >
                                    +
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="2" />
                            <td>
                              Net Total:&nbsp;
                              {sheet.total_net}
                            </td>
                            <td>
                              VAT Total:&nbsp;
                              {sheet.total_vat}
                            </td>
                            <td>
                              Gross Total:&nbsp;
                              {sheet.total_gross}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </React.Fragment>
                )}
              />
            </Well>
          </Margin>
          <Button type="submit">
            Save
          </Button>
        </form>
      )}
    </Formik>
  </div>
);

UpdateSheetContainer.propTypes = {
  sheet: PropTypes.shape().isRequired,
  updateCalculation: PropTypes.func.isRequired,
  updateSheet: PropTypes.func.isRequired,
  updateSheetError: PropTypes.bool,
  updateSheetSuccess: PropTypes.bool,
};

UpdateSheetContainer.defaultProps = {
  updateSheetError: false,
  updateSheetSuccess: false,
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const mapDispatchToProps = dispatch => ({
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
  updateSheet: (values) => {
    dispatch(sheetUpdate(values));
  },
});

const mapStateToProps = state => ({
  error: getSheetFetchError(state),
  sheet: getSheetFetchSuccess(state),
  updateSheetError: getSheetUpdateError(state),
  updateSheetSuccess: getSheetUpdateSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateSheetContainer);
