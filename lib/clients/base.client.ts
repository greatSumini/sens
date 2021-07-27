import { createHmac } from 'crypto';

import { SensHeaders, SensOptions } from '../interfaces';

export abstract class BaseSensClient {
  protected baseUrl = 'https://sens.apigw.ntruss.com';
  protected abstract options: SensOptions;

  private createTimestamp = (now?: Date): string =>
    new Date(now).getTime().toString();

  private createSignature(
    method: 'GET' | 'POST',
    url: string,
    timestamp: string
  ): string {
    const { accessKey, secretKey } = this.options;
    1;

    const body = `${method} ${url}\n${timestamp}\n${accessKey}`;

    return createHmac('sha256', secretKey).update(body).digest('base64');
  }

  protected createHeaders(method: 'GET' | 'POST', url: string): SensHeaders {
    const timestamp = this.createTimestamp();

    return {
      'Content-Type': 'application/json; charset=UTF-8',
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-iam-access-key': this.options.accessKey,
      'x-ncp-apigw-signature-v2': this.createSignature(method, url, timestamp),
    };
  }
}
