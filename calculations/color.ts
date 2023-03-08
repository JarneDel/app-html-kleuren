import IColor from "../models/IColor";
import colorData from "../assets/colorData";

export const getRandomColor = (oldColor?: IColor) => {
  let randomIndex = Math.floor(Math.random() * colorData.length);
  while (oldColor && oldColor === colorData[randomIndex]) {
    randomIndex = Math.floor(Math.random() * colorData.length);
  }
  return checkIfColorIsDark(colorData[randomIndex]);
};

export const checkIfColorIsDark = (color: IColor) => {
  const rgb = color.rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((value) => parseInt(value));
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  color.isDark = luminance < 128;
  return color;
}