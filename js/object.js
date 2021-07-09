// Objects
// One of the Javascript's data type.
// a collection of related data and/or functionality.
// Nearly all objects in JavaScript are instances of Object.
// Object = { key : value };
/*
const name = 'namea';
const age = 4;

print(name, age);

function print(name, age) {
    console.log(name);
    console.log(age);
}
// X
*/
"use strict";
// const obj = {}; // object literal
// const obj2 = new Object(); // object constructor

const myName = { name: "myName", age: "14" };
// ==> 두 가지 방법으로 출력 가능.

console.log(myName["name"]);
console.log(myName["age"]);

// 같은 것을 여러 개 작성할 때 유용. ***
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person("myName", 14);

console.log(person1.name);
console.log(person1.age);

// JavaScript에서도 Python과 마찬가지로 in이 존재함.
console.log("name" in person1); // true

// for in, for of

for (let key in person1) {
  console.log(key); //name, age가 순차적으로 출력댐
}

const array = [1, 2, 3, 4];

for (let i of array) {
  console.log(i); //1,2,3,4가 순차적으로 출력댐
}
// array.forEach와 for ...of 중 무엇이 더 좋은가?

// Cloning
const user = { name: "myName", age: "20" };
// const user2 = user;
// 포인터로 연결해준다. 따라서 user2를 변경하면 user의 값도 변경 된다.
// 포인터로 연결해주는 것 말고, 복사는 어떻게 할까? => for in도 가능하지만?
const user3 = {};
Object.assign(user3, user);

user3["name"] = "changeName";
console.log(user3);
// Object.assign을 통해 복사가 가능하다!
