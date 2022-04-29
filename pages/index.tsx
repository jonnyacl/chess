import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { BLACK, WHITE } from '../colours';
import Board from '../components/board/board';
import { SquareTheme } from '../components/square/square';
import styles from '../styles/Chess.module.scss';

const Home: NextPage = () => {
  const [playerColour, setPlayerColour] = useState<symbol>(WHITE);
  const [theme, setTheme] = useState<SquareTheme>({
    dark: 'grey',
    light: 'white',
    highlight: 'black',
  });
  const toggleColour = useCallback(() => {
    if (playerColour === WHITE) {
      setPlayerColour(BLACK);
    } else {
      setPlayerColour(WHITE);
    }
  }, [playerColour]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Chess</title>
        <meta name="description" content="nextchess" />
        <link
          rel="icon"
          href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NSIgaGVpZ2h0PSI0NSI+PHBhdGggZD0iTTIyLjUgOWMtMi4yMSAwLTQgMS43OS00IDQgMCAuODkuMjkgMS43MS43OCAyLjM4QzE3LjMzIDE2LjUgMTYgMTguNTkgMTYgMjFjMCAyLjAzLjk0IDMuODQgMi40MSA1LjAzLTMgMS4wNi03LjQxIDUuNTUtNy40MSAxMy40N2gyM2MwLTcuOTItNC40MS0xMi40MS03LjQxLTEzLjQ3IDEuNDctMS4xOSAyLjQxLTMgMi40MS01LjAzIDAtMi40MS0xLjMzLTQuNS0zLjI4LTUuNjIuNDktLjY3Ljc4LTEuNDkuNzgtMi4zOCAwLTIuMjEtMS43OS00LTQtNHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg=="
        />
      </Head>
      <div className={styles.toggle}>
        <span className={styles.toggleColour}>White</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={playerColour === BLACK}
            onChange={toggleColour}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.toggleColour}>Black</span>
      </div>

      <Board playerColour={playerColour} theme={theme} />
    </div>
  );
};

export default Home;
