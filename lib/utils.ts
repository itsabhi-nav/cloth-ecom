import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Whole-rupee mock pricing; P2 will switch to minor units from the DB. */
export const formatMoney = (rupees: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(rupees)}`;
