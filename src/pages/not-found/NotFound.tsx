import React from "react";

import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import StarBackground from "../../components/star-background";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="NotFoundPage">
      <StarBackground />
      <Typography variant="h3" component="h1">
        {t("notFoundPage.description")}
      </Typography>
    </div>
  );
};

export default NotFound;
