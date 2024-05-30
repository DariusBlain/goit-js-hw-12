import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/error.svg';

import { handlePhotoData } from './render-functions.js';
import {
  showLoader,
  hideLoader,
  showBtn,
  hideBtn,
  createScrollFunction,
  searchQuery,
} from '../main.js';

const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

let pageNum = 1;
let pageLim = 15;

const serverRequest = async (query, pageNum = 1) => {
  const { data } = await axios.get('https://pixabay.com/api', {
    params: {
      key: '43998690-c32ec46c3205eb1d30dd41df5',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageNum,
      per_page: pageLim,
    },
  });
  return data;
};

async function fetchPhotos(searchQuery) {
  const data = await serverRequest(searchQuery, (pageNum = 1));
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
  const data = await serverRequest(searchQuery, pageNum);
  try {
    const verificationsData = requestVerification(data);
    gallery.insertAdjacentHTML('beforeend', handlePhotoData(verificationsData));
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
    throw new Error('No results found');
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
    return;
  }
  showBtn();
  return data;
}

export { fetchPhotos, handleLoadMore };
