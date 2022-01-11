

const functionArea = document.querySelector('.function-main');
const functionChildren = document.querySelectorAll('.function-item');

// add click into functionArea child
functionChildren.forEach(function (item) {
    // Handle upload file if necessary
    if(item.classList.contains('function-item--upload-song')) {

    }
    else {
        item.onclick = function() {

            // Click item is actived dont do anything
            if(item.classList.contains('function-item--active')) { 

            }
            else {
                let itemActive = functionArea.querySelector('.function-item--active');

                itemActive.classList.remove('function-item--active');
                item.classList.add('function-item--active');
                

                // set interface
                let featureItem = item.getAttribute('name') 
                
                let personal = document.querySelector('.personal');
                let home = document.querySelector('.home');
                let listSong = document.querySelector('.list-songs');
                if(featureItem == 'personal') {
                    personal.style.display = 'flex';
                    home.style.display = 'none';
                    listSong.style.display = 'none';
                }
                else if(featureItem == 'home') {
                    personal.style.display = 'none';
                    home.style.display = 'block';
                    listSong.style.display = 'none';
                }
                else if(featureItem == 'list_song') {
                    personal.style.display = 'none';
                    home.style.display = 'none';
                    listSong.style.display = 'block';
                }
                else {

                }
            }
        }
    }
})