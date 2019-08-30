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
  Tag,
} from 'antd';

import { sheetsFetch } from '../actions/reports/reports';
import { getSheetsSuccess, getSheetsLoading, getSheetsError } from '../selectors/reports';
import { sheetDelete } from '../actions/report/delete';
import { transformSheetsForTable } from '../helpers/transformers';
import { createSheetPath } from '../config/paths';
import messages from '../config/messages';

class Reports extends Component {
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
    const message = messages.reports;
    const { deleteSheet, reports, cookies: { token } } = this.props;
    const transformedSheets = transformSheetsForTable(reports);
    const columns = [{
      dataIndex: 'title',
      key: 'title',
      title: message.table.title,
    }, {
      dataIndex: 'date',
      key: 'date',
      render: date => <span>{moment(date).format('DD-MM-YYYY')}</span>,
      title: message.table.date,
    }, {
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: isPublished => (
        <span>
          {isPublished ? message.table.publishedYes : message.table.publishedNo}
        </span>
      ),
      title: message.table.published,
    }, {
      dataIndex: 'totalNet',
      key: 'totalNet',
      title: message.table.totalNet,
    }, {
      dataIndex: 'totalVat',
      key: 'totalVat',
      title: message.table.totalVat,
    }, {
      dataIndex: 'totalGross',
      key: 'totalGross',
      title: message.table.totalGross,
    }, {
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: isPaid => (
        <span>
          {isPaid ? <Tag color="#87d068">{message.table.paidYes}</Tag> : <Tag color="#f50">{message.table.paidNo}</Tag>}
        </span>
      ),
      title: message.table.paid,
    }, {
      key: 'action',
      render: report => (
        <span>
          <Button href={`/report/${report.key}`}>
            {message.buttons.edit}
          </Button>
          &nbsp;
          <Button disabled={report.isPublished} onClick={deleteSheet(report.key, token)}>
            {message.buttons.delete}
          </Button>
        </span>
      ),
      title: message.table.action,
    }];

    return <Table columns={columns} dataSource={transformedSheets} />;
  }

  render() {
    const message = messages.reports;
    const { error, loading } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>{message.title}</title>
        </Head>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            {message.breadcrumbs[0]}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={loading} tip={message.spinner}>
          <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
            <div style={{ marginBottom: '16px', textAlign: 'right' }}>
              <Button href={createSheetPath}>{message.buttons.create}</Button>
            </div>
            {error && <Alert message={message.error} type="error" />}
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
)(Reports);
