import React, { useState, MouseEvent } from "react";
import Button from "@mui/material/Button";

import { I18nCopy } from "../../../types/app";

export interface ActionButtonData {
  key: string;
  copy: I18nCopy;
  onClick: (e: MouseEvent) => Promise<void>;
  loadingText?: string;
}

export const ButtonFormControl = (item: ActionButtonData) => {
  const [loading, setLoading] = useState(false);

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await item.onClick(e);
    } finally {
      setLoading(false);
    }
  };

  const loadingText = item.loadingText || "⏳";

  return (
    <Button onClick={onClick} type="submit" color="primary" variant="contained">
      {item.copy.label} {loading ? loadingText : ""}
    </Button>
  );
};
