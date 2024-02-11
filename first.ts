//0. 기본 세팅하기
// let a: string = "hello";
// a = 1234;

import { arrayBuffer } from "stream/consumers";

//npm init -y
//npm i typescript
//npx tsc
//npx tsc --init
//tsconfig json을 allowjs 해제, strict를 절대 false로 만들지 말기
//target: ES5 라하면 인터넷 익스플로어에서도 돌아가게 한다. ES3까지 가능하다.
//module: 최신 module 쓰고 싶으면  es2015 , node module하고 싶으면 nodejs
//npx tsc --noEmit: 타입 게속 검사, 에디터 없으면 매번 해줘야함
//npx tsc : 에러가 있지만 자바스크립트로 바꿔줌
//forceConsistentCasingInFileNames : 윈도우하다가 리눅스나 맥으로 오면 대소문자 에러
//skipLibCheck : 라이브러리들에는 모두 d.ts와 같은 파일이 있는데 실제로 쓰는 타입만 검사해라.

//1.1 타입스크립트는 변수, 매개변수, 리턴값에 타입 붙이는 것!
const a: number = 5;
const b: string = "5";
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: symbol = Symbol.for("abc");
const g: any = true;

// return 자리는 매개변수 자리 앞 자리다.
// 함수 타이핑 방법 1
function add(x: number, y: number): number {
  return x + y;
}

const add2: (x: number, y: number) => number = (x, y) => x + y;

// 함수 타이핑 방법 2
//type allias(타입을 별칭으로 따로 뺄 수 있다.)
type Add = (x: number, y: number) => number;
// 조심: function일때는 콜론인데, 화살표 함수일때는 화살표 뒤에 나온다.
const add3: Add = (x, y) => x + y;

//타입스크립트는 타입 선언하는 방법이 여러가지이다.
// 함수 타이핑 방법 3
interface Add2 {
  (x: number, y: number): number;
}

const add4: Add2 = (x, y) => x + y;

const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };
const arr4: string[] = ["123", "456"];
const arr5: Array<number> = [123, 456];

//튜흘 : 길이가 고정된 배열
const arr6: [number, number, string] = [123, 456, "hello"];

const h: true = true; //무조건 true, type이 무조건 true 굳이 boolean으로 할 필요 없다.
const i: 5 = 5; // 값 고정시키기

//ts는 js의 변수, 매게변수, 리턴값에 타입을 붙여놓은게 타입스크립트다.

//1.2. 타입을 적극 추론하자. 타입은 왠만하면 좁게 적어라
//굳이 const a:'string' = '5' 이렇게 할 필요가 없다. typescript가 알려주는대로 하자.
//any가 나오면 문제가 된다.
//다 타이핑을 하는 것이 아니라 typescript가 예상했던 것과 다를때 직접 타이핑을 하면 된다.

//1.3. js 변환 시 사라지는 부분을 파악하자.
//type, interface, Array 는 js 로 가면 사라진다. 이것 없이도 js 코드가 돌아가게 코드 짜야한다.

//심화: 함수로 타입, 함수를 분리해서 실행할 수도 있음
function add5(x: number, y: number): number;
function add5(x, y) {
  return x + y;
}

let aa = 123;
aa = "hello" as unknown as number; //앞에 타입을 number로 바꾼다.

//1.4 never 타입과 느낌표(non-null assertion)
//빈 배뎔을 never로 나온다. 빈 배열은 꼭 타입선언을 해준다.
try {
  const arr: string[] = [];
  arr.push("hello");
} catch (error) {
  error;
}
