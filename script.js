'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
// nodelist: fake array -> we can loop this!!
const btnOpenModal = document.querySelectorAll('.show-modal');
const openModal = function () {
  // modal.sytle.display = 'block'; 대신 css에서 클래스를 이용해 공통적용되는 요소를 추가.
  console.log('Button clicked');
  modal.classList.remove('hidden'); // avoid using dot
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//key press (keyboard event) "global events" : usually list on the whole document, 이벤트 실행 후 object를 생성하게 됨. 객체 내 데이터에 접근하게 된다 js will call this function with the event object as an argument
document.addEventListener('keydown', function (ev) {
  console.log(ev);
  if (ev.key === 'Escape' && !modal.classList.contains('hidden')) {
    // modal이 visible한 경우에만 이벤트를 실행시키고 싶음.
    //modal의 클래스가 hidden이 없는가?
    // if (!modal.classList.contains('hidden')) {
    closeModal();
  }
});
