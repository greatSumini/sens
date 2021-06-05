import { SmsClient, AlimtalkClient } from '../lib';

it('sample test', () => {
  expect(1 + 1).toEqual(2);
});

it('should be defined', () => {
  expect(SmsClient).toBeDefined();
  expect(AlimtalkClient).toBeDefined();
});
