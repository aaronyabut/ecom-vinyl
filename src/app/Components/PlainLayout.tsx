'use client';

import styles from '@/app/page.module.scss';

export default function PlainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className={`${styles.noScroll}`}>
      {children}
    </div>
  );
}