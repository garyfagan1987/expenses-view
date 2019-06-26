import { Formik } from 'formik';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import nextCookie from 'next-cookies';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

import { sheetCreate } from '../actions/sheet/create';
import { sheetUpdateCalculation } from '../actions/sheet/update';
import { getSheetFetchSuccess } from '../selectors/sheet';
import { sheetsPath } from '../config/paths';
import validate from '../helpers/validate';
import Form from '../components/form';

const initialValues = {
  date: moment(),
  isPublished: false,
  items: [],
  title: '',
};

class Create extends Component {
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
              <Form
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleRemoveItem={this.handleRemoveItem}
                handleSubmit={handleSubmit}
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                sheet={sheet}
                touched={touched}
                updateCalculation={updateCalculation}
                values={values}
              />
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
)(Create);
