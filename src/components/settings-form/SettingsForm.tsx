import React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import {
  ButtonFormControl,
  ActionButtonData,
} from "./form-controls/ButtonFormControl";
import {
  SelectFormControl,
  SelectFormControlData,
} from "./form-controls/SelectFormControl";

import { I18nCopy } from "../../types/app";

import styles from "./SettingsForm.module.scss";

export interface SettingsFormProps {
  copy: I18nCopy;
  selectFormControls: SelectFormControlData[];
  actionButtons: ActionButtonData[];
}

const SettingsForm = (props: SettingsFormProps) => (
  <form className={styles["SettingsForm"]} noValidate autoComplete="off">
    <div className={styles["SettingsForm__selects"]}>
      {props.selectFormControls.map((control) => (
        <SelectFormControl {...control} />
      ))}
    </div>
    <div className={styles["SettingsForm__actions"]}>
      {props.actionButtons.map((actionButton) => (
        <ButtonFormControl {...actionButton} />
      ))}
    </div>
    <div className={styles["SettingsForm__controls"]}>
      <Button type="submit" color="secondary" component={Link} to={"/"}>
        {props.copy.done}
      </Button>
    </div>
  </form>
);

export default SettingsForm;
