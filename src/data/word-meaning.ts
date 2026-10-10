/** Explicit semantic aliases; identical characters alone never establish the same sense. */
export function wordMeaning(value: string) {
  const first = value.toLowerCase().split(";")[0].trim().replace(/^to /, "");
  return first === "rice" ? "uncooked rice" : first;
}
