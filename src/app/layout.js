import { Inter } from 'next/font/google';
import './globals.css';
import ResponsiveMenu from './components/header/page';
import Footer from './components/footer/page';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: " Honey Shop",
  description: "Honey Shop",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/letter-n.png" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>

      <body className={inter.className}>
        <ResponsiveMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
