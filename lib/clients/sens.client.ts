import { createHmac } from 'crypto';

import { SensHeaders, SensOptions } from '../interfaces/sens.interface';

export class SensClient {
  protected baseUrl = 'https://sens.apigw.ntruss.com';

  constructor(protected readonly options: SensOptions) {}

  private makeTimestamp = () => Date.now().toString();

  private makeSignature(
    method: 'GET' | 'POST',
    url: string,
    timestamp: string
  ): string {
    const { accessKey, secretKey } = this.options;

    const body = `${method} ${url}\n${timestamp}\n${accessKey}`;

    return createHmac('sha256', secretKey).update(body).digest('base64');
  }

  protected getHeaders(method: 'GET' | 'POST', url: string): SensHeaders {
    const timestamp = this.makeTimestamp();

    return {
      'Content-Type': 'application/json; charset=UTF-8',
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-iam-access-key': this.options.accessKey,
      'x-ncp-apigw-signature-v2': this.makeSignature(method, url, timestamp),
    };
  }
}
