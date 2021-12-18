import type { NextPage } from "next";
import Head from "next/head";
import Board from "../components/board/board";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Chess</title>
        <meta name="description" content="nextchess" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Board />

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
