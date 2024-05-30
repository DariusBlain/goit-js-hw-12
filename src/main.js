// =======================Imports==================================

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchPhotos, handleLoadMore } from './js/pixabay-api.js';
// ==============================================================

// =====================Form-Search=========================================
const formSearch = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoad = document.querySelector('.btn-load');

let searchQuery = '';

function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}
function showBtn() {
  btnLoad.style.visibility = 'visible';
}
function hideBtn() {
  btnLoad.style.visibility = 'hidden';
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (!form.elements.input.value.trim()) {
    iziToast.warning({
      theme: 'dark',
      position: 'topRight',
      message: 'Input is empty',
      backgroundColor: 'rgb(255, 150, 0)',
      progressBarColor: 'rgb(180, 70, 0)',
    });
    return;
  }

  searchQuery = form.elements.input.value.trim();
  gallery.innerHTML = '';
  showLoader();

  await fetchPhotos(searchQuery);
}

formSearch.addEventListener('submit', handleFormSubmit);

btnLoad.addEventListener('click', handleLoadMore);

function createScrollFunction() {
  let elem = document.querySelector('.gallery-item');
  let rect = elem.getBoundingClientRect();
  if (elem) {
    window.scrollBy({
      top: rect.height * 2,
      left: 0,
      behavior: 'smooth',
    });
  }
}

export {
  hideLoader,
  showLoader,
  showBtn,
  hideBtn,
  createScrollFunction,
  searchQuery,
};
// ==============================================================
