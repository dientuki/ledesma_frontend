/* eslint-disable no-new */
import Lazyload from './modules/lazyload/js/lazyload';
import { menu } from './modules/menu/js/menu';
import Sticky from './modules/sticky/js/stickyHeader';
import Locations from './modules/locations/js/locations';

if (document.body.classList.contains('home')) {
  new Sticky();
}

Lazyload.init();
menu({
  css: 'expanded',
  open: '.ico-menu-open',
  close: '.ico-menu-close',
  overlay: '.overlay'
});


new Locations();