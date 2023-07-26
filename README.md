## 이슈

1. 음원 플레이리스트 공유에 중점을 둔 SNS 부재

## 목적

1. "뮤즈메이트"는 음원 플레이리스트 공유에 중점을 둔 SNS(Social Networking Service)의 부재를 해소하고자 기획했다.

## 팀원

| 이름   | 역할               | 깃허브                         |
| ------ | ------------------ | ------------------------------ |
| 손자민 | FE & BE 개발       | https://github.com/Minminjamin |
| 진이정 | UI 디자인 &DB 개발 | https://github.com/Jinleejung  |

파일 등을 주고받아야 하므로 graphql보다는 rest api를 사용

## 설계(임시)

https://brave-bench-200.notion.site/ff93dae52678496c85fdd555da8fcecd?pvs=4
https://www.erdcloud.com/d/znMpjSHtHg5yXvjyE
https://brave-bench-200.notion.site/565b3e965b2d4284a1208903ea9572d2?pvs=4

## 주요 기능(예상)

1. 회원가입 및 로그인
   1. 단, 카카오 및 구글과 같은 소셜 회원가입만 가능
   2. 회원가입 시 아이디와 프로필만 입력
2. 마이페이지
   1. 프로필 관리 및 아이디 변경 기능
3. 플레이리스트
   1. 플레이리스트 생성 및 관리
   2. 플레이리스트에 음원 추가는 이름 + 제목으로 가능
   3. 생성된 플레이리스트에 음원을 추가하거나 삭제
   4. 플레이리스트에 대한 반응 기능
   5. 플레이리스트 포크(내게 추가하기)
4. 친구 및 소셜 기능
   1. 친구 팔로워 및 언팔로우 기능
   2. 친구를 검색하고 요청 보내기 기능
5. 챗팅 기능
   1. 팔로워된 친구끼리 챗팅

## 컴포넌트(component) 폴더 하위 폴더 별 설명

**Atoms**
가장 기본적인, 가장 작은 컴포넌트 블록
ex) label, input, button
coloor platettess나 폰트, 애니메이션 같은 추상적인 컴포넌트들도 포함

**Molecules**
atom들의 그룹
input과 button이 합쳐진 하나의 기능(예를 들어 검색)을 수행하는 블록

**Organisms**
molcule들의 모음
인터페이스가 어떠한 모양을 갖기 시작하는 단계
독자적이고 변형이 가능하고 재사용가능한 컴포넌트들을 만들 수 있음

**Templates**
organism들의 그룹
layout과 디자인을 볼 수 있는 단계
각각의 추상적인 molecules와 organism들에게 context를 제공하여 구체적인 페이지가 되는 단계
이 역시 색의 입히고 안 입히고의 차이 등이 있지만 모호함을 피하기 위해 사용하지 않음
