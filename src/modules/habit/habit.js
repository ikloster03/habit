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

  get id() {
    return this.id;
  }

  get title() {
    return this.title;
  }
  get description() {
    return this.description;
  }
  get dates() {
    return this.dates;
  }
  get color() {
    return this.color;
  }

  set title(title) {
    this.title = title;
  }
  set description(description) {
    this.description = description;
  }
  set dates(dates) {
    this.dates = dates;
  }
  set color(color) {
    this.color = color;
  }
}

export default Habit;
