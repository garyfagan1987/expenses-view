import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import Cookies from 'universal-cookie';

const Navigation = () => {
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
    </Menu>
  );
};

export default Navigation;
