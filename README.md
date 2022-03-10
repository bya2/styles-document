# Style Documents

프론트엔드 개발자를 목표로 삼고나서 작성하는 첫 프론트엔드 프로젝트입니다. 현재 리팩토링 중입니다.

- VSCode와 같은 에디터 형태의 스타일 문서를 작성할 수 있는 애플리케이션
- 마크다운, 서체, 색상 박스

## Progress

#### 0213 (기능 완성)

![image](https://user-images.githubusercontent.com/61080445/153845913-ec2e9e79-dc9a-4c44-8ca0-4e10cda3fd40.png)

#### 0305 (리팩토링 시작)

디자인적인 면에서 부족함을 느껴서 리팩토링을 시작했습니다.

- 불필요한 파일 정리 및 baseURI를 설정
- 재사용성 컴포넌트 리팩토링
  - 모달 내 이벤트 재작성
  - 태그 컴포넌트 id 프로퍼티 추가
  - refInput과 Input 컴포넌트 분리
- 컴포넌트와 일반 함수 간 구분
  - 컴포넌트: 함수 선언
  - 일반 함수: 화살표 함수
- Electron
  - 설치
  - 실행 확인

#### 0310

![image](https://user-images.githubusercontent.com/61080445/157671413-d049ed07-a365-4d43-ac77-116b1b3c7040.png)

![image](https://user-images.githubusercontent.com/61080445/157671540-985086a7-adcc-4198-897f-0394e55710b4.png)

![image](https://user-images.githubusercontent.com/61080445/157671284-daa107c2-ca4d-446b-ba8b-d61c8688a9f0.png)

## REST API

GET

```
/api/auth/sign_in (로그인)
/api/auth/validation (로그인 검증)
/api/exp/node_list (폴더 및 문서 목록)
/api/doc/elem_list (문서 내 요소 목록)
```

POST

```
/api/auth/sign_up (회원 가입)
/api/exp/add_group (폴더 생성)
/api/exp/add_doc (문서 생성)
/api/doc/add_elem (문서 내 요소 생성)
```

## Function

`현재 구현된 기능`

```
Common
  - 로그인 검증(Bcrpyt)
  - 모달

Session
  - 회원 가입
  - 로그인(sessionStorage, Recoil)
  - 로그아웃(sessionStorage, Recoil)

Explorer:
  - 트리 구조의 폴더 및 문서 구조
  - 클릭한 문서/폴더/루트 표시
  - 클릭한 문서/폴더/루트 활성화
    - 문서/폴더 생성
  - 클릭한 문서로 이동
  - 폴더 접기/펴기

Document:
  - 문서 내 에디터 기능
  - 문서 내 에디터 종류 선택 기능
  - Palette/Typography/Markdown 등의 요소
  - 문서 내 요소 추가 기능
  - 선택한 문서 내 요소 수정 기능
```

`구현 예정`

```
Session
  - 문서 검색 기능
  - 유저 프로필
  - 유저 메뉴

Explorer:
  - 새로 고침
  - 문서/폴더 삭제

Document:
  - 맨 위로 이동
  - Sticky를 이용해 스크롤을 내리면 문서 내 요소의 헤더가 블록처럼 쌓이는 기능
  - Right Aside에 Typography 속성 나열
```

## Proxy

리액트 서버와 백엔드 서버가 각 다른 포트로 동작을 하고 있을 때,  
절대 경로를 통해서 어느 서버와 통신을 할 지 명확하게 지정.

그러나 리액트 서버 내에서의 상대 경로는 결국 리액트 서버로 요청을 보내는 결과가 발생.

리액트는 해당 URL에 해당하는 내용이 없으므로 에러를 내야하지만, 프록시의 정보를 확인해서 해당하는 서버로 접속.

`요약`:

- 리액트 서버가 프록시 서버로 동작
  - 브라우저가 리액트 서버(프록시)에 요청 전달
  - 리액트 서버(프록시)는 해당 요청이 상대 경로일 경우, 프록시 정보를 확인하고 백엔드 서버로 요청 전달
  - CORS, CORB, COOKIE 등의 문제를 해결

```json
/* 현재 URL을 상대 경로가 아닌, 절대 경로로 동작하고 있으므로 사실상 필요 없음. */
/* URL을 상대 경로로 줄 수 있음 */
{
  "proxy": "http://localhost:8080"
}
```

## Handle Errors

[1]

```
Error: No 'Access-Control-Allow-Origin' header is present on the requested resource.
Error: CORS(Cross-Origin Resource Sharing)

서버 단에서 외부 도메인 요청을 처리하기 위해 헤더에 요청을 보내는 페이지의 출처를 지정.
```

[2]

```
Access to XMLHttpRequest at 'http://localhost:8080/doc' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

Error: CORB(Cross-Origin Read Blocking)

'Content-Type':'application/x-www-form-urlencoded' (X)
encodeURIComponent() - (X)
JSON.stringify - {"{obj}": ""} 형태로 나오므로 (X)
querystring.stringify - Node.js에서만 사용 가능 (X)
qs.stringify - (O)
```

[3]

```
WARNING in ./node_modules/bcryptjs/dist/bcrypt.js
Module not found: Error: Can't resolve 'crypto' in 'D:\Projects\styles-space\node_modules\bcryptjs\dist

- 동작을 방해하지 않았고 해결 방법이 따로 존재하지 않아서 아직 건들지 않았습니다.
-
```

## Stack

`Front-End`

```
SCSS
Javascript
React
Recoil
```

`Back-End`

```
Node.js
Express
Bcrypt
```

## Writer

```
Name : Jinhyeong Lee
Nick : Bya2
Email: byaa1972@gmail.com
```

## Reference

- [react-markdown](https://github.com/remarkjs/react-markdown)
