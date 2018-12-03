import { mergeObjects } from '../../helpers/js/generic';

function clickOut(css) {
  window.requestAnimationFrame(() => {
    document.body.parentElement.classList.toggle(css);
});
}

export function menu(settings) {

  const defaults = mergeObjects({
        css: 'expanded',
        open: '.ico-menu-open',
        close: '.ico-menu-close',
        overlay: '.overlay'
      }, settings);

  document.querySelector(defaults.open).addEventListener('click', () => {
    clickOut(defaults.css);
  });

  document.querySelector(defaults.close).addEventListener('click', () => {
    clickOut(defaults.css);
  });

  document.querySelector(defaults.overlay).addEventListener('click', () => {
    clickOut(defaults.css);
  });
}