export const getContrastColor = (hexcolor: string): string => {
  const hex = hexcolor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const [L1, L2, L3] = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );

  const luminance = 0.2126 * L1 + 0.7152 * L2 + 0.0722 * L3;

  return luminance > 0.185 ? "#000000" : "#FFFFFF";
};