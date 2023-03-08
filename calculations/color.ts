import IColor from "../models/IColor";
import colorData from "../assets/colorData";

export const getRandomColor = (oldColor?: IColor) => {
  let randomIndex = Math.floor(Math.random() * colorData.length);
  while (oldColor && oldColor === colorData[randomIndex]) {
    randomIndex = Math.floor(Math.random() * colorData.length);
  }
  return colorData[randomIndex];
};
