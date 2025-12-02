"use client"
import React, { useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { appStrings } from "@terios/ui-config";

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
          <Link href="/" className={styles.link}>{appStrings.header.goals}</Link>
          <Link href="/notification" className={styles.link}>{appStrings.header.notification}</Link>
          <Link href="/search" className={styles.link}>{appStrings.header.search}</Link>
          <Link href="/topics" className={styles.link}>{appStrings.header.topics}</Link>
          <Link href="/profile" className={styles.link}>{appStrings.header.profile}</Link>
          <Link href="/setting" className={styles.link}>{appStrings.header.setting}</Link>
        </nav>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className={styles.button}>{appStrings.header.logout}</button>
          ) : (
            <>
              <button className={styles.button}>{appStrings.header.signUp}</button>
              <button className={styles.button}>{appStrings.header.login}</button>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;