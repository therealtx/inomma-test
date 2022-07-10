const getPercent = (min, max, value) => {
  const percent = ((value - min)/(max - min)) * 100;
  return isNaN(percent) ? 0 : percent;
};

export default getPercent;
