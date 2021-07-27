const axios = require('axios');
import { AlimtalkClient } from '../../lib';

jest.mock('axios');

const to = '000';
const content = 'test message';
const plusFriendId = 'plusFriendId';
const alimtalkServiceId = 'alimtalkServiceId';
const secretKey = 'secretKey';
const accessKey = 'accessKey';

describe('AlimtalkClient', () => {
  let alimtalkClient: AlimtalkClient;

  beforeEach(() => axios.mockClear());

  beforeAll(() => {
    alimtalkClient = new AlimtalkClient({
      accessKey,
      secretKey,
      alimtalkServiceId,
      plusFriendId,
    });
  });

  test('create AlimtalkClient', () => {
    expect(
      () =>
        new AlimtalkClient({
          accessKey,
          secretKey,
          alimtalkServiceId,
          plusFriendId,
        })
    ).not.toThrow();
  });

  describe('send', () => {
    test('성공적으로 발송한다.', async () => {
      const axiosPostSpy = jest
        .spyOn(axios, 'post')
        .mockImplementationOnce(() =>
          Promise.resolve({
            status: 202,
            statusText: 'Accepted',
          })
        );

      await expect(
        alimtalkClient.send({
          templateCode: 'abc',
          messages: [
            {
              to,
              content,
            },
          ],
        })
      ).resolves.not.toThrow();
      expect(axiosPostSpy).toHaveBeenCalledTimes(1);
    });

    test('messages가 빈 배열이면 실패한다.', async () => {
      await expect(
        alimtalkClient.send({
          templateCode: 'abc',
          messages: [],
        })
      ).rejects.toThrow();
    });
  });
});
