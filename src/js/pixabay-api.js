import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/error.svg';

import { handlePhotoData } from './render-functions.js';
import { hideLoader, showBtn } from '../main.js';
import { pageNum } from '../main.js';
import { hideBtn } from '../main.js';

let pageLim = 15;

const serverRequest = async (query, pageNum) => {
  const response = await axios.get('https://pixabay.com/api', {
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
  fetchPhotos(response.data);
};

function fetchPhotos(dataSearch) {
  if (pageNum > dataSearch.totalHits / pageLim) {
    hideBtn();
    hideLoader();
    iziToast.error({
      theme: 'dark',
      position: 'topRight',
      progressBarColor: 'rgb(181, 27, 27)',
      backgroundColor: 'rgb(239, 64, 64)',
      iconUrl: iconError,
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    try {
      showBtn();
      handlePhotoData(dataSearch);
    } catch (error) {
      iziToast.error({
        theme: 'dark',
        position: 'topRight',
        progressBarColor: 'rgb(181, 27, 27)',
        backgroundColor: 'rgb(239, 64, 64)',
        iconUrl: iconError,
        message: error,
      });
    } finally {
      hideLoader();
    }
  }
}

export { serverRequest };
