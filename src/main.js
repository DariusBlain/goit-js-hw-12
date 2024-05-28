// =======================Imports==================================

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { serverRequest } from './js/pixabay-api.js';

// ==============================================================

// =====================Form-Search=========================================
const formSearch = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoad = document.querySelector('.btn-load');

let pageNum = 1;
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

function handleFormSubmit(event) {
  event.preventDefault();
  pageNum = 1;
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

  serverRequest(searchQuery, pageNum);
}

function handleLoadMore() {
  pageNum += 1;
  hideBtn();
  showLoader();
  serverRequest(searchQuery, pageNum);
  loader.classList.add('loader-more');
}

formSearch.addEventListener('submit', handleFormSubmit);

btnLoad.addEventListener('click', handleLoadMore);

export { hideLoader, pageNum, showBtn, hideBtn };
// ==============================================================
