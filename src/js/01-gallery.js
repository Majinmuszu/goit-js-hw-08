import _default from '../../node_modules/simplelightbox/dist/simple-lightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const qs = selector => document.querySelector(selector);
const qsa = selector => document.querySelectorAll(selector);
const log = something => console.log(something);
const ce = elem => document.createElement(elem);

const gallery = qs('.gallery');

const createGalleryItems = galleryItems => {
  galleryItems.forEach(item => {
    const galleryLink = ce('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.href = item.original;
    gallery.append(galleryLink);

    const galleryImg = ce('img');
    galleryImg.classList.add('gallery__image');
    galleryImg.src = item.preview;
    galleryImg.alt = item.description;
    galleryLink.append(galleryImg);
  });
  let lightbox = new SimpleLightbox('.gallery a', {
    captionPosition: 'outside',
    captionsData: 'alt',
    captionDelay: '250',
  });
};

createGalleryItems(galleryItems);

gallery.addEventListener('click', e => e.preventDefault());
