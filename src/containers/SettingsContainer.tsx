import React, { useMemo } from "react";
import SettingsForm from "../components/settings-form";
import { useFormControls } from "../hooks/useFormControls";
import { enabledSettings } from "../const/config";

const SettingsContainer = () => {
  const { selectFormControls, actionButtons, settingsCopy } = useFormControls();

  const enabledSelects = useMemo(
    () =>
      selectFormControls.filter((item) => enabledSettings.includes(item.key)),
    [selectFormControls],
  );

  const enabledActions = useMemo(
    () => actionButtons.filter((item) => enabledSettings.includes(item.key)),
    [actionButtons],
  );

  return (
    <SettingsForm
      selectFormControls={enabledSelects}
      actionButtons={enabledActions}
      copy={settingsCopy}
    />
  );
};

export default SettingsContainer;
