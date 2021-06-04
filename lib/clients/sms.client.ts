import axios from 'axios';
import { URL } from 'url';

import {
  SmsMessageRequest,
  SmsMessageRequestResponse,
  SmsOptions,
  SmsSendParams,
} from '../interfaces/';
import { SensClient } from './sens.client';

export class SmsClient extends SensClient {
  protected readonly options: SmsOptions;
  constructor(input: Omit<SmsOptions, 'secretKey'>) {
    super({ ...input, secretKey: input.smsSecretKey });

    this.baseUrl += `/sms/v2/services/${input.smsServiceId}`;
  }

  /**
   *
   * SMS를 보내는 함수
   *
   * @param recivers 수신 번호 배열
   * @param content 전달할 내용
   * @param countryCode 국가 코드 (default 82)
   *
   * @returns Promise with success(boolean), msg(string), status(number)
   *
   */
  public async send({
    to,
    content,
    countryCode = '82',
  }: SmsSendParams): Promise<SmsMessageRequestResponse> {
    const { callingNumber: from } = this.options;

    const method = 'POST';
    const url = this.baseUrl + '/messages';

    const headers = this.getHeaders(method, new URL(url).pathname);

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
