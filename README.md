<p align="center">
  <a href="https://www.ncloud.com/product/applicationService/sens" target="blank"><img src="https://ssl.pstatic.net/static/ncp/img/ko/msg_logo_thumb.jpg" width="240" alt="ncloud Logo" /></a>
</p>

<p align="center">NCP SENS client for <a href="https://nodejs.org/" target="_blank">Node.js</a></p>

<p align="center">
    <a href="https://www.npmjs.com/package/@pickk/sens" target="_blank">
        <img src="https://img.shields.io/npm/v/@pickk/sens.svg" alt="NPM Version" />
    </a>
    <a href="https://www.npmjs.com/package/@pickk/sens" target="_blank">
        <img src="https://img.shields.io/bundlephobia/minzip/@pickk/sens" />
    </a>
<a href="https://github.com/DEV-MUGLES/sens/blob/master/LICENSE" target="_blank">
<img src="https://img.shields.io/npm/l/@pickk/sens.svg" alt="Package License" />
</a>
<a href="https://github.com/DEV-MUGLES/sens/actions/workflows/ci.yml">
<img src="https://github.com/DEV-MUGLES/sens/workflows/CI/badge.svg" />
</a>
<a href="https://www.npmjs.com/package/@pickk/sens" target="_blank">
<img src="https://img.shields.io/npm/dm/@pickk/sens.svg" alt="NPM Downloads" />
</a>
<a href="https://github.com/DEV-MUGLES/sens" target="_blank">
<img src="https://img.shields.io/github/stars/DEV-MUGLES/sens?style=social">
</a>

</p>

이 모듈은 Naver Cloud Platform에서 제공하는 Simple & Easy Notification Service(SENS) API를 [Node.js®](https://nodejs.org/)로 구현한 클라이언트입니다.<br>
NCP SENS의 개발 가이드는 [여기](https://guide.ncloud-docs.com/docs/ko/sens-sens-1-1)를 참고하시기 바랍니다.<br>

- 💙 Typescript support
- 📦 5kb mini library
- 👫 All browsers supported
- 🏃 Currently maintaining

## Requirements

- [nodejs](https://github.com/nodejs/node) >= 12

## Installation

```shell
$ npm install --save @pickk/sens
# or
$ yarn add @pickk/sens
```

## Features

- SMS
  1. send
- Alimtalk
  1. send

## Usage

```typescript
import { SmsClient } from '@pickk/sens';

const smsClient = new SmsClient({
  accessKey: 'your-access-key',
  smsServiceId: 'your-sms-service-id',
  smsSecretKey: 'your-sms-secret-key',
  callingNumber: 'your-calling-number',
});

await smsClient.send({
  to: ['01012341234', '01043214321'],
  content: 'Hello Sens!',
});
```

## Author

- [Sumin Choi](https://sumini.dev)

## Contribution

- 이 프로젝트는 누구나 참여 가능합니다.
- 버그나 개선점 및 의견 등은 [이슈](https://github.com/greatSumini/sens/issues) 및 [Pull Request](https://github.com/greatSumini/sens/compare)를 활용해주세요.

## Links

- NCP SENS 공식 사이트: https://www.ncloud.com/product/applicationService/sens
- NCP SENS 개발 가이드: https://guide.ncloud-docs.com/docs/ko/sens-sens-1-1

## License

This Package is [MIT licensed](https://github.com/DEV-MUGLES/sens/blob/master/LICENSE).

## References

- [node-sens](https://github.com/Bumkeyy/node-sens)
