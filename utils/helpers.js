export function toTitleCase (str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function stripSpaces(str) {
  return str.replace(new RegExp(' ', 'g'), '');
}

export function deckIndex(title) {
  return stripSpaces(toTitleCase(title))
}
