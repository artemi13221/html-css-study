// Arrays
/* 배열에 대해서 공부한다.
 */

"use strict";

// const arr1 = new Array();
const arr2 = [1, 2, 3, 4, 5];
const arr3 = arr2.reverse().sort();

// console.log(arr1);
console.log(arr3);

// console.log(arr3);

// 1. Array to String ==> join
const stringArr = ["Hello", "its", "string"];
console.log(stringArr.join(" "));

// 2. String to Array ==> split
const stringValue = "Hello,its,string";
console.log(stringValue.split(","));

// 3. Array reverse ==> reverse
let array = [1, 2, 3, 4, 5];
console.log(array.reverse());

// 4. splice return new array in delete elements
array = [1, 2, 3, 4, 5];
console.log(array.splice(0, 2));
console.log(array);

class Stduent {
  constructor(name, age, score) {
    this.name = name;
    this.age = age;
    this.score = score;
  }
}

const students = [
  new Stduent("A", 20, 45),
  new Stduent("B", 29, 80),
  new Stduent("C", 28, 90),
  new Stduent("D", 40, 95),
  new Stduent("E", 19, 66),
];

// 5. Make new array include only score >= 50
// filter
{
  const result = students.filter((student) => student.score >= 50);

  console.log(result);
}

// 6. Make new array in multiply all of student score.
// map
{
  const result = students.map((student) => student.score * 2);

  console.log(result);
}

// 7. Return element that you find. Only one element.
// find
{
  const result = students.find((student) => student.score >= 50);

  console.log(result);
}
// 8. some, every
{
  const result = students.some((student) => student.score <= 50);
  console.log(result);
  // some은 모든 요소 중에서 return 조건에 맞는 요소가 1개라도 있으면 true를 반환, 1개도 없으면 false 반환.

  const result2 = students.every((student) => student.score >= 50);
  console.log(result2);
  // every는 모든 요소가 return 조건에 맞다면 true를 반환 이외에 false를 반환.
}

// 9. reduce
{
  const result = students.reduce((prev, curr) => prev + curr.score, 0);

  console.log(result);
}

// Ex
{
  // 짝수만 더한 결과값을 추출하여라
  const arrayEx = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const result = arrayEx
    .filter((item) => item % 2 == 0)
    .reduce((prev, curr) => prev + curr, 0);

  console.log(result);

  const result2 = arrayEx.reduce(
    (prev, curr) => (curr % 2 === 0 ? prev + curr : prev),
    0
  );

  console.log(result2);
}
console.log("hello");
