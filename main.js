const cartes = document.querySelectorAll('.carte');


let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;

let balls = document.getElementsByClassName("ball");

document.onmousemove = function () {
    let x = event.clientX * 100 / window.innerWidth + "%";
    let y = event.clientY * 100 / window.innerHeight + "%";

    for (i = 0; i < 2; i++) {
        balls[i].style.left = x;
        balls[i].style.top = y;
        balls[i].style.transform = "translate(-"+ x + ",-"+ y +")"
    }
};

//''''''''''lecture le text'''''''''''
function lireCarte() {
    let texte = "koukou";
    let parole = new SpeechSynthesisUtterance();
    parole.volume = 1;

    parole.text = texte;
    speechSynthesis.speak(parole);
    console.log(parole);
};


cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte);
    carte.addEventListener('click', lireCarte);
    
})

function retourneCarte(){

    if(verouillage) return;

    this.childNodes[1].classList.toggle('active');

    if(!carteRetournee){

        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    // console.log(premiereCarte, secondeCarte);

    correspondance();
}

function correspondance(){

    if(premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {

        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);

    } else {
        verouillage = true;
        setTimeout(() => {

            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');

            verouillage = false;
        }, 1500)
    }

}

function aleatoire(){
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}
aleatoire();