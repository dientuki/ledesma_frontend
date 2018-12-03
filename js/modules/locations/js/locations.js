import LocalStore from '../../helpers/js/localStorage';

export default class Locations {

  constructor(){

    let form = document.querySelector('form.wpcf7-form');

    if (form == null) {
      return;
    }

    let states = form.querySelector('select[name="provincias"]');

    this.locations = form.querySelector('select[name="localidades"]');
    this.ventas = form.querySelector('input[name="ventas"]') == null ? 0 : 1;

    if (states == null || this.locations == null) {
      return;
    }

    this.init = this.locations.innerHTML;

    this.endpoints = {
      'state': mainDomain + 'wp-json/credilArLocation/v1/provincias',
      'location': mainDomain + 'wp-json/credilArLocation/v1/localidades',
      'sales': mainDomain + 'wp-json/credilArLocation/v1/salesPoint'
    }

    const LS = new LocalStore({
      api: `${this.endpoints.state}?ventas=${this.ventas}`,
      key: `Credil_provincias_${this.ventas}`
    });

    LS.getData().then((response) => {
      let l = states.length;

      l = response.length;

      for (let i = 0; i < l; i++) {
        let myopt = document.createElement( 'option' );;
        myopt.value = myopt.text = response[i]
        states.add(myopt);
      }

      states.addEventListener('change', (e) => {
        this.onChangeLocation(e);
      });
    });
  }

  onChangeLocation(e) {

    let state = (e.target.selectedOptions[0].value).toLowerCase().replace(/\ /g, '-'),
        endopoint = this.ventas == 0 ? this.endpoints.location : this.endpoints.sales;

    const LS = new LocalStore({
      api: `${endopoint}/${state}`,
      key: `Credil_${state}_${this.ventas}`
    });

    LS.getData().then((response) => {
      let l = response.length;

      this.locations.innerHTML = this.init;

      for (let i = 0; i < l; i++) {
        let myopt = document.createElement( 'option' );
        myopt.value = myopt.text = response[i]
        this.locations.add(myopt);
      }
    });
  }
}