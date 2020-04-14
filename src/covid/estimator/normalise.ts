function getDays(periodType: string, timeToElapse: number): number {
  let days = 0;
  if (periodType === "days") {
    days = timeToElapse;
  }
  if (periodType === "weeks") {
    days = timeToElapse * 7;
  }
  if (periodType === "months") {
    days = (timeToElapse * 30);
  }
  return days;
}

export default getDays;
