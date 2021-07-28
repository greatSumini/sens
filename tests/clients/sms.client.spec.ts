const axios = require('axios');
import { SmsClient } from '../../lib';

jest.mock('axios');

const to = '000';
const content = 'test message';
const accessKey = 'accessKey';
const secretKey = 'secretKey';
const callingNumber = 'callingnumber';
const smsServiceId = 'smsServiceId';

describe('SmsClient', () => {
  let smsClient: SmsClient;

  beforeEach(() => axios.mockClear());

  beforeAll(() => {
    smsClient = new SmsClient({
      accessKey,
      secretKey,
      smsServiceId,
      callingNumber,
    });
  });

  test('create SmsClient', () => {
    expect(
      () =>
        new SmsClient({
          accessKey,
          secretKey,
          smsServiceId,
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
    expect(axiosPostSpy).toHaveBeenCalledTimes(1);
  });
});
