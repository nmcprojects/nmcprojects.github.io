
// when move over img run letter 
import runLetter from './definePattern.js'; 

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Declare variable
const song_audio = $(".current-song-audio");
const song_img = $(".info-song_img");
const song_name = $(".info-song_info-name");
const song_singer = $(".info-song_info-author");
const song_shuffle = $(".control-song_btn-shuffle");
const song_shuffle_tooltip = $(".control-song_btn-shuffle .tooltip");
const song_previous = $(".control-song_btn-pre");
const song_play = $(".control-song_btn-play-circle");
const song_next = $(".control-song_btn-next");
const song_repeat = $(".control-song_btn-repeat");
const song_repeat_tooltip = $(".control-song_btn-repeat .tooltip");
const song_time = $(".control-song_time");

const song_time_current = $(".control-song_time .control-song_time-current span");
const song_time_progress = $(".control-song_time .control-song_time-main input");
const song_time_song = $(".control-song_time .control-song_time-song span");

const song_list_favorite = $(".info-song_mode-heart");
const song_list_like = $('.info-song_mode-like');
const song_list_amountlike = $('.info-song_mode-like .thumb-up .thumb-up_amount');
const song_volume = $(".extend-song_volume");

const song_volume_btn = $(".extend-song_volume-btn");
const song_volume_btn_tooltip = $(".extend-song_volume-btn .tooltip");
const song_volume_progress = $(".extend-song_volume-progress");

const song_current_view_lyrics = $(".extend-song_view-lyrics");
const song_full_song = $(".extend-song_full-songs");

const song_current_alarm = $('.alarm-count-down');
const song_current_alarm_btnCancel = $('.alarm-count-down .alarm-count-down_btn');
// full screen
const song_current_fullscreen = $('.extend-song_full-screen');

// Playlists
const song_playlists = $(".playlists");
const song_playlists_header = $(".playlists .playlists-header");
const song_playlists_header_sesstion = $(".playlists .playlists-header .playlists-header_sesstion");
const song_playlists_header_setAlarm = $(".playlists .playlists-header_mode-time");
const song_playlists_header_seeMore = $(".playlists .playlists-header_mode-see-more");

const song_playlists_list = $(".playlists .playlists-list");
const song_playlists_current = $(".playlists-list_current");
const song_playlists_listenedRecently = $(".playlists-listened_recently");
const song_playlists_autoPlay = $(".playlists-list_suggesstion-header-autoplay-btn");

// View lyrics
const song_view_lyrics = $(".view-lyrics");
const song_view_lyrics_mode = $(".view-lyrics_mode-main");
const song_view_lyrics_other = $(".view-lyrics_mode-other");
const song_view_lyrics_otherFullScreen = $(".view-lyrics_mode-other .view-lyrics_mode-other_FullScreen");
const song_view_lyrics_otherClose = $(".view-lyrics_mode-other .view-lyrics_mode-other_Close");
const song_view_lyrics_otherSetting = $(".view-lyrics_mode-other .view-lyrics_mode-other_setting");
const song_view_lyrics_otherSetting_mode = $(".view-lyrics_mode-other .view-lyrics_mode-other-item_setting-mode");
const song_view_lyrics_otherSetting_mode_setAlarm = $(".view-lyrics_mode-other .view-lyrics_mode-other-item_setting-mode-timer");
const song_view_lyrics_otherSetting_mode_autoPlay = $(".view-lyrics_mode-other .view-lyrics_mode-other-item_setting-mode-item-autoplay-btn");

const song_view_lyrics_Lyrics = $(".view-lyrics_main .view-lyrics_main-lyrics");
const song_view_lyrics_Playlists = $('.view-lyrics_main .view-lyrics_main-Playlists');
const song_view_lyrics_Playlists_list = $('.view-lyrics_main .view-lyrics_main-Playlists .view-lyrics_main-Playlists_list');
const song_view_lyrics_Karaoke = $('.view-lyrics_main .view-lyrics_main-karaoke');

// Timer to stop playing music
const song_alarm = $('.timer-stop-playing');
// setup alarm
const song_alarm_inputs = $$('.time-picker_input');
const song_alarm_input_options = $$('.time-picker_input .time-picker_input-options');
const song_alarm_btnSave = $('.timer-stop-playing_setup-save');
const song_alarm_btnCancel = $('.timer-stop-playing_setup-cancel');
// alarm counting
const song_alarm_counting_no = $('.timer-stop-playing_counting-btn-delete-no');
const song_alarm_counting_yes = $('.timer-stop-playing_counting-btn-delete-yes');
// alarm end counting
const song_alarm_end_counting_btn = $('.timer-stop-playing_notify-btn');


var elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
    }
}



/* PLAY AUDIO */
const song_player = {
    currentIndex: 0,
    isPlaying: false,
    isFocusTimeProgress: false,
    isShuffle: false,
    isRepeat: false,
    isVolume: true,
    isOpenPlaylists: false,
    isOpenViewLyrics: false,
    indexBorderedItemViewPlaylists: 0,
    isAutoPlay: false, // In load current song I'll click in button to iAutoPlay becomes true.
    isFullScreen: false,
    intervalRunName: null,
    /* if false render viewLyrics is songs, if true render viewLyrics is songsListenedRecently */
    // list song
    songs: [],
    songsListenedRecently: [],
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },
    render_playlists: function () {
        const html = this.songs.map((song, index) => {
            return `
                <div class="playlists-item no-copy-text ${this.currentIndex == index ? "playlists-item--active" : ""} ${this.favorite !== null ? "playlists-item--downloaded" : ""}  ${this.isPlaying == true ? "playlists-item--playing" : ""}" data-index = ${index}>
                    <div class="playlists-item_info">
                        <div class="playlists-item_info-img" style="background-image:url('${song.img}')">
                            <div class="playlists-item_info-img-hover">
                                <i class="playlists-item_info-img-hover--play fas fa-play"></i>
                                <i class="playlists-item_info-img-hover--pause fas fa-pause"></i>
                            </div>
                            <!-- <img src="${song.img}" alt=""> -->
                        </div>
                        <div class="playlists-item_info-name">
                            <p class="playlists-item_info-name-song">${song.name}</p>
                            <p class="playlists-item_info-name-singer">${song.singer}</p>
                        </div>
                    </div>
                    <div class="playlists-item_mode">
                        <div class="playlists-item_mode-favorite playlists-item_mode-item ${song.favorite == true ? "list-favorite" : ""}">
                            <div class="tooltip tooltip--bottom">Add to favorite</div>
                            <i class="far fa-heart"></i>
                        </div>
                        <div class="playlists-item_mode-download-song playlists-item_mode-item">
                            <div class="tooltip tooltip--top">Download song</div>
                            <i class="fas fa-download"></i>
                        </div>
                        <div class="playlists-item_mode-see-more playlists-item_mode-item">
                            <div class="tooltip tooltip--bottom">See more</div>
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                </div>
            `
        });
        if(song_playlists_current) {
            song_playlists_current.innerHTML = html.join("");
            this.liftPlaylistsItem();
        }
    },
    render_listenedRecently: function () {
        const html = this.songsListenedRecently.map((song, index) => {
            return `
                <div class="playlists-item no-copy-text ${song.favorite != null ? "playlists-item--downloaded" : ""}" data-index = ${index}>
                    <div class="playlists-item_info">
                        <div class="playlists-item_info-img" style="background-image:url('${song.img}')">
                            <div class="playlists-item_info-img-hover">
                                <i class="playlists-item_info-img-hover--play fas fa-play"></i>
                                <i class="playlists-item_info-img-hover--pause fas fa-pause"></i>
                            </div>
                            <!-- <img src="${song.img}" alt=""> -->
                        </div>
                        <div class="playlists-item_info-name">
                            <p class="playlists-item_info-name-song">${song.name}</p>
                            <p class="playlists-item_info-name-singer">${song.singer}</p>
                        </div>
                    </div>
                    <div class="playlists-item_mode">
                        <div class="playlists-item_mode-favorite playlists-item_mode-item ${song.favorite == true ? "list-favorite" : ""}">
                            <div class="tooltip tooltip--bottom">Add to favorite</div>
                            <i class="far fa-heart"></i>
                        </div>
                        <div class="playlists-item_mode-download-song playlists-item_mode-item">
                            <div class="tooltip tooltip--top">Download song</div>
                            <i class="fas fa-download"></i>
                        </div>
                        <div class="playlists-item_mode-see-more playlists-item_mode-item">
                            <div class="tooltip tooltip--bottom">See more</div>
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                </div>
            `
        });
        if(song_playlists_listenedRecently) {
            song_playlists_listenedRecently.innerHTML = html.join("");
        }
    },
    render_viewLyrics: function () {
        this.render_viewLyrics_Lyrics();
        this.render_viewLyrics_playlists();
    },
    render_viewLyrics_Lyrics: function () {
        // render lyrics song
        if(song_view_lyrics_Lyrics) {
            const imgEmlement = song_view_lyrics_Lyrics.querySelector(".view-lyrics_main-lyrics-img img");
            const lyricsEmlementLyric = song_view_lyrics_Lyrics.querySelector(".view-lyrics_main-lyrics-text .lyricer");

            imgEmlement.src = this.currentSong.img;
    
            var lrcSong = new Lyricer({'container': lyricsEmlementLyric});
            lrcSong.setLrc(this.currentSong.lyric);
    
    
            if(lrcSong.lrc.length != 0) {
                song_view_lyrics_Lyrics.classList.remove('view-lyrics_main-lyrics--noLyric');
                lyricsEmlementLyric.style.display = 'block';
    
                song_audio.addEventListener( "timeupdate", function() {
                    lrcSong.move(song_audio.currentTime);
                });
        
                // click lyric line back the song time
                lyricsEmlementLyric.addEventListener('lyricerclick', function(e){
                    if (e.detail.time >= 0) {
                        song_audio.currentTime = e.detail.time;
                    }
                });
            }
            else {
                song_view_lyrics_Lyrics.classList.add('view-lyrics_main-lyrics--noLyric');
                lyricsEmlementLyric.style.display = 'none';
    
            }
        }   


        
    },
    render_viewLyrics_playlists: function () {
        // render playlists
        this.indexBorderedItemViewPlaylists = this.currentIndex;
        let widthPlaylists = 430 * 1 + (this.songs.length - 1) * 360;
        if(song_view_lyrics_Playlists_list) {
            song_view_lyrics_Playlists_list.style.width = `${widthPlaylists}px`;
        }
        const htmlPlaylists = this.songs.map((song, index) => {
            let positionLeft;
            if (index <= this.currentIndex) {
                positionLeft = index * 360;
            } else {
                positionLeft = (index - 1) * 360 + 430;
            }
            return `
                <div class="view-lyrics_main-Playlists-item ${this.currentIndex == index ? "view-lyrics_main-Playlists-item--active" : ""} ${this.isPlaying == true ? "view-lyrics_main-Playlists-item--playing" : ""} ${this.indexBorderedItemViewPlaylists == index ? "view-lyrics_main-Playlists-item--border" : ""}" data-index = ${index} style="left: ${positionLeft}px;">
                    <div class="view-lyrics_main-Playlists-item_img" style="background-image:url('${song.img}')">
                        <div class="view-lyrics_main-Playlists-item_img-hover">
                            <i class="pause far fa-play-circle"></i>
                            <i class="play far fa-pause-circle"></i>
                        </div>
                    </div>
                    <div class="view-lyrics_main-Playlists-item_info">
                        <h3 class="view-lyrics_main-Playlists-item_info-name">${song.name}</h3>
                        <p class="view-lyrics_main-Playlists-item_info-singger">${song.singer}</p>
                    </div>
                </div>
            `
        });
        if(song_view_lyrics_Playlists_list) {
            song_view_lyrics_Playlists_list.innerHTML = htmlPlaylists.join("");
        }

        // active to middle of list
        // let activeSong = song_view_lyrics_Playlists_list.querySelector(`.view-lyrics_main-Playlists-item:nth-child(${Number.parseInt(this.currentIndex) + 1})`);
        if(song_view_lyrics_Playlists_list) {
            let activeSong = song_view_lyrics_Playlists_list.querySelector(`.view-lyrics_main-Playlists-item--active`);
            let leftActiveSong = Number.parseInt(getComputedStyle(activeSong).left)
            song_view_lyrics_Playlists_list.style.transform = `translateX(calc(50vw - ${leftActiveSong}px - 215px))`;
        }

    },
    handleEvents_currentSong: function () {
        let _this = this;

        // Handling spin cd(img) when song is playing
        let song_imgAnimate = song_img.animate([{
            transform: "rotate(360deg)"
        }], {
            duration: 10 * 1000, // 10 seconds
            iterations: Infinity
        })
        song_imgAnimate.pause();

        // Handle when play audio
        if(song_play) {
            song_play.onclick = function () {
                if (_this.isPlaying) {
                    song_audio.pause();
                } else {
                    song_audio.play();
                }
            }
        }

        if(song_audio) {
            song_audio.onplay = function () {
                _this.isPlaying = true;
                _this.interfacePlaying();
                song_imgAnimate.play();
            }
    
            song_audio.onpause = function () {
                _this.isPlaying = false;
                _this.interfacePause();
                song_imgAnimate.pause();
            }
    
            song_audio.ontimeupdate = function () {
                if (!_this.isFocusTimeProgress) {
                    let song_minutes = Math.floor(song_audio.currentTime / 60);
                    let song_seconds = Math.floor(song_audio.currentTime % 60);
                    if (song_minutes < 10) song_minutes = "0" + song_minutes;
                    if (song_seconds < 10) song_seconds = "0" + song_seconds;
                    song_time_current.textContent = song_minutes + ":" + song_seconds;
    
                    song_time_progress.value = Math.floor(song_audio.currentTime);
                }
                _this.checkModeAutoPlay();
            }

            // Handing when end song
            song_audio.onended = function () {
                // Playlists auto play
                if (_this.isRepeat) {
                    song_audio.play();
                } else {
                    if (_this.isAutoPlay) {
                        song_next.click();
                    }
                }
            }
        }

        // Handling when seek
        if(song_time_progress) {
            song_time_progress.onchange = function () {
                song_audio.currentTime = song_time_progress.value;
                song_audio.play();
            }
            song_time_progress.onmouseup = function () {
                _this.isFocusTimeProgress = false;
            }
            song_time_progress.onmousedown = function () {
                _this.isFocusTimeProgress = true;
            }
        }

        if(song_shuffle) {
            song_shuffle.onclick = function () {
                _this.isShuffle = !_this.isShuffle;
                song_shuffle.classList.toggle("song-active", _this.isShuffle);
    
                // Change tooltip
                if (_this.isShuffle) {
                    song_shuffle_tooltip.textContent = "Turn off shuffle";
                } else {
                    song_shuffle_tooltip.textContent = "Turn on shuffle";
                }
            }
        }

        if(song_repeat) {
            song_repeat.onclick = function () {
                if (_this.isRepeat) {
                    _this.isRepeat = false;
                    song_repeat.classList.remove("song-active");
                } else {
                    _this.isRepeat = true;
                    song_repeat.classList.add("song-active");
                }
    
                // Change tooltip
                if (_this.isRepeat) {
                    song_repeat_tooltip.textContent = "Turn off repeat";
                } else {
                    song_repeat_tooltip.textContent = "Turn on repeat";
                }
            }
        }

        if(song_next) {
            song_next.onclick = function () {
                if (_this.isShuffle) { // if songPlayer have shuffle, I will random.
                    _this.randomSong();
                } else {
                    _this.nextSong();
                }
                song_audio.play();
            }
        }

        if(song_previous) {
            song_previous.onclick = function () {
                if (_this.isShuffle) { // if songPlayer have shuffle, I will random.
                    _this.randomSong();
                } else {
                    _this.preSong();
                }
                song_audio.play();
            }
        }

        // Adjust song volume 
        if(song_volume_btn) {
            song_volume_btn.onclick = function () {
                if (_this.isVolume == true) {
                    song_audio.volume = 0;
                } else {
                    song_audio.volume = 1;
                }
            }
        }

        if(song_audio) {
            song_audio.onvolumechange = function () {
                if (song_audio.volume == 0) {
                    _this.isVolume = false;
                    song_volume_btn.classList.remove("extend-song_volume-btn--active", _this.isVolume);
    
                    song_volume_progress.value = 0;
                } else {
                    _this.isVolume = true
                    song_volume_btn.classList.add("extend-song_volume-btn--active", _this.isVolume);
    
                    song_volume_progress.value = song_audio.volume * 100;
                }
    
                // Change tooltip
                if (_this.isVolume) {
                    song_volume_btn_tooltip.textContent = "Turn off volume";
                } else {
                    song_volume_btn_tooltip.textContent = "Turn on volume";
                }
            }
        }

        // song_volume_progress.onchange = function() {
        //     _this.volumeValue = song_volume_progress.value;
        //     song_audio.volume = _this.volumeValue / 100;
        // }
        if(song_volume_progress) {
            song_volume_progress.onmousedown = function () {
                song_volume_progress.onmousemove = function () {
                    song_audio.volume = song_volume_progress.value / 100;
                }
            }
        }

        // Open playlists
        if(song_full_song) {
            song_full_song.onclick = function () {
                if (_this.isOpenViewLyrics) {
                    _this.isOpenPlaylists = true;
                    song_playlists.classList.toggle("playlists--open", _this.isOpenPlaylists)
                    song_current_view_lyrics.click();
                } else {
                    _this.isOpenPlaylists = !_this.isOpenPlaylists;
                    song_playlists.classList.toggle("playlists--open", _this.isOpenPlaylists)
                }
                if (_this.isOpenPlaylists) {
                    _this.render_playlists();
                }
            }
        }

        // Click into view lyrics
        if(song_current_view_lyrics) {
            song_current_view_lyrics.onclick = function () {
                _this.isOpenViewLyrics = !_this.isOpenViewLyrics;
                if(song_view_lyrics) {
                    song_view_lyrics.classList.toggle("view-lyrics--open", _this.isOpenViewLyrics);
                }
    
                if (_this.isOpenViewLyrics) _this.render_viewLyrics();
            }
        }

        // Click into full screen
        if(song_current_fullscreen) {
            song_current_fullscreen.onclick = function () {
                if (!_this.isFullScreen) {
                    _this.isFullScreen = true;
                    openFullscreen();
                } else {
                    _this.isFullScreen = false;
                    closeFullscreen();
                }
            }
        }

        // click btn cancel alarm
        if(song_current_alarm_btnCancel) {
            song_current_alarm_btnCancel.onclick = function () {
                song_playlists_header_setAlarm.click(); // because Alarm is moding counting
            }
        }
    },
    handleEvents_playlists: function () {
        let _this = this;

        // click mode change list song
        if(song_playlists_header_sesstion) {
            song_playlists_header_sesstion.onclick = function (e) {
    
                let targetTemp = e.target.closest(".playlists-header_sesstion-list-current");
                let playlists_listenedRecently = song_playlists_header_sesstion.querySelector(".playlists-header_sesstion-listened-recently");
                let playlists_current = song_playlists_header_sesstion.querySelector(".playlists-header_sesstion-list-current");
    
                if (targetTemp != null) { // click into playlist
                    if (!playlists_current.classList.contains("playlists-header_sesstion-item--active")) {
                        playlists_current.classList.add("playlists-header_sesstion-item--active");
                        playlists_listenedRecently.classList.remove("playlists-header_sesstion-item--active");
    
                        // change playlist area
                        song_playlists_current.style.display = "block";
                        song_playlists_listenedRecently.style.display = "none";
    
                        _this.liftPlaylistsItem();
                    }
                } else { // click into listened recently
    
                    if (!playlists_listenedRecently.classList.contains("playlists-header_sesstion-item--active")) {
                        playlists_listenedRecently.classList.add("playlists-header_sesstion-item--active");
                        playlists_current.classList.remove("playlists-header_sesstion-item--active");
    
                        // change playlist area
                        song_playlists_listenedRecently.style.display = "block";
                        song_playlists_current.style.display = "none";
                        
                        song_playlists_list.scrollTop = 0;
                    }
                }
            }
        }

        // click set alarm button
        if(song_playlists_header_setAlarm) {
            song_playlists_header_setAlarm.onclick = function () {
                song_alarm.style.display = "flex";
            }
        }

        // click close (Chưa đổi tên class)
        if(song_playlists_header_seeMore) {
            song_playlists_header_seeMore.onclick = function () {
                song_full_song.click();
            }
        }

        // Click item in playlists 
        if(song_playlists_current) {
            song_playlists_current.onclick = function(e) {
    
                // click img
                const song_img = e.target.closest(".playlists-item_info-img");
                if(song_img) {
                    const song_item = song_img.closest(".playlists-item")
                    if(song_item.classList.contains("playlists-item--active")) { // click into song is playing
                        song_play.click();
                    }
                    else {
                        _this.currentIndex = song_item.dataset.index;
                        _this.loadCurrentSong();
                        song_audio.play();
                    }
                    return;
                }
                // click mode
                const song_mode = e.target.closest(".playlists-item_mode");
                if(song_mode) {
    
                    return;
                }
    
                song_playlists_current.ondblclick = function(e) {
                    const song_item = e.target.closest(".playlists-item")
                    if(song_item.classList.contains("playlists-item--active")) { // click into song is playing
                        song_play.click();
                    }
                    else {
                        _this.currentIndex = Number.parseInt(song_item.dataset.index);
                        _this.loadCurrentSong();
                        song_audio.play();
                    }
                }
            }
        }

        // click item in listened recently 
        if(song_playlists_listenedRecently) {
            song_playlists_listenedRecently.onclick = function(e) {
    
                function clickPlaySong() {
                    _this.currentIndex = Number.parseInt(song_item.dataset.index);
                    _this.songs = _this.songsListenedRecently;
                    _this.render_playlists();
                    _this.render_viewLyrics_playlists();
    
                    // change into interface of playlists
                    let playlists_listenedRecently = song_playlists_header_sesstion.querySelector(".playlists-header_sesstion-listened-recently");
                    let playlists_current = song_playlists_header_sesstion.querySelector(".playlists-header_sesstion-list-current");
                    playlists_current.classList.add("playlists-header_sesstion-item--active");
                    playlists_listenedRecently.classList.remove("playlists-header_sesstion-item--active");
    
                    song_playlists_current.style.display = "block";
                    song_playlists_listenedRecently.style.display = "none";
                    _this.liftPlaylistsItem();
    
                    _this.loadCurrentSong();
                    song_audio.play();
                }
                
                 // click img
                 let song_img = e.target.closest(".playlists-item_info-img");
                 let song_item =  e.target.closest(".playlists-item");
                 if(song_img) {
                    clickPlaySong();
                     return;
                 }
                 // click mode
                 const song_mode = e.target.closest(".playlists-item_mode");
                 if(song_mode) {
     
                     return;
                 }
     
                 song_playlists_current.ondblclick = function(e) {
                    clickPlaySong();
                 }
            }
        }

    },
    handleEvents_viewLyrics: function () {
        let _this = this;

        // click Fullscreen
        if(song_view_lyrics_otherFullScreen) {
            song_view_lyrics_otherFullScreen.onclick = function() {
                song_current_fullscreen.click()
            }
        }

        // click close
        if(song_view_lyrics_otherClose) {
            song_view_lyrics_otherClose.onclick = function() {
                song_current_view_lyrics.click()
            }
        }

        // click setting 
        if(song_view_lyrics_otherSetting) {
            song_view_lyrics_otherSetting.onclick = function () {
                if (song_view_lyrics_otherSetting_mode.classList.contains('view-lyrics_mode-other-item_setting-mode--open')) {
                    song_view_lyrics_otherSetting_mode.classList.remove('view-lyrics_mode-other-item_setting-mode--open')
                } else {
                    song_view_lyrics_otherSetting_mode.classList.add('view-lyrics_mode-other-item_setting-mode--open')
                }
            }
        }

        // Click mode change view
        if(song_view_lyrics_mode) {
            song_view_lyrics_mode.onclick = function (e) {
                const mode_item = e.target.closest(".view-lyrics_mode-main-item");
                if (!mode_item.classList.contains("view-lyrics_mode-main-item--active")) {
                    song_view_lyrics_mode.querySelector(".view-lyrics_mode-main-item--active").classList.remove("view-lyrics_mode-main-item--active");
                    mode_item.classList.add("view-lyrics_mode-main-item--active");
                }
    
                // display main area
                let value = song_view_lyrics_mode.querySelector(".view-lyrics_mode-main-item--active").dataset.value;
    
    
                if (value == 'playlists') {
                    song_view_lyrics_Playlists.style.display = 'flex';
                    song_view_lyrics_Lyrics.style.display = 'none';
                    song_view_lyrics_Karaoke.style.display = 'none';
                } else if (value == 'lyrics') {
                    song_view_lyrics_Playlists.style.display = 'none';
                    song_view_lyrics_Lyrics.style.display = 'flex';
                    song_view_lyrics_Karaoke.style.display = 'none';
    
                } else if (value == 'karaoke') {
                    song_view_lyrics_Playlists.style.display = 'none';
                    song_view_lyrics_Lyrics.style.display = 'none';
                    song_view_lyrics_Karaoke.style.display = 'flex';
    
                }
            }
        }

        // click set alarm button
        if(song_view_lyrics_otherSetting_mode_setAlarm) {
            song_view_lyrics_otherSetting_mode_setAlarm.onclick = function () {
                song_alarm.style.display = "flex";
            }
        }

        // click main
        if(song_view_lyrics_Playlists) {
            song_view_lyrics_Playlists.onclick = function (e) {
    
                // click btn left right in playlists
                if (e.target.closest(".view-lyrics_main-Playlists_btn")) {
                    let BorderSongcur = song_view_lyrics_Playlists_list.querySelector('.view-lyrics_main-Playlists-item--border');
                    let indexBorderSongcur = BorderSongcur.dataset.index;
                    let indexActiveSongcur = song_view_lyrics_Playlists_list.querySelector('.view-lyrics_main-Playlists-item--active').dataset.index;
                    let SongNew;
    
                    let targetTemp = e.target.closest(".view-lyrics_main-Playlists_btn");
                    if (targetTemp.classList.contains('view-lyrics_main-Playlists_btn--left')) { // click btn left
                        SongNew = song_view_lyrics_Playlists_list.querySelector(`.view-lyrics_main-Playlists-item:nth-child(${Number.parseInt(indexBorderSongcur)})`);
                        if (SongNew.dataset.index == 0) targetTemp.classList.add("view-lyrics_main-Playlists_btn--disable");
                    } 
                    else {
                        SongNew = song_view_lyrics_Playlists_list.querySelector(`.view-lyrics_main-Playlists-item:nth-child(${Number.parseInt(indexBorderSongcur) + 2})`);
                        if (SongNew.dataset.index == _this.songs.length - 1) targetTemp.classList.add("view-lyrics_main-Playlists_btn--disable");
                    }
    
                    if (SongNew) BorderSongcur.classList.remove("view-lyrics_main-Playlists-item--border");
                    // add border
                    SongNew.classList.add("view-lyrics_main-Playlists-item--border");
    
                    if (SongNew.dataset.index > 0) song_view_lyrics_Playlists.querySelector('.view-lyrics_main-Playlists_btn--left').classList.remove("view-lyrics_main-Playlists_btn--disable");
                    if (SongNew.dataset.index < _this.songs.length - 1) song_view_lyrics_Playlists.querySelector('.view-lyrics_main-Playlists_btn--right').classList.remove("view-lyrics_main-Playlists_btn--disable");
    
                    let leftSongNew = Number.parseInt(getComputedStyle(SongNew).left);
                    if (SongNew.dataset.index == indexActiveSongcur) {
                        song_view_lyrics_Playlists_list.style.transform = `translateX(calc(50vw - ${leftSongNew}px - 215px))`;
                    } 
                    else {
                        song_view_lyrics_Playlists_list.style.transform = `translateX(calc(50vw - ${leftSongNew}px - 180px))`;
                    }
    
    
                    // add run letter if overflow size
                    if(SongNew) {
                        let nameElemnt = SongNew.querySelector('.view-lyrics_main-Playlists-item_info-name');
                        if(nameElemnt.scrollWidth > 0 && nameElemnt.clientWidth) {
                            setTimeout(function() {
                                runLetter(nameElemnt);
                            }, 1000)
                        }
                    }
    
                } 
                else if (e.target.closest(".view-lyrics_main-Playlists-item_img-hover")) { // click btn play pause
                    let songClick = e.target.closest('.view-lyrics_main-Playlists-item');
                    if (songClick.classList.contains("view-lyrics_main-Playlists-item--active")) { // click into song is playing
                        song_play.click();
                    } 
                    else {
                        _this.currentIndex = songClick.dataset.index;
                        _this.loadCurrentSong();
                        song_audio.play();
                    }
                }
            }
        }




    },
    handleEventsAlarm: function () {
        let  _this = this;
        let alarmTimeOut;
        let updateGuessAlarmSetInterval;

        function guessAlarm() {
            let inputs = $$('.time-picker .time-picker_input input');
            let emlementGuess = $('.timer-stop-playing_setup-guess');

            let dateCurrent = (new Date());
            let hours = Number.parseInt(inputs[0].value) || 0,
                minutes = Number.parseInt(inputs[1].value) || 0;

            if (hours == 0 && minutes == 0) {
                emlementGuess.textContent = 'Choose the time to stop playing music';
                return false;
            }

            let hoursNew = dateCurrent.getHours() + hours;
            let minutesNew = dateCurrent.getMinutes() + minutes;
            let dayNew = dateCurrent.getDate();
            let monthNew = dateCurrent.getMonth() + 1;
            let yearNew = dateCurrent.getFullYear();


            let dateGuess = (new Date(yearNew, monthNew, dayNew, hoursNew, minutesNew));
            hoursNew = (dateGuess.getHours() < 10) ? "0" + dateGuess.getHours() : dateGuess.getHours();
            minutesNew = (dateGuess.getMinutes() < 10) ? "0" + dateGuess.getMinutes() : dateGuess.getMinutes();
            dayNew = (dateGuess.getDate() < 10) ? "0" + dateGuess.getDate() : dateGuess.getDate();
            monthNew = (dateGuess.getMonth() < 10) ? "0" + dateGuess.getMonth() : dateGuess.getMonth();

            console.log('guessAlarm is doing');
            emlementGuess.textContent =
                `Expect to stop playing music at: ${hoursNew}:${minutesNew} ${dayNew}/${monthNew}/${dateGuess.getFullYear()}`;

            return (hours * 60 + minutes);
        }

        // update guessAlarm when setAlarm was setting - cập nhật thời gian của đoán báo thức khi báo thức đã được thiết lập
        function updateGuessAlarm() {
            updateGuessAlarmSetInterval = setInterval(function () {
                let mode = guessAlarm();
                if (mode === false || song_alarm.classList.contains('timer-stop-playing--Counting')) clearInterval(updateGuessAlarmSetInterval);
            }, 1000);
        }

        function resetAlarm() {
            song_alarm_inputs.forEach(function (item) {
                let inputItem = item.querySelector('.time-picker_input input');
                inputItem.value = "00";
                guessAlarm();
            });
        }

        // focus input, appear options 
        if(song_alarm_inputs) {
            song_alarm_inputs.forEach(function (item) {
    
                let options = item.querySelector('.time-picker_input-options');
                let inputItem = item.querySelector('.time-picker_input input');
    
                inputItem.onfocus = function (e) {
                    options.style.display = "block";
                }
    
                // click option intput
                options.onmousedown = function (e) {
                    let option = e.target.closest('.time-picker_input-option');
                    let optionActive = options.querySelector('.time-picker_input-option.time-picker_input-option--active');
    
                    optionActive.classList.remove('time-picker_input-option--active');
                    option.classList.add('time-picker_input-option--active');
    
                    // update input value
                    let value = Number.parseInt(option.querySelector('span').textContent);
                    inputItem.value = value;
                    guessAlarm();
                }
    
                inputItem.addEventListener('keyup', function (e) {
                    guessAlarm();
                });
    
                inputItem.addEventListener('focusout', function (e) {
    
                    options.style.display = "none";
    
                    let valueInput = Number.parseInt(inputItem.value) || 0;
                    if (valueInput == 0) {
                        inputItem.value = "00";
                    } else if (valueInput < 10) {
                        valueInput = "0" + valueInput;
                        inputItem.value = valueInput;
                    }
                });
    
                // Just enter number, backpace, delete, arrows
                inputItem.onkeydown = function (event) {
                    let key;
                    if (window.event) {
                        key = event.keyCode;
                    } else if (e) {
                        key = e.which;
                    }
                    return (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key >= 37 && key <= 40) || (key == 46);
                    /* 
                        0 -> 9 : (key >= 48 && key <= 57) || (key >= 96 && key <= 105)
                        backspace: (key == 8)
                        arrows: (key >= 37 && key <= 40)
                        delete: (key == 46)
                    */
                }
    
                // Guess alarm
                inputItem.onchange = function () {
                    // console.log('change');
                    updateGuessAlarm();
                }
            });
        }

        // click btn save timer
        if(song_alarm_btnSave) {
            song_alarm_btnSave.onclick = function () {
                let timeAlarm = guessAlarm();
                if (timeAlarm != false) {
    
                    resetAlarm();
    
                    // change to mode counting
                    song_alarm.classList.add('timer-stop-playing--Counting');
                    song_alarm.style.display = "none";
    
                    // appear countdown in area current song
                    let song_current_alarm_Time = song_current_alarm.querySelector('.alarm-count-down_time');
                    // update time in countdown
                    var distance = timeAlarm * 60; // seconds
                    alarmTimeOut = setInterval(function () {
                        song_current_alarm.style.display = 'flex';
    
                        var hours = Math.floor((distance / (60 * 60)));
                        var minutes = Math.floor((distance % (60 * 60)) / 60);
                        var seconds = Math.floor(distance % 60);
    
                        if (hours < 10) hours = "0" + hours;
                        if (minutes < 10) minutes = "0" + minutes;
                        if (seconds < 10) seconds = "0" + seconds;
    
    
                        song_current_alarm_Time.textContent = `${hours}:${minutes}:${seconds}`;
    
                        distance--;
                        if (distance < 0) {
                            clearInterval(alarmTimeOut);
                            song_current_alarm.style.display = 'none';
                            song_alarm.classList.remove('timer-stop-playing--Counting');
    
                            if (_this.isPlaying) { // if song is playing, I will appear notify
                                song_alarm.style.display = "flex";
                                song_alarm.classList.add('timer-stop-playing--end-count');
                                // Set Notify End Alarm With Current Song
                                let notifyAlarm = song_alarm.querySelector('.timer-stop-playing_notify');
                                let notifyAlarmImg = notifyAlarm.querySelector('.timer-stop-playing_notify-info-song-img img');
                                let notifyAlarmName = notifyAlarm.querySelector('.timer-stop-playing_notify-info-song-name');
                                let notifyAlarmSinger = notifyAlarm.querySelector('.timer-stop-playing_notify-info-song-singer');
                                notifyAlarmImg.src = _this.currentSong.img;
                                notifyAlarmName.textContent = _this.currentSong.name;
                                notifyAlarmSinger.textContent = _this.currentSong.singer;
    
                                // pause audio
                                song_audio.pause();
                            }
                        }
                    }, 1000);
                } else {
                    alert("You must set the alarm time, please!")
                }
            }
        }

        // click btn cancel 
        if(song_alarm_btnCancel) {
            song_alarm_btnCancel.onclick = function () {
                song_alarm.style.display = 'none';
            };
        }

        /* btn alarm counting */
        if(song_alarm_counting_no) {
            song_alarm_counting_no.onclick = function () { // no delete alarm
                song_alarm.style.display = 'none';
            }
        }

        if(song_alarm_counting_yes) {
            song_alarm_counting_yes.onclick = function () { // delete alarm
                song_alarm.style.display = 'none';
                song_alarm.classList.remove('timer-stop-playing--Counting');
    
                song_current_alarm.style.display = 'none'; // disappear area alarm current song
    
                // clear time interval
                clearInterval(alarmTimeOut);
    
                resetAlarm();
            }
        }

        /* Btn alarm notify */
        if(song_alarm_end_counting_btn) {
            song_alarm_end_counting_btn.onclick = function (e) {
                let btn = e.target.closest('.timer-stop-playing_notify-btn--continue');
    
                if (btn != null) {
                    song_audio.play();
                }
                song_alarm.classList.remove('timer-stop-playing--end-count');
                song_alarm.style.display = 'none';
            }
        }

    },
    loadCurrentSong: function () {

        if(this.intervalRunName) clearInterval(this.intervalRunName);

        song_audio.src = this.currentSong.audio;
        song_img.style.backgroundImage = `url('${this.currentSong.img}')`;
        if (this.currentSong.favorite == true) song_list_favorite.classList.add("list-favorite");
        if (this.currentSong.isLike == true) song_list_like.classList.add('info-song_mode-like--active');
        else song_list_like.classList.remove('info-song_mode-like--active');
        if (this.currentSong.amountLike > 0) {
            song_list_amountlike.style.display = "inline-block";
            song_list_amountlike.textContent = this.currentSong.amountLike;
        } else {
            song_list_amountlike.style.display = "none";
        }
        song_name.textContent = this.currentSong.name;
        song_singer.textContent = this.currentSong.singer;

        // Load time
        song_time_current.textContent = "00:00";
        song_audio.onloadedmetadata = function () {
            if (song_audio.duration) {
                let song_minutes = Math.floor(song_audio.duration / 60);
                let song_seconds = Math.floor(song_audio.duration % 60);
                if (song_minutes < 10) song_minutes = "0" + song_minutes;
                if (song_seconds < 10) song_seconds = "0" + song_seconds;
                song_time_song.textContent = song_minutes + ":" + song_seconds;

                // load value of imput range
                song_time_progress.max = Math.floor(song_audio.duration);
                song_time_progress.min = 0;
                song_time_progress.value = 0;
            }
        }


        // set interval for run name
        song_name.style.transition = "none";
        song_name.style.transform = "translateX(0)";
        let _this = this;
        if(song_name.scrollWidth > song_name.clientWidth) {
            setTimeout(function() {
                runLetter(song_name);

                _this.intervalRunName = setInterval(function() {
                    runLetter(song_name);
                }, 8000);
            }, 3000);
        }

        this.liftPlaylistsItem();
        this.render_viewLyrics_Lyrics();
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    preSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function () {
        let id;
        do {
            id = Math.floor(Math.random() * this.songs.length);
        } while (id == this.currentIndex)

        this.currentIndex = id;
        this.loadCurrentSong();
    },
    checkModeAutoPlay: function () {
        if(!song_playlists_autoPlay || !song_view_lyrics_otherSetting_mode_autoPlay)
            return;
        if (song_playlists_autoPlay.classList.contains("btn-toggle--active") && song_view_lyrics_otherSetting_mode_autoPlay.classList.contains("btn-toggle--active")) {
            return;
        } else if (!song_playlists_autoPlay.classList.contains("btn-toggle--active") && !song_view_lyrics_otherSetting_mode_autoPlay.classList.contains("btn-toggle--active")) {
            return;
        } else {
            if ((song_playlists_autoPlay.classList.contains("btn-toggle--active") || song_view_lyrics_otherSetting_mode_autoPlay.classList.contains("btn-toggle--active")) && this.isAutoPlay == false) {
                this.isAutoPlay = true;
            } else {
                this.isAutoPlay = false;
            }

            if (this.isAutoPlay == true) {
                if (!song_playlists_autoPlay.classList.contains("btn-toggle--active")) {
                    song_playlists_autoPlay.click();
                } else {
                    song_view_lyrics_otherSetting_mode_autoPlay.click();
                }
            } else {
                if (song_playlists_autoPlay.classList.contains("btn-toggle--active")) {
                    song_playlists_autoPlay.click();
                } else {
                    song_view_lyrics_otherSetting_mode_autoPlay.click();
                }
            }
        }
        // console.log(this.isAutoPlay);
    },
    liftPlaylistsItem: function () {
        // keo playlists item len
        let song_playlist_curr;
        if(song_playlists_current) {
            song_playlist_curr = song_playlists_current.querySelector(`.playlists-item:nth-child(${Number.parseInt(this.currentIndex) + 1})`);
        }
        if(song_playlists_header) {
            const heightPlaylists_header = Number.parseInt(getComputedStyle(song_playlists_header).height);

            const heightScrollTop = song_playlist_curr.offsetTop - heightPlaylists_header;
            song_playlists_list.scrollTop = heightScrollTop;
        }

    },
    interfacePlaying: function () {

        /* INTERFACE CURRENT SONG */
        song_play.classList.add("song-active");

        /* INTERFACE PLAYLISTS */
        let song_active_pre = song_playlists.querySelector(".playlists .playlists-item.playlists-item--active");
        song_active_pre.classList.remove("playlists-item--active");
        song_active_pre.classList.remove("playlists-item--playing");

        let song_playlists_item_current = song_playlists_current.querySelector(`.playlists-item:nth-child(${Number.parseInt(this.currentIndex) + 1})`);
        song_playlists_item_current.classList.add("playlists-item--active");
        song_playlists_item_current.classList.add("playlists-item--playing");

        /* INTERFACE VIEW LYRICS */
        // change interface
        let song_viewLyrics_active_pre = song_view_lyrics_Playlists_list.querySelector(".view-lyrics_main-Playlists-item.view-lyrics_main-Playlists-item--active");
        let song_viewLyrics_border_pre = song_view_lyrics_Playlists_list.querySelector(".view-lyrics_main-Playlists-item.view-lyrics_main-Playlists-item--border");
        song_viewLyrics_active_pre.classList.remove("view-lyrics_main-Playlists-item--active");
        song_viewLyrics_active_pre.classList.remove("view-lyrics_main-Playlists-item--playing");
        song_viewLyrics_border_pre.classList.remove("view-lyrics_main-Playlists-item--border");

        let song_viewLyrics_item_current = song_view_lyrics_Playlists_list.querySelector(`.view-lyrics_main-Playlists-item:nth-child(${Number.parseInt(this.currentIndex) + 1})`);
        song_viewLyrics_item_current.classList.add("view-lyrics_main-Playlists-item--active");
        song_viewLyrics_item_current.classList.add("view-lyrics_main-Playlists-item--playing");
        song_viewLyrics_item_current.classList.add("view-lyrics_main-Playlists-item--border");

        //move item active to middle
        this.render_viewLyrics_playlists();

        //change btn 
        let btnLeftViewLyrics = song_view_lyrics_Playlists.querySelector('.view-lyrics_main-Playlists_btn--left');
        let btnRightViewLyrics = song_view_lyrics_Playlists.querySelector('.view-lyrics_main-Playlists_btn--right');

        if (song_viewLyrics_item_current.dataset.index == 0) {
            btnLeftViewLyrics.classList.add('view-lyrics_main-Playlists_btn--disable');
            if (song_viewLyrics_item_current.dataset.index == this.songs.length - 1) btnRightViewLyrics.classList.add('view-lyrics_main-Playlists_btn--disable');
            else btnRightViewLyrics.classList.remove('view-lyrics_main-Playlists_btn--disable');
        } else if (song_viewLyrics_item_current.dataset.index == this.songs.length - 1) {
            btnRightViewLyrics.classList.add('view-lyrics_main-Playlists_btn--disable');
            if (song_viewLyrics_item_current.dataset.index == 0) btnLeftViewLyrics.classList.add('view-lyrics_main-Playlists_btn--disable');
            else btnLeftViewLyrics.classList.remove('view-lyrics_main-Playlists_btn--disable');
        } else {
            btnLeftViewLyrics.classList.remove('view-lyrics_main-Playlists_btn--disable');
            btnRightViewLyrics.classList.remove('view-lyrics_main-Playlists_btn--disable');
        }

    },
    interfacePause: function () {
        /* INTERFACE CURRENT SONG */
        song_play.classList.remove("song-active");

        /* INTERFACE PLAYLISTS */
        const song_active_pre = song_playlists.querySelector(".playlists .playlists-item.playlists-item--active");
        song_active_pre.classList.remove("playlists-item--active");
        song_active_pre.classList.remove("playlists-item--playing");

        song_playlists_current.querySelector(`.playlists-item:nth-child(${Number.parseInt(this.currentIndex) + 1})`).classList.add("playlists-item--active");

        /* INTERFACE VIEW LYRICS */
        let song_viewLyrics_active_pre = song_view_lyrics_Playlists_list.querySelector(".view-lyrics_main-Playlists-item.view-lyrics_main-Playlists-item--active");
        let song_viewLyrics_border_pre = song_view_lyrics_Playlists_list.querySelector(".view-lyrics_main-Playlists-item.view-lyrics_main-Playlists-item--border");
        song_viewLyrics_active_pre.classList.remove("view-lyrics_main-Playlists-item--active");
        song_viewLyrics_active_pre.classList.remove("view-lyrics_main-Playlists-item--playing");
        song_viewLyrics_border_pre.classList.remove("view-lyrics_main-Playlists-item--border");

        let song_viewLyrics_item_current = song_view_lyrics_Playlists_list.querySelector(`.view-lyrics_main-Playlists-item:nth-child(${Number.parseInt(this.currentIndex) + 1})`);
        song_viewLyrics_item_current.classList.add("view-lyrics_main-Playlists-item--active");
        song_viewLyrics_item_current.classList.add("view-lyrics_main-Playlists-item--border");

        //change btn 
        let btnLeftViewLyrics = song_view_lyrics_Playlists.querySelector('.view-lyrics_main-Playlists_btn--left');
        let btnRightViewLyrics = song_view_lyrics_Playlists.querySelector('.view-lyrics_main-Playlists_btn--right');

        if (song_viewLyrics_item_current.dataset.index == 0) btnLeftViewLyrics.classList.add('view-lyrics_main-Playlists_btn--disable');
        else if (song_viewLyrics_item_current.dataset.index == this.songs.length - 1) btnRightViewLyrics.classList.add('view-lyrics_main-Playlists_btn--disable');
        else {
            btnLeftViewLyrics.classList.remove('view-lyrics_main-Playlists_btn--disable');
            btnRightViewLyrics.classList.remove('view-lyrics_main-Playlists_btn--disable');
        }
    },
    startOtherPlaylists: function (listSong, currSong) {
        this.songs = listSong;
        this.currentIndex = currSong;
        this.indexBorderedItemViewPlaylists = currSong;
        // this.songsListenedRecently = listSongListenedRecently;

        this.render_playlists();
        this.render_listenedRecently();
        this.render_viewLyrics();

        this.loadCurrentSong();

        song_audio.play();
    },
    start: function (listSong, listSongListenedRecently = [], currSong = 0) {

        this.songs = listSong;
        this.songsListenedRecently = listSongListenedRecently;
        this.currentIndex = currSong;
        this.indexBorderedItemViewPlaylists = currSong;

        this.defineProperties();

        this.handleEvents_currentSong();
        this.handleEvents_playlists();
        this.handleEvents_viewLyrics();
        this.handleEventsAlarm();

        this.render_playlists();
        this.render_listenedRecently();
        this.render_viewLyrics();

        this.loadCurrentSong();

        // Change isAutoplay to True
        if(song_playlists_autoPlay) {
            song_playlists_autoPlay.click();
        }
    }

}




// song_player.start(songs, songsListenedRecently, 0);

// get top 100 song in data which I have recently fecthed.
class FetchData {

    constructor() {  }

    fetch100Song(API, name_song, mode) {
        // Fetch song from Api to my web
        let idSongCurrent = 0;
        fetch(API)
        .then(response => response.json())
        .then(data => {
            let songs = data.map((song) => {
                return {
                    name: song.title,
                    singer: song.creator, 
                    favorite: true,
                    isLike: true,
                    amountLike: Math.round(Math.random() * 100),
                    img: song.avatar,
                    audio: song.music,
                    lyric: song.lyric,
                };
            }, []);
            for(let i=0;i<songs.length;i++) {
                if(songs[i].name == name_song) {
                    idSongCurrent = i;
                }
                const xhttp = new XMLHttpRequest();
                data = new FormData();
                data.append('action', 'ajax_decrypt');
                data.append('key', 'Lyr1cjust4nct');
                data.append('algo', 'arcfour');
                data.append('mode', 'stream');
                data.append('decode', 'checked');
                data.append('decode_method', '2');
                xhttp.onload = function() {
                    data.append('text', this.responseText);
                    xhttp.onload = function () {
                        // console.log(this.responseText);
                        songs[i].lyric = this.responseText;
    
                    }
                    
                    xhttp.open('POST', "https://www.tools4noobs.com/", true);
                    xhttp.send( data );
                }
                xhttp.open("GET", songs[i].lyric);
                xhttp.send();
            }
            if (mode == 0) {
                song_player.start(songs, songs, idSongCurrent);
            }
            else {
                song_player.startOtherPlaylists(songs, idSongCurrent)
            }
                // console.log(songs);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    fetchSongOther(API) {
        // Fetch song from Api to my web
        let idSongCurrent = 0;
        fetch(API)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            let songs = data.songs.top100_AM[0].songs.map((song) => {
                return {
                    name: song.title,
                    singer: song.creator, 
                    favorite: true,
                    isLike: true,
                    amountLike: Math.round(Math.random() * 100),
                    img: song.avatar,
                    audio: song.music,
                    lyric: song.lyric,
                };
            }, []);
            // for(let i=0;i<songs.length;i++) {
            //     const xhttp = new XMLHttpRequest();
            //     data = new FormData();
            //     data.append('action', 'ajax_decrypt');
            //     data.append('key', 'Lyr1cjust4nct');
            //     data.append('algo', 'arcfour');
            //     data.append('mode', 'stream');
            //     data.append('decode', 'checked');
            //     data.append('decode_method', '2');
            //     xhttp.onload = function() {
            //         data.append('text', this.responseText);
            //         xhttp.onload = function () {
            //             // console.log(this.responseText);
            //             songs[i].lyric = this.responseText;
    
            //         }
                    
            //         xhttp.open('POST', "https://www.tools4noobs.com/", true);
            //         xhttp.send( data );
            //     }
            //     xhttp.open("GET", songs[i].lyric);
            //     xhttp.send();
            // }
            song_player.start(songs, songs.slice(11, 22), 0);
            // console.log(songs);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }


}


let songs = [

    {
        name: "Always remember us this way Always remember us this way",
        singer: "Lady Gaga",
        favorite: true,
        isLike: false,
        amountLike: 0,
        img: "./assets/audio/img/Always-Remember-Us-This-Way.jpg",
        audio: "./assets/audio/mp3/Always-Remember-Us-This-Way.mp3",
        lyric: "Always remember us this way. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet numquam eius repellendus vel soluta Accusantium cupidita, Amet numquam eius repellendus vel soluta Accusantium cupiditate commodi distinctio excepturi, veritatis culpa sapiente reprehenderit quam, voluptatibus cum obcaecati labore nostrum eveniet!"
    },
    
]

let songsListenedRecently = []

const API_MP3 = "https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST?fbclid=IwAR21ISlfRXxd1LRBoNnQd-56xGGyj-0ODQXiS579oIsjs9zJh1mM6hc7BTE"

// const MY_API_MP3 = "http://localhost:8080/Music_Web/api/A%20Time%20For%20Us"

try {
    window.FetchData = new FetchData();
    
    // window.FetchData.fecth100Song(MY_API_MP3, "A%20Time%20For%20Us", 0);
    window.FetchData.fetchSongOther(API_MP3);
}
catch (e) {
    console.log(e.message);
}

// window.FetchData = FetchData

// window.FetchData.fecth100Song('http://localhost:8080/Music_Web/api/Mood', 'Mood', 1)