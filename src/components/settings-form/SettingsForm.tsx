import React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { I18nCopy } from "../../types/app";

import styles from "./SettingsForm.module.scss";

interface EnumMap {
  [key: string]: string;
}

type Options = { [key: string]: string };

interface SettingsFormProps {
  copy: I18nCopy;
  formControls: FormControlData[];
}

const renderSelectOptions = (
  key: string,
  enumOptions: EnumMap,
  options: Options
) =>
  Object.keys(enumOptions).map((value: string) => (
    <MenuItem key={`${key}-options-item-${value}`} value={value}>
      {options[value.toString().toLowerCase()]}
    </MenuItem>
  ));

export interface FormControlData {
  key: string;
  copy: I18nCopy;
  value: string;
  enum: EnumMap;
  onChange: (e: SelectChangeEvent<string>) => void;
  options: Options;
}

const renderFormControls = (formControls: FormControlData[]) =>
  formControls.map((item: FormControlData) => (
    <div
      key={`form-control-item-${item.key}`}
      className={styles.SettingsForm__formControl}
    >
      <FormControl>
        <InputLabel id={`${item.key}-label`}>{item.copy.label}</InputLabel>
        <Select
          className={styles.Select}
          labelId={`${item.key}-label`}
          id={`${item.key}-select`}
          value={item.value}
          label={item.copy.label}
          onChange={item.onChange}
        >
          {renderSelectOptions(item.key, item.enum, item.options)}
        </Select>
      </FormControl>
    </div>
  ));

const SettingsForm = (props: SettingsFormProps) => (
  <form className={styles.SettingsForm} noValidate autoComplete="off">
    {renderFormControls(props.formControls)}
    <div className={styles.SettingsForm__controls}>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        component={Link}
        to={"/"}
      >
        {props.copy.done}
      </Button>
    </div>
  </form>
);

export default SettingsForm;
