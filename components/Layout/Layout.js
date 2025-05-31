import Head from 'next/head';
import styles from './Layout.module.css';

export default function Layout({ children, title = "Weather App" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="실시간 날씨 정보를 확인하세요" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </>
  );
}
