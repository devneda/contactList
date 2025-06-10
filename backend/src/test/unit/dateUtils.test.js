const expect = require('chai').expect;
const {getDays, getDaysFromNow} = require('../../dateutils');

beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-10'));
});

afterAll(() => {
    jest.useRealTimers();
});

describe('dateUtils', () => {
    it('getDaysFromNow', () => {
        let days = getDaysFromNow(new Date('2025-06-09'));
        expect(days).equal(1);

        days = getDaysFromNow(new Date('2025-05-10'));
        expect(days).equal(31);
    });

    it('getDays', () => {
        let days = getDays(new Date('2025-01-12'), new Date('2025-01-15'));
        expect(days).equal(3);

        days = getDays(new Date('2024-01-01'), new Date('2025-01-01'));
        expect(days).equal(366);
    });
});