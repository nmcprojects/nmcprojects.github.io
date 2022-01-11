const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const containerLogin = $('.LogIn .container');
const containerSiginUp = $('.SignUp .container');
const noHasAccount = $('.LogIn .container .no_has_account a');
const hadAccount = $('.SignUp .container .had_account a');

// Input Login
const inputLoginAccountName = $('.LogIn .container .accountName')
const inputLoginPassword = $('.LogIn .container .password')

// Input SignUp
const inputSignupFirstName = $('.SignUp .container .userName .userName-firstName')
const inputSignupLastName = $('.SignUp .container .userName .userName-lastName')
const inputSignupAccountName = $('.SignUp .container .accountName')
const inputSignupPassword = $('.SignUp .container .password')
const inputSignupPasswordConfirm = $('.SignUp .container .password.password-confirm')
const inputSignupRules = $('.SignUp .container .rules')

// Click link convert Login -> Signup
noHasAccount.addEventListener('click', function() {
    console.log(containerLogin)
    containerLogin.style.animation = "spinHalf_1 0.6s linear 0s forwards";
    setTimeout(function() {
        containerLogin.classList.add("disappears");
        containerSiginUp.classList.remove("disappears");
        containerSiginUp.style.animation = "spinHalf_2 0.6s linear 0s forwards";
        resetInputSignup()
    }, 600);
})

// Click link convert Signup -> Login
hadAccount.addEventListener('click', function() {
    console.log(containerLogin)
    containerSiginUp.style.animation = "spinHalf_1 0.6s linear 0s forwards";
    setTimeout(function() {
        containerSiginUp.classList.add("disappears");
        containerLogin.classList.remove("disappears");
        containerLogin.style.animation = "spinHalf_2 0.6s linear 0s forwards";
        resetInputLogin();
    }, 600);
})

// Reset input Login
function resetInputLogin() {
    inputLoginAccountName.querySelector('input').value = "";
    inputLoginPassword.querySelector('input').value = "";
}

// Reset input Signup
function resetInputSignup() {
    inputSignupFirstName.querySelector('input').value = "";
    inputSignupLastName.querySelector('input').value = "";
    inputSignupAccountName.querySelector('input').value = "";
    inputSignupPassword.querySelector('input').value = "";
    inputSignupPasswordConfirm.querySelector('input').value = "";
    inputSignupRules.querySelector('input').checked = false;
}



