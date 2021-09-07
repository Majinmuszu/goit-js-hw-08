import throttle from 'lodash/throttle';
import _default from '../../node_modules/@vimeo/player';

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);
const log = (something) => console.log(something);
const ce = (elem) => document.createElement(elem);

const iframe = qs('iframe');
const player = new Vimeo.Player(iframe);
player.on('play', function() {
    console.log('played the video!');
});
player.on('timeupdate', throttle((e) => {
    log(e.seconds)
    localStorage.setItem('videoplayer-current-time',`${e.seconds}`)
  }, 2000));
player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));


