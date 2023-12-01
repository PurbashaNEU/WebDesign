import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import {store} from '../redux/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';


export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
      import('bootstrap/dist/js/bootstrap');
    }, []);
  return (
    <Provider store={store}>
     <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  )
}
