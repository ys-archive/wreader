import * as Font from "expo-font";

// https://noonnu.cc/font_page/733
export const fonts = {
  regular: "GowunBatang-Regular",
  bold: "GowunBatang-Bold",
};

export const loadFontsAsync = async () => {
  return await Font.loadAsync({
    "GowunBatang-Regular": require("!fonts/GowunBatang-Regular.ttf"),
    "GowunBatang-Bold": require("!fonts/GowunBatang-Bold.ttf"),
  });
};
