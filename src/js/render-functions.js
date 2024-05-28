import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/error.svg';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { hideLoader } from '../main.js';

const gallery = document.querySelector('.gallery');
const formSearch = document.querySelector('.form');

let lightbox;

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
  const fragment = photoData.hits
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `<li class="gallery-item hidden">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
            />
            <div class="img-descr-container">
              <p class="img-descr-subtitle">Likes<span class="img-descr-qty">${likes}</span></p>
              <p class="img-descr-subtitle">Views<span class="img-descr-qty">${views}</span></p>
              <p class="img-descr-subtitle">Comments<span class="img-descr-qty">${comments}</span></p>
              <p class="img-descr-subtitle">Downloads<span class="img-descr-qty">${downloads}</span></p>
            </div>
          </a>
        </li>`;
    })
    .join('');

  gallery.innerHTML = fragment;

  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.remove('hidden');
      item.classList.add('fade-in');
    }, index * 100);
    return;
  });

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionDelay: 250,
      captionsData: 'alt',
      scrollZoom: false,
    });
    lightbox.on('error.simplelightbox', function (e) {
      console.log(e);
    });
  }
  formSearch.reset();
}

export { handlePhotoData };
