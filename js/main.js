var signUpName = document.querySelector("#name");
var signUpemail = document.querySelector("#email");
var signUppassword = document.querySelector("#password");
var loginemail = document.querySelector("#signinEmail");
var loginpassword = document.querySelector("#signinPassword");
var signUpArr = []

var signUpBtn = document.querySelector(".signUp")


//validation errors
function isValidEmail(email) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    // Password must be at least 8 characters long
    // and contain at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwordRegex.test(password);
}


// to get base url (localhost)
var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
if(localStorage.getItem("sessionUsername") != null) {
    //location.href = baseURL + "/home.html"
    var username = localStorage.getItem("sessionUsername")
    var usernameValue = document.querySelector('#username')
    if(usernameValue != null)
        usernameValue.innerHTML = "Welcome " + username
}
console.log(signUpBtn)
if (signUpBtn != null) {
    signUpBtn.addEventListener("click", function (e) {
        signUp()
    })
}
//check if local storage contains users

if (localStorage.getItem("users")) {
    signUpArr = JSON.parse(localStorage.getItem("users"));
}
//check fiels if empty string
function isEmpty() {
    if (signUpName.value === "" || signUpemail.value === "" || signUppassword.value === "") {
        return false;
    } else {
        return true;
    }
}
//check if email already exist
function isExist() {
    for (var i = 0; i < signUpArr.length; i++) {
        if (signUpArr[i].email === signUpemail.value) {
            return true;
        }
    }
    return false;
}

//signup function
function signUp() {
    if (!isEmpty()) {
        document.querySelector("#incorrect").innerHTML = `<p class="text-danger">All fields is required</p>`
        return false
    }
    if(isValidEmail(signUpemail.value) && isValidPassword(signUppassword.value)){
        var signUp = {
            name: signUpName.value,
            email: signUpemail.value,
            password: signUppassword.value
        }
        if (!isExist()) {
            signUpArr.push(signUp)
            localStorage.setItem("users", JSON.stringify(signUpArr))
            document.querySelector("#incorrect").innerHTML = `<p class="text-success">Account created successfully</p>`
            restFiels();
        }
        else {
            document.querySelector("#incorrect").innerHTML = `<p class="text-danger">Email is already taken</p>`
        }
    }
    else{
        document.querySelector("#incorrect").innerHTML = `<p class="text-danger">Email or password not valid! Password must be at least 8 characters Conatining Upper case and one lowercase and Number</p>`
    }
    
    

}

function restFiels() {
    signUpName.value = "";
    signUpemail.value = "";
    signUppassword.value = "";
}

//login Section

var signInBtn = document.querySelector(".signIn")
if (signInBtn != null) {
    signInBtn.addEventListener("click", function (e) {
        console.log("signInBtn clicked")
        signIn()
    })
}
function isEmptyLogin(){
    if (loginemail.value === "" || loginpassword.value === "") {
        return false;
    } else {
        return true;
    }
}
function signIn(){
    if (isEmptyLogin() == false) {
        document.querySelector('#incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var email = loginemail.value
    var password = loginpassword.value
    for (var i = 0; i < signUpArr.length; i++) {
        if (signUpArr[i].email === email && signUpArr[i].password === password) {
            localStorage.setItem('sessionUsername', signUpArr[i].name)
            location.replace(baseURL + '/home.html')
        }
        else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
}

var logoutBtn = document.querySelector('.nav-link')
if (logoutBtn != null) {
    logoutBtn.addEventListener('click', function(e) {
        logout()
      })
}

function logout() {
    localStorage.removeItem('sessionUsername')
}