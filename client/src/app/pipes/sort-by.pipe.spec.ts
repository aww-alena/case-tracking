import { SortByPipe } from './sort-by.pipe';

describe('sortBy', () => {
  it('create an instance', () => {
    const pipe = new SortByPipe();
    expect(pipe).toBeTruthy();
  });
});
