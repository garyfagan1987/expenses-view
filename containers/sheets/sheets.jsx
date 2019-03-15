import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Breadcrumb,
  Icon,
  message,
  Spin,
  Table,
} from 'antd';

import { getSheets, getSheetsLoading, getSheetsError } from '../../selectors/sheets';
import { getSheetDeleteError, getSheetDeleteSuccess } from '../../selectors/sheet';

import { sheetDelete } from '../../actions/sheet/delete';
import { transformSheetsForTable } from '../../helpers/transformers';

class SheetContainer extends Component {
  static propTypes = {
    deleteError: PropTypes.bool,
    deleteSheet: PropTypes.func.isRequired,
    deleteSuccess: PropTypes.bool,
    fetchError: PropTypes.bool,
    loading: PropTypes.bool,
    sheets: PropTypes.arrayOf(PropTypes.shape().isRequired),
    token: PropTypes.string.isRequired,
  }

  static defaultProps = {
    deleteError: false,
    deleteSuccess: false,
    fetchError: false,
    loading: false,
    sheets: [],
  }

  componentDidUpdate() {
    const { deleteError, deleteSuccess } = this.props;
    if (deleteSuccess) message.success('Your sheet was deleted');
    if (deleteError) message.error('There was a problem trying to delete this sheet');
  }

  renderSheets = () => {
    const { deleteSheet, sheets, token } = this.props;
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
          {isPublished && <Icon type="check" />}
          {!isPublished && <Icon type="close" />}
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
    const { fetchError, loading } = this.props;

    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            Expense Sheets
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', minHeight: 280, padding: 24 }}>
          {fetchError && <Alert message="There was a problem loading your sheets" type="error" />}
          {!fetchError && loading && <Spin />}
          {!fetchError && this.renderSheets()}
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
  deleteError: getSheetDeleteError(state),
  deleteSuccess: getSheetDeleteSuccess(state),
  fetchError: getSheetsError(state),
  loading: getSheetsLoading(state),
  sheets: getSheets(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SheetContainer);
