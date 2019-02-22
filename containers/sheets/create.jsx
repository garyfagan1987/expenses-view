import { Formik } from 'formik';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import validate from '../../helpers/validate';
import { sheetCreate } from '../../actions/sheet/create';
import { getSheetCreateError, getSheetCreateSuccess } from '../../selectors/sheet';
import Alert from '../../components/atoms/Alert/Alert';
import Button from '../../components/atoms/Button/Button';
import colors from '../../styles/colors';
import FlexRow from '../../components/atoms/Flex/FlexRow';
import Input from '../../components/atoms/Input/Input';
import Label from '../../components/atoms/Label/Label';
import Margin from '../../components/atoms/Margin/Margin';
import Text from '../../components/atoms/Text/Text';

const CreateSheetContainer = ({ createSheet, createSheetError, createSheetSuccess }) => (
  <div>
    <Margin>
      <FlexRow justifyContent="space-between">
        <Text as="h2" bold>
          Create Sheet
        </Text>
        <Button as="a" href="/" secondary>
          Back
        </Button>
      </FlexRow>
    </Margin>
    {createSheetSuccess && (
      <Margin>
        <Alert color={colors.white} type={colors.success}>
          Sheet has been created
        </Alert>
      </Margin>
    )}
    {createSheetError && (
      <Margin>
        <Alert color={colors.white} type={colors.danger}>
          Sheet could not be created
        </Alert>
      </Margin>
    )}
    <Formik
      initialValues={{ date: '', isPublished: '', title: '' }}
      onSubmit={(values) => {
        createSheet(values);
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
              value={values.date}
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

CreateSheetContainer.propTypes = {
  createSheet: PropTypes.func.isRequired,
  createSheetError: PropTypes.bool,
  createSheetSuccess: PropTypes.bool,
};

CreateSheetContainer.defaultProps = {
  createSheetError: false,
  createSheetSuccess: false,
};

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
