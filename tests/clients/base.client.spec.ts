import * as faker from 'faker';

import { BaseSensClient, SensHeaders, SensOptions } from '../../lib';

// protected method를 test하기 위해 자식 class를 생성합니다.
class TestBaseClient extends BaseSensClient {
  constructor(protected readonly options: SensOptions) {
    super();
  }

  public testCreateHeaders(method: 'GET' | 'POST', url: string): SensHeaders {
    return super.createHeaders(method, url);
  }
}

describe('BaseSensClient', () => {
  const testOptions: SensOptions = {
    accessKey: faker.lorem.text(),
    secretKey: faker.lorem.text(),
  };

  test('constructor', () => {
    expect(() => new TestBaseClient(testOptions)).not.toThrow();
  });

  describe('createHeaders', () => {
    test('success!', () => {
      const testClient = new TestBaseClient(testOptions);
      const headers = testClient.testCreateHeaders('GET', 'http://example.com');
      expect(headers).toBeDefined();
      Object.keys(headers).forEach((key) => {
        expect(headers[key]).toBeTruthy();
      });
    });
  });
});
