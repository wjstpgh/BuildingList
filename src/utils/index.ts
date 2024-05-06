export const parseNum = (num: number) => {
  const numToStr = String(num);
  if (numToStr.length < 5) return numToStr;
  else if (numToStr.length < 9)
    return `${numToStr.slice(0, -4)}만${numToStr.slice(-4)}`;
  else
    return `${numToStr.slice(0, -8)}억${numToStr.slice(
      -8,
      -4
    )}만${numToStr.slice(-4)}`;
};
