# Style Documents

스스로에게 도움이 될 스타일 문서를 작성하고 저장하고 싶어서 작성.

## Progress

### `220213`

![image](https://user-images.githubusercontent.com/61080445/153845913-ec2e9e79-dc9a-4c44-8ca0-4e10cda3fd40.png)

## Getting Started

### Installation

```
npm i --save-prod
```

### Execution

```
npm start (development mode)
npm build (production mode)
```

## Layout & Routes & Components

```
Header
Root
  Login
  User
    Documents
  Document
    Menu
    Markdown
    Palette
Footer
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
```

## Writer

```
Name : Jinhyeong Lee
Nick : Bya2
Email: byaa1972@gmail.com
```

## Reference

- [react-markdown](https://github.com/remarkjs/react-markdown)
