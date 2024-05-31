// =======================Imports==================================

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from './img/error.svg';

import { serverRequest } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';
// ==============================================================

// =====================Form-Search=========================================
const formSearch = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoad = document.querySelector('.btn-load');

let pageNum = 1;
let pageLim = 15;
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

// ==============================================================
async function fetchPhotos(searchQuery) {
  const data = await serverRequest(searchQuery, pageNum, pageLim);
  try {
    const verificationsData = requestVerification(data);
    handlePhotoData(verificationsData);
  } catch (err) {
    hideBtn();
    iziToast.error({
      theme: 'dark',
      position: 'topRight',
      progressBarColor: 'rgb(181, 27, 27)',
      backgroundColor: 'rgb(239, 64, 64)',
      iconUrl: iconError,
      message: err.message,
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  loader.classList.add('loader-more');
  pageNum += 1;
  hideBtn();
  showLoader();
  const data = await serverRequest(searchQuery, pageNum, pageLim);
  try {
    const verificationsData = requestVerification(data);
    createMarkup(verificationsData);
    createScrollFunction();
  } catch (err) {
    iziToast.error({
      theme: 'dark',
      position: 'topRight',
      progressBarColor: 'rgb(181, 27, 27)',
      backgroundColor: 'rgb(239, 64, 64)',
      iconUrl: iconError,
      message: err.message,
    });
  } finally {
    hideLoader();
  }
}

function requestVerification(data) {
  if (data.totalHits === 0) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }

  if (pageNum >= Math.ceil(data.totalHits / pageLim)) {
    hideBtn();
    hideLoader();
    iziToast.info({
      theme: 'dark',
      position: 'topRight',
      backgroundColor: 'rgba(38, 162, 255, 1)',
      message: "We're sorry, but you've reached the end of search results.",
    });
    return data;
  }
  showBtn();
  return data;
}

function handlePhotoData(photoData) {
  if (!photoData.hits.length) {
    iziToast.error({
      theme: 'dark',
      position: 'topRight',
      progressBarColor: 'rgb(181, 27, 27)',
      backgroundColor: 'rgb(239, 64, 64)',
      iconUrl: iconError,
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    hideLoader();
    return;
  }
  formSearch.reset();
  createMarkup(photoData);
}
// ==============================================================
