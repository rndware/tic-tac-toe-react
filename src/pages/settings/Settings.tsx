import React from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import SettingsContainer from "../../containers/SettingsContainer";

import styles from "./SettingsPage.module.scss";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <div className="SettingsPage">
      <Typography
        className={styles.SettingsPage__title}
        variant="h3"
        component="h3"
      >
        {t("settingsPage.title")}
      </Typography>
      <div className={styles.SettingsPage__content}>
        <SettingsContainer />
      </div>
    </div>
  );
};

export default Settings;
