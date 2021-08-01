import {greet} from './greet';

describe('greet', () => {
  it('should print greeting', () => {
    expect(greet('John Doe')).toBe('Hello, John Doe!');
  });
});
