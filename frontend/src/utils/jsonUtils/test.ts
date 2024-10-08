interface IA {
  // foo(): string;
}

interface IAConstructor {
  // new (): IA;
  foo(): string;
}

const A: IAConstructor = class A implements IA {
  // foo(): string {
  //   return 'foo';
  // }

  static foo(): string {
    return 'foo';
  }
};

console.log(A.foo()); // "foo" 출력
// console.log(new A().foo()); // "foo" 출력
