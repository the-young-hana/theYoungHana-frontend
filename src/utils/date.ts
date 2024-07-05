export const currentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const currentTime2 = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const firstDayOfMonth = () => {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = "01";
  return `${year}-${month}-${day}`;
};

export const lastDayOfMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = new Date(year, month, 0).getDate();
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export const today = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

export const monthAgo = (date: Date, period: number) => {
  const calDate = new Date(date.setMonth(date.getMonth() - period));
  return `${calDate.getFullYear()}-${String(calDate.getMonth() + 1).padStart(2, "0")}-${String(calDate.getDate()).padStart(2, "0")}`;
};

export const dateToString = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export function dateTimeToString(date: Date): string {
  const dateFromat = new Date(date);
  const year = dateFromat.getFullYear();
  const month = String(dateFromat.getMonth() + 1).padStart(2, "0");
  const day = String(dateFromat.getDate()).padStart(2, "0");
  const hours = String(dateFromat.getHours()).padStart(2, "0");
  const minutes = String(dateFromat.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function agoConverter(publishedAt: string) {
  const publishedDate = new Date(publishedAt);
  const milliSecounds = new Date() - publishedDate;
  const seconds = milliSecounds / 1000;
  if (seconds < 60) {
    return "방금 전";
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)}분 전`;
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}시간 전`;
  }

  const days = hours / 24;
  if (days < 7) {
    return `${Math.floor(days)}일 전`;
  }

  const weeks = days / 7;
  if (weeks < 5) {
    return `${Math.floor(weeks)}주 전`;
  }

  const months = days / 30;
  if (months < 12) {
    return `${Math.floor(months)}달 전`;
  }

  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}
