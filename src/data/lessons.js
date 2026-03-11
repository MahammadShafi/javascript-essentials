export const lessons = [
  {
    id: 'variables',
    title: 'Variables & Data Types',
    icon: '📦',
    description: 'Learn about var, let, const and JavaScript data types.',
    content: `## Variables & Data Types

JavaScript has three ways to declare variables:

- **\`var\`** — function-scoped, hoisted (legacy)
- **\`let\`** — block-scoped, can be reassigned
- **\`const\`** — block-scoped, cannot be reassigned

### Primitive Types

\`\`\`js
let name = "Alice";          // string
let age = 30;                // number
let isActive = true;         // boolean
let nothing = null;          // null
let notDefined;              // undefined
let id = Symbol("id");       // symbol
let big = 9007199254740991n; // bigint
\`\`\`

### Type Checking

Use \`typeof\` to check a value's type:

\`\`\`js
typeof "hello"   // "string"
typeof 42        // "number"
typeof true      // "boolean"
typeof undefined // "undefined"
typeof null      // "object" ← famous quirk!
typeof {}        // "object"
typeof []        // "object"
typeof function(){} // "function"
\`\`\`

### Template Literals

\`\`\`js
const greeting = \`Hello, \${name}! You are \${age} years old.\`;
\`\`\``,
    playground: {
      starter: `// Try declaring different variable types
const name = "Alice";
let age = 30;
var legacy = "I'm old-school";

// Template literal
const greeting = \`Hello, \${name}! Age: \${age}\`;
console.log(greeting);

// Check types
console.log(typeof name);   // string
console.log(typeof age);    // number
console.log(typeof null);   // object (quirk!)
console.log(typeof []);     // object
`,
    },
    quiz: [
      {
        question: 'Which keyword declares a block-scoped variable that can be reassigned?',
        options: ['var', 'let', 'const', 'function'],
        answer: 1,
      },
      {
        question: 'What does typeof null return?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        answer: 2,
      },
      {
        question: 'Which of these is NOT a primitive type in JavaScript?',
        options: ['string', 'number', 'array', 'boolean'],
        answer: 2,
      },
    ],
  },
  {
    id: 'functions',
    title: 'Functions',
    icon: '⚙️',
    description: 'Function declarations, expressions, arrow functions and scope.',
    content: `## Functions

Functions are reusable blocks of code. JavaScript has several ways to define them.

### Function Declaration

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Function Expression

\`\`\`js
const greet = function(name) {
  return \`Hello, \${name}!\`;
};
\`\`\`

### Arrow Functions

Arrow functions provide a concise syntax and do **not** have their own \`this\`.

\`\`\`js
const greet = (name) => \`Hello, \${name}!\`;

// Multi-line arrow function
const add = (a, b) => {
  const sum = a + b;
  return sum;
};
\`\`\`

### Default Parameters

\`\`\`js
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}
greet(); // "Hello, World!"
\`\`\`

### Rest & Spread

\`\`\`js
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10
\`\`\``,
    playground: {
      starter: `// Function declaration
function square(n) {
  return n * n;
}

// Arrow function
const cube = (n) => n * n * n;

// Default parameters
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}

// Rest parameters
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);

console.log(square(5));       // 25
console.log(cube(3));         // 27
console.log(greet());         // Hello, World!
console.log(greet("Alice"));  // Hello, Alice!
console.log(sum(1, 2, 3, 4)); // 10
`,
    },
    quiz: [
      {
        question: 'Arrow functions have their own `this` binding.',
        options: ['True', 'False'],
        answer: 1,
      },
      {
        question: 'What syntax is used for rest parameters?',
        options: ['**args', '...args', '>>args', '##args'],
        answer: 1,
      },
      {
        question: 'Which is a valid arrow function returning a value immediately?',
        options: [
          'const f = x => { x * 2 }',
          'const f = x => x * 2',
          'const f = (x) { return x * 2 }',
          'const f = function => x * 2',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 'arrays',
    title: 'Arrays',
    icon: '📋',
    description: 'Creating, accessing and transforming arrays with built-in methods.',
    content: `## Arrays

Arrays store ordered lists of values.

### Creating Arrays

\`\`\`js
const fruits = ["apple", "banana", "cherry"];
const nums = [1, 2, 3, 4, 5];
const mixed = [1, "two", true, null];
\`\`\`

### Accessing Elements

\`\`\`js
fruits[0]       // "apple"
fruits.at(-1)   // "cherry" (last element)
fruits.length   // 3
\`\`\`

### Mutating Methods

\`\`\`js
fruits.push("date");      // add to end
fruits.pop();             // remove from end
fruits.unshift("avocado"); // add to start
fruits.shift();           // remove from start
fruits.splice(1, 1, "blueberry"); // replace index 1
\`\`\`

### Transforming Methods (return new arrays)

\`\`\`js
const nums = [1, 2, 3, 4, 5];

nums.map(n => n * 2);          // [2, 4, 6, 8, 10]
nums.filter(n => n % 2 === 0); // [2, 4]
nums.reduce((acc, n) => acc + n, 0); // 15
nums.find(n => n > 3);         // 4
nums.every(n => n > 0);        // true
nums.some(n => n > 4);         // true
nums.includes(3);              // true
nums.slice(1, 3);              // [2, 3]
\`\`\`

### Destructuring

\`\`\`js
const [first, second, ...rest] = [1, 2, 3, 4];
// first=1, second=2, rest=[3,4]
\`\`\``,
    playground: {
      starter: `const nums = [1, 2, 3, 4, 5, 6];

// map — transform each element
const doubled = nums.map(n => n * 2);
console.log("doubled:", doubled);

// filter — keep matching elements
const evens = nums.filter(n => n % 2 === 0);
console.log("evens:", evens);

// reduce — combine into single value
const total = nums.reduce((sum, n) => sum + n, 0);
console.log("total:", total);

// find — first matching element
const bigNum = nums.find(n => n > 4);
console.log("first > 4:", bigNum);

// Destructuring
const [head, ...tail] = nums;
console.log("head:", head, "tail:", tail);
`,
    },
    quiz: [
      {
        question: 'Which method returns a NEW array without modifying the original?',
        options: ['push()', 'splice()', 'map()', 'pop()'],
        answer: 2,
      },
      {
        question: 'What does array.at(-1) return?',
        options: [
          'The first element',
          'undefined',
          'The last element',
          '-1',
        ],
        answer: 2,
      },
      {
        question: '[1,2,3].reduce((acc, n) => acc + n, 0) returns:',
        options: ['[1,2,3]', '6', '0', '123'],
        answer: 1,
      },
    ],
  },
  {
    id: 'objects',
    title: 'Objects',
    icon: '🗂️',
    description: 'Object literals, properties, methods and destructuring.',
    content: `## Objects

Objects store key-value pairs (properties).

### Object Literals

\`\`\`js
const person = {
  name: "Alice",
  age: 30,
  isActive: true,
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};
\`\`\`

### Accessing Properties

\`\`\`js
person.name        // dot notation
person["age"]      // bracket notation (useful for dynamic keys)
\`\`\`

### Spread & Object Methods

\`\`\`js
// Clone and extend
const updated = { ...person, age: 31, city: "NYC" };

// Object.keys / values / entries
Object.keys(person);    // ["name", "age", "isActive", "greet"]
Object.values(person);  // ["Alice", 30, true, ƒ]
Object.entries(person); // [["name","Alice"], ["age",30], ...]
\`\`\`

### Destructuring

\`\`\`js
const { name, age, city = "Unknown" } = person;
// city defaults to "Unknown" if not on object
\`\`\`

### Computed Property Names

\`\`\`js
const key = "score";
const game = { [key]: 100 }; // { score: 100 }
\`\`\`

### Optional Chaining

\`\`\`js
const city = person?.address?.city; // undefined, no error
\`\`\``,
    playground: {
      starter: `const person = {
  name: "Alice",
  age: 30,
  address: { city: "Wonderland" },
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};

// Access properties
console.log(person.name);
console.log(person["age"]);

// Destructuring with default
const { name, age, country = "Unknown" } = person;
console.log(name, age, country);

// Spread to create new object
const updated = { ...person, age: 31, job: "Developer" };
console.log(updated);

// Optional chaining
console.log(person?.address?.city);   // "Wonderland"
console.log(person?.phone?.number);   // undefined

// Object.entries loop
for (const [key, val] of Object.entries(person)) {
  if (typeof val !== "function" && typeof val !== "object") {
    console.log(\`\${key}: \${val}\`);
  }
}
`,
    },
    quiz: [
      {
        question: 'What does optional chaining (?.) do when a property is undefined?',
        options: [
          'Throws a TypeError',
          'Returns undefined instead of throwing',
          'Returns null',
          'Skips the expression',
        ],
        answer: 1,
      },
      {
        question: 'Object.entries(obj) returns:',
        options: [
          'An array of keys',
          'An array of values',
          'An array of [key, value] pairs',
          'A new object',
        ],
        answer: 2,
      },
      {
        question: 'const { x = 5 } = {} — what is the value of x?',
        options: ['undefined', 'null', '5', 'Error'],
        answer: 2,
      },
    ],
  },
  {
    id: 'loops',
    title: 'Loops & Iteration',
    icon: '🔁',
    description: 'for, while, for...of, for...in and iteration patterns.',
    content: `## Loops & Iteration

### Classic for Loop

\`\`\`js
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
\`\`\`

### while / do...while

\`\`\`js
let i = 0;
while (i < 3) {
  console.log(i++);
}

let n = 0;
do {
  console.log(n++); // runs at least once
} while (n < 0);
\`\`\`

### for...of (iterables: arrays, strings, Maps, Sets)

\`\`\`js
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

// With index using entries()
for (const [i, fruit] of fruits.entries()) {
  console.log(i, fruit);
}
\`\`\`

### for...in (object keys)

\`\`\`js
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key, obj[key]);
}
\`\`\`

### break / continue

\`\`\`js
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // skip 3
  if (i === 7) break;    // stop at 7
  console.log(i);
}
\`\`\``,
    playground: {
      starter: `// Classic for loop
for (let i = 1; i <= 5; i++) {
  console.log(\`i = \${i}\`);
}

// for...of with array
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}

// for...of with entries (index + value)
for (const [idx, color] of colors.entries()) {
  console.log(idx, color);
}

// for...in with object
const scores = { alice: 95, bob: 87, carol: 92 };
for (const name in scores) {
  console.log(\`\${name}: \${scores[name]}\`);
}

// break and continue
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = [];
for (const n of nums) {
  if (n % 2 === 0) continue;
  if (n > 7) break;
  result.push(n);
}
console.log("odds up to 7:", result);
`,
    },
    quiz: [
      {
        question: 'Which loop is best for iterating over array values?',
        options: ['for...in', 'for...of', 'while', 'do...while'],
        answer: 1,
      },
      {
        question: 'What does continue do inside a loop?',
        options: [
          'Exits the loop entirely',
          'Skips the current iteration',
          'Pauses execution',
          'Restarts the loop',
        ],
        answer: 1,
      },
      {
        question: 'for...in is designed to iterate over:',
        options: ['Array values', 'String characters', 'Object keys', 'Map entries'],
        answer: 2,
      },
    ],
  },
  {
    id: 'closures',
    title: 'Closures & Scope',
    icon: '🔒',
    description: 'Lexical scope, closures and the module pattern.',
    content: `## Closures & Scope

### Lexical Scope

A function can access variables from its outer (enclosing) scope.

\`\`\`js
function outer() {
  const message = "Hello";
  function inner() {
    console.log(message); // "Hello" — accessed via closure
  }
  inner();
}
\`\`\`

### What is a Closure?

A **closure** is a function that remembers the variables from its lexical scope even after the outer function has returned.

\`\`\`js
function makeCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
\`\`\`

### Practical Use: Factory Functions

\`\`\`js
function multiplier(factor) {
  return (n) => n * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

double(5); // 10
triple(5); // 15
\`\`\`

### Closure Pitfall with var

\`\`\`js
// Bug: all callbacks share same i
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3
}

// Fix: use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}
\`\`\``,
    playground: {
      starter: `// Basic closure
function makeGreeter(greeting) {
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}

const sayHello = makeGreeter("Hello");
const sayHi = makeGreeter("Hi");

console.log(sayHello("Alice")); // Hello, Alice!
console.log(sayHi("Bob"));     // Hi, Bob!

// Counter with closure
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => { count = start; return count; },
    value: () => count,
  };
}

const counter = makeCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.reset());     // 10
`,
    },
    quiz: [
      {
        question: 'A closure can access variables from its outer scope after the outer function returns.',
        options: ['True', 'False'],
        answer: 0,
      },
      {
        question: 'What will makeCounter() return?',
        options: ['A number', 'A string', 'A function', 'undefined'],
        answer: 2,
      },
      {
        question: 'Why does using var in a for loop with async callbacks cause issues?',
        options: [
          'var is not allowed in for loops',
          'All callbacks share the same var variable by reference',
          'var causes syntax errors inside loops',
          'Callbacks cannot access loop variables',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 'promises',
    title: 'Promises & Async/Await',
    icon: '⏳',
    description: 'Asynchronous JavaScript with Promises and async/await syntax.',
    content: `## Promises & Async/Await

### What is a Promise?

A **Promise** represents a value that may be available now, in the future, or never.

\`\`\`js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done!"), 1000);
});

promise
  .then(value => console.log(value))  // "Done!"
  .catch(err => console.error(err));
\`\`\`

### Promise States

- **pending** — initial state
- **fulfilled** — resolved with a value
- **rejected** — rejected with a reason

### Promise Combinators

\`\`\`js
// Wait for ALL to resolve
Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => {});

// First to settle (resolve OR reject)
Promise.race([p1, p2]).then(result => {});

// Wait for ALL to settle (regardless of outcome)
Promise.allSettled([p1, p2]).then(results => {});
\`\`\`

### Async/Await

\`async/await\` is syntactic sugar over Promises for cleaner code.

\`\`\`js
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed:", error);
  }
}
\`\`\`

### Parallel Async Operations

\`\`\`js
async function loadAll() {
  const [users, posts] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  return { users, posts };
}
\`\`\``,
    playground: {
      starter: `// Creating a Promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: \`Item \${id}\` });
      } else {
        reject(new Error("Invalid ID"));
      }
    }, 100);
  });
}

// Using .then()/.catch()
fetchData(1)
  .then(data => console.log("Got:", data))
  .catch(err => console.error("Error:", err.message));

// Using async/await
async function main() {
  try {
    const item = await fetchData(2);
    console.log("Async got:", item);

    // Parallel requests
    const [a, b] = await Promise.all([fetchData(3), fetchData(4)]);
    console.log("Parallel:", a, b);

    // This will reject
    await fetchData(-1);
  } catch (err) {
    console.error("Caught:", err.message);
  }
}

main();
`,
    },
    quiz: [
      {
        question: 'What are the three states of a Promise?',
        options: [
          'start, running, done',
          'pending, fulfilled, rejected',
          'waiting, resolved, failed',
          'init, success, error',
        ],
        answer: 1,
      },
      {
        question: 'Promise.all() rejects if:',
        options: [
          'All promises reject',
          'The first promise rejects',
          'Any one promise rejects',
          'More than half reject',
        ],
        answer: 2,
      },
      {
        question: 'async/await is:',
        options: [
          'A completely new async mechanism',
          'Syntactic sugar over Promises',
          'Only available in Node.js',
          'Faster than Promises',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 'es6',
    title: 'ES6+ Features',
    icon: '✨',
    description: 'Modern JavaScript: modules, classes, destructuring and more.',
    content: `## ES6+ Features

### Classes

\`\`\`js
class Animal {
  #name; // private field

  constructor(name, sound) {
    this.#name = name;
    this.sound = sound;
  }

  speak() {
    return \`\${this.#name} says \${this.sound}\`;
  }

  get name() { return this.#name; }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof");
  }

  fetch(item) {
    return \`\${this.name} fetches the \${item}!\`;
  }
}

const dog = new Dog("Rex");
dog.speak();        // "Rex says Woof"
dog.fetch("ball");  // "Rex fetches the ball!"
\`\`\`

### Modules (ESM)

\`\`\`js
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// main.js
import multiply, { PI, add } from './math.js';
\`\`\`

### Destructuring

\`\`\`js
// Array destructuring with skip
const [,, third] = [1, 2, 3];  // third = 3

// Nested object destructuring
const { address: { city } } = { address: { city: "NYC" } };
\`\`\`

### Nullish Coalescing & Logical Assignment

\`\`\`js
const x = null ?? "default";    // "default"
const y = 0 ?? "default";       // 0  (only null/undefined)
const z = 0 || "default";       // "default" (falsy check)

let a = null;
a ??= "assigned";  // a = "assigned"
\`\`\`

### Tagged Template Literals

\`\`\`js
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) =>
    acc + str + (values[i] ? \`<b>\${values[i]}</b>\` : ""), "");
}
highlight\`Hello \${"World"}!\`; // "Hello <b>World</b>!"
\`\`\``,
    playground: {
      starter: `// Classes with private fields
class BankAccount {
  #balance = 0;

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
    return this;  // allow chaining
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    return this;
  }

  get balance() { return this.#balance; }

  toString() {
    return \`\${this.owner}: $\${this.#balance}\`;
  }
}

const account = new BankAccount("Alice", 100);
account.deposit(50).deposit(25).withdraw(30);
console.log(account.toString()); // Alice: $145
console.log(account.balance);    // 145

// Nullish coalescing
const config = { timeout: 0, host: null };
console.log(config.timeout ?? 3000); // 0 (not null/undefined)
console.log(config.host ?? "localhost"); // "localhost"
console.log(config.timeout || 3000); // 3000 (0 is falsy!)
`,
    },
    quiz: [
      {
        question: 'What does the # prefix on a class field mean?',
        options: [
          'It is a static field',
          'It is a private field',
          'It is a read-only field',
          'It is a required field',
        ],
        answer: 1,
      },
      {
        question: 'What does ?? (nullish coalescing) use as its condition?',
        options: [
          'Falsy check (0, "", false, null, undefined)',
          'Only null or undefined',
          'Only undefined',
          'Type mismatch',
        ],
        answer: 1,
      },
      {
        question: 'In ES modules, a file can have how many default exports?',
        options: ['Unlimited', 'Two', 'One', 'Zero'],
        answer: 2,
      },
    ],
  },
];
