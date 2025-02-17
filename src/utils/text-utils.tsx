export const countWithoutSpaces = (str: string) => {
  if (!str) return 0;
  return str.replace(/\s/g, "").length;
};
