import CHPATER from "../consts/ChaptersSetting.json";
import VERSE from "../consts/VersesSetting.json";
import getRandomNumber from "./getRandomNumber";

export const getChapterCounts = (range) => {
  let result = 5;
  CHPATER.map((item) => {
    let node = item.value.split("-").map((one) => +one);
    if (range > node[0] && range < node[1]) {
      let outrange = item.num.split("-").map((one) => +one);
      result = Math.min(range, getRandomNumber(outrange[0], outrange[1]));
    }
  });
  return result;
};

export const getVerseCounts = (range) => {
  let result = 5;
  VERSE.map((item) => {
    let node = item.value.split("-").map((one) => +one);
    if (range > node[0] && range < node[1]) {
      let outrange = item.num.split("-").map((one) => +one);
      result = Math.min(range, getRandomNumber(outrange[0], outrange[1]));
    }
  });
  return result;
};
