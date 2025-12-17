import { clsx, type ClassValue } from "clsx";

/**
 * Merges multiple class names or style identifiers into a single string.
 * In React Native, this is useful if using libraries like nativewind or tailwind-react-native-classnames.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
