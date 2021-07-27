export type SensOptions = {
  /** 포탈 또는 Sub Account에서 발급받은 Access Key ID */
  accessKey: string;

  /** Access Key Id와 맵핑되는 SecretKey 
   - Alimtalk을 사용할 땐 반드시 입력해야합니다.
   - SmsClient에서는 smsSecretKey가 사용됩니다. */
  secretKey?: string;
};

export type SensHeaders = {
  'Content-Type': string;
  'x-ncp-apigw-timestamp': string;
  'x-ncp-iam-access-key': string;
  'x-ncp-apigw-signature-v2': string;
};
