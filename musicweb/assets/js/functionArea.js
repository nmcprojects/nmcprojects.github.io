

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

                itemActive?.classList.remove('function-item--active');
                item?.classList.add('function-item--active');
                

                // set interface
                let featureItem = item.getAttribute('name') 
                
                let personal = document.querySelector('.personal');
                let home = document.querySelector('.home');
                let listSong = document.querySelector('.list-songs');
                let loader = document.querySelector('.main-loader');

                loader.style.display = 'flex';
                personal.style.display = 'none';
                home.style.display = 'none';
                listSong.style.display = 'none';

                setTimeout(function() {
                    loader.style.display = 'none';

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
                }, 1000)


                // Close song detail if have it
                let songDetail = document.querySelector('.song-detail');
                songDetail.style.display = 'none';
            }

            // Close if in mobile mode
            const btnCloseMenu = document.querySelector('.function .logo .close-function')
            if(btnCloseMenu && window.innerWidth < 768) {
                btnCloseMenu.click();
            }
        }
    }
})



function clickOpenMenu() {
    const func = document.querySelector('.function');
    func.style.transform = 'translateX(0px)';
}

function clickCloseMenu() {
    const func = document.querySelector('.function');
    func.style.transform = 'translateX(calc(0px - var(--width-function)))';
}

window.addEventListener ("resize", () => {
    const btnMenu = document.querySelector('.logo.logo-search .menu');
    const btnCloseMenu = document.querySelector('.function .logo .close-function')

    if(window.innerWidth >= 768) {
        btnCloseMenu.removeEventListener('click', clickCloseMenu)
        btnMenu.click()
        btnMenu.removeEventListener('click', clickOpenMenu)
    } else {
        btnCloseMenu.addEventListener('click', clickCloseMenu)
        btnMenu.addEventListener('click', clickOpenMenu)
    }
});

document.querySelector('.function .logo .close-function').addEventListener('click', clickCloseMenu)
document.querySelector('.logo.logo-search .menu').addEventListener('click', clickOpenMenu)