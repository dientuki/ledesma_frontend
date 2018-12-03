import Lazyload from '../js/lazyload.js';
//let Lazyload = require('../js/lazyload.js');  // our module

describe('Lazyload middleware', () => {
    describe('#init()', () => {

        test('use no json', () => {
            expect(() => {
                Lazyload.init();
            }).not.toThrowError(Error);
        });

        test('only accepts a json', () => {
            expect(() => {
                Lazyload.init(58);
            }).toThrowError(Error);
        });

        test('only accepts a json with valid keys', () => {
            expect(() => {
                Lazyload.init({test:'fails'});
            }).toThrowError(Error);
        });

        test('json with valid keys', () => {
            expect(() => {
                Lazyload.init({throttle: 150});
            }).not.toThrowError(Error);
        });
    });
});
