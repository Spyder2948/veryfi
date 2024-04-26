import React from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {

  const homepageLayout = Component.getLayout || ((page) => page);

  return homepageLayout(<Component {...pageProps} />);
}
