
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = "videoplayer-current-time";
    // const iframe = document.querySelector('#vimeo-player');
    const player = new Player(document.querySelector('#vimeo-player'));

const saveTimeInStorage = (data) => {
    localStorage.setItem(CURRENT_TIME, data.seconds)
}
const timeAfterPageReboot = localStorage.getItem(CURRENT_TIME)

player.on('timeupdate', throttle(saveTimeInStorage, 1000));

if (timeAfterPageReboot) {
    player.setCurrentTime(timeAfterPageReboot);
}




