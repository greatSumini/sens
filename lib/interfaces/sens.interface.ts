export type SensOptions = {
  /** 포탈 또는 Sub Account에서 발급받은 Access Key ID */
  accessKey: string;

  /** Access Key Id와 맵핑되는 SecretKey */
  secretKey: string;
};

export type AlimtalkOptions = SensOptions & {
  /** 프로젝트 등록 시 발급받은 서비스 아이디 */
  alimtalkServiceId: string;

  /** 플러스친구 아이디 */
  plusFriendId: string;
};

export type SensHeaders = {
  'Content-Type': string;
  'x-ncp-apigw-timestamp': string;
  'x-ncp-iam-access-key': string;
  'x-ncp-apigw-signature-v2': string;
};
