import { mergeObjects } from '../../helpers/js/generic';
import { validateSettings } from '../../helpers/js/validators';
import Vlz from 'vanilla-lazyload';

export default class Lazyload {

  static init(settings) {
    const defaults = {
        data_src: 'original',
        data_srcset: 'original-set',
        elements_selector: '.lzl'
      },
      valid = ['elements_selector', 'container', 'threshold', 'throttle', 'data_src', 'data_srcset',
        'class_loading', 'class_loaded', 'skip_invisible', 'callback_load', 'callback_error', 'callback_set',
        'callback_processed'];

    if (typeof settings !== 'undefined') {
      if (typeof settings !== 'object') {
        throw new Error('"settings"  must be a json.');
      }

      validateSettings(settings, valid);
    }

    return new Vlz(mergeObjects(defaults, settings));
  }

}