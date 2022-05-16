# 현재 프로젝트: JH 탐색기

브라우저 내 문서 탐색기 및 에디터 기능을 가진 애플리케이션입니다. (리팩토링 중...)

- VSCode와 같은 에디터 형태의 스타일 문서를 작성할 수 있는 애플리케이션
- 마크다운, 서체, 색상 박스

## 작성자

이진형(bya2, byaa1972@gmail.com)

팀 구성 - 개인

##### 다른 프로젝트

> - [개인: 소설 리뷰 & 플랫폼 정보 스크랩퍼](https://github.com/bya2/simple-crawling)
> - [개인: 영화 정보 대시보드](https://github.com/bya2/ps-movie-graphs-app)
> - [개인: 철도 환경 모니터링 시뮬레이터](https://github.com/ord-lab205)
> - [팀: 뭐해먹지](https://github.com/KNUT-Mohaemookji/mohaemookji-legacy)
> - [팀: fc-](https://github.com/bya2/fc-)

## 기술

> - 언어: `HTML5`, `SCSS`, `Typescript`
> - 라이브러리: `React`, `Redux`, `React-Router-DOM`, `Firebase`
> - 빌드: `Webpack`, `Babel`
> - 데이터베이스: `Firestore`

## 장치

> - 모바일 (320px~)
> - 태블릿
> - 노트북 (~1440px)

## 화면 및 기능

#### `기능 컴포넌트`
- Activity
  - 로그인 상태 레이아웃
  - 각 기능에 대한 라우팅(탐색기, 즐겨찾기, 방문 기록, 문서 검색)

- Status
  - 로그인
  - 회원가입
  - 로그아웃

- Explorer
  - API
  - 메뉴
    - 방문 기록에 따른 다른 사용자의 탐색기 추가
    - 해당 페이지 즐겨찾기 활성화
  - 트리 구조
    - 탐색기 모음
    - 탐색기 도구
    - 탐색기 내 서브 트리
      - Node
      - InputNode
      - Children

- Bookmark
  - 활성화된 리스트
  - Local Storage 추가/제거

- Visit
  - 리스트
  - 페이지 방문 기록 업데이트

- Search
  - API (Firestore가 부분 문자열 검색 기능을 지원하지 않으므로, 전체 문자열을 매치하여 검색)
  - 검색된 페이지
  - 검색된 문서

- Document
  - 리스트
  - 활성화된 문서에 대한 탭
  - 문서 내 요소 추가 기능

#### `재사용 컴포넌트`
- Complete
  - 모달(Modal)
  - 로더(Loader)
  - 리사이저(Resizer)
  - 툴팁(Tooltip)

- Wrapper
  - Outer    
  - Inner
  - Map       (최상위 컴포넌트)
  - Layout    (경로)

- Area
  - Container (API)
  - Region    (위치)
  - Site      (기능)

- Bar
  - Field     (fieldset)
  - Messages  (Content List)
  - List      (ul)

- Group
  - Group     (div)
  - Item      (li)
  - ThumbItem (Thumb)

- Box
  - 정보(Info)
  - 제목(Title)
  - 내용(Content)
  - 이미지(Image)
  - 버튼(Button)
  - 썸네일(Thumbnail)

#### `로직`
  - 재사용
    - 동기/비동기 콜백 함수 Wrapper (에러 객체 제어)
    - 에러 Handler
    - 지정된 프로퍼티를 키 값으로 가지는 문자열 객체 Getter
    - 지정된 프로퍼티를 키 값으로 가지는 조건 객체 Getter
    - 스토리지 객체의 배열 요소 Getter

  - API
    - Fetch Wrapper
    - URL QUERT Getter
    - Firestore GET/POST/PATCH/DELETE Wrapper

  - Firestore
    - 문서 Ref Getter
    - 컬렉션 Ref Getter
    - Transaction Wrapper (읽기/쓰기 다중 처리)
    - Batch Wrapper (쓰기 다중 처리)
    - 문서 Getter
    - 캐시된 문서 Getter
    - 컬렉션 내 문서 Getter
    - 컬렉션 그룹 내 문서 Getter
    - 문서 생성 Handler (add, set, mix)
    - 문서 수정 Handler
    - 문서 삭제 Handler
    - 문서 내 필드 삭제 Handler
  
  - 파일
    - 확장명 없는 파일 이름 Getter

  - 탐색기
    - 루트 노드에 따라 노드(문서/폴더)를 분리한 Map Getter
    - 부모 노드에 따라 노드(문서/폴더)를 분리한 Map Getter
    - 이름에 따라 순서가 정렬된 노드 목록 Getter
    - 자식 노드를 가지고 있는 지에 대한 여부 Getter
    - 오류 방지를 위해 ID를 문자열로 변환
    - 계층 구조의 노드 배열 Getter
    - 모든 노드 ID에 대한 조건 객체 Getter
    - 자식 노드를 가지고 있지 않은 루트 노드 Getter
  
  - 방문 기록
    - 현재 날짜 및 시간 Getter


## Demo

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

- 루트 페이지에 스타일 문서 검색창을 구현
- 탐색기에 여러 유저의 스타일 문서 루트를 포함
  - 현재 로그인한 유저의 스타일 문서 루트
  - 현재 리소스에 해당하는 유저의 스타일 문서 루트
  - sessionStorage에 저장된 방문하거나 관심을 가지고 있는 유저의 스타일 문서 루트
  - 루트마다 접기/펴기 기능 구현
- 탐색기 아쉬웠던 점 재구성
  - 폴더 화살표를 누르는 것이 아닌 노드 자체를 눌러서 접기/펴기 기능 구현
  - CSS 문제로 문서 및 폴더마다 TOOL을 추가하지 못했었는데, 문제를 해결하고 하나의 TOOL을 디자인에 맞게 구현
- 함수를 통해서 재귀를 구현했던 이전과 달리 컴포넌트로 재귀를 구현하여 코드를 간결하게 구현
- 전체적인 상태 관리는 Recoil, 부분적인 상태 관리는 useContext Hook을 이용
- CSS
  - 활성화된 문서 노드 영역에서 여백(padding)에 따라 일부분의 배경색을 구현하지 못했던 문제 해결
  - 스크롤바를 "position:absolute"처럼 구현하고 싶었는데, "overflow-y:overlay"를 이용하여 문제 해결

![image](https://user-images.githubusercontent.com/61080445/157671413-d049ed07-a365-4d43-ac77-116b1b3c7040.png)

![image](https://user-images.githubusercontent.com/61080445/157671540-985086a7-adcc-4198-897f-0394e55710b4.png)

![image](https://user-images.githubusercontent.com/61080445/157671284-daa107c2-ca4d-446b-ba8b-d61c8688a9f0.png)

#### 0312

- 탐색기
  - Context API
    - Context 프로퍼티 변수 이름 일관화
  - useEffect Hook에서 마운트 과정과 업데이트 과정을 ref를 통해 분리하여 불필요한 렌더링을 방지
  - 탐색기 상태 유지
    - 폴더/문서 생성 시 탐색기가 초기 상태로 되돌아가지 않도록 했습니다.
    - 활성화 상태, 클릭 상태, 폴더 접기/펴기 상태 등은 화면이 다시 렌더링되어도 유지됩니다.
  - 컴포넌트 분리
    - 코드의 가독성과 성능을 위해 컴포넌트를 분리했습니다.
    - Input,
    - Ref Input,
    - Sub Tree
    - Sub Tree Node
    - Sub Tree Input Node,
    - 등...
- 탐색기 툴:
  - 폴더/문서 추가 기능 완료 (새로고침을 하지 않아도 폴더/문서가 화면 상에 추가됩니다.)
  - 로그인된 Root에서만 폴더/문서를 생성할 수 있습니다.

![image](https://user-images.githubusercontent.com/61080445/158029258-2765b3f1-44e3-43b5-8e43-477c35cc2306.png)

## 구현 기능

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

## 에러 핸들링

#### JS

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

#### Typescript

- 문제: `undefined`, `null`이 포함된 인터페이스와 포함되지 않은 인터페이스 간의 데이터 전달이 이루어질 때, 타입을 명시하도록 강제.
- 해결: 조건문으로 `throw`로 에러를 발생.
  - 의도하지 않은 동작 발견
  - `as`등의 선언자를 사용하지 않고 코드의 간결성 유지

#### Firestore API

> - `FB`를 통해 불러온 객체는 `read-only` 상태이기 때문에, 스프레드 문법을 통해 해당 객체를 다른 변수에 할당하고, 수정하여 사용했습니다.
> - 데이터를 '추가', '수정', '삭제'하는 작업에 대한 요청은 일정 시간의 간격을 두고 실행되어야하므로, 읽기 작업이 있으면 `Transaction`, 없으면 `Batch`를 이용했습니다.

## 그 외

### 변경점

- Express로 백엔드를 작성하고, 클라이언트에서 `fetch`를 이용해서 API를 작성했으나, `Firestore`로 변경. (22/4/29)

## 참고

- [react-markdown](https://github.com/remarkjs/react-markdown)
