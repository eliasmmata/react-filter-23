import React from 'react'

import { AppProps } from "next/app";
import Head from 'next/head';
import { PreviousPathProvider } from '../components/PreviousPathContext';

import '../styles/main.scss';


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Test Frontend Mayoral</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PreviousPathProvider>
        <Component {...pageProps} />
      </PreviousPathProvider>
    </>
  );
};

export default MyApp;
