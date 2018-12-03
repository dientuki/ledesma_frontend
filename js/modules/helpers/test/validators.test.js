import Validators  from '../js/validators.js';  // our module

describe('Validators', () => {

    let validator;

    beforeEach(() => {
      validator = new Validators();
    });

    test('should be and object', () => {
        expect(typeof validator).toBe('object');
    });
});
