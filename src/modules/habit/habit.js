import { v4 as uuidv4 } from 'uuid';
import { parseISO, compareAsc } from 'date-fns';

const defaultHabit = {
  title: '',
  description: '',
  dates: [],
  color: '#000000',
};

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

class Habit {
  constructor(habit = defaultHabit) {
    this.id = uuidv4();
    this.set(habit);
  }

  set(habit = defaultHabit) {
    this.title = habit.title ?? defaultHabit.title;
    this.description = habit.description ?? defaultHabit.description;
    this.dates = habit.dates ?? defaultHabit.dates;
    this.color = habit.color ?? defaultHabit.color;

    return this;
  }

  getObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dates: this.dates,
      color: this.color,
    };
  }

  getDateScoreMap() {
    const parsedDates = this.dates.map(date => parseISO(date));
    const sortedDates = parsedDates.sort(compareAsc);

    const list = sortedDates.map((date, index) => ({
      date: date,
      score: calculateScore(index),
    }));
    const scores = list.map(s => s.score);
    const percent = scores[scores.length - 1];

    return {
      list,
      scores,
      percent,
    };
  }
}

export default Habit;
