const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class elementArea {
    constructor(elementBtn, elementDisplay, status) {
        this.elementBtn = elementBtn;
        this.elementDisplay = elementDisplay;
        this.status = status;
    }
}

const openArea = {
    elements: [
        
    ],
    resetOpenArea: function () {
        this.elements.forEach(function (element) {
            element.status = false;
            element.elementDisplay.style.display = 'none';
        })
    }, 
    addElement: function (elementBtn, elementDisplay, status) {
        let element = new elementArea(elementBtn, elementDisplay, status);
        this.elements.push(element);

        this.addClick(element);
    },
    addClick: function (element) {
        let _this = this;

        // click element
        element.elementBtn.onclick = function() {

            let elementClick;
            let tempElementBtn = this;
            _this.elements.forEach(function (item) {
                if (item.elementBtn == tempElementBtn) {
                    elementClick = item;
                }
            })

            if(elementClick.status == false) {
                // Reset all elements area
                _this.resetOpenArea();
            }

            elementClick.status = !element.status;
            elementClick.elementDisplay.style.display =  elementClick.status ? 'block' : 'none';
        }

        // click outside of element 
        document.onmousedown = function(e) {
            let isChild = false;
            
            _this.elements.forEach(function(element) {
                let path = e.path;
                path.forEach(function(item) {
                    if(item == element.elementBtn) isChild = true;
                })
            })
            if(isChild == false) _this.resetOpenArea();
        }
    },
    clickAllElements: function () {
        this.elements.forEach(function (element) {
            element.elementBtn.click();
        })
    },
}





// Message area
// const messageBtn = $('.user_messages');
// const messageArea = $('.message-area');
// openArea.addElement(messageBtn, messageArea, false);

// Avatar area
const avatarBtn = $('.avatar');
const avatarArea = $('.avatar-main');
if(avatarBtn && avatarArea) {
    openArea.addElement(avatarBtn, avatarArea, false);
}

// Notify area
const notifyBtn = $('.user_notify');
const notifyArea = $('.notify-area');
if(notifyBtn && notifyArea) {
    openArea.addElement(notifyBtn, notifyArea, false);
}

