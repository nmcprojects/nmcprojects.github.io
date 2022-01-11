
/* Button toggle */
const btnToggles = document.querySelectorAll('.btn-toggle');

btnToggles.forEach(btnToggle => {
    let btnToggleNote = btnToggle.querySelector('.btn-toggle_note');

    btnToggle.onclick = function() {
        if(btnToggle.classList.contains('btn-toggle--active')) {
            btnToggleNote.style.left = "2px";
            btnToggle.classList.remove('btn-toggle--active');
        }
        else {
            let widthBtnToggle = getComputedStyle(btnToggleNote).width;
            btnToggleNote.style.left = `calc(100% - 2px - ${widthBtnToggle})`;
            btnToggle.classList.add('btn-toggle--active');
        }
    }
});

// btnToggle.onclick = function() {
//     if(btnToggle.classList.contains('btn-toggle--active')) {
//         btnToggleNote.style.left = "2px";
//         btnToggle.classList.remove('btn-toggle--active');
//     }
//     else {
//         let widthBtnToggle = getComputedStyle(btnToggleNote).width;
//         btnToggleNote.style.left = `calc(100% - 2px - ${widthBtnToggle})`;
//         btnToggle.classList.add('btn-toggle--active');
//     }
// }

// Letter run
function runLetter(item) {
    if(item.scrollWidth > item.clientWidth) {
            // console.log(item.textContent);
            let content = item.textContent;
        
        let lengthItem = Number.parseInt(item.scrollWidth);
        item.innerHTML = `${content}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${content}</span>`; 
        item.style.transform = `translateX(calc(-${lengthItem}px - 28px))`;
        item.style.overflow = "visible";
        item.style.textOverflow = "clip";
        item.style.transition = "transform 5s linear 0s";
        
        setTimeout(function() {
            // if(item.textContent == content) item.innerHTML = content; 
            var elem = item.querySelector('span');
            // console.log(item);
            if(elem) elem.remove();
            item.style.transform = "translateX(0)";
            item.style.transition = "none";
            item.style.overflow = "hidden";
            item.style.textOverflow = "ellipsis";
        }, 5000);
    }
};
export default runLetter ;
