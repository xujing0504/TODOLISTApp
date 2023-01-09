export class Task {
  constructor({ title, description, startDate, endDate = "" }) {
    this.title = title;
    this.description = description;
    this.startDate = new Date(startDate);
    this.endDate = endDate ? new Date(endDate) : "";
  }

  get isCompleted() {
    if (this.endDate === "") {
      return false;
    }
    return this.endDate < new Date();
  }

  get startString() {
    return `${this.startDate.toLocaleDateString()} ${this.startDate.toLocaleTimeString()}`;
  }

  get endString() {
    return this.endDate
      ? `${this.endDate.toLocaleDateString()} ${this.endDate.toLocaleTimeString()}`
      : "";
  }
}
