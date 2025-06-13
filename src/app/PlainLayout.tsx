'use client';

import styles from './page.module.scss';


export default function PlainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className={`${styles.noScroll}`}>
      {children}
      PlainLayout
    </div>
  );
}