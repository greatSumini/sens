export type SensOptions = {
  /** 포탈 또는 Sub Account에서 발급받은 Access Key ID */
  accessKey: string;

  /** Access Key Id와 맵핑되는 SecretKey */
  secretKey: string;
};

export type SensHeaders = {
  'Content-Type': string;
  'x-ncp-apigw-timestamp': string;
  'x-ncp-iam-access-key': string;
  'x-ncp-apigw-signature-v2': string;
};
