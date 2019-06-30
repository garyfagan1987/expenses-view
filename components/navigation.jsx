import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import { userLogout } from '../actions/user/logout';
import { getIsAuthenticated } from '../selectors/authenticate';
import { loginPath, registerPath, sheetsPath } from '../config/paths';
import messages from '../config/messages';

const Navigation = ({ isAuthenticated, logout }) => {
  const cookies = new Cookies();
  const isLoggedIn = typeof isAuthenticated !== 'undefined' ? isAuthenticated : !!cookies.get('token');
  const message = messages.navigation;

  return (
    <Menu
      mode="horizontal"
      style={{ lineHeight: '64px' }}
      theme="dark"
    >
      {!isLoggedIn && (
        <Menu.Item key="1">
          <Link href={loginPath}>
            <a>{message.items[0]}</a>
          </Link>
        </Menu.Item>
      )}
      {!isLoggedIn && (
        <Menu.Item key="2">
          <Link href={registerPath}>
            <a>{message.items[1]}</a>
          </Link>
        </Menu.Item>
      )}
      {isLoggedIn && (
        <Menu.Item key="3">
          <Link href={sheetsPath}>
            <a>{message.items[2]}</a>
          </Link>
        </Menu.Item>
      )}
      {isLoggedIn && (
        <Menu.Item key="4">
          <a onClick={logout}>{message.items[3]}</a>
        </Menu.Item>
      )}
    </Menu>
  );
};

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  isAuthenticated: undefined,
};

const mapDispatchToProps = dispatch => ({
  logout: (values) => {
    dispatch(userLogout(values));
  },
});

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
