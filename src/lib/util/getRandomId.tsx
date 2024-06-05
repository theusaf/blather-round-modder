import { v4 as uuidv4 } from "uuid";

/**
 * Generates a random ID.
 *
 * @returns A random UUID.
 */
export function getRandomId(): string {
  return uuidv4();
}
