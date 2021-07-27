import axios from 'axios';
import { URL } from 'url';

import {
  SmsMessageRequest,
  SmsMessageRequestResponse,
  SmsOptions,
  SmsSendParams,
} from '../interfaces/';

import { BaseSensClient } from './base.client';

export class SmsClient extends BaseSensClient {
  constructor(protected readonly options: SmsOptions) {
    super();
    options.secretKey = options.smsSecretKey;

    this.baseUrl += `/sms/v2/services/${options.smsServiceId}`;
  }

  public async send({
    to,
    content,
    countryCode = '82',
  }: SmsSendParams): Promise<SmsMessageRequestResponse> {
    const { callingNumber: from } = this.options;

    const method = 'POST';
    const url = this.baseUrl + '/messages';

    const headers = this.createHeaders(method, new URL(url).pathname);

    const data: SmsMessageRequest = {
      type: 'SMS',
      contentType: 'COMM',
      countryCode,
      from,
      content,
      messages: [].concat(to).map((to) => ({ to })),
    };

    const response = await axios.post<SmsMessageRequestResponse>(url, data, {
      headers,
    });

    return response.data;
  }
}
