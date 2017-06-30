
let colors = ['#2d335b', '#535b2d', '#494949', '#d7d7d7', '#FF0000','#FFE000','#FF5722','#F08080','#C70039','#FF1493','#4DB6AC','#64FF00'];
let CARDS_NUM = 3;
let $colorsBox = document.querySelector('.colorsBox');
let $cardsBox = document.querySelector('.cardsBox');
let currentCardIndex = 0;
let chosenCardsRandomColors = [];
let $cards;
let $overlay = document.querySelector(".overlay");
let didUserWin = false;
let $XcloseOverlyWindow = document.querySelector(".XcloseOverlyWindow");
let $playAgainButton = document.querySelector(".playAgainButton");

function preloadImage(url)
{
    let img  =new Image();
    img.src = url;
}

preloadImage("../images/winer.gif");
preloadImage("../images/loser.gif");

function addEventsToOverlyButtons(){
    $XcloseOverlyWindow.addEventListener("click", closeOverlyWindow);
    $playAgainButton.addEventListener("click", PlayAgain);
}

function endOfGameOverly(){
    insertOverlyParameters();
    $overlay.style.visibility = "visible";
    $overlay.style.opacity = "1";
    $overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
}

function closeOverlyWindow(){
    $overlay.style.visibility = "hidden";
    $overlay.style.opacity = "0";
}

function insertOverlyParameters(){
    let winnerImage = "images/winner.gif";
    let loserImage = "images/loser.gif";
    let winnerText = "You won!!!";
    let loserText = "You lost";

    let $imageForEnd = document.querySelector(".imageForEnd");
    let $textForEnd = document.querySelector(".textForEnd");

    if (didUserWin) {
        $imageForEnd.src = winnerImage;
        $imageForEnd.style.marginTop = "30px";
        $textForEnd.innerHTML = winnerText;
    }
    else {
        $imageForEnd.src = loserImage;
        $textForEnd.innerHTML = loserText;
        $imageForEnd.style.marginTop = "0px";
        
    }
}


function initColors() {
    for (let color of colors) {
        var $colorDiv = document.createElement("DIV");
        $colorDiv.classList.add("color");
        $colorDiv.style.backgroundColor = color;
        $colorDiv.hex_color = color;
        $colorDiv.addEventListener("click",userPickedColor);
        $colorsBox.appendChild($colorDiv);
    }
}

function readySetGo() {
    let $readyText = document.querySelector('.readyText');
    $readyText.innerHTML = "<span style='color: red;'>READY?</span>";
    setTimeout (function(){
    $readyText.innerHTML = "<span style='color: orange;'>SET</span>";
    }, 500);
    setTimeout (function(){
    $readyText.innerHTML = "<span style='color: Chartreuse;'>GO!</span>";
    }, 1000);
    setTimeout (function(){
     $readyText.innerHTML = "";
    startTimer();
    }, 2000); 
    setTimeout (function(){
     $readyText.innerHTML = "<span style='color: DarkSlateGray;'>What were the colors?</span>";
    }, 5500);   
    

}

function chooseRandomColors(CARDS_NUM){
    //create a copy of colors by value, not by reference
    let copyOfColors = colors.slice();
    for (let i=0 ; i < CARDS_NUM; i++) {
        let randomCellIndex = Math.random() * copyOfColors.length;
        let slectedColor = copyOfColors.splice(randomCellIndex,1);
        chosenCardsRandomColors.push(slectedColor[0]);
    }
}

function createCards(CARDS_NUM){
    let markup = 
    `<figure class="front"></figure>
    <figure class="back"><img class="backImage" src="images/cardBack.jpg" alt=""></figure>`;
    for (var i=0 ; i < CARDS_NUM; i++) {
        var $card = document.createElement("DIV");
        $card.classList.add('card');
        $card.innerHTML = markup;
        $cardsBox.appendChild($card);
    }
    $cards = document.querySelectorAll(".card");
}

function colorTheCards(){
    $cardsFront = document.querySelectorAll(".front");
    for (var i=0 ; i < CARDS_NUM; i++) {
        $cardsFront[i].style.backgroundColor = chosenCardsRandomColors[i] ;
    }
}

function flipCurrentCard(){
    $cards[currentCardIndex].classList.remove("flipped");
}

function startTimer(){
    flipAllCardsToFront();
    setTimeout(function(){
         hideCards(); 
    }, 2000);
}

function hideCards(){
    var timeDifference = 1;
    for(let card of $cards){
        setTimeout(function(){
        card.classList.add("flipped");
        },timeDifference)
        timeDifference +=200;
    }
}

function userPickedColor(e){
    //check if it is the correct color
   if ( e.target.hex_color === chosenCardsRandomColors[currentCardIndex]) {
       //check if it is the last card
       if (currentCardIndex === CARDS_NUM -1) {
           flipCurrentCard();
           // youWonAlert();
           didUserWin = true;
           setTimeout(endOfGameOverly, 100);
       }
       //if it is not the last card continue to next card:
       else {
           flipCurrentCard();
           currentCardIndex++;
       }
   }
   // if it is not the correct color:
   else {
        endOfGameOverly();
   }
} 

function flipAllCardsToBack(){
  for (let card of $cards){
    card.classList.add("flipped");
  }
}

function flipAllCardsToFront(){
  for (let card of $cards){
    card.classList.remove("flipped");
  }
}

function init (){
    initColors()
    createCards(CARDS_NUM);
    addEventsToOverlyButtons();
    flipAllCardsToBack();
    chooseRandomColors(CARDS_NUM);
    colorTheCards();
    readySetGo();
   
}

function PlayAgain (){
    currentCardIndex = 0;
    chosenCardsRandomColors = [];
    didUserWin = false;
    closeOverlyWindow();
    chooseRandomColors(CARDS_NUM);
    flipAllCardsToBack();
    setTimeout(colorTheCards, 1000) ;
    setTimeout(readySetGo, 1500) ;
}



document.addEventListener("DOMContentLoaded", init);
