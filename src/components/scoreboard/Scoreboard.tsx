import styles from "./Scoreboard.module.scss";
import Typography from "@mui/material/Typography";
import { I18nCopy } from "../../types/app";
import { GameScores } from "../../types/game";

interface ScoreboardProps {
  copy: I18nCopy;
  human: GameScores;
  computer: GameScores;
}

interface ScoreboardSectionProps {
  title: string;
  copy: I18nCopy;
  scores: GameScores;
}

const ScoreboardSection = (props: ScoreboardSectionProps) => (
  <div className={styles["Scoreboard__section"]}>
    <Typography variant="h4" component="h2">
      {props.title}
    </Typography>
    <div>
      {props.copy.wins}: {props.scores.wins}
    </div>
    <div>
      {props.copy.losses}: {props.scores.losses}
    </div>
    <div>
      {props.copy.draws}: {props.scores.draws}
    </div>
  </div>
);

const Scoreboard = (props: ScoreboardProps) => (
  <div className={styles["Scoreboard"]}>
    <ScoreboardSection
      title={props.copy.player}
      copy={props.copy}
      scores={props.human}
    />
    <ScoreboardSection
      title={props.copy.computer}
      copy={props.copy}
      scores={props.computer}
    />
  </div>
);

export default Scoreboard;
