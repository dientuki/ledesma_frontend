import Generic  from '../js/generic.js';  // our module

describe('Generic helper', () => {

    let generic;

    beforeEach(() => {
        generic = new Generic();
    });

    test('should be and object', () => {
        expect(typeof generic).toBe('object');
    });

    describe('#merge_objets()', () => {
        test('should have a merge_objects Method', () =>{
            expect(typeof Generic.merge_objects).toBe('function');
        });

        test('mandatory default object', () => {
            expect(() => {
              Generic.merge_objects();
            }).toThrowError(Error);
        });

        test('args must be an object', () => {
            expect(() => {
              Generic.merge_objects(5, 'hola');
            }).toThrowError(Error);
        });

        test('args valid', () => {
            expect(() => {
              Generic.merge_objects({a:1,b:1}, {b:2,c:3});
            }).not.toThrowError(Error);
        });

        test('returns a merged object', () => {
            expect(Generic.merge_objects({a:1,b:1},{b:2,c:3})).toEqual({a:1,b:2,c:3});
        });

    });
});
