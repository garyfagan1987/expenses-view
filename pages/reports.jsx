import { connect } from 'react-redux';
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import moment from 'moment';
import nextCookie from 'next-cookies';
import PropTypes from 'prop-types';

import {
  Alert,
  Button,
  Breadcrumb,
  Spin,
  Table,
} from 'antd';

import { sheetsFetch } from '../actions/reports/reports';
import { getSheetsSuccess, getSheetsLoading, getSheetsError } from '../selectors/reports';
import { sheetDelete } from '../actions/report/delete';
import { transformSheetsForTable } from '../helpers/transformers';
import { createSheetPath } from '../config/paths';

class Home extends Component {
  static propTypes = {
    cookies: PropTypes.shape().isRequired,
    deleteSheet: PropTypes.func.isRequired,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    reports: PropTypes.arrayOf(PropTypes.shape().isRequired),
  }

  static defaultProps = {
    error: false,
    loading: false,
    reports: [],
  }

  static async getInitialProps(ctx) {
    const { store: { dispatch } } = ctx;
    const cookies = ctx.isServer ? nextCookie(ctx) : Cookies.get();
    const { token } = cookies;
    dispatch(sheetsFetch(token));
    return { cookies };
  }

  renderSheets = () => {
    const { deleteSheet, reports, cookies: { token } } = this.props;
    const transformedSheets = transformSheetsForTable(reports);

    const columns = [{
      dataIndex: 'title',
      key: 'title',
      title: 'Title',
    }, {
      dataIndex: 'date',
      key: 'date',
      render: date => <span>{moment(date).format('DD-MM-YYYY')}</span>,
      title: 'Date',
    }, {
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: isPublished => (
        <span>
          {isPublished ? 'Yes' : 'No'}
        </span>
      ),
      title: 'Published',
    }, {
      dataIndex: 'totalVat',
      key: 'totalVat',
      title: 'Total VAT',
    }, {
      dataIndex: 'totalGross',
      key: 'totalGross',
      title: 'Total Gross',
    }, {
      key: 'action',
      render: report => (
        <span>
          <Button href={`/report/${report.key}`}>edit</Button>
          &nbsp;
          <Button disabled={report.isPublished} onClick={deleteSheet(report.key, token)}>delete</Button>
        </span>
      ),
      title: 'Action',
    }];

    return <Table columns={columns} dataSource={transformedSheets} />;
  }

  render() {
    const { error, loading } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Expenses | Reports</title>
        </Head>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            Expense Reports
          </Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={loading} tip="Getting your reports">
          <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
              <Button href={createSheetPath}>Create report</Button>
            </div>
            {error && <Alert message="There was a problem loading your reports" type="error" />}
            {!error && this.renderSheets()}
          </div>
        </Spin>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteSheet(id, token) {
    return () => dispatch(sheetDelete(id, token));
  },
});

const mapStateToProps = state => ({
  error: getSheetsError(state),
  loading: getSheetsLoading(state),
  reports: getSheetsSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
