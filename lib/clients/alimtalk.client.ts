import axios from 'axios';
import { URL } from 'url';

import {
  AlimtalkMessageRequest,
  AlimtalkMessageResponse,
  AlimtalkOptions,
} from '../interfaces/';
import { SensClient } from './sens.client';

export class AlimtalkClient extends SensClient {
  constructor(protected readonly options: AlimtalkOptions) {
    super(options);

    this.baseUrl += `/alimtalk/v2/services/${options.alimtalkServiceId}`;
  }

  /** 알림톡(비즈메시지)를 발송합니다.
   - 내용(content), 버튼(buttons)는 등록 및 검수 완료된 템플릿 규격에 맞추어 입력해야 합니다.
   - 템플릿 규격에 맞지 않는 메시지 발송 요청 시, 메시지 발송에 실패합니다.
   - reserveTime, scheduleCode를 모두 요청하는 경우 예약 발송으로 처리됩니다. (예약발송이 우선순위가 높음)
   - SMS Failover는 알림톡 수신 결과 코드 기준, 성공이 아닌 경우 동작합니다. */
  public async send({
    templateCode,
    messages,
  }: Omit<
    AlimtalkMessageRequest,
    'plusFriendId'
  >): Promise<AlimtalkMessageResponse> {
    if (messages.length === 0) {
      throw new Error('1개 이상의 message를 입력해주세요.');
    }

    const { plusFriendId } = this.options;

    const method = 'POST';
    const url = this.baseUrl + '/messages';

    const headers = this.getHeaders(method, new URL(url).pathname);

    const data: AlimtalkMessageRequest = {
      plusFriendId,
      templateCode,
      messages,
    };

    const response = await axios.post<AlimtalkMessageResponse>(url, data, {
      headers,
    });

    return response.data;
  }
}
