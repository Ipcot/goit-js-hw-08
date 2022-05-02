
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

// player.setCurrentTime(timeAfterPageReboot);

player.setCurrentTime(timeAfterPageReboot).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

