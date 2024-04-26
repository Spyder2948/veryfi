import React from 'react';
import Head from 'next/head';
import Footer from './Footer';
import { Fira_Sans, Encode_Sans_Semi_Expanded } from 'next/font/google';
import Link from 'next/link';

const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['400','700']
});

const enco = Encode_Sans_Semi_Expanded({
  subsets: ['latin'],
  weight: ['400', '600', '700']
});


const LoginLayout = ({children}) => {
  return (
    <>
    <div className={fira.className}>
     <div className='login-layout'>

        <Head>
            <title>Veryfi</title>
        </Head>

        <header className='login-header'>
          <p className='logo'>
            <Link className={enco.className} href="/">VERYFI </Link>
          </p>
        </header>

        <main className='login-container'>
            {children}
        </main>

        <footer>
            <Footer />
        </footer>

      </div>
    </div>
    </>
  )
}

export default LoginLayout;