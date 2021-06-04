import { SensOptions } from './sens.interface';
import { SmsMessageRequest } from './sms.interface';

export type AlimtalkOptions = SensOptions & {
  /** 프로젝트 등록 시 발급받은 서비스 아이디 */
  alimtalkServiceId: string;

  /** 플러스친구 아이디 */
  plusFriendId: string;
};

export type AlimtalkFailOver = {
  /** SMS Failover 서비스 아이디 */
  smsServiceId?: string;

  /** SMS Failover 발송 요청 아이디 */
  requestId?: string;

  /** SMS Failover 발송 요청 상태 코드 (202 - 성공, 그외 - 실패) * HTTP Status 규격을 따름 */
  requestStatusCode?: string;

  /** SMS Failover 발송 요청 상태명 */
  requestStatusName?: 'success' | 'fail';

  /** SMS Failover 발송 요청 상태 내용 */
  requestStatusDesc?: string;

  /** SMS Failover 발송 메시지 아이디 */
  messageId?: string;

  /** SMS Failover 발송 처리 상태 */
  messageStatus?: 'READY' | 'PROCESSING' | 'COMPLETED';

  /** SMS Failover 발송 단말 수신 상태 결과 코드 (참고: https://api.ncloud-docs.com/docs/ai-application-service-sens-alimtalkv2#Failover%EC%9A%94%EC%B2%AD%EC%83%81%ED%83%9C%EC%BD%94%EB%93%9C) */
  messageStatusCode?: string;

  /** SMS Failover 발송 단말 수신 결과명 */
  messageStatusName?: string;

  /** SMS Failover 발송 단말 수신 내용 */
  messageStatusDesc?: string;
};

export type AlimtalkMessage = {
  /** 메시지 아이디 (uuid) */
  messageId: string;

  /** uuid */
  requestId: string;

  /** 발송 요청 시간 */
  requestTime: Date;

  /** 발송 리포트(처리 완료) 시간 */
  completeTime?: Date;

  /** 카카오톡 채널명 ((구)플러스친구 아이디) */
  plusFriendId: string;

  /** 템플릿 코드 */
  templateCode: string;

  /** 수신자 국가번호 */
  countryCode?: string;

  /** 수신자번호 */
  to: string;

  /** 메시지 내용 */
  content: string;

  /** 발송요청 상태 코드 (A000 - 성공, 그외 코드 - 실패) */
  requestStatusCode: string;

  /** 발송요청 상태명 */
  requestStatusName: 'success' | 'fail';

  /** 발송요청 상태 내용 */
  requestStatusDesc: string;

  /** 발송결과 상태 코드 (0000 - 성공, 그외 코드 - 실패) */
  messageStatusCode: string;

  /** 발송결과 상태명 */
  messageStatusName: 'success' | 'processing' | 'fail';

  /** 발송결과 상태 내용 */
  messageStatusDesc: string;

  /** SMS Failover 사용 여부. Failover가 설정된 카카오톡 채널에서만 사용 가능
    - @default 카카오톡 채널의 Failover 설정 여부를 따름 */
  useSmsFailover: boolean;

  failover?: AlimtalkFailOver;
};

export type AlimtalkMessageResponse = Pick<
  AlimtalkMessage,
  'requestId' | 'requestTime'
> & {
  messages: Pick<
    AlimtalkMessage,
    | 'messageId'
    | 'requestStatusCode'
    | 'requestStatusName'
    | 'requestStatusDesc'
    | 'useSmsFailover'
  >[];
};

export enum AlimtalkButtonType {
  /** 배송조회 */
  DS = 'DS',
  /** 웹 링크 (linkMobile, linkPc 필요) */
  WL = 'WL',
  /** 앱 링크 (schemeIos, schemeAndroid 필요) */
  AL = 'AL',
  /** 봇 키워드 */
  BK = 'BK',
  /** 메시지 전달 */
  MD = 'MD',
  /** 채널 추가 (버튼 명은 "채널추가"로 고정) */
  AC = 'AC',
}

export type AlimtalkMessageRequest = Pick<
  AlimtalkMessage,
  'templateCode' | 'plusFriendId'
> & {
  messages: Array<
    Pick<
      AlimtalkMessage,
      'countryCode' | 'to' | 'content' | 'useSmsFailover'
    > & {
      /** 알림톡 강조표시 내용 (강조표기 유형의 템플릿에서만 사용 가능) */
      title?: string;

      buttons?: Array<{
        /** 버튼 타입 */
        type: 'DS' | 'WL' | 'AL' | 'BK' | 'MD' | 'AC';

        /** 버튼명 */
        name: string;

        linkMobile?: string;
        linkPc?: string;
        schemeIos?: string;
        schemeAndroid?: string;
      }>;

      failoverConfig: Pick<SmsMessageRequest, 'from' | 'type'> & {
        /** 메시지 제목. (정의하지 않으면 기본 메시지 제목을 사용) */
        subject?: string;

        /** 메시지 컨텐츠 내용. (정의하지 않으면 기본 메시지 컨텐츠 내용을 사용) */
        content?: string;
      };
    }
  >;

  /** 등록하려는 스케줄 코드 */
  scheduleCode?: string;

  /** 예약시간 (yyyy-MM-dd HH:mm) */
  reserveTime?: string;

  /** 예약시간 타임존 (Area/Name. IANA time zone database) 
   - @default: Asia/Seoul */
  reserveTimeZone?: string;
};
