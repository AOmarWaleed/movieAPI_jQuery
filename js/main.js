//---------------------------------------------------------------- LOADING PAGE
$(window).ready(()=>{
    $('.sk-chase').fadeOut(1000,()=>{
        $('.loading---page').fadeOut(1000,()=>{
            $('body').css('overflow-y','auto')
            $('.loading---page').remove()
        }) 
    })
})
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
//--------------------------------------------------------------- SLIDERIGHT NAV
const innerNav = $('nav .nav');
const nav = $('nav');
const links =$('.nav-item').not('.social-icons');
//by default hide the nav
nav.animate({left:`-${innerNav.innerWidth()}`},0);
$('#togglerNav').click(()=>{
    //4kl el toggler
    $('#togglerNav').toggleClass('fa-xmark');
    //if left is negative ==> out the page ===> lets back it to the page
    if(Number.parseFloat(nav.css('left')) < 0) {
        nav.animate({left:`0`},1000,()=>{
            links.css("pointerEvents", 'auto');
            links.animate({opacity: '1'},100);
            links.animate({marginTop:'0'},300);

        });
    }else{
        nav.animate({left:`-${innerNav.innerWidth()}`},1000,()=>{
            //this is the defaults value in CSS because the hide default
            links.animate({opacity: '0'},100);
            links.css("pointerEvents", 'none');
            links.animate({marginTop:'20'},300);
        });
    }

})

// --------------------------------------------------------------
// --------------------------------------------------------------
// -------------------------------------------------------------- 

const movieContainer = $('.row');

//if filterWord == undefined thats mean i didnt send any argu and thats mean i need the mainAPI to run
// over of that use [data-api] from html to filter the url
let displayMovies = async(filterWord,url = `https://api.themoviedb.org/3/trending/all/day?api_key=62f0575b1238bcece0563212f2f2ccc2`)=>{   
    //API
    let response = await fetch(filterWord?`https://api.themoviedb.org/3/movie/${filterWord}?api_key=62f0575b1238bcece0563212f2f2ccc2&language=en-US`  :url).
        then((r) => { return r.json() }).
        then((rj) => { return rj.results })
       
    buildRowOfMovies(response);    
}

function buildRowOfMovies(arrOfMovie) {
    //if the arr have no elements lets display the main api
    //but first lets show message say there is no results and hide it 
    if(arrOfMovie.length == 0) {
        if(document.getElementById('warningNoResults')){
            $('#warningNoResults').show(500,()=>{
                $('#warningNoResults').hide(3000)
            })
        }else {
            movieContainer.before('<p id="warningNoResults" class="text-danger text-center">No results , Pls try anther word</p>');
            $('#warningNoResults').hide(3000)
        }
            
        displayMovies();
    }else { 
        //if we here so for sure we have results to diplay 
        // lets wrap them 
        //MAP THEM IN movieContent .THEN INNERHTML THEM to .row
         let movieContent = arrOfMovie.map((ele) =>
        `<div class="col-md-6 col-lg-4 col-xl-3">
        <div class="movie-item position-relative overflow-hidden">
        <img src='${ele.poster_path == undefined ? "images/photo.png":`https://image.tmdb.org/t/p/w500${ele.poster_path}`}' class="img-fluid" alt="movie image">
        <div class="text-content position-absolute w-100 h-100  start-0  text-center d-flex align-items-center justify-content-center text-white">
            <div class="">
            <h3>${ele.name ?? ele.title}</h3>
                <p>${ele.overview.length > 150 ? `${ele.overview.substr(0, 150)}..` : ele.overview}</p>
                <p>${ele.first_air_date ?? ele.release_date}</p>
                <i class="text-white fa-5x fa-solid fa-star position-absolute end-0 top-0 p-2 ">
                    <p class=" fs-5 position-absolute top-50  start-50 translate-middle text-danger">${ele.vote_average.toFixed(2)}</p>
                </i>
            </div>
                
            </div>
        </div>
        </div>`)
        //INNERHTML
        movieContainer.html(movieContent);
    }
}

//this run by default
displayMovies();

//used cus attr to get (filterWord)
const linksAPI = $('.nav-link[data-api]')
linksAPI.click((e)=>{
    displayMovies($(e.target).attr('data-api'));
})

//the trending is the main one 
$('.nav-link[data-trending]').click((e)=>{
    displayMovies();
})

//  SEARCH -------------------
const searchButton = document.getElementById('searchByName');
searchButton.addEventListener('input',(e)=>{
    //> 0 , ==> we have value lets search ,
    // == 0 , == > we dont have value (empty sting) , lets display the main api 
    if(e.target.value.length > 0 ){
        displayMovies(undefined,`https://api.themoviedb.org/3/search/movie?api_key=62f0575b1238bcece0563212f2f2ccc2&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
    }else {
        displayMovies()
    }
})
// --------------------------------------------------------------
// --------------------------------------------------------------
// -------------------------------------------------------------- 
// --------------------------------------------------------------  CONTACT SECTION
const infoInputs =  $('form > div > input');
const userNameRX = /^[a-zA-Z]{3,7}\s[a-zA-Z]{3,7}\s[a-zA-Z]{3,7}$/;
const userEmailRX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const userTelRX = /^(\+2)?0[0 1 2 5][0-9]{9}$/;
const userAgeRX = /^([2-9][0-9]|18|19)$/;
const userPasswordRX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const userName = document.getElementById('userName')
const userAge = document.getElementById('userAge')
const userEmail = document.getElementById('userEmail')
const userTel = document.getElementById('userTel')
const userPassword = document.getElementById('userPassword')


//onfocusout to all inputes except PrePassword
for (const i of infoInputs) {

    if($(i).attr('id') != 'userPrePassword') {
        i.addEventListener('focusout', (e)=>{
            validValues(e.target);
            
        })
    }
    
}

//RX to test ,, contactInput ==> e.target
function validValues(contactInput){  
    const idAttrVal = $(contactInput).attr('id');
    let RX = idAttrVal == 'userName' ? userNameRX:
             idAttrVal == 'userEmail' ? userEmailRX:
             idAttrVal == 'userTel' ? userTelRX:
             idAttrVal == 'userPassword' ? userPasswordRX:
             idAttrVal == 'userAge' ? userAgeRX:
             alert('ERROR');
             


    //userName
    //userEmail
    //userAge
    //userTel
    //userPassword


    //IF ITS NOT VALID ADD infoWrong MESSAGE 
    //IF ITS VALID ADD is-valid FROM BOOTSTARP , THEN REMOVE  infoWrong MESSAGE
    if(RX.test(contactInput.value)) {
        $(contactInput).addClass('is-valid')
        $('#infoWrong').remove();
    }else {
        $(contactInput).removeClass('is-valid')
        if(document.getElementById('infoWrong') == undefined){
            $(contactInput).after(`<p id="infoWrong" class="text-danger px-2">${$(contactInput).attr('data-RX')}</p>`)
        }
        
    }
}

//get users id we have in locatstage else set it to empty arr
let listOfUsers = JSON.parse(localStorage.getItem('users')) ?? [];
//LETS SUBMIT NOW
document.getElementById('submit').addEventListener('click' ,function(e){
    //STOP FORM REFRESH
    e.preventDefault();
    // 1 ---- LETS CHECK ALL INPUTES HAVE A VALUE
    if(isEmpty()){
        if(document.getElementById('emptyWarningMessage') == undefined){
            $(e.target).before('<p id="emptyWarningMessage" class="text-danger ps-3 w-100 px-2">All Inputs Required</p>')
        }
    }else {
        //2 ------ REMOVE WARNING MESSAGE 
        $('#emptyWarningMessage').remove();
        //3 ---- are all inputes valid ????
        if(areInputsValid()){
            //4 ---- GET THE VALUES FROM ALL INPUTES
            if(document.getElementById('userPassword').value == document.getElementById('userPrePassword').value) {
                let user = {
                    name : userName.value,
                    email : userEmail.value,
                    tel : userTel.value,
                    age : userAge.value,
                    password : userPassword.value,
                }
                //5 --- DISPLAY IT SUCCES TO ADD NEW USER 
                // this condition because if u clicked fast before the last message removed thas mean fked up : )
                if(document.getElementById('sucssedMessage') == undefined) {
                    $(e.target).before('<p id="sucssedMessage" class="text-primary ps-3 w-100 px-2">sucssed</p>')
                    $("#sucssedMessage").hide(4000,()=>{
                        $("#sucssedMessage").remove()
                    })
    
                }

                //6 ---- SAVE THE NEW USER 
                saveUser(user);
            }else {
                if(document.getElementById('didntMatchMessage') == undefined) {
                    $(e.target).before('<p id="didntMatchMessage" class="text-danger ps-3 w-100 px-2">ur password is not matching with the repeatPassword</p>')
                    $("#didntMatchMessage").hide(6000,()=>{
                        $("#didntMatchMessage").remove()
                    })
                }
                
            }
        }
    }
    
})

function isEmpty() {
    
    for (const ele of infoInputs) {
        if(ele.value == ""){
            return true;
        }
    }

    return false;
}

function saveUser(user) {
    listOfUsers.push(user);
    localStorage.setItem('users' , JSON.stringify(listOfUsers));
}

function areInputsValid () { 
    if(userNameRX.test(userName.value)){
        if(userEmailRX.test(userEmail.value)){
            if(userPasswordRX.test(userPassword.value)){
                if(userTelRX.test(userTel.value)){
                    if(userAgeRX.test(userAge.value)){
                        return true;
                    }else {
                        validValues(userAge);
                    }
                }else{
                    validValues(userTel);
                }
            }else{
                validValues(userPassword);
            }
        }else{
            validValues(userEmail);
        }
    }else {
        validValues(userName);
    }

    return false;
}