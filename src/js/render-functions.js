import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

let lightbox;

function createMarkup(data) {
  const fragment = data.hits
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

  gallery.insertAdjacentHTML('beforeend', fragment);

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
}
// ==============================================================

// ==============================================================

export { createMarkup };
