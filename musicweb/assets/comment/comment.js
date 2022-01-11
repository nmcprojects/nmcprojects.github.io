/* ================ Comment ================ */

// Auto insert new row into textarea
var textareaAll = document.querySelectorAll('.write-comment_content-top textarea');

textareaAll.forEach(function(textarea) {
    textarea.onkeydown = function(e) {
        let text = textarea.value;
        if(e.keyCode === 13) { // enter key, fix temporary, Do something else later
            return;
        }
    
        if(textarea.value.length == 0) {
            textarea.value = "";
            textarea.setAttribute('rows', 1);
            return;
        }
    
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        ctx.font = window.getComputedStyle(textarea).font;
        if(e.keyCode !== 8) text += ' ' // 8: backspace key. Fake character, the character have not inserted into the text yet.
        else text = text.substring(0, text.length - 1);
        let widthText = ctx.measureText(text).width;
    
        let widthTextarea = parseInt(window.getComputedStyle(textarea).width);
        let currentRow = parseInt(textarea.getAttribute('rows'));
    
        if(widthText > widthTextarea * currentRow) {
            let newRow = currentRow + 1;
            textarea.setAttribute('rows', newRow);
        }
        else if(currentRow > 1 && widthText <= widthTextarea * (currentRow - 1)) {
            let newRow = currentRow - 1;
            textarea.setAttribute('rows', newRow);
        }
    }
    
    textarea.onkeyup = function(e) {
        if(e.keyCode === 13) { // enter key,
            textarea.value = "";
            textarea.setAttribute('rows', 1);
            return;
        }
    
        if(textarea.value.length == 0) {
            textarea.value = "";
            textarea.setAttribute('rows', 1);
            return;
        }
    }

    // btn comment in all write comment 
    let writeComment = textarea;
    while(!writeComment.classList.contains('write-comment')) {
        writeComment = writeComment.parentElement;
    }
    let btnComment = writeComment.querySelector('.write-comment_content-bottom-btn-item[name=comment]');
    btnComment.onclick = function() {
        if(textarea.value.length > 0 ) {
            alert("The comment was successful!!" + textarea.value);
        }
        else {
            alert("Please, enter something!!");
        }
    }
})


// btn cacel in write comment default
let writeCommentDefault = document.querySelector('.write-comment.write-comment--default');
let writeCommentDefaultTextArea = writeCommentDefault.querySelector('.write-comment_content-top textarea');
let btnCancelDefault = writeCommentDefault.querySelector('.write-comment_content-bottom-btn-item[name=cancel]');
btnCancelDefault.onclick = function() {
    writeCommentDefaultTextArea.value = "";
    writeCommentDefaultTextArea.setAttribute('rows', 1);
}



// open see more comment
let seeMoreBtnAll = document.querySelectorAll('.view-comment-content_see-more');
let replyList = document.querySelector('.view-comment-reply-list');

seeMoreBtnAll.forEach(function(item) {
    item.addEventListener('click', function() {
        let mode = (item.getAttribute('value') == 'close') ? 'open' : 'close';
        item.setAttribute('value', mode)
    
        let viewComment = item;
        while(!viewComment.classList.contains('view-comment')) {
            viewComment = viewComment.parentElement;
        }
        let viewCommentReply = viewComment.nextElementSibling;
        
        if(mode == 'open') { // appear reply comment
            viewCommentReply.style.display = 'block';
        }
        else { // close reply comment
            viewCommentReply.style = 'display: none';
        
        }
    });

});

// open reply comment
let replyBtnAll = document.querySelectorAll('.view-comment-content_btn-item[name=reply]');
replyBtnAll.forEach(function(item) {
    item.addEventListener('click', function() {
        let btnArea = item.parentNode;
        let replyArea = btnArea.nextElementSibling;
        replyArea.style.display = 'block';

        let btnCancel = replyArea.querySelector('.write-comment_content-bottom-btn-item[name="cancel"]');
        btnCancel.onclick = function() {
            let textArea = replyArea.querySelector('.write-comment_content-top textarea');
            textArea.value = "";
            replyArea.style.display = 'none';
        }
    });
});



// click appear features
let btnFeature = document.querySelectorAll('.view-comment-content_btn-btn');
btnFeature.forEach(function(item) {
    item.addEventListener('click', function() {

        let btnArea = item.parentNode;
        let featureArea = btnArea.querySelector('.view-comment-content_feature');
        let newMode =  (featureArea.style.display == "block") ? 'none' : 'block';
        featureArea.style.display = newMode;
        
        if(newMode == 'block') {
            // featureArea.classList.add('view-comment-content_feature--move')
            featureArea.style.animation = 'moveDown .3s ease-in-out forwards'
        }
        else {
            // featureArea.classList.remove('view-comment-content_feature--move')
            featureArea.style.animation = 'none';
        }
        
    });
});