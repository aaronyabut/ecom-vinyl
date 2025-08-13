import type { Metadata } from 'next';
import '../globals.scss';
import PlainLayout from '../Components/PlainLayout';


export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Checkout page without navbar',
};

export default function PlainGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PlainLayout>{children}</PlainLayout>
  );
}