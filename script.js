'use strict';
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
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

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
////////////////////Transcations////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = ' ';
  movements.forEach(function (mov, i, arr) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov} 000€</div>
    </div>
    `;
    //After Begin Will arrange in the form of the stsack
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

////////////////////////////////////////////////////////////////
/////////////////Final Summary ////////////////////////////////

const calcDisplayLabelAmount = function (movements) {
  const netTotal = movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${netTotal} 💲`;
};

// calcDisplayLabelAmount(account1.movements);

//////////////////////////////////////////////////////////////////
//////////////////////////////Added,Subtracted,Interest Gain/////////

const calDisplaySummary = function (accs) {
  const netDeposit = accs.movements
    .filter(curr => curr > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${netDeposit} 💲`;

  const netWithdraw = accs.movements
    .filter(curr => curr < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(netWithdraw)} 💲`;

  const interestGain = accs.movements
    .filter(mov => mov > 0)
    .map((curr, i) => curr * (accs.interestRate / 100))
    .filter((curr, i, arr) => {
      console.log(arr);
      return curr >= 1;
    })
    .reduce((acc, curr) => acc + curr, 0);

  labelSumInterest.textContent = `${interestGain} 💲`;
};
// calDisplaySummary(account1.movements);
/////////////////////////////////////////////////////////
//////////////////create username//////////////////////////////////////

const createUsername = function (accnt) {
  accnt.forEach(function (ak) {
    ak.username = ak.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Welcome Notification
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    //opacity 100
    containerApp.style.opacity = 100;

    ///Login Apperance
    inputLoginUsername.value = ' ';
    inputLoginPin.value = ' ';
    inputLoginPin.blur();
    //Summary
    calDisplaySummary(currentAccount);
    calcDisplayLabelAmount(currentAccount.movements);
    displayMovements(currentAccount.movements);
  }
});

////////////////////////////////////////////////////////////
//////////////Lecturesss////////////////////////////////////
///////////////////////////////////////////////////////////

// const movement = [10, 20, 30, 5885];

// const netBalance = movement.reduce((acc, curr) => (acc += curr), 0);
// console.log(netBalance);

// const maxValue = movement.reduce(
//   (acc, curr) => (acc > curr ? acc : curr),
//   movement[0]
// );

// console.log(maxValue);
// const movements = [10, 20, -10, -90, 239, 2932, -19];

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// const withdrew = movements.filter(function (i) {
//   return i < 0;
// });
// console.log(deposits);
// console.log(withdrew);
// const k = [100, -230, 399 + 1, -5, 900];
// const r = 2;
// // const newk = k.map(function (mov, i, arr) {
// //   //k.map ek naya map bhi banadega jaha new values stored hongi
// //   return mov * r;
// // });
// const newk = k.map(
//   (mov, i, arr) =>
//     `Movement ${i + 1}  ${mov > 0 ? 'Deposited' : 'Withdrawn'} ${Math.abs(mov)}`
// );
// console.log(newk);

// const movements = [10, 20, -30, 40, -494, 484];
// const interest = 2;
// const newArray = movements
//   .filter(mov => mov > 0)
//   .map((curr, i, arr) => {
//     console.log(arr);
//     return curr * interest;
//   })
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(newArray);
//Find

// const user = accounts.find(accounts => accounts.owner === 'Jessica Davis');
// console.log(user);
