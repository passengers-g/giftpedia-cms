# Payload Cloudflare 템플릿

[![Cloudflare에 배포하기](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1)

이 템플릿은 필요한 모든 것을 시작하기 위한 최소한의 구성으로 제공됩니다.

## 빠른 시작

이 템플릿은 버튼을 클릭하여 설정 화면으로 이동하면 Cloudflare Workers에 직접 배포할 수 있습니다.

거기서 Github나 Gitlab 같은 git 공급자에 코드를 연결하고, Workers, D1 데이터베이스 및 R2 버킷의 이름을 지정하며, 필요한 추가 환경 변수나 서비스를 연결할 수 있습니다.

## 빠른 시작 - 로컬 설정

이 템플릿을 로컬에서 실행하려면 다음 단계를 따르세요:

### 클론

위의 `Deploy` 버튼을 클릭한 후, 이 저장소의 독립적인 복사본을 컴퓨터에 가지고 싶을 것입니다. Cloudflare는 앱을 Github 같은 git 공급자에 연결하며, 거기서 코드에 접근할 수 있습니다.

### 로컬 개발

## 작동 방식

기본적으로 [`Wrangler`](https://developers.cloudflare.com/workers/wrangler/)를 사용하면 원격 서비스에 연결할 수 있는 로컬 바인딩이 자동으로 생성되며, Cloudflare에서 사용 중인 서비스의 로컬 모의 환경도 만들 수 있습니다.

다음과 같이 Payload를 사전 구성했습니다:

### 컬렉션

이 기능을 확장하는 방법에 대한 자세한 내용은 [컬렉션](https://payloadcms.com/docs/configuration/collections) 문서를 참조하세요.

- #### Users (인증)

  Users는 관리자 패널에 접근할 수 있는 인증 지원 컬렉션입니다.

  추가 도움이 필요하면 공식 [Auth 예제](https://github.com/payloadcms/payload/tree/main/examples/auth) 또는 [인증](https://payloadcms.com/docs/authentication/overview#authentication-overview) 문서를 참조하세요.

- #### Media

  업로드가 활성화된 컬렉션입니다.

### 이미지 저장소 (R2)

이미지는 R2 버킷에서 제공되며, 이를 추가로 구성하여 프론트엔드에 직접 제공할 CDN을 사용할 수 있습니다.

### D1 데이터베이스

Worker는 D1 SQLite 데이터베이스에 직접 접근할 수 있으며, Wrangler가 로컬에서 연결할 수 있습니다. 다른 공급자와 달리 일반적인 연결 문자열은 없다는 점에 유의하세요.

## Cloudflare와 작업하기

먼저, 로컬에서 종속성을 설치한 후 다음을 실행하여 Wrangler로 인증해야 합니다:

```bash
pnpm wrangler login
```

이것은 로그인을 위해 Cloudflare로 이동하며, 그 후 모든 작업에 로컬에서 Wrangler CLI를 사용할 수 있습니다. 사용 가능한 모든 옵션을 보려면 `pnpm wrangler help`를 사용하세요.

Wrangler는 매우 스마트하여 `pnpm dev`를 실행하는 것만으로 로컬 개발을 위한 서비스를 자동으로 바인딩합니다.

## 배포

배포할 준비가 되면 먼저 마이그레이션을 생성했는지 확인하세요:

```bash
pnpm payload migrate:create
```

그런 다음 다음 명령을 실행하세요:

```bash
pnpm run deploy
```

이것은 `production` 모드에서 Wrangler를 시작하고, 생성된 모든 마이그레이션을 실행하며, 앱을 빌드한 다음 번들을 Cloudflare에 배포합니다.

완료되었습니다! 원하는 경우 이러한 단계를 CI 파이프라인으로 이동할 수도 있습니다.

## 로그 활성화

기본적으로 API에 대한 로그가 활성화되어 있지 않습니다. 할당량에 영향을 미치기 때문에 옵트인으로 남겨두었습니다. 그러나 Cloudflare 패널에서 한 번의 클릭으로 로그를 쉽게 활성화할 수 있습니다. [문서 참조](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#enable-workers-logs).

## 알려진 문제

### GraphQL

현재 GraphQL의 일부 문제가 [Workers에서 업스트림으로 수정](https://github.com/cloudflare/workerd/issues/5175)되기를 기다리고 있으므로 배포 시 GraphQL에 대한 완전한 지원이 현재 보장되지 않습니다.

### Worker 크기 제한

현재 3mb의 번들 [크기 제한](https://developers.cloudflare.com/workers/platform/limits/#worker-size) 때문에 이 템플릿을 유료 Workers 플랜에 배포하는 것을 권장합니다. 시간이 지남에 따라 이 메트릭을 더 잘 충족하기 위해 번들 크기를 적극적으로 줄이려고 노력하고 있습니다.

이것은 자신의 코드에도 적용되며, 많은 라이브러리를 가져오는 경우 번들에 의해 제한될 수 있습니다.

## 질문

문제나 질문이 있으면 [Discord](https://discord.com/invite/payload)로 연락하거나 [GitHub discussion](https://github.com/payloadcms/payload/discussions)을 시작하세요.