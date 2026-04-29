import { formatDate } from "@arkyn/shared";

class FormatDateAdapter {
  static format(date: Date, utc: number): string {
    date.setHours(date.getHours() + utc);
    return formatDate(
      date.toISOString().split("T"),
      "timestamp",
      "MM-DD-YYYY at hh:mm:ss",
    );
  }

  static formatToCustomType(date: Date, format: string): string {
    return formatDate(date.toISOString().split("T"), "isoDate", format);
  }
}

export { FormatDateAdapter };
