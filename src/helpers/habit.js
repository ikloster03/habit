import { parseISO, compareAsc } from 'date-fns';

const calculateScore = index => {
  if (index >= 0 && index <= 30) {
    return index * 2;
  } else if (index > 30 && index <= 60) {
    return index - 30 + 60;
  } else if (index > 60 && index <= 100) {
    return (1 / 3) * (index - 60) + 90;
  }

  return -1;
};

const getHabitDateScoreMap = dates => {
  const parsedDates = dates.map(date => parseISO(date));
  const sortedDates = parsedDates.sort(compareAsc);

  return sortedDates.map((date, index) => ({
    // date: format(date, 'MM dd'),
    date: date,
    score: calculateScore(index + 1),
  }));
};

export default getHabitDateScoreMap;
