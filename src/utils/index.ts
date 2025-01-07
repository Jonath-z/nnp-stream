import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDuration = (time: number) => {
  let totalSeconds = Math.floor(time);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  const formatH = hours > 0 ? `${hours < 10 ? "0" + hours : hours} h` : "";
  const formatM = minutes > 0 ? `${minutes < 10 ? "0" + minutes : minutes} m` : "";

  // Optional: You can format seconds if needed
  const formatS = seconds > 0 ? `${seconds < 10 ? "0" + seconds : seconds} s` : "";

  const format = formatH + " " + formatM;
  return format.trim();
};
