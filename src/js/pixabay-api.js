import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/error.svg';

import { handlePhotoData } from './render-functions.js';
import { hideLoader } from '../main.js';

function buildApiUrl(query) {
  const BASE_URL = 'https://pixabay.com/api';
  const params = new URLSearchParams({
    key: '43998690-c32ec46c3205eb1d30dd41df5',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return `${BASE_URL}?${params}`;
}

function fetchPhotos(query) {
  const url = buildApiUrl(query);
  fetch(url, {
    referrerPolicy: 'unsafe-url',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => handlePhotoData(data))
    .catch(error => {
      console.log('Error fetching photos:', error);
      iziToast.error({
        theme: 'dark',
        position: 'topRight',
        progressBarColor: 'rgb(181, 27, 27)',
        backgroundColor: 'rgb(239, 64, 64)',
        iconUrl: iconError,
        message: error.message,
      });
    })
    .finally(() => hideLoader());
}

export { fetchPhotos };
