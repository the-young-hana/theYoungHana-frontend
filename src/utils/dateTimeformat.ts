export function formatter(date: Date): string {
  const dateFromat = new Date(date);
  const year = dateFromat.getFullYear();
  const month = String(dateFromat.getMonth() + 1).padStart(2, "0");
  const day = String(dateFromat.getDate()).padStart(2, "0");
  const hours = String(dateFromat.getHours()).padStart(2, "0");
  const minutes = String(dateFromat.getMinutes()).padStart(2, "0");
  const seconds = String(dateFromat.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatter2(date: Date): string {
  const dateFromat = new Date(date);
  const year = dateFromat.getFullYear();
  const month = String(dateFromat.getMonth() + 1).padStart(2, "0");
  const day = String(dateFromat.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
