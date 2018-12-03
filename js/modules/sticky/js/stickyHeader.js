import { mergeObjects } from '../../helpers/js/generic';

export default class StickyHeader {

  constructor(settings) {

    const defaults = {
      css: 'is-fixed',
      element: '#header'
    }, event = () => {
      window.requestAnimationFrame(() => {
        this.onScroll();
      });
    };

    this.opts = mergeObjects(defaults, settings);
    this.top = document.querySelector(this.opts.element).offsetTop;

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1023) {
        document.addEventListener('scroll', event);

        window.requestAnimationFrame(() => {
          this.onScroll();
        });

      } else {
        document.removeEventListener('scroll', event);
      }
    });

    window.dispatchEvent(new Event('resize'));
  }

  onScroll() {
    let offset = window.pageYOffset;

    if (offset === undefined) {
      offset = document.documentElement.scrollTop;
    }

    this.isSticky = offset > this.top;

    if (this.isSticky !== document.body.classList.contains(this.opts.css)) {
      document.body.classList.toggle(this.opts.css);
    }
  }

}