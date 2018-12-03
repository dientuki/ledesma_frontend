export function validateSettings(argument, valid) {
  let prop;

  for (prop in argument) {
    if (valid.indexOf(prop) === -1) {
      throw new Error(`${prop} option is invalid.`);
    }
  }
}

export function isIterable(obj) {
  // checks for null and undefined
  if (obj === null || obj === undefined) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}