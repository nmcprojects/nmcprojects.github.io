function getTranslateValues (element) {
    const style = window.getComputedStyle(element)
    const matrix = style['transform'] || style.webkitTransform || style.mozTransform
  
    // No transform property. Simply return 0 values.
    if (matrix === 'none' || typeof matrix === 'undefined') {
      return {
        x: 0,
        y: 0,
        z: 0
      }
    }
  
    // Can either be 2d or 3d transform
    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
  
    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === '2d') {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0
      }
    }
  
    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === '3d') {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14]
      }
    }
}



const home = document.querySelector('.home');

const homeAdvertisement = document.querySelector('.home_advertisement');
const homeAdvertisementItems = document.querySelectorAll('.home_advertisement .home_advertisement-item');
const homeAdvertisementBtnLeft = document.querySelector('.home_advertisement .home_advertisement-btn--left');
const homeAdvertisementBtnRight = document.querySelector('.home_advertisement .home_advertisement-btn--right');

const advertisement = {
    pos: 0,
    size: 0,
    direction: 'left',
    spinInterval: null,
    imgs: [],

    init: function(imgArray) {
        this.imgs = imgArray;
        this.size = imgs.length;
        this.addLink();
        this.setPosition();
    },
    addLink: function() {
        let _this = this;
        // Add link img to item
        homeAdvertisementItems.forEach(function (item, id) {
            let imgItem = item.querySelector('img');
            imgItem.src = _this.imgs[id];
            item.onclick = function() {
                _this.shiftLeft();
            }
        });
    },
    addStyleById: function(item, id) {
        let size = Number.parseFloat(getComputedStyle(item).width);
        if(id == 0) {
            item.style.left = '0px';
            item.style.transform = 'translateX(0%)';
            item.style.zIndex = '0';
            // item.style.opacity = '1';
        }

        if(id == 1) {
            item.style.left = '50%';
            item.style.transform = 'translateX(-50%)';
            item.style.zIndex = '1';
            // item.style.opacity = '1';
        }
        
        if(id == 2) {
            item.style.left = `calc(100% - ${size}px)`;
            item.style.transform = 'translateX(0%)';
            item.style.zIndex = '0';
            // item.style.opacity = '1';
        }


        if(id == 3) {
            item.style.left = `calc(90% - ${size}px)`;
            item.style.transform = 'translateX(0%)';
            item.style.zIndex = '-1';
            // item.style.opacity = '0';
        }

        if(id == 4) {
            item.style.left = '10%';
            item.style.transform = 'translateX(0%)';
            item.style.zIndex = '-1';
            // item.style.opacity = '0';
        }

    },
    setPosition: function() {
        let _this = this;

        // set position for each item
        homeAdvertisementItems.forEach(function (item, id) {
            _this.addStyleById(item, id);
        });
    },
    shiftLeft: function() {
        this.pos--;
        if(this.pos < 0)  this.pos = this.size - 1;
        for(let i=0;i<homeAdvertisementItems.length;i++) {
            this.addStyleById(homeAdvertisementItems[i], (i +  this.pos) % this.size);
        }
    },
    shiftRight: function() {
        this.pos++;
        if( this.pos >= this.size)  this.pos = 0;
        for(let i=0;i<homeAdvertisementItems.length;i++) {
            this.addStyleById(homeAdvertisementItems[i], (i + this.pos) % this.size);
        }
    },
    setInterval: function() {
        let _this = this;
        this.spinInterval = setInterval(function() {
           if(_this.direction == 'left') _this.shiftLeft();
           else _this.shiftRight();
        }, 5000);

    }, 
    clearInterval: function() {
        clearInterval(this.spinInterval);
    }, 
    handleEvent: function() {
        let _this = this;

        // Click btn left
        homeAdvertisementBtnLeft.addEventListener("click", function() {
            _this.shiftLeft();
            _this.direction = 'left';
        })
        

         // Click btn right
         homeAdvertisementBtnRight.onclick = function() {
            _this.shiftRight();
            _this.direction = 'right';
        }

    },
    start: function(imgList) {
        this.init(imgList);

        this.handleEvent();
        this.setInterval();
    },
}

let imgs = [
    
];

homeAdvertisementItems.forEach(function (item) {
    imgs.push(item.querySelector('img').src)
});
// console.log(imgs);
advertisement.start(imgs);


/* ======================= Click Top 100 Song Pagination ======================= */
let moveItemInTop100 = function(area, mode, width) {
    let originPos = new DOMMatrixReadOnly(area.style.transform).m41
    console.log(area, originPos, width);
    if (mode == 'left') {
        area.style.transform = `translateX(calc(${originPos}px-${width}px))`
    }
    else if (mode == 'right') {
        area.style.transform = `translateX(calc(${originPos}px+${width}px))`
    }
    console.log(new DOMMatrixReadOnly(area.style.transform).m41);
};

let homeTop100Songs = document.querySelectorAll('.home_top-100 .top-100-song');
homeTop100Songs.forEach(function(homeTop100Song) {
    let paginationLeft = homeTop100Song.querySelector('.top-100-song_title-pagination--left')
    let paginationRight = homeTop100Song.querySelector('.top-100-song_title-pagination--right')
    let sizeMax = homeTop100Song.querySelectorAll('.top-100-song_list .col').length
   
    paginationLeft.onclick = function() {
        // If is not disabled
        if(!paginationLeft.classList.contains('top-100-song_title-pagination--disable')) {
            let topSongs = homeTop100Song.querySelector('.top-100-song_list')
            let topSongItem = topSongs.querySelector('.col')
            let widthPerItem = topSongItem.clientWidth
            
            let valueMove = parseInt(getTranslateValues(topSongs).x) + parseInt(widthPerItem)
            topSongs.style.transform = `translateX(${valueMove}px)`
            
            paginationRight.classList.remove('top-100-song_title-pagination--disable')
            if(valueMove + parseInt(widthPerItem) > 0) {
                paginationLeft.classList.add('top-100-song_title-pagination--disable')
            }

        }
    };

    paginationRight.onclick = function() {
        // If is not disabled
        if(!paginationRight.classList.contains('top-100-song_title-pagination--disable')) {
            let topSongs = homeTop100Song.querySelector('.top-100-song_list')
            let topSongItem = topSongs.querySelector('.col')
            let widthPerItem = topSongItem.clientWidth
            let valueMove = getTranslateValues(topSongs).x - widthPerItem

            topSongs.style.transform = `translateX(${valueMove}px)`
            paginationLeft.classList.remove('top-100-song_title-pagination--disable')
            if(0 - valueMove + widthPerItem > sizeMax * widthPerItem - topSongs.clientWidth) {
                paginationRight.classList.add('top-100-song_title-pagination--disable')
            }
            
        }
    };
});