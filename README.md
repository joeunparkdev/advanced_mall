# 환경변수
- .env 
- DB_HOST=
- DB_USER=
- DB_PASSWORD=
- DB_DATABASE=
- DB_DIALECT=
- JWT_SECRET=

# API 명세서 URL

- https://docs.google.com/spreadsheets/d/16ou3REvbLL4OqWi5ADrPBlHaQloZMLV2qSzsZr1kjV0/edit#gid=0

# ERD URL

- https://www.erdcloud.com/d/bqkE8XLxX7guv6vB9

# 더 고민해 보기

1. **암호화 방식**
- 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 `단방향 암호화`와 `양방향 암호화` 중 어떤 암호화 방식에 해당할까요?
- 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?
Hash는 주로 단방향 암호화에 해당합니다. 단방향 암호화는 원래 데이터를 암호화된 값으로 바꾸는 것이지만, 암호화된 값을 다시 원래 데이터로 돌리는 것은 어려운 것이 특징입니다. 따라서 비밀번호를 저장할 때 원본 비밀번호를 저장하지 않고 그에 대한 해시값을 저장함으로써 보안을 강화할 수 있습니다. 이는 해시 충돌이 발생할 수 있으나, 안전한 해시 함수를 사용하면 이를 크게 감소시킬 수 있습니다.

2. **인증 방식**
- JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?
- 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
JWT의 Access Token이 노출되면 해당 토큰을 가로채어 사용자의 권한을 도용할 수 있습니다. 이는 토큰 자체에 사용자 정보가 포함되어 있기 때문입니다. 이를 방지하기 위해서는 토큰의 유효 기간을 짧게 유지하고, Refresh Token을 사용하여 새로운 Access Token을 발급하는 방법을 사용할 수 있습니다.

3. **인증과 인가**
- 인증과 인가가 무엇인지 각각 설명해 주세요.
- 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.
인증(Authentication)은 사용자가 누구인지 확인하는 과정입니다. 반면에 인가(Authorization)는 특정 자원이나 기능에 대한 접근 권한을 부여하는 것입니다. 두 용어의 차이를 간단히 말하면, "누구인지 확인하고" vs "무엇을 할 권한이 있는지 확인하고" 입니다. 과제에서 Middleware는 인증과 인가 둘다에 쓰입니다.

4. **Http Status Code**
- 과제를 진행하면서 `사용한 Http Status Code`를 모두 나열하고, 각각이 `의미하는 것`과 `어떤 상황에 사용`했는지 작성해 주세요.
사용한 Http Status Code:
200 OK: 성공적으로 처리됨
201 Created: 새로운 리소스가 성공적으로 생성됨
204 No Content: 요청은 성공했지만 응답으로 반환할 데이터가 없음
400 Bad Request: 잘못된 요청
401 Unauthorized: 인증이 필요한 상태, 인증 정보가 부족하거나 유효하지 않음
403 Forbidden: 인가 실패, 리소스에 대한 권한이 없음 
404 Not Found: 요청한 리소스를 찾을 수 없음
500 Internal Server Error: 서버 내부 오류

5. **리팩토링**
- MongoDB, Mongoose를 이용해 구현되었던 코드를 MySQL, Sequelize로 변경하면서, 많은 코드 변경이 있었나요? 주로 어떤 코드에서 변경이 있었나요?
- 만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.
주로 데이터베이스 관련 코드와 쿼리문이 변경되었습니다. MongoDB와 MySQL은 다른 데이터베이스 시스템이므로, 데이터베이스 연결 및 쿼리 부분이 변경되어야 합니다. 리팩토링 시에는 데이터베이스 관련 코드를 모듈화하고 추상화하여 유지보수성을 높일 수 있습니다.

6. **서버 장애 복구**
- 현재는 PM2를 이용해 Express 서버의 구동이 종료 되었을 때에 Express 서버를 재실행 시켜 장애를 복구하고 있습니다. 만약 단순히 Express 서버가 종료 된 것이 아니라, AWS EC2 인스턴스(VM, 서버 컴퓨터)가 재시작 된다면, Express 서버는 재실행되지 않을 겁니다. AWS EC2 인스턴스가 재시작 된 후에도 자동으로 Express 서버를 실행할 수 있게 하려면 어떤 조치를 취해야 할까요?
(Hint: PM2에서 제공하는 기능 중 하나입니다.)
AWS EC2 인스턴스가 재시작될 때 자동으로 Express 서버를 실행하려면 PM2의 startup 명령을 사용할 수 있습니다. 이 명령은 서버 부팅 시 자동으로 실행될 수 있도록 설정하는데 도움을 줍니다. 예를 들면 pm2 startup 명령을 사용하여 초기화할 수 있습니다.

7. **개발 환경**
- nodemon은 어떤 역할을 하는 패키지이며, 사용했을 때 어떤 점이 달라졌나요?
- npm을 이용해서 패키지를 설치하는 방법은 크게 일반, 글로벌(`--global, -g`), 개발용(`--save-dev, -D`)으로 3가지가 있습니다. 각각의 차이점을 설명하고, nodemon은 어떤 옵션으로 설치해야 될까요?
nodemon은 파일 변경을 감지하여 자동으로 서버를 재시작해주는 도구입니다. 이를 통해 코드 수정 후 매번 서버를 재시작하지 않아도 됩니다.
npm을 이용한 패키지 설치 방법의 차이:
일반: 프로젝트에 필요한 패키지를 설치합니다.
글로벌: 시스템 전역에 패키지를 설치하며 해당 패키지가 시스템 어디서든 사용 가능합니다.
개발용: 프로젝트 개발에 필요한 패키지로, 프로덕션 환경에서는 필요하지 않을 수 있습니다.
nodemon은 개발 환경에서 사용되므로, -D 또는 --save-dev 옵션을 통해 개발 의존성으로 설치하는 것이 적절합니다.