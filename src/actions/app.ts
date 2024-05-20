export function appReset(payload: { excludeReducers: string[] }) {
  return {
    type: "app/reset",
    payload,
  };
}
