import { ReactElement, ReactNode, useMemo } from "react";
import styles from "./square.module.scss";
import { grid } from "../../grid";

function Square(props: SquareProps): ReactElement {
  const colors = useMemo(() => {
    const { x, y } = props.grid;
    let dark = "grey";
    let light = "white";
    if (props.squareTheme) {
      dark = props.squareTheme.dark;
      light = props.squareTheme.light;
    }
    return x % 2 === 0
      ? y % 2 === 0
        ? { background: dark, color: light }
        : { background: light, color: dark }
      : y % 2 === 0
      ? { background: light, color: dark }
      : { background: dark, color: light };
  }, [props.squareTheme]);
  const squareCoord: string = useMemo(() => {
    return `${props.grid.xLetter}${props.grid.y + 1}`;
  }, [props.grid]);
  const showX: boolean = useMemo(() => {
    if (props.playerColour === "white") {
      return props.grid.y === 0;
    }
    return props.grid.y === 7;
  }, [props.playerColour]);
  const showY: boolean = useMemo(() => {
    if (props.playerColour === "white") {
      return props.grid.x === 0;
    }
    return props.grid.x === 7;
  }, [props.playerColour]);

  return (
    <div
      className={styles.square}
      id={`${props.grid.xLetter}${props.grid.y + 1}`}
      style={{
        ...props.style,
        backgroundColor: colors.background,
        color: colors.color,
      }}
      onClick={() => {
        console.log(squareCoord, props.grid, "piece", props.piece);
      }}
    >
      {showY && <span className={styles.y}>{props.grid.y + 1}</span>}
      {showX && (
        <span className={styles.x}>{props.grid.xLetter.toLowerCase()}</span>
      )}
      {props.piece && <span>{props.piece}</span>}
    </div>
  );
}

interface SquareProps {
  grid: grid;
  style: any;
  squareTheme?: SquareTheme;
  playerColour: string;
  piece?: ReactNode;
}

interface SquareTheme {
  dark: string;
  light: string;
}

export default Square;
