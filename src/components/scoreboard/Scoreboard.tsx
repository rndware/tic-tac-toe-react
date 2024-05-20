import styles from "./Scoreboard.module.scss";
import Typography from "@mui/material/Typography";
import { I18nCopy } from "../../types/app";
import { GameScores } from "../../types/game";

interface PlayerDetail {
  title: string;
  scores: GameScores;
}

interface ScoreboardProps {
  copy: I18nCopy;
  playerDetails: Array<PlayerDetail>;
}

interface ScoreboardSectionProps {
  copy: I18nCopy;
  title: string;
  scores: GameScores;
}

const ScoreboardSection = (props: ScoreboardSectionProps) => (
  <div className={styles["Scoreboard__section"]}>
    <Typography className={styles["Section_title"]} variant="h4" component="h2">
      {props.title}
    </Typography>
    <div className={styles["Section_info"]}>
      {props.copy.wins}: {props.scores.wins}
    </div>
    <div className={styles["Section_info"]}>
      {props.copy.losses}: {props.scores.losses}
    </div>
    <div className={styles["Section_info"]}>
      {props.copy.draws}: {props.scores.draws}
    </div>
  </div>
);

const Scoreboard = (props: ScoreboardProps) => (
  <div className={styles["Scoreboard"]}>
    {props.playerDetails.map((playerInfo: PlayerDetail, index: number) => (
      <ScoreboardSection
        key={index}
        copy={props.copy}
        title={playerInfo.title}
        scores={playerInfo.scores}
      />
    ))}
  </div>
);

export default Scoreboard;
