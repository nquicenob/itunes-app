import parseHTML from '../parse-html';
import fs from 'fs';
import path from 'path';

const file1 = fs.readFileSync(
  path.join(__dirname, './fixtures/example-1.html'),
  { encoding: 'utf-8' }
);
const file2 = fs.readFileSync(
  path.join(__dirname, './fixtures/example-2.html'),
  { encoding: 'utf-8' }
);
const file3 = fs.readFileSync(
  path.join(__dirname, './fixtures/example-3.html'),
  { encoding: 'utf-8' }
);
const file4 = fs.readFileSync(
  path.join(__dirname, './fixtures/example-4.html'),
  { encoding: 'utf-8' }
);

describe('parse-html', () => {
  it('Should be a function', () => expect(typeof parseHTML).toBe('function'));

  it('Should get the hydrate information as json from file1', () => {
    const result = parseHTML(file1);
    expect(result.MEDIA_API.token).toBe(
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNTYxNjU1NDcyLCJleHAiOjE1NzcyMDc0NzJ9.yYQ2N1WgDY0i_mK9rc6YsTcus-oEgcHLpu3U87NzJvrg9gD_T6I7aszzgnXQmX1R0UQVKtB4-jia-1'
    );
  });

  it('Should get the hydrate information as json from file2', () => {
    const result = parseHTML(file2);
    expect(result.MEDIA_API.token).toBe(
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNTYxNjU1NDcyLCJleHAiOjE1NzcyMDc0NzJ9.yYQ2N1WgDY0i_mK9rc6YsTcus-oEgcHLpu3U87NzJvrg9gD_T6I7aszzgnXQmX1R0UQVKtB4-jia-2'
    );
  });

  it('Should get the hydrate information as json from file3', () => {
    const result = parseHTML(file3);
    expect(result.MEDIA_API.token).toBe(
      'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldlYlBsYXlLaWQifQ.eyJpc3MiOiJBTVBXZWJQbGF5IiwiaWF0IjoxNTYxNjU1NDcyLCJleHAiOjE1NzcyMDc0NzJ9.yYQ2N1WgDY0i_mK9rc6YsTcus-oEgcHLpu3U87NzJvrg9gD_T6I7aszzgnXQmX1R0UQVKtB4-jia-3'
    );
  });

  it('Should not get the hydrate information as json from file4', () =>
    expect(() => parseHTML(file4)).toThrow());
});
