export function clearText(text) {
  return text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}