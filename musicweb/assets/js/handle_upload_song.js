
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// Element upload song
const uploadSongFunction  = $('.function .function-item--upload-song');
const uploadSongUser  = $('.user .user_upload-song');
const uploadSongListSongOther  = $('.list-songs_other-update-song .upload-song--whole-song .upload-song_btn');


// Handle Choose file
const uploadSongForm = $('.song-form');
const uploadSongForm_img = uploadSongForm.querySelector('.song-form_form-file--image');
const uploadSongForm_audio = uploadSongForm.querySelector('.song-form_form-file--audio');

const uploadSongForm_btnCancel = uploadSongForm.querySelector('.song-form_btn-item--cancel');
const uploadSongForm_btnUpload = uploadSongForm.querySelector('.song-form_btn-item--upload');

const songFormUpload = {
    isNameSongValid: false,
    isNameSingerValid: false,
    isFileImageValid: false, 
    isFileAudioValid: false,
    isLyricsValid: false, 
    fileImage: null,
    fileAudio: null,
    imageTypes: [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
    ], 
    audioTypes: [
        "audio/mpeg",
        "audio/ogg",
        "audio/wav",
    ], 
    handleValidText: function() {

    }, 
    validFileType: function(file, mode) {
        if(mode == "image") { 
            return this.imageTypes.includes(file.type);
        }
        else if(mode == "audio") {
            return this.audioTypes.includes(file.type);
        }
    },
    validFileSize: function(sizeFile,  sizeValid) {
        return sizeFile < sizeValid;
    },
    handleValid: function() {
        // valid text

        // valid file image
        let isValidImageType = this.validFileType(this.fileImage, 'image');
        if(isValidImageType == false) {
            alert('File image invalid');
            return false;
        }
        

        // valid file audio
        let isValidAudioType = this.validFileType(this.fileAudio, 'audio');
        let isValidAudioSize = this.validFileSize(this.fileAudio.size, 10 * 1024 * 1024); // 10MB;
        if(!isValidAudioType || !isValidAudioSize) {
            alert('File audio invalid');
            return false;
        }

        return true;
    }, 
    handleEvent: function() {
        let _this = this;

        // get file image
        uploadSongForm_img.onchange = function (e) {
            _this.fileImage = e.target.files[0];
        }

        // get file audio
        uploadSongForm_audio.onchange = function (e) {
            _this.fileAudio = e.target.files[0];
        }

        // click btn cancel
        uploadSongForm_btnCancel.onclick = function () {
            uploadSongForm.style.display = "none";
    
        }

        // click btn upload 
        uploadSongForm_btnUpload.onclick = function () {
            if(_this.handleValid()) {
                alert("file valid");
            }
            else {
                alert("wrong somethings!");
            }
        }
    }, 
    start: function () {
        this.handleEvent();
    },

};

songFormUpload.start();


if(uploadSongFunction) {
    uploadSongFunction.onclick = function () {
        uploadSongForm.style.display = "flex";
    }
}

if(uploadSongUser) {
    uploadSongUser.onclick = function () {
        uploadSongForm.style.display = "flex";
    }
}


if(uploadSongListSongOther) {
    uploadSongListSongOther.onclick = function () {
        uploadSongForm.style.display = "flex";
    }
}