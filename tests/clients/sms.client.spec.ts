const axios = require('axios');
import { SmsClient } from '../../lib';

jest.mock('axios');

const to = '000';
const content = 'test message';
const callingNumber = 'callingnumber';
const smsServiceId = 'smsServiceId';
const smsSecretKey = 'smsSecretKey';
const accessKey = 'accessKey';

describe('SmsClient', () => {
  let smsClient: SmsClient;

  beforeEach(() => axios.mockClear());

  beforeAll(() => {
    smsClient = new SmsClient({
      accessKey,
      smsServiceId,
      smsSecretKey,
      callingNumber,
    });
  });

  test('create SmsClient', () => {
    expect(
      () =>
        new SmsClient({
          accessKey,
          smsServiceId,
          smsSecretKey,
          callingNumber,
        })
    ).not.toThrow();
  });

  test('성공적으로 sms message를 발송한다.', async () => {
    const axiosPostSpy = jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.resolve({
        status: 202,
        statusText: 'Accepted',
      })
    );
    await expect(
      smsClient.send({
        to,
        content,
      })
    ).resolves.not.toThrow();
  });
});
