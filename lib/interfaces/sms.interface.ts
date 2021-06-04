import { SensOptions } from './sens.interface';

export type SmsOptions = SensOptions & {
  /** 프로젝트 등록 시 발급받은 서비스 아이디 */
  smsServiceId: string;

  /** Access Key Id와 맵핑되는 SecretKey */
  smsSecretKey: string;

  /** 등록된 발신 번호 */
  callingNumber: string;
};

export type SmsMessageType = 'SMS' | 'LMS' | 'MMS';

export type SmsMessageContentType = 'COMM' | 'AD';

export type SmsMessageStatus = 'READY' | 'PROCESSING' | 'COMPLETED';

export type SmsMessage = {
  /** 메시지 아이디 */
  messageId: string;

  /** 발신 번호 */
  from: string;

  /** 수신번호 */
  to: string;

  /** 메시지 컨텐츠 구분. (COMM: 일반메시지, AD: 광고메시지) */
  contentType: SmsMessageContentType;

  /** 국가번호 */
  countryCode: string;

  /** 요청 아이디 */
  requestId: string;

  /** 단말 수신 상태 결과 코드 */
  statusCode: string;

  /** 단말 수신 상태 결과명 */
  statusName: string;

  /** 단말 수신 상태 결과 메시지 */
  statusMessage: string;

  /** 발송 처리 상태. (READY: 대기, PROCESSING: 처리중, COMPLETED: 처리완료) */
  status: SmsMessageStatus;

  /** 발송 완료 시간 */
  completeTime: Date;

  /** 메시지 컨텐츠 내용 */
  content: string;

  /** 통신사코드 */
  telcoCode: string;
};

export type SmsMessageRequest = Pick<SmsMessage, 'from' | 'content'> &
  Partial<Pick<SmsMessage, 'countryCode' | 'contentType'>> & {
    /** 메시지 구분 (SMS, LMS, MMS) */
    type: SmsMessageType;

    messages: Array<{
      /** 수신 번호 */
      to: string;

      /** 메시지 제목. (정의하지 않으면 기본 메시지 제목을 사용) */
      subject?: string;

      /** 메시지 컨텐츠 내용. (정의하지 않으면 기본 메시지 컨텐츠 내용을 사용) */
      content?: string;
    }>;

    /** 기본 메시지 제목. (LMS, MMS에서만 사용가능) */
    subject?: string;

    /** 예약 발송 시간
 - pattern: ^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$ */
    reserveTime?: string;

    /** 예약 시간 시간대
     * @default "Asia/Seoul" */
    reserveTimeZone?: string;

    /** 발송할 스케줄 코드 */
    scheduleCode?: string;

    files?: Array<{
      /** 파일 이름. (jpg, jpeg 확장자를 가진 파일 이름) */
      name: string;

      /** 파일을 Base64로 인코딩한 값. */
      body: string;
    }>;
  };

export type SmsMessageRequestResponse = {
  /** 요청 아이디 */
  requestId: string;

  /** 요청 시간 */
  requestTime: Date;

  /** 발송 요청 상태 코드 */
  statusCode: string;

  /** 발송 요청 상태명 */
  statusName: string;

  /** 발송 요청 상태 메시지 */
  statusMessage: string;

  message: SmsMessage;
};

export type SmsSendParams = Pick<
  SmsMessageRequest,
  'content' | 'countryCode'
> & {
  to: string | string[];
};
