import Head from 'next/head'
import Image from 'next/image'
import Dashboard from '../components/dashboard/dashboard';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
    <Dashboard/>
    </div>
  )
}
