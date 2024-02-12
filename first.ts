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

//뒤에 붙이는 느낌표는 여기서 head는 Element랑 null 둘 다 오는데
//여기 무조건 Element 인 것을 책임질 수 있으면 '!'를 붙인다.
//null이나 undefined가 아님을 보증하는 것이다.
//이 방법은 비추한다. 절대는 없기 때문이다.
const head: Element = document.querySelector("#head")!;
//그냥 head.innerHTMl 이렇게 하면 에러가 날 수 있기 때문에
//if(head)이런 식으로 적어주는게 좋다.
if (head) {
  head.innerHTML = "hello world";
}

//1.5. 원시 래퍼 타입, 템플릿 리터럽 타입, rest, 튜플
type World = "world" | "hell";
const word: World = "world";
type World2 = `hello ${World}`;
//이렇게 string이 들어가면 추천이 안된다.
type World3 = `hello ${string}`;
//추천 두개 뜨는거 보이지
const word3: World2 = `hello hell`;

//rest parameter
function rest(a, ...args: string[]) {
  console.log(args); //(1,[2,3])
}

rest("1", "2", "3");

//tuple
const tuple: [string, number] = ["1", 5];
// tuple[2] = 4 typescript가 얘는 막는데
//tuple.push(2) //얘는 못 막아준다.

//1.6. Enum
//변수들을 하나의 그룹으로 묶고 싶을때 Enum이라는 것을 쓴다.
//위에서 부터 순서대ㅗㄹ 0,1,2,3 이라는 값이 부여된다.

//남아있을지, 안 남아있을지 고민이라면 남겨라
//javascript에서 남아있게 하고 싶으면
//위에 ODirection:{Up:1,Down:2...} 이런식으로
//할 수도 있지만 as const 붙이면 된다.
const ODirection = {
  Up: 1,
  Down: 2,
  Left: 3,
  Right: 4,
} as const;

//javascript에서 안 남아있어도 되면
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}
//const a = EDirection.Up;
//const c = EDirection.Left;

//Enum 사용할때
//dir은 저 안에있는 것 중에 사용하겠다.
//function walk(dir:Edirction){}

//keyof
const obj4 = { a: 123, b: "hello" } as const;
//여기서 a,b,c만 꺼내오고 싶을때
//값을 typeof로 쓰고 싶을때 typeof를 붙여준다.
// obj는 js 값 이므로 타입으로 쓸 수 없음
//typeof만 붙이면 {a:string, b:string}이건데
// keyof 까지 붙이면 {a,b}이렇게 된다.
type Key = keyof typeof obj4; //key값 가져옴
type Key2 = (typeof obj4)[keyof typeof obj4]; //obj값 가져옴

//1.7.union(|)과 intersection(&)
//간단하게 할 때는 type을 사용하고
//객체지향 프로그래밍을 하고 싶을때는 interface를 사용하자.
type A = { a: string };
const a5: A = { a: "hello" };

interface B {
  b: string;
}
const a6: B = { b: "hi" };

//union
type A7 = string | number;

//intersection(&)
// type A8 = string & number; 이런 것은 불가능할 것
type intersect = { name: "Eunhye" } & { age: 25 };
//또는 이면 밑에 exmaple에 속성 한 개만 있어도 된다.
type intersect2 = { name: "Eunhye" } | { age: 25 };
const intersectexample = { name: "Eunhye", age: 25 };
