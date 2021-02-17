import { v4 as uuidv4 } from 'uuid';

const defaultHabit = {
  title: '',
  description: '',
  dates: [],
  color: '#000000',
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
}

export default Habit;
