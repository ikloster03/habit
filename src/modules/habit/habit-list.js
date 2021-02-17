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

    if (habitIndex === -1) {
      return null;
    }

    return this.habits[habitIndex];
  }

  updateById(habitId, habit) {
    const habitIndex = this.habits.findIndex(h => h.id === habitId);
    this.habits[habitIndex] = { ...habit };

    return this;
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

    return this;
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

    if (strHabits) {
      this.habits = JSON.parse(strHabits);
    } else {
      this.habits = [];
      this.store();
    }

    return this;
  }
}

export default HabitList;
