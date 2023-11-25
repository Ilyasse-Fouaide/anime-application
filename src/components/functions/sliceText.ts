export function sliceText(text: string, number: number): string {
  if (text?.length >= number) {
    return text.slice(0, number) + "...";
  } else {
    return text
  }
}