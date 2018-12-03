/* eslint-disable prefer-const */
export function mergeObjects(defaults, custom) {
  if (typeof defaults === 'undefined') {
    throw new Error('"defaults" object must be given');
  }
  if (typeof defaults !== 'object' || (typeof custom !== 'undefined' && typeof custom !== 'object')) {
    throw new Error('Args must be an object');
  }

  let final = {},
    propertyName;

  for (propertyName in defaults) {
    final[propertyName] = defaults[propertyName];
  }

  for (propertyName in custom) {
    final[propertyName] = custom[propertyName];
  }

  return final;
}
/* eslint-enable prefer-const */

export function setAttributes(el, attrs) {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

/* eslint-disable no-console */
// It's a safely console.log, because the bears roar
export function roar(...args) {
  if (typeof console !== undefined) {
    console.log(args.join('\n'));

    if (window.location.host.indexOf('master') === 0) {
      console.trace();
    }
  }
}
/* eslint-enable no-console*/