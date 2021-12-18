import { ReactElement, useMemo } from "react";
import styles from "./square.module.scss";
import { grid } from "../../grid";
import { WHITE } from "../../colours";

function Square(props: SquareProps): ReactElement {
  const colors = useMemo(() => {
    const { x, y } = props.grid;
    let dark = "grey";
    let light = "white";
    let highlight = "black";
    if (props.squareTheme) {
      dark = props.squareTheme.dark;
      light = props.squareTheme.light;
      highlight = props.squareTheme.highlight;
    }
    return x % 2 === 0
      ? y % 2 === 0
        ? { background: dark, color: light, highlight }
        : { background: light, color: dark, highlight }
      : y % 2 === 0
      ? { background: light, color: dark, highlight }
      : { background: dark, color: light, highlight };
  }, [props.squareTheme]);
  const showX: boolean = useMemo(() => {
    if (props.playerColour === WHITE) {
      return props.grid.y === 0;
    }
    return props.grid.y === 7;
  }, [props.playerColour]);
  const showY: boolean = useMemo(() => {
    if (props.playerColour === WHITE) {
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
        border: props.selected ? `5px solid ${colors.highlight}` : "none",
      }}
      onClick={() => {
        props.onClick(props.grid);
      }}
    >
      {showY && <span className={styles.y}>{props.grid.y + 1}</span>}
      {showX && (
        <span className={styles.x}>{props.grid.xLetter.toLowerCase()}</span>
      )}
      {props.piece}
    </div>
  );
}

interface SquareProps {
  grid: grid;
  style: any;
  squareTheme?: SquareTheme;
  playerColour: symbol;
  piece?: ReactElement;
  onClick: Function;
  selected?: boolean;
}

export interface SquareTheme {
  dark: string;
  light: string;
  highlight: string;
}

export default Square;
