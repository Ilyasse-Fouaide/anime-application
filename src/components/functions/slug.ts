export function slug(title: string): string {
  return title.replace("/", " ").replace(":", " ").replace("-", "").split(" ").join("-").replace("--", "-")
}