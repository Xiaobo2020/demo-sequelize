export const validString = (v?: string) => {
  if (typeof v !== "string") return false;
  if (!v) return false;
  return true;
};

export const validNumber = (v?: number) => {
  if (typeof v !== "number") return false;
  if (!v) return false;
  return true;
};
