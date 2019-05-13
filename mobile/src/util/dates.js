import { Platform } from "react-native";

export function getLocaleDateString(date) {
  if (Platform.OS === "ios")
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  else {
    const dayOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    const timeID = utc + 3600000 * 7;
    const dateID = new Date(timeID);

    return (
      dayOfWeek[dateID.getDay() - 1] +
      ", " +
      monthName[dateID.getMonth()] +
      " " +
      dateID.getDate() +
      ", " +
      dateID.getFullYear()
    );
  }
}
