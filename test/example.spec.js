import { example } from '../src/example.js';

describe('example', () => {
  it('debería ser una función', () => {
    expect(typeof example).toBe('function');
  });
});
 //testing por objeto
test('asignacion de objeto', () => {
  const data = {uno: 1};
  data['dos'] = 2;
  expect(data).toEqual({uno: 1, dos: 2});
});