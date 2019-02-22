import { Formik } from 'formik';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import { sheetUpdate } from '../../actions/sheet/update';
import {
  getSheetFetchError, getSheetFetchSuccess, getSheetUpdateError, getSheetUpdateSuccess,
} from '../../selectors/sheet';
import Alert from '../../components/atoms/Alert/Alert';
import Button from '../../components/atoms/Button/Button';
import colors from '../../styles/colors';
import Flex from '../../components/atoms/Flex/Flex';
import Input from '../../components/atoms/Input/Input';
import Label from '../../components/atoms/Label/Label';
import Margin from '../../components/atoms/Margin/Margin';
import Text from '../../components/atoms/Text/Text';

// @TODO: move to a shared place
const validation = Yup.object().shape({
  date: Yup.date().required(),
  isPublished: Yup.boolean(),
  title: Yup.string().required(),
});

const UpdateSheetContainer = ({
  sheet, updateSheet, updateSheetError, updateSheetSuccess,
}) => (
  <div>
    <Margin>
      <Flex justifyContent="space-between">
        <Text as="h2" bold>
          Update Sheet
        </Text>
        <Button as="a" href="/" secondary>
          Back
        </Button>
      </Flex>
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
      validationSchema={validation}
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
  updateSheet: PropTypes.func.isRequired,
  updateSheetError: PropTypes.bool,
  updateSheetSuccess: PropTypes.bool,
};

UpdateSheetContainer.defaultProps = {
  updateSheetError: false,
  updateSheetSuccess: false,
};

const mapDispatchToProps = dispatch => ({
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
