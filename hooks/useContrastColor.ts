export default () => {
  const checkContrast = (rgb: string) : string => {
    const rgbList = rgb
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((value) => parseInt(value));
    const luminance = 0.2126 * rgbList[0] + 0.7152 * rgbList[1] + 0.0722 * rgbList[2];
    const isDark = luminance < 128;
    return isDark ? "#fff": '#030303'
  }
  return {
    checkContrast
  }
}