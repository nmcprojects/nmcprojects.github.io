
// when move over img run letter 
import runLetter from './definePattern.js'; 


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//  run letter  (list songs)
const imgListSongs = $$('.list-songs_list-item .list-songs_list-item_img');
imgListSongs.forEach(function(item) {
    let itemOrigin = item.closest('.list-songs_list-item');
    
    item.onmouseover = function(e) {
        // console.log(itemOrigin.dataset.mouseover);
        if(itemOrigin.dataset.mouseover == "true") {
            runLetter(itemOrigin.querySelector('.list-songs_list-item_info-name h3'));
            itemOrigin.dataset.mouseover = "false";
            setTimeout(function() {
                itemOrigin.dataset.mouseover = "true";
                // console.log(itemOrigin.dataset.mouseover);
            }, 6000);
        }
    }

});

//  run letter  (list other song)
const itemListOtherSong = $$('.list-songs_list-other .playlists-item');
itemListOtherSong.forEach(function(item) {
    item.dataset.mouseover = "true";
    item.onmouseover = function(e) {
        if(item.dataset.mouseover == "true") {
            runLetter(item.querySelector('.playlists-item_info-name-song'));
            item.dataset.mouseover = "false";
            setTimeout(function() {
                item.dataset.mouseover =  "true";
            }, 6000);
        }
    }
});