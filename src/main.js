// =======================Imports==================================

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchPhotos } from './js/pixabay-api.js';

// ==============================================================

// =====================Form-Search=========================================
const formSearch = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (form.elements.input.value.trim() === '') {
    iziToast.warning({
      theme: 'dark',
      position: 'topRight',
      message: 'Input is empty',
      backgroundColor: 'rgb(255, 150, 0)',
      progressBarColor: 'rgb(180, 70, 0)',
    });
    return;
  }

  const searchQuery = form.elements.input.value.trim();
  gallery.innerHTML = '';
  showLoader();
  fetchPhotos(searchQuery);
}

formSearch.addEventListener('submit', handleFormSubmit);

export { hideLoader };
// ==============================================================
