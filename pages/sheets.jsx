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

import { sheetsFetch } from '../actions/sheets/sheets';
import { getSheetsSuccess, getSheetsLoading, getSheetsError } from '../selectors/sheets';
import { sheetDelete } from '../actions/sheet/delete';
import { transformSheetsForTable } from '../helpers/transformers';

class Home extends Component {
  static propTypes = {
    cookies: PropTypes.shape().isRequired,
    deleteSheet: PropTypes.func.isRequired,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    sheets: PropTypes.arrayOf(PropTypes.shape().isRequired),
  }

  static defaultProps = {
    error: false,
    loading: false,
    sheets: [],
  }

  static async getInitialProps(ctx) {
    const { store: { dispatch } } = ctx;
    const cookies = ctx.isServer ? nextCookie(ctx) : Cookies.get();
    const { token } = cookies;
    dispatch(sheetsFetch(token));
    return { cookies };
  }

  renderSheets = () => {
    const { deleteSheet, sheets, cookies: { token } } = this.props;
    const transformedSheets = transformSheetsForTable(sheets);

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
      dataIndex: 'totalNet',
      key: 'totalNet',
      title: 'Total Net',
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
      render: sheet => (
        <span>
          <Button href={`/sheet/${sheet.key}`}>edit</Button>
          &nbsp;
          <Button disabled={sheet.isPublished} onClick={deleteSheet(sheet.key, token)}>delete</Button>
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
          <title>Expenses | Sheets</title>
        </Head>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            Expense Sheets
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
          {error && <Alert message="There was a problem loading your sheets" type="error" />}
          {!error && loading && <Spin />}
          {!error && this.renderSheets()}
        </div>
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
  sheets: getSheetsSuccess(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
