import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import StarBackground from "../../components/star-background";
import styles from "./Intro.module.scss";

const Intro = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.IntroPage}>
      <StarBackground />
      <Typography
        className={styles.IntroPage__title}
        variant="h1"
        component="h1"
      >
        {t("introPage.title")}
      </Typography>
      <div className={styles.IntroPage__content}>
        <Typography className={styles.IntroPage__desc} component="p">
          {t("introPage.description")}
        </Typography>
        <div className={styles.IntroPage__buttonContainer}>
          <Button variant="contained" component={Link} to={"/game"}>
            {t("introPage.startGame")}
          </Button>
          <Button color="secondary" component={Link} to={"/settings"}>
            {t("introPage.options")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Intro);
