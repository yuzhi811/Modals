'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

let score, activePlayer, totalScores, playing;

const init = function () {
  score = 0;
  activePlayer = 0;
  totalScores = [0, 0];
  playing = true; //reassign (not creating a new variable**)
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  score = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Starting condition
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //dice점수가 current에 더해지게 할당
    if (dice !== 1) {
      score += dice;
      // current0El.textContent = score; //CHANGE LATER
      document.getElementById(`current--${activePlayer}`).textContent = score;
    } else {
      //1인 경우-> 0의 실행 멈추고 switch the player
      switchPlayer();
      // document.getElementById(`current--${activePlayer}`).textContent = dice;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. current score가 total score에 더해지게 한다. hold 누르고 어차피 roll dice 누르니까 설정은 다시 초기화됨! 코드 재작성 할 필요 x
    // if (`current--${activePlayer}` < 20) {
    // document.getElementById(`current--${activePlayer}`).textContent = 0;
    // document.getElementById(`score--${activePlayer}`).textContent = score;
    totalScores[activePlayer] += score;
    // totalScores[1] = totalScores[1] + score;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // Check if the score is 100
    if (totalScores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
    // 2. switch the player
    // document.getElementById(`current--${activePlayer}`).textContent = 0;
    // score = 0;
    // activePlayer = activePlayer === 0 ? 1 : 0;
    // } else {
    // document
    //   .querySelector(`.player--${activePlayer}`)
    //   .classList.add('player--winner');
  }
});

btnNew.addEventListener('click', init); //we do not call the function
//user가 버튼을 누르면 자바스크립트가 함수를 호출해줌.
