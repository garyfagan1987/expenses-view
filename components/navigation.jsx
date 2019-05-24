import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

import { userLogout } from '../actions/user/logout';

const Navigation = ({ logout }) => {
  const cookies = new Cookies();
  const isLoggedIn = !!cookies.get('token');

  return (
    <Menu
      mode="horizontal"
      style={{ lineHeight: '64px' }}
      theme="dark"
    >
      {isLoggedIn && (
        <Menu.Item key="1">
          <Link href="/sheets">
            <a>Sheets</a>
          </Link>
        </Menu.Item>
      )}
      {isLoggedIn && (
        <Menu.Item key="2">
          <Link href="/create">
            <a>Create sheet</a>
          </Link>
        </Menu.Item>
      )}
      {isLoggedIn && (
        <Menu.Item key="3">
          <a onClick={logout}>Log out</a>
        </Menu.Item>
      )}
    </Menu>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: (values) => {
    dispatch(userLogout(values));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Navigation);
