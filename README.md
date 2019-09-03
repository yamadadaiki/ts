# TypeScript

See official handbook: https://www.typescriptlang.org/docs/handbook/basic-types.html

- JavaScriptにtranspileする
- 静的型付け言語 

## 最初に

### tsconfig.json

TypeScriptの振る舞いを決める.  
主にcompilerOptions

- https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
- https://www.typescriptlang.org/docs/handbook/compiler-options.html

### compilerOptions

絶対に設定した方がいいもの  
**\\\\ ランタイムでのバグが減る //**

- **strict: true**  
  以下を全部有効にする
  - noImplicitAny  
    any禁止
  - noImplicitThis  
    thisが定義されてない部分でthisを使えなくする  
    bindを使った追いづらいクソコードが減る
    ```ts
    // NG
    function foo() {
      this.bar(); // NG with noImplicitThis
    }
    // OK
    interface Self {
      bar(): void;
    }
    function foo(this: Self) {
      this.bar();
    }
    ```
  - alwaysStrict  
    "use strict"
  - strictBindCallApply  
    bind(), call(), apply()がより厳密になる
    ```
    function foo(bar: number) {}
    foo.call(null); // NG with strictBindCallApply
    foo.call(null, 1); // OK
    ```
  - **strictNullChecks**  
    null checkを必須にする  
    `Cannot read property 'FOO' of undefined` や `FOO is not a function` のエラーと90%くらいおさらばできる
    ```ts
    const foo: { bar?: number } = {};
    foo.bar.toFixed(2) // NG with strictNullChecks
    foo.bar && foo.bar.toFixed(2) // OK
    ```
  - strictFunctionTypes  
  関数のsignatureでupcast的なのができなくする
  ```ts
  declare let f1: (x: Animal) => void;
  declare let f2: (x: Dog) => void;
  f1 = f2;  // NG with strictFunctionTypes
  f2 = f1;  // Ok
  ```
  - strictPropertyInitialization  
  メンバ変数のconstructorでの初期化が必須になる
  ```ts
  class Foo {
    bar: string; // NG with strictPropertyInitialization
    bar: string = 'bar'; // OK
    bar: string | void; // OK
  }
  ```
- **noImplicitReturns**  
  関数の中でif文とか書いてる時にあるパターンではreturnする、あるパターンではreturnしない、みたいなのを防ぐ

## 型

Boolean, Number, String, Array, Tuple, Enum, Any, Void, Null and Undefined, never, Object, Function

### Array

```ts
const foo: Array<number> = [1];
const foo: Array<number | string> = [1, 'a'];
const foo: number[] = [1];
const foo: (number | string)[] = [1, 'a'];
```

### Tuple

```ts
const foo: [number, string] = [1, 'a"];
```

### Enum

```ts
enum Foo {
  Bar, // 値は0, 1, 2
  Baz = 'baz' // string enum
}
```

### void vs undefined

voidはstrictNullChecksで挙動が変わる
strictNullChecksがtrueだとnullは含められない

```ts
function foo(bar: void) {}

foo(); // OK
foo(undefined); // OK


function foo(bar: undefined) {}

foo(); // NG
foo(undefined); // OK


function foo(bar: null) {}

foo(); // NG
foo(null); // OK
```

### Generics

enum UserType {
  Recruiter,
  Candidate
}
type User<T extends UserType> = {
  type: T;
}

### let vs const

const使いましょう

### infer

```ts

enum UserType {
  Recruiter,
  Candidate
}
type User<T extends UserType> = {
  type: T;

} & (T extends UserType.Recruiter ? {
  recruiterOnlyProp: string;
} : {})

const recruiter: User<UserType.Recruiter> = {
  type: UserType.Recruiter,
  recruiterOnlyProp: 'a'
};
const candidate: User<UserType.Candidate> = {
  type: UserType.Candidate
};
```

### キャスト

明示的なキャストはasを使う
無理やり
```ts
type User = {
  id: number;
  name: string;
  age?: number; // optional
}

// これだとUserでなく{ id: number; name: string; }という型になっている
const yamada = {
  id: 1,
  name: 'Yamada'
};

// Userとして扱いたい場合は以下のどちらか
const yamada: User = {
  id: 1,
  name: 'Yamada'
};
const yamada = {
  id: 1,
  name: 'Yamada'
} as User;

// Userを拡張したtype
type AdminUser = User & {
  
};
```

## interface

ほぼtypeと同じだがtypeと違ってmergeされたりする

```ts
interface User {
  id: number;
}
interface User {
  name: string;
}

const user: User = {
  id: 1,
  name: 'yamada'
};
```
