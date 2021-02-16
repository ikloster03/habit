const HABITS = 'habits';

class HabitList {
  constructor(habits) {
    this.set(habits);
  }

  set(habits) {
    this.habits = habits ?? [];

    return this;
  }

  get list() {
    return this.habits;
  }

  string() {
    return JSON.stringify(this.habits);
  }

  getById(habitId) {
    const habitIndex = this.habits.findIndex(h => h.id === habitId);

    return this.habits[habitIndex];
  }

  add(habit) {
    this.habits.push(habit);

    return this;
  }

  remove(habitId) {
    const habitIndex = this.habits.findIndex(h => h.id === habitId);

    if (habitIndex !== -1) {
      this.habits.splice(habitIndex, 1);
    }

    return habitIndex;
  }

  reset() {
    this.habits = [];

    return this;
  }

  store() {
    localStorage.setItem(HABITS, JSON.stringify(this.habits));

    return this;
  }

  restore() {
    const strHabits = localStorage.getItem(HABITS);
    this.habits = strHabits ? JSON.parse(strHabits) : [];

    return this;
  }
}

export default HabitList;
