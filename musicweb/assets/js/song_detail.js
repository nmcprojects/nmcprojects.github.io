function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                strSong = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}


// Render lyric
var containerLyric = document.querySelector('.song-detail-center_lyric-center .lyricer');

var strSong = "";

readTextFile("./assets/MyLyricer/song.txt");
let lyricer = new Lyricer({"container": containerLyric, 'no_hover':true, 'clickable': false});
lyricer.setLrc(strSong);


// click see more lyric
var btn_see_more = document.querySelector('.song-detail-center_lyric--see-more');
var containerLyricCenter = document.querySelector('.song-detail-center_lyric-center');

var heightContainerCenter = getComputedStyle(containerLyricCenter).height;
btn_see_more.onclick = function(e) {
    if(btn_see_more.getAttribute('active') == 'false') {
        containerLyricCenter.style.height = 'auto';
        btn_see_more.setAttribute('active', 'true');
    }
    else {
        containerLyricCenter.style.height = heightContainerCenter;
        btn_see_more.setAttribute('active', 'false');
    }
}


