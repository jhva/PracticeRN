# AppLoading = ?

사용자에게 앱이 보여지기전에 원하는 어떤요소라도 시작전에 불러서 보여주게하는
라이브러리기능

onFinish props
startAsync는
프로미스가 resolve되거나 종료됐을때 promise를 반환해주는 함수

# Navigation

2.5 Tab Navigation

yarn add @
react-navigation/bottom-tabs@6.0.5

screenOption 은 모든 스크린의 공통적으로 적용할할수있는 스타일을 할 수 있고

options는 하나의 스크린에서만 바꿀수있도록 해줄수있다

# 새롭게알게된 함수

-ex) new Date("2021-09-21").toLocalDateString("ko")
output: "2021.9.21 "

toLocalDateString("ko",{month:"long"}) => '9월'
toLocalDateString("ko",{month:"long",day:"numberic"}) => '9월 21일'
toLocalDateString("ko",{month:"long",day:"numberic",year:"numberic}) => '2021년 9월 21일'

# ScrollView 는 모든 자식 컴포넌트를 한번에 렌더링함

# react query

caching 은 데이터가 한번 fetch한번 다시 fetch를 안하게함

## QueryClient

-cache에 접근할수있는 방법

# navigation state

# infinite Scrolling

-flatList props => onEndReached

- infinite Queries =>React Query
-flat()이라는 함수는 배열안에있는 것들을 전부 배열 밖으로 꺼내는것
