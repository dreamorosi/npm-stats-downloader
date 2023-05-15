import { describe, it, expect } from 'vitest';
import {
  getRequestPaths,
  getPrecedingWeekStartEndDates,
} from '../../src/utils';

describe('getRequestPaths', () => {
  it.each([{ type: 'point' }, { type: 'range' }])(
    'it creates the correct request path',
    async ({ type }) => {
      // Prepare
      const packages = ['@package/a', '@package/b'];
      const start = {
        date: new Date(),
        year: 2020,
        month: 1,
        day: 1,
      };
      const end = {
        date: new Date(),
        year: 2020,
        month: 1,
        day: 2,
      };

      // Act
      const paths = getRequestPaths(
        packages,
        start,
        end,
        type as 'point' | 'range'
      );

      // Assess
      expect(paths).toHaveLength(2);
      expect(paths[0]).toEqual(`/${type}/2020-1-1:2020-1-2/@package/a`);
      expect(paths[1]).toEqual(`/${type}/2020-1-1:2020-1-2/@package/b`);
    }
  );
});

describe('getPrecedingWeekStartEndDates', () => {
  it('returns the correct start and end dates', () => {
    // Prepare
    const date = new Date('2023-05-15');

    // Act
    const { start, end } = getPrecedingWeekStartEndDates(date);

    // Assess
    expect(start).toStrictEqual({
      date: new Date('2023-05-08'),
      year: 2023,
      month: 5,
      day: 8,
    });
    expect(end).toStrictEqual({
      date: new Date('2023-05-14'),
      year: 2023,
      month: 5,
      day: 14,
    });
  });
});
