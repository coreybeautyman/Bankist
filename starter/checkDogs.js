// function checkDogs(dogsJulia, dogsKate) {
//   const juliaUpdatedDog = dogsJulia.slice(1, -2);
//   const combinedDogs = juliaUpdatedDog.concat(dogsKate);
//   return combinedDogs.map((age, i) =>
//     age < 3
//       ? `Dog number ${i + 1} is still a puppy 🐶`
//       : `Dog number ${i + 1} is an adult, and is ${age} years old`
//   );
// }

// function calcAverageHumanAge(ages) {
//   const humanAges = ages
//     .map(a => (a <= 2 ? a * 2 : +16 + a * 4))
//     .filter(a => a >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

//   return humanAges;
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// const arr = [
//   [1, 2, 3],
//   [4, 5],
//   [6, 7],
// ];
// const arrdeap = [[[1, 2, 3], [4, 5], [[6, 7]]]];

// console.log(arr.flat());
// console.log(arrdeap.flat(3));

// const person1 = {
//     name: 'Corey',
//     age: '26',
// }
// const person2 = {
//     name: 'Dave',
//     age: '48',
// }

// const person3 = {
//     name: 'pete',
//     age: '93',
// }

// const people = [person1, person2, person3]

// function addGender(person){
// person.forEach(p => p.gender = 'male')
// }

// addGender(people)

// console.log(person1, person2, person3);

// const owners = ['Jonas', 'Zach', 'Adam', 'Martha']

// console.log(owners.sort());

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements.sort((a, b) => a - b));

// const x = Array.from({ length: 100 }, () => Math.floor(Math.random() * 6) + 1);

// console.log(x);

/////////////////////////////////////////////////
//////////TASK//////////////////////////
/////////////////////////////////////////////////

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

// console.log(dogSarah);
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

// console.log(
//   `sarah's dog is eating too ${
//     dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
//   }`
// );
// console.log(ownersEatTooMuch);
// console.log(dogs);

// console.log(
//   `${ownersEatTooMuch.reduce(
//     (acc, curr, i, arr) =>
//       i !== arr.length - 1 ? acc + curr + ' and ' : acc + curr + `'s`,
//     ''
//   )} dogs eat too much`
// );
// console.log(
//   `${ownersEatTooLittle.reduce(
//     (acc, curr, i, arr) =>
//       i !== arr.length - 1 ? acc + curr + ' and ' : acc + curr + `'s`,
//     ''
//   )} dogs eat too little`
// );

// console.log(dogs.some(dog => dog.curFood === dog.recFood));

const dogsEatingOkay = dog =>
  dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9;

// console.log(dogs.some(dogsEatingOkay));

let dogsEatingCorrect = dogs.filter(dogsEatingOkay);
// console.log(dogsEatingCorrect);

const sortedDogs = dogs.slice().sort((a, b) => a.recFood - b.recFood)
console.log(sortedDogs);

///////// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
///////// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
///////// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
///////// 4. Log a string to the console for each array created in 3.,like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
///////// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
///////// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
///////// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)
////////////HINTS////////////////
// § Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// § Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
