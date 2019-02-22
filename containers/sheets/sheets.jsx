import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getSheets, getSheetsLoading, getSheetsError } from '../../selectors/sheets';
import { getSheetDeleteError, getSheetDeleteSuccess } from '../../selectors/sheet';

import { sheetDelete } from '../../actions/sheet/delete';
import Alert from '../../components/atoms/Alert/Alert';
import Button from '../../components/atoms/Button/Button';
import colors from '../../styles/colors';
import Flex from '../../components/atoms/Flex/Flex';
import Loading from '../../components/atoms/Loading/Loading';
import ListItem from '../../components/atoms/ListItem/ListItem';
import Margin from '../../components/atoms/Margin/Margin';
import Text from '../../components/atoms/Text/Text';
import UnorderedList from '../../components/atoms/UnorderedList/UnorderedList';

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

  renderSheets = () => {
    const { deleteSheet, sheets } = this.props;
    return (
      <UnorderedList>
        {sheets.map(sheet => (
          <ListItem key={sheet.id}>
            <Flex justifyContent="space-between">
              <Text as="a" href={`/sheet/${sheet.id}`}>
                {sheet.title}
                &nbsp;
                {!sheet.isPublished && '(Draft)'}
              </Text>
              <Button onClick={deleteSheet(sheet.id)}>
                Delete
              </Button>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    );
  }

  render() {
    const {
      deleteError, deleteSuccess, fetchError, loading, sheets,
    } = this.props;

    return (
      <React.Fragment>
        <Margin>
          <Flex justifyContent="space-between">
            <Text as="h2" bold>
              Sheets
            </Text>
            <Button as="a" href="/create" secondary>
              Create sheet
            </Button>
          </Flex>
        </Margin>
        {fetchError && (
          <Margin>
            <Alert color={colors.white} type={colors.danger}>
              There was a problem loading your sheets
            </Alert>
          </Margin>
        )}
        {!fetchError && loading && <Loading>Loading...</Loading>}
        {!fetchError && !sheets.length && <Text>There are no sheets</Text>}
        {deleteError && (
          <Margin>
            <Alert color={colors.white} type={colors.danger}>
              There was a problem trying to delete this sheet
            </Alert>
          </Margin>
        )}
        {deleteSuccess && (
          <Margin>
            <Alert color={colors.white} type={colors.success}>
              Your sheet was deleted
            </Alert>
          </Margin>
        )}
        {!fetchError && this.renderSheets()}
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
