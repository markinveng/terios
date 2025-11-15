"use client"
import React, { useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // ログアウト処理をここに追加
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Terios</h1>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Goals</Link>
          <Link href="/search" className={styles.link}>Search</Link>
          <Link href="/donate" className={styles.link}>Donate</Link>
        </nav>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className={styles.button}>Logout</button>
          ) : (
            <>
              <button className={styles.button}>Sign Up</button>
              <button className={styles.button}>Login</button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;