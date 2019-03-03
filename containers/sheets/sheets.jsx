import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Alert,
  Button,
  Breadcrumb,
  Empty,
  List,
  message,
  Spin,
} from 'antd';

import { getSheets, getSheetsLoading, getSheetsError } from '../../selectors/sheets';
import { getSheetDeleteError, getSheetDeleteSuccess } from '../../selectors/sheet';

import { sheetDelete } from '../../actions/sheet/delete';

class SheetContainer extends Component {
  static propTypes = {
    deleteError: PropTypes.bool,
    deleteSheet: PropTypes.func.isRequired,
    deleteSuccess: PropTypes.bool,
    fetchError: PropTypes.bool,
    loading: PropTypes.bool,
    sheets: PropTypes.arrayOf(PropTypes.shape().isRequired),
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
    const { deleteSheet, sheets } = this.props;
    return (
      <List
        dataSource={sheets}
        itemLayout="horizontal"
        renderItem={sheet => (
          <List.Item actions={
            [
              <Button href={`/sheet/${sheet.id}`}>edit</Button>,
              <Button disabled={sheet.isPublished} onClick={deleteSheet(sheet.id)}>delete</Button>,
            ]}
          >
            <List.Item.Meta title={<Link href={`/sheet/${sheet.id}`}><a>{sheet.title} {!sheet.isPublished && ' (Draft)'}</a></Link>} />
          </List.Item>
        )}
      />
    );
  }

  render() {
    const { fetchError, loading, sheets } = this.props;

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
          {!fetchError && !sheets.length && <Empty />}
          {!fetchError && this.renderSheets()}
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteSheet(id) {
    return () => dispatch(sheetDelete(id));
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
