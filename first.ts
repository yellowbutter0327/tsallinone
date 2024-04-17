//0. 기본 세팅하기
// let a: string = "hello";
// a = 1234;

import { assertObjectExpression, isFor } from '@babel/types';
import { triggerAsyncId } from "async_hooks";
import { arrayBuffer } from "stream/consumers";

// npm init -y
// npm i typescript
// npx tsc
// npx tsc --init
// tsconfig json을 allowjs 해제, strict를 절대 false로 만들지 말기
// target: ES5 라하면 인터넷 익스플로어에서도 돌아가게 한다. ES3까지 가능하다.
// module: 최신 module 쓰고 싶으면  es2015 , node module하고 싶으면 nodejs
// npx tsc --noEmit: 타입 게속 검사, 에디터 없으면 매번 해줘야함
// npx tsc : 에러가 있지만 자바스크립트로 바꿔줌
// forceConsistentCasingInFileNames : 윈도우하다가 리눅스나 맥으로 오면 대소문자 에러
// skipLibCheck : 라이브러리들에는 모두 d.ts와 같은 파일이 있는데 실제로 쓰는 타입만 검사해라.

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

//tuple : 서로 다른 타입의 요소와 고정된 길이를 갖는다.
//터플이라고 읽는다. 터플은 배열 순서를 기억해야한다는 주의점이 있음
//데이터 구조와 타입을 동시에 정의하여 코드를 더 명확하게 표현할 수 있다.
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

//1.8. type aliias, interface extends
type Animal = { breath: true };
type Poyouru = Animal & { breed: true };
type Human = Poyouru & { think: true };

interface C1 {
  breath: true;
}

//여기서 interface D1 extends Human 이렇게도 된다. type을 extends할 수도 있음
interface D1 extends C1 {
  breed: true;
}

const D2: D1 = { breath: true, breed: true };
const zerocho: Human = { breath: true, breed: true, think: true };

//인터페이스는 서로 합쳐진다는 특성이 있어서
//이것을 바탕으로 라이브러리를 수정하기도 한다.

interface C2 {
  talk: () => void;
}

interface C2 {
  eat: () => void;
}

interface C2 {
  shit: () => void;
}

const D3: C2 = { talk() {}, eat() {}, shit() {} };
//예전에는 interface IProps, type TAlias, enum Ehello 이런식으로 네이밍하기도

//1.8. 타입을 집합으로 생각하자 (좁은 타입과 넓은 타입)
//큰 타입과 작은 타입 이런 것을 구분할 줄 알아야 한다.
//좁은 타입에서 넓은 타입으로 대입이 가능하다.
//넓은 타입에서 좁은 타입으로는 대입이 불가능하다.
//여기서 type이 제일 좁은 것은 type C이다.
//객체는 상세할 수록 좁다.
type A9 = { name: string };
type B9 = { age: number };
type AB = A9 | B9;
type C9 = { name: string; age: number };
//이렇게하면 type error가 난다.

//잉여 속성 검사라고 검사를 하나 더 하기 때문이다.
// const D9 : C9 = { name: 'eunhye', age: 25, married: false}
//그럴 때는 이렇게 데이터로 중간에 빼주면 된다.
const D9 = { name: "eunhye", age: 25, married: false };
const F9: C9 = D9;

//1.9. void의 두 가지 사용법'
//interface끼리는 서로 합쳐진다.
//반면 type alias끼리는 합쳐지지 않는다.
//type B : {name:string}, type B : {hobby: string}
//이러면 합쳐지지는 않고 에러가 난다. {a:'hello', b:'go'} 이러면 에러가 난다.
//typescript에서 객체 리터럴을 바로 대입할 때는 잉여 속성 검사라는 추가기능이 있다.

//1.9.1.객체 리터럴에서는 잉여 속성 검사라는게 있다.
interface Ex1 {a:string}
//이렇게 하면 b에서 에러가 난다.
// const exam1: Ex1 = {a:'hello', b:'world'};
//그런데 exam2를 따로 변수로 빼서 관리하면 관리를 안한다.
const exam1 = {a:'hello', b:'world'};
const exam2: Ex1 = exam1;

//void
//이렇게 하면 자동으로 둘다 void로 return 값이 추론된다.
// function a(){
// }
// const b = a;

//void라는건 return 값이 없다는 것, 대신 reutn undefined는 된다. null도 안된다.
//1. 함수 return 값이 void type이라는 것은 리턴 값을 넣으면 안 되는 함수라는 것이다.
//2. 대신 undefined는 되고 null은 안 된다.
// function a():void{
//   return null;
// }

interface Human3 {
  talk: () => void;
}

//void return 값이 이렇게 들어가도 어떻게 되는거지?
const human3 : Human3 = {
  talk(){return 'abc';}
}

//그래서 function에서는 세가지로 기억해야한다.
//이렇게 function으로 한 것 과
//+매개변수로 선언한 void (리턴값 존재해도 된다.)
// a11(() => {
//   return "3";
// });
//리턴값이 있는 건 그 안에 있는 return 값을 사용하지 않겠다는 의미
//리턴값이 없는 건 그냥 리턴값이 없다!
function v1(callback : () => void): void {

}

interface V2 {
  talk: () => void
}
//메소드로 한 것으로


//3.void function 으로 선언할 때랑 메소드로 선언할 때가 다르다!
//함수의 리턴값이 직접적으로 void인 경우에는 리턴하면 에러가 나고
//매개변수와 리턴갑은 상관이 없다.
//return값이 직접적 void는 리턴값이 없다는 듯이고
//매개변수와 리턴 값 의 void는 직접적으로 사용하지 않겠다라는 의미
function a10(): void {}

//void는 리턴값이 void 인 것, 매개변수가 void 함수 들어간 것, 메서드 보이드 함수 들어간 것
//신기한 것은 매개변수가 void인 함수도 return 값이 존재해도 된다.

//함수에 이렇게 직접적으로 존재할 때만 return 값 쓰면 안된다.
function a11(callback: () => void): void {}

a11(() => {
  return "3";
});

//메서드도 리턴값이 존재할 수 있다.
interface Human11 {
    talk: () => void;
  }
  
  const human10 : Human11 {
      talk(){return 'abc';} //talk(){return } 이렇게 해도 되는데
  }

  //declare
  //함수도 body없이 선언할 수 있다.
  //declare 안 붙이면 원래 forEach 처럼 선언해줘야하는데
  //declare붙이면 안 그래도 된다. 다만 js로 변환안된다.
  //declare는 외부에서 선언된,다른데서 선언된걸 내가 보장할 수 있어 이런경우 붙인다..
  declare function forEach(arr: number[], callback:(el:number) => undefined) :void;
//   forEach(){
//   }
let target : number[] = [];
//이렇게 하면 callback 값이 undefined이기 때문에 에러가 난다.
// forEach([1,2,3], el => target.push(el));

//undefied를 number로 선언해도, void로 선언해도 에러가 안 난다.
//매개변수에서 쓰이는 void는 실제 리턴 값이 뭐든 상관 안한다는 것이기 때문이다.!!
//{target2.push(el)} 처럼 리턴 값을 없애도 쓸 수 있게 한다.
declare function forEach2(arr: number[], callback:(el:number) => void) :void;
let target2 : number[] = [];
//만약 void를 undefined로 바꾸면 이 두개는 원래는 같은 값이 나와야하지만
//다른 에러가 뜬다. number랑 undefined 에러
//number로 바꾸면 위에가 여전히 number에러가 뜬다. 
//그래서 결국 void로 바꾸게 된다.
//반대로 undefined는 void에 대입 가능하다.
forEach2([1,2,3], el => target2.push(el));
forEach2([1,2,3], el => {target2.push(el)});
//1.10. unknown과 any(그리고 타입 대입가능표)
//unknown을 쓸 바에는 any를 쓰자.
//unknown을 쓰면 직접 타입을 정해주어야 한다.
//unknwon도 없는게 베스트지만 지금 당장 타입을 모를때 쓴다.
interface A11{
    talk2: () => void;
}
//이렇게 해도 되는데
const b11 : A11 = {
    talk2(){return 3;}
}

const b12 = b11.talk2() as unknown as number;
// interface A{
//   talk:()=> void;
// }

//이렇게 해도 에러 안나는데 
// const a:A ={
//   talk(){return 3;}
// }

//문제는 이렇게 하면 에러가 난다.
//애초에 void자체는 return 값이 없어야하는데 3이 있는거니까
//const b = a.talk();
//그래서 이런건 책임진다고 하면 이렇게 바꿔줘야 한다.
//const b = a.talk() as unknown as number; 

//b11.talk2() as number 하면 에러나는데 에러 책임질 수 있으면 unknwon 붙인다.
//혹은 const b = <number><u nk..></ua.talk()이렇게 근데 as number를 추천한다.

//unknown 은 당장 타입은 모르겠고 
//나중에 쓸 때
const c11 : unknown = b11.talk2();
(b11 as A11).talk2();

//unknown error 뜨는 대표적인 것이 try catch임

//b11 to string이 숫자여서 안되니까 위에 d11처럼 as unknown으로 강제로 바꿔줘야한다.
b11.toString();

//unknown이 나오는 가장 흔한 경우가 try error 일때이다.
//타입 지정 안해주면 error가 unknown이 나온다.
try{

}catch(error){
  (error as Error).message
}

//error as AxiosError 이런 것도 있다.

//빈배열은 모두 never이다.
//any가 떠도 문제지만 never가 떠도 문제니까 
//문제 안생기게 타이핑 잘 해주자.
//초록색 체크화살표도 없는 것이라 생각하자.
//표 보고 any는 void에 대입가능하다, undefined는 void에 대입가능하다
//근데 null은 안된다.. 이렇게 생각하면 된다.
// 이건되는데 null은 안된다는..
// function a():void{
//   return undefined;
// }

//1.11. 타입 좁히기(타입 가드)
//에러 메세지는 마지막 것만 보면 된다.
//이렇게 a가 number일 수도, string 일 수도 있는 경우가 있을때
//as number는 위험한 방법이다.
//numOrstr 처럼 밑에서 실수할 수도 있기 때문이다.
//unknown일 때 빼고는 as 안 해야한다!
// function numOrStr(a:number | string){
//   (a as number).toFixed(1);
// }

// numOrStr('123')

function numOrStr(a:number |string){
  if(typeof a === 'number'){
    a.toFixed(1);
  }else{
    a.charAt(3);
  }
  if(typeof a === 'string'){
    a.charAt(3);
  }
  //애초에 boolean이 들어올 수 없기 때문에
  //이 경우는 a가 never가 된다.
  // if(typeof a === 'boolean'){
  //   a.toString();
  // }
}

//이렇게 배열일때는 Array isArray 이런식으로 표현한다.
//배열아니면 typeof으로 체크한다.
function numOrNumArray(a:number | number[]){
  if(Array.isArray(a)){
    a.concat(4);
  }else{
    a.toFixed(3);
  }
}

//클래스는 그 자체로 타입이 될 수 있다.
//인스턴스의 이름을 클래스 타입으로 한다는 뜻임

class A13{
  aaa(){}
}

class B13{
  bbb(){}
}

function aOrB(param: A13 | B13){
  //클래스에서는 instanceof 를 사용한다.
if(param instanceof A13){
  param.aaa();
}
}

type B14 = {type: 'b14', bbb:string};
type C14 = {type: 'c14', ccc:string};
type D14 = {type: 'd14', ddd:string};

//객체 간의 타입 구별 예시
//안에 속성 만으로도 구별을 해준다.
function typeCheck(a: B14|C14|D14){
  if(a.type === 'b14'){
  a.bbb;
  }else if (a.type === 'c14'){
    a.ccc;
  }else{
    a.ddd;
  }
}

aOrB(new A13());
aOrB(new B13()); 

//값으로 구분을 했다면 속성으로 구분하는 방법
function typeCheck2(a: B14|C14|D14){
  if('bbb' in a){
  a.bbb;
  }else if ('ccc' in a){
    a.ccc;
  }else{
    a.ddd;
  }
}

//객체를 여러개 만들때 이런 습관을 들여놓으면 좋다.
const human = {type:'human'};
const dog = {type:'dog'};
const cat = {type:'cat'};
//아니면 함수로 꺼내쑬 수 있게 
const human2 = {walk()};
const dog2 = {bow()};
const cat2 = {eat()};
//쓸때는 이런식으로
// if('walk' in a){
//   a
// }
//1.12. 커스텀 타입 가드(is, 형식 조건자)
//위에처럼말고 타입을 구분해주는 커스텀 함수를 직접 만들 수 있다.
//return값이 is가 들어가 있는 것은 커스텀 타입 가드 함수이다. 
//타입가드함수는 if문 안에 써서 정확한 타입을 알ㄹ려주는 것이다.
//대신 타입 판별은 직접 코딩을 해야한다.
//위에껄로 타입판별하기 너무 복잡하거나, is가 아니면 타입 추론이 안되는 경우
interface Cat{meow2:number};
interface Dog{bow2:number};
function catOrDog(a:Cat|Dog) : a is Dog{
  if((a as Cat).meow2){return false}
  return true
}

function pet(a: Cat | Dog){
  //밑에처럼도 할 수 있는데 커스텀 함수로도 할 수 있다.
  if(catOrDog(a)){
    console.log(a.bow2);
  }

  if('meow2' in a){
    console.log(a.meow2);
  }
}

//1.13.{}과 Object
//ts 4.8 업그레이드 버전과 관련이 있다.
//{}이랑 Object가 꼭 객체를 뜻하는게 아니라 문자열도 대입이 된다..
//즉, null과 undefined를 제외한 모든 타입을 뜻한다!
//실제 객체는 소문자로 해야한다.
const x15: {} = 'hello';
const y15:Object = 'hi'; 
const y16:object = {hello:'world'}; //object 지양, interface, type, class 쓰면 된다.
//{},Object: null과 undefined를 제외한 모든 타입을 뜻한다!
//unknown = {}|null|undefined; 합쳐진 것이라 생각하면 된다.
//4.8버전 이전에는 이렇게 하면
//if(z){z;} 이 타입이 그대로 unknwon이 나왔다. 하지만 4.8이후에는 {} 이렇게 나온다.
//이 타입은 객체가 아니라 모든 타입을 나타낸다.
const z15:unknown = 'hi';
if(z15){
  z15; //4.8이상에서는 {}이렇게 나온다. if문 안에 들어가면 null,undefined가 나와서 
}else{
  x15;
}


//1.14. readonly, 인덱스드 시그니처, 맵드 타입스
//readonly: 속성을 실수로 바꿔주는 것을 막아주는 readonly;
interface A16 {
  readonly a:string;
  b:string;
}

const aaaa:A16 = {a:'hello', b:'world'};
// aaaa.a = '123'; readonly 했기 때문에 안 바뀐다. 

//인덱스드 시그니처: 속성이 많은데 다 문자열이었으면 좋겠어.., 
// type A = {a:string, b:string, ...., d:string}
// type A = { [key:string]:string };
// type A = {a:3, b:1, ...., d:5}
// type A = { [key:string]:number};

//맵드 타임스
//이렇게 키에 제한을 걸어둘 수 있다. 
//인터페이스는 |나 &가 안돼서 type으로 써야한다.
type B17 = 'Human' | 'Mammal' | 'Animal';
type A17 = {[key in B17] : number};
const aaaa17 : A17 = {Human:123, Mammal: 5, Animal:3};


//1.15. 클래스의 새로운 기능들 -implements, abstract, public, protected, private
class A18{
  a:string;
  b:number;
  //constructor 적어주는게 정석이고 안적으면 이렇게 하면 된다.
  // a:string ='123';
  // b:number = 123;

  //b처럼 기본값이 있으면 new A18('123') 이렇게 뒤에없어도
  //b? 물음표 안붙인다. new A18('123',999) 이렇게 넣어주면 값 덮어쓰겠지
  constructor(a:string, b: number= 123){
    this.a = a;
    this.b = b;
  }

  method(){

  }
}


const a20 = new A18('123',123);
//기본값은 안 넣어줘도 에러가 안난다.
const a21 = new A18('123')

//클래스 이름은 그 자체로 타입이 될 수 있다.
//A18은 클래스를 가리키는게 아니라 new A18를 가리킨다.
type A19 = A18;
const a22: A18 = new A18('123');
//클래스 자체의 타입은 typeof이다.
//클래스 이름은 인스턴스를 가리킨다.
//new A18('123')가 아니라 A18이다.
const b22: typeof A18 = A18;

//자바스크립트의 property보다는 ts를 추천한다.
//protected랑 구분이 안되기 때문이다.
//private property
//앞에 # 붙이면 된다.

class A20{
  private a:string = '123';
  #b:number = 123;
  //protected가 안되기 때문에 정교하게 쓰고 싶으면 private
  
  method(){
  console.log(this.a, this.#b);
  }
}

//class가 interface를 따라야한다.
//js로 변환되면 interface, implements 사라진다.
//class 모양을 interface로 통제할 수 있다.
interface A21{
  readonly a :string;
  b: string;
}

//java에서는 객체지향 중시하는 사람은 꼭 implements 만들어서 쓴다.
//근데 이건 js니까 interface 안 만들어 쓰는 사람이 많다.
//interface는 js로 변환해도 사라지는데 
//class같은 경우는 사라지지 않아서 class내부의 것을 가져다 쓸 수 있다.
//강사님은 implements를 거의 쓰지 않는다. abstract로 추상 클래스 만들어서 써도 되니까
class B21 implements A21 {
  //private, protectec가 객체지향에서 쓰는 것
  //class B21 안에서만 쓸 수 있음
  //여기서도 readonly 붙일 수 있음
  //근데 private readonly랑 private랑은 다르다고 보겠지
  private a: string = '121';
  protected b: string = 'world';
  //public은 일반적인 속성으로 아무렇게나 접근이 가능하다.
  public c: string= 'wow';
  method(){
    //이렇게 클래스 안에서는 쓸 수 있는데 밖에서는 못쓴다.
    //참고로 콘솔을 쓰려면 lib에서 dom을 추가해주자
    console.log(this.a);
    //protected도 안에서는 기본으로 쓸 수 있다. 밖에서 못씀
    console.log(this.b);
    //public은 밑에 C21 말고 여기 안, 즉 안, 밖 둘다 쓸 수 있음
    console.log(this.c);
  }
}

//추상 클래스도 가능
//실제 구현은 class C21~ 여기서 한 거
// abstract class B21{
//   private a: string = '121';
//   protected b: string = 'world';
//   abstract method(): void;
// 추상 클래스도 실제적인 메서드도 갖고 있을 수 있다. 
// method2(){
// return '3'
// }
// }
//abstract로 되어있는거는 밑에 C21이든 어디서든 반드시 구현해줘야한다.

class C21 extends B21{
  //protected, private 차이 : 상속받았을때 쓸 수 있냐

method(){
  //얘는 private 니까 못쓴다.
  // console.log(this.a);
  console.log(this.b);
  console.log(this.c);
}
 
}

//private는 이렇게 접근이 안되는 애들
//protected도 밖에서는 못 쓴다.
//c는 public이니까 아무렇게 접근이 가능하다.
 // new C21().a;
// new C21().b;
new C21().c;

//정리
//         public     protected    private
//클래스내부    o           o           o
//인스턴스     o           x           x
//상속클래스    o           o          x

//js로 변환하면 public, private 다 사라진다. 

//1.16. 옵셔널, 제네릭 기본
function abc(a:number, b?:number, c?:number){}
abc(1);
abc(1,2) //abc(1,2,3)이렇게 없어도 된다.
//그럼 abc(1,2,3,4) 이렇게 전부받고 싶으면?
//이런식으로 짜면 된다.
function abc2(...args:number[]){}

let objjeneric : {a:string, b?:string} = {a:'hello', b:'world'};
objjeneric = {a:'hello'};

//제네릭 : 타입을 변수처럼 만드는 것
//만들어놓을때는 어떤 타입인지 모르지만 실제로 사용할 때 그 타입이 정해진다.
function genericAdd<T extends string|number>(x:T, y:T):T{
  return x + y
}
genericAdd(1,1);
genericAdd('2','3');
// 얘는 안되겠지 genericAdd(1,'3');
//genericAdd(true,false) 이렇게 하면 안되니까 extends로 타입정해준다.

//제네릭을 여러개만들면서 각각 제한을 둘 수도 있다.
function genericAdd2<T extends string, K extends number>(x:T, y:K):T{
  return x + y
}

function genericAdd3<T extends {a:string}>(x:T):T{return x};
genericAdd3({a:"hello"})

function genericAdd4<T extends string[]>(x:T):T{return x};
genericAdd4(['1','2','3'])


function genericAdd5<T extends (a:string) => number>(x:T):T{return x};
genericAdd5((a) => +a);

//모든 함수 : 제한 없다는 뜻 (많이 쓰지는 않는다.)
function genericAdd6<T extends (...args:any) => any>(x:T) : T {return x};

//constructor 타입 정의
function genericAdd7<T extends abstract new (...args:any) => any>(x:T) : T {return x};
//class A{} add(new A()) 이렇게 new는 안되는데 add(A)이렇게는 된다.
interface Aa{
  constructor():void
}
class A22 implements Aa{
  constructor(){}
}
genericAdd7(A22) 
//  이렇게는 된다. 생성자는 된다. class는 생성자니까
//class A는 A 자체가 타입이다. class 안에 constructor가 있는데
//이 constructor의 타입은 무엇일까
//abstract가 꼭 들어가 있어야 한다. 
//<T extends abstract new (...args :any) => any> 이런식으로 생성자
//1.17. 기본값 타이핑
const add5 = <T>(x : T, y: T)=>({x,y});
//보통 react에서는 jsx 문법 때문에 <T = unknown> 이런식으로 기본 값을 넣어주기도 한다.
const add6 = <T = unknown>(x : T, y: T)=>({x,y});
//이렇게 하던가 아니면 <T extends unknown> 이런식으로 하던가
//<T,> 이렇게 해도 되는데 의도가 드러나지 않기 때문에 왠만하면..

//2. 섹션 2. lib.es5.d.ts 분석

