const boolean: boolean = true;
const number: number = 1;
const string: string = 'a';
const array: Array<number> = [1, 2, 3];
const tuple: [number, string] = [1, 'a'];
enum Enum {
  Male,
  Female
}
const any: any = { foo: [1] };
const void_: void = undefined;
const undefined_: undefined = undefined;
const null_: null = null;
const object: Object = {};
const function_: Function = function () {};
// const never: never; // never

// 関数のsignature
type Increment = (num: number) => void;
const increment: Increment = (num: number) => {
  console.log(num);
};

// 複雑なやつ
type Listener<T = never> = T extends never
  ? () => void
  : (arg1: T) => void;
// interface
interface Events {
  on<T = never>(eventName: string, callback: Listener): void;
  on<T>(eventName: 'click', callback: Listener<T>): void;
}

class EventEmitter implements Events {
  public on<T>(eventName: string, callback: Listener<T>) {
    console.log(eventName, callback);
  }
}

const ee = new EventEmitter();
ee.on<number>('click', (arg1) => {
  console.log(arg1); // arg1はnumberと推測されてる
});
