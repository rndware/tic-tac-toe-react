import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";

import { I18nCopy, EnumMap, Options } from "../../../types/app";

import styles from "../SettingsForm.module.scss";

export interface SelectFormControlData {
  key: string;
  copy: I18nCopy;
  value: string;
  enum: EnumMap;
  onChange: (e: SelectChangeEvent<string>) => void;
  options: Options;
}

const renderSelectOptions = (
  key: string,
  enumOptions: EnumMap,
  options: Options,
) =>
  Object.keys(enumOptions).map((value: string) => (
    <MenuItem key={`${key}-options-item-${value}`} value={value}>
      {options[value.toString().toLowerCase()]}
    </MenuItem>
  ));

export const SelectFormControl = (item: SelectFormControlData) => (
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
);
