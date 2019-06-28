import { Formik } from 'formik';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import nextCookie from 'next-cookies';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

import { sheetUpdate, sheetUpdateCalculation } from '../actions/report/update';
import { getSheetFetchSuccess } from '../selectors/report';
import { sheetFetch } from '../actions/report/report';
import { sheetsPath } from '../config/paths';
import validate from '../helpers/validate';
import Form from '../components/form';

class Report extends Component {
  static propTypes = {
    cookies: PropTypes.shape().isRequired,
    report: PropTypes.shape().isRequired,
    updateCalculation: PropTypes.func.isRequired,
    updateSheet: PropTypes.func.isRequired,
  };

  static async getInitialProps(ctx) {
    const { query, store: { dispatch } } = ctx;
    const cookies = ctx.isServer ? nextCookie(ctx) : Cookies.get();
    const { token } = cookies;
    dispatch(sheetFetch(query.slug, token));
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
      report, cookies: { token }, updateCalculation, updateSheet,
    } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Expenses | Update Report</title>
        </Head>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link href={sheetsPath}>
              <a>
                Expense Reports
              </a>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Update
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
          <Formik
            initialValues={report}
            onSubmit={(values) => {
              updateSheet(values, token);
            }}
            validationSchema={validate}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              setFieldTouched,
              setFieldValue,
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
                report={report}
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
  updateCalculation: (values) => {
    const totalGrossCalculation = values.items.map(item => parseFloat(item.price_gross)).reduce(reducer);
    const totalVatCalculation = values.items.map(item => parseFloat(item.price_vat)).reduce(reducer);

    dispatch(sheetUpdateCalculation({
      ...values,
      totalGross: totalGrossCalculation,
      totalVat: totalVatCalculation,
    }));
  },
  updateSheet: (values, token) => {
    dispatch(sheetUpdate(values, token));
  },
});

const mapStateToProps = state => ({
  report: getSheetFetchSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Report);
