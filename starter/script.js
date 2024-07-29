'use strict';

///////////////////////////////////////////////
///////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Corey Beautyman',
  // movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  movements: [2, 2, 2, 2, 2],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2023-08-16T10:17:24.185Z',
    '2023-09-11T14:11:59.604Z',
    '2023-09-15T17:01:17.194Z',
    '2023-09-16T23:36:17.929Z',
    '2023-09-17T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-gb', // de-DE
};

const account2 = {
  owner: `Samantha O'Donnell`,
  // movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movements: [1, 1, 1, 1, 1],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'GBP',
  locale: 'en-US',
};

const account3 = {
  owner: 'Tom Benbow',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 1.2,
  pin: 3333,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2023-05-16T10:17:24.185Z',
    '2023-05-18T14:11:59.604Z',
    '2023-05-20T17:01:17.194Z',
    '2023-05-21T23:36:17.929Z',
    '2023-05-23T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2023-05-16T10:17:24.185Z',
    '2023-05-18T14:11:59.604Z',
    '2023-05-20T17:01:17.194Z',
    '2023-05-21T23:36:17.929Z',
    '2023-05-23T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'pt-PT', // de-DE
};

const accounts = [account1, account2, account3, account4];
// // Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnDollar = document.querySelector('.btn--dollar');
const btnEuro = document.querySelector('.btn--euro');
const btnPound = document.querySelector('.btn--gbp');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////Functions

// calculates and displays the total balence of the account
const calcDisplayBalence = function (account) {
  const balence =
    currChange === 'pound'
      ? account.movements.reduce((acc, mov) => acc + mov, 0)
      : currChange === 'dollar'
      ? account.movementsUSD.reduce((acc, mov) => acc + mov, 0)
      : account.movementsEUR.reduce((acc, mov) => acc + mov, 0);

  account.movements.reduce((acc, mov) => acc + mov, 0);
  account.balence = balence;

  labelBalance.textContent = formatCurrency(
    balence,
    account.locale,
    account.currency
  );
};

// displays the summary at the bottom of the page for incomings outgoings and interest
const displaySummary = function (account) {
  const movements =
    currChange === 'pound'
      ? account.movements
      : currChange === 'dollar'
      ? account.movementsUSD
      : account.movementsEUR;
  const incomings = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outgoings = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  let interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  interest = (Math.floor(interest * 10) / 10).toFixed(2);

  labelSumIn.textContent = formatCurrency(
    incomings,
    account.locale,
    account.currency
  );
  labelSumOut.textContent = formatCurrency(
    outgoings,
    account.locale,
    account.currency
  );
  labelSumInterest.textContent = formatCurrency(
    interest,
    account.locale,
    account.currency
  );
};

// formats the currency to the correct locale
function formatCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

// formats the date to the correct locale
function formatMovementDates(date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else return new Intl.DateTimeFormat(locale).format(date);
}

// sorts the movements from highest to lowest
function sortMovements(acc) {
  // create array of objects with mov and date
  const sortedMovementsObj = acc.movements.map((mov, i) => ({
    amount: mov,
    date: acc.movementsDates[i],
  }));

  // sort the array  of objects from highest to lowest mov
  sortedMovementsObj.sort((a, b) => a.amount - b.amount);

  // add sorted movs and dates to acc
  acc.sortedMovements = sortedMovementsObj.map(mov => mov.amount);
  acc.sortedMovementsUSD = sortedMovementsObj.map(mov => mov.amount * 1.23);
  acc.sortedMovementsEUR = sortedMovementsObj.map(mov => mov.amount * 1.15);
  acc.sortedMovementsDate = sortedMovementsObj.map(mov => mov.date);
}

// displays the movements in the container
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // currency handler for displaying movements
  if (sort) {
    if (currChange === 'pound')
      displayMovs(acc.sortedMovements, acc.sortedMovementsDate);
    if (currChange === 'dollar')
      displayMovs(acc.sortedMovementsUSD, acc.sortedMovementsDate);
    if (currChange === 'euro')
      displayMovs(acc.sortedMovementsEUR, acc.sortedMovementsDate);
  } else {
    if (currChange === 'pound') displayMovs(acc.movements, acc.movementsDates);
    if (currChange === 'dollar')
      displayMovs(acc.movementsUSD, acc.movementsDates);
    if (currChange === 'euro')
      displayMovs(acc.movementsEUR, acc.movementsDates);
  }

  // displays the movmeents in the container
  function displayMovs(movs, accDate) {
    movs.forEach((mov, i) => {
      const type = mov > 0 ? 'deposit' : 'withdrawal';

      const date = new Date(accDate[i]);

      const displayDates = formatMovementDates(date, acc.locale);

      const html = `<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__date">${displayDates}</div>
<div class="movements__value">${formatCurrency(
        mov,
        acc.locale,
        acc.currency
      )}</div>
</div>`;

      containerMovements.insertAdjacentHTML('afterbegin', html);
    });
  }
};

const createUsernames = function (accounts) {
  accounts.forEach(account => {
    const user = account.owner;

    account.userName = user
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

// module.exports = createUsernames;

// function call to update the UI and call other functions
const updateUI = function (acc) {
  // CREATE DIFFERANT CURRENCIES
  addMovCurrency(acc);
  // DISPLAY MOVEMENTS
  displayMovements(acc);
  // DISPLAY BALENCE
  calcDisplayBalence(acc);
  // DISPLAY SUMMARY
  displaySummary(acc);
  // create sorted sortMovs
  sortMovements(acc);
};

// function to start the timer for logging out
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // in each call print remaining time to ui
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 seconds log out user

    if (time === 0) {
      containerApp.style.opacity = 0;
      currentAccount = '';
      labelWelcome.textContent = `Log in to get started`;
    }
    // decrease time 1s
    time--;
  };
  // set time to 5 minutes
  let time = 120;

  tick();

  //  call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

// calls function to create usernames
createUsernames(accounts);

// global scope variables
let currentAccount, timer;
let currChange;

// adding the date to the project
const createDate = function () {
  const date = new Date();

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(date);
};

// adds the converted currency to the current account
const addMovCurrency = function (acc) {
  acc.movementsUSD = acc.movements.map(mov => mov * 1.23);
  acc.movementsEUR = acc.movements.map(mov => mov * 1.15);
};

// converts the pounds to the correct currency
function currencyCoverter(amount) {
  if (currChange === 'pound') {
    return amount;
  }
  if (currChange === 'dollar') {
    return amount / 1.23;
  }
  if (currChange === 'euro') {
    return amount / 1.15;
  }
}

// Event handlers

btnLogin.addEventListener('click', function (e) {
  // prevents form submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (+currentAccount?.pin === +inputLoginPin.value) {
    // DISPLAY UI AND WELCOME MESSAGE
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    currChange = 'pound';
    currentAccount.currency = 'GBP';

    // create dates
    createDate();

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // Timer start
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //  Update UI
    updateUI(currentAccount);
  } else {
    console.log('Failed Login');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  let amount = currencyCoverter(+inputTransferAmount.value);
  let balence = currencyCoverter(currentAccount.balence);

  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  // reset timer
  clearInterval(timer);
  timer = startLogOutTimer();

  if (
    amount > 0 &&
    receiverAcc &&
    balence >= amount &&
    currentAccount.userName !== receiverAcc.userName
  ) {
    // if in dollars
    if (currChange === 'pound') {
      // Transfer movement
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
    }
    if (currChange === 'dollar') {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
    }
    if (currChange === 'euro') {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
    }

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  } else {
    console.log('transfer FAILED');
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // reset timer
  clearInterval(timer);
  timer = startLogOutTimer();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  } else {
    console.log('FAILED');
  }
  inputClosePin.value = inputCloseUsername.value = '';
  inputClosePin.blur();
  inputCloseUsername.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // reset timer
  clearInterval(timer);
  timer = startLogOutTimer();

  let amount = currencyCoverter(Math.floor(inputLoanAmount.value));
  let balence = currencyCoverter(currentAccount.balence);

  if (amount > 0 && amount <= balence * 0.5) {
    setTimeout(function () {
      // loan movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  } else {
    console.log('Loan failed!');
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);

  sorted = !sorted;
});

// pound button event
btnPound.addEventListener('click', function (e) {
  e.preventDefault();
  clearInterval(timer);
  timer = startLogOutTimer();
  if (currChange === 'pound') return;

  currChange = 'pound';
  currentAccount.currency = 'GBP';
  sorted = false;

  updateUI(currentAccount);
});
// dollar button event
btnDollar.addEventListener('click', function (e) {
  e.preventDefault();
  clearInterval(timer);
  timer = startLogOutTimer();

  if (currChange === 'dollar') return;
  currChange = 'dollar';
  currentAccount.currency = 'USD';
  sorted = false;
  updateUI(currentAccount);
});
// euro button event
btnEuro.addEventListener('click', function (e) {
  e.preventDefault();
  clearInterval(timer);
  timer = startLogOutTimer();

  if (currChange === 'euro') return;

  currChange = 'euro';
  currentAccount.currency = 'EUR';
  sorted = false;

  updateUI(currentAccount);
});

// testing functions

// console.log(account1);
// account1.movements.push(999);

// addMovCurrency(account1);

// console.log(account1);
// // DISPLAY MOVEMENTS
// displayMovements(acc);
// // DISPLAY BALENCE
// calcDisplayBalence(acc);
// // DISPLAY SUMMARY
// displaySummary(acc);
// // create sorted sortMovs
// sortMovements(acc);

// console.log();
// TODO
// set up tests for currency conversion and transfer

// FAKE logged in
// currentAccount = account1;

// createDate();
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// labelBalance.addEventListener('click', function () {
//   const rows = [...document.querySelectorAll('.movements__row')];
//   rows.forEach(function (row, i) {
//     if (i % 2 === 0) {
//       row.style.backgroundColor = 'blue';
//     }
//   });
// });

// console.log(deposits, withdrawals);

// Lectures

// const z = Array.from({length: 100}, () => Math.floor(Math.random() * 6) + 1)

// console.log(z.sort((a, b) => a - b));

// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((arr, mov) => arr + mov, 0);

// const numDeposits1000 = accounts.flatMap(acc => acc.movements).reduce((sum, mov) => mov >= 1000 ? ++sum : sum, 0)

// const {deposits, withdrawals} = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, curr) => {
//       // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
//       sums[curr > 0 ? 'deposits' : 'withdrawals'] += curr
//       return sums
//     },
//     { deposits: 0, withdrawals: 0 }
// );

// const convertTitleCase = function (title) {
//   const capital = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'the', 'but', 'and', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word =>
//       exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join(' ');

//   return capital(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not TO LONG'));
// console.log(convertTitleCase('is and ANOTHER EXAMPLE'));
