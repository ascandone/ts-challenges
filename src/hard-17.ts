/*
  17 - Currying 1
  -------
  by Anthony Fu (@antfu) #hard #array

  ### Question

  > TypeScript 4.0 is recommended in this challenge

  [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

  For example:

  ```ts
  const add = (a: number, b: number) => a + b
  const three = add(1, 2)

  const curriedAdd = Currying(add)
  const five = curriedAdd(2)(3)
  ```

  The function passed to `Currying` may have multiple arguments, you need to correctly type it.

  In this challenge, the curried function only accept one argument at a time. Once all the argument is assigned, it should return its result.

  > View on GitHub: https://tsch.js.org/17
*/

/* _____________ Your Code Here _____________ */

declare function CurryingJou<Args extends any, Ret>(
  fn: (...args: Args[]) => Ret
): Args extends [] ? "notempty" : "empty";

const curried3Jou = CurryingJou(() => true);

type CurryHelper<Args extends any[], Ret> =
    Args extends [] ? Ret :
    Args extends [infer Hd, ...infer Tl] ? (hd: Hd) => CurryHelper<Tl, Ret>
    : never;


type Curry<Args extends any[], Ret> = Args extends [infer Hd, ...infer Tl]
  ? (hd: Hd) => CurryHelper<Tl, Ret>
  : () => Ret;

type X = Curry<[number, string], 42>;

// fn = () => true
// => Args: []l



declare function Currying<Fn extends (...args: any[]) => any>(
  fn: Fn
): Fn extends () => infer Ret
  ? Ret
  : Fn extends (...args: [infer Hd, ...infer Tl]) => infer Ret
  ? (hd: Hd) => typeof Currying<(...args: Tl) => Ret
  : never;

const curriedTest = Currying((a: number, b: string) => true);

// declare function CurryingFra(fn) {
//   return (...args) => {
//     const [firstArg, args] = args;
//     fn(firstArg, ...args);
//   };
// };

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);

const curried3 = Currying(() => true);

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/17/answer
  > View solutions: https://tsch.js.org/17/solutions
  > More Challenges: https://tsch.js.org
*/
