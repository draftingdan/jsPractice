// Challenge 1: age in days

function ageInDays (){
    var dateString = prompt('What is your birthdate? (mm/dd/yyyy)');
    var today = new Date();
    var birthDay = new Date (dateString);

    daysBetween = function(date1, date2) {
        //Get 1 day in milliseconds
        var one_day=1000*60*60*24;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
            
        // Convert back to days and return
        return Math.round(difference_ms/one_day); 
    }

    var days = daysBetween(birthDay, today);
    var h1days = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + days + ' days old.');
    h1days.setAttribute('id', 'ageDays');
    h1days.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1days);
}

function reset (id) {
    document.getElementById(id).remove();
}

// Challenge 2

function getCat () {
    var image = document.createElement('img');

    var div = document.getElementById('flex-cat-gen');

    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Challenge 3

function rpsGame(choice) {
    var humanChoice, botChoice;
    humanChoice = choice.id;
    botChoice = botChoose(randToRPSInt());
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(humanChoice, botChoice, message);

    function randToRPSInt() {
        return Math.floor(Math.random() * 3);
    }
    
    function botChoose(number) {
        return ['rock','paper','scissors'][number];
    };

    function decideWinner (choice1, choice2) {
        var rpsDatabase = {
            'rock': {'rock':0, 'paper': -1, 'scissors': 1},
            'paper': {'rock':1, 'paper': 0, 'scissors': -1},
            'scissors': {'rock':-1, 'paper': 1, 'scissors': 0}
        }        

        var score1 = rpsDatabase[choice1][choice2];
        var score2 = rpsDatabase[choice2][choice1];
        return [score1,score2];
    };


    function finalMessage (results) {
        var message;
        switch(results[0]) {
            case 0:
                message = {
                "text": 'You tied',
                "color": "yellow"
                };
                break;
            case -1:
                message = {
                    "text": 'You lost',
                    "color": 'red'
                };
                break;
            default:
                message = {
                    "text": "You Won!",
                    "color": "green"
                };
                break;
        }
        return message;
    };

    function rpsFrontEnd(choice1, choice2, message) {
        var imagesDatabase = {
            'rock': 'static/images/rock.png',
            'paper': 'static/images/paper.png',
            'scissors': 'static/images/scissors.png'
        }
        document.getElementById('rock').remove();
        document.getElementById('paper').remove();
        document.getElementById('scissors').remove();

        var mainDiv = document.getElementById('flex-box-rps-div');
        var humanDiv = document.createElement('div');
        var botDiv = document.createElement('div');
        var messageDiv = document.createElement('div');

        humanDiv.innerHTML = `<img src ='${imagesDatabase[choice1]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>`;
        messageDiv.innerHTML = `<h1 style='color: ${message.color}; font-size: 60px; padding:30px;'>${message.text}</h1>`;
        botDiv.innerHTML = `<img src ='${imagesDatabase[choice2]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(233, 50, 37, 1)'>`;
        
        
        mainDiv.appendChild(humanDiv);
        mainDiv.appendChild(messageDiv);
        mainDiv.appendChild(botDiv);
    }
}

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
    for(let i = 0; i < all_buttons.length; i++) {
        copyAllButtons.push(all_buttons[i].classList[1]);
    }

function buttonColorChange(option) {
    
    switch (option.value) {
        case "red":
            buttonsRed();
            break;
        case "blue":
            buttonsBlue();
            break;
        case "green":
            buttonsGreen();
            break;
        case "yellow":
            buttonsYellow();
            break;
        case "random":
            buttonsRandom();
            break;
        case "reset":
            buttonsReset();
            break;
    }

}

function buttonsRed() {
    for(let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }    
}
function buttonsYellow() {
    for(let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-warning');
    }
}
function buttonsGreen() {
    for(let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttonsBlue() {
    for(let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-primary');
    }
}
function buttonsRandom() {
    let colorOption = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    
    for(let i = 0; i < all_buttons.length; i++) {
        let optionInt = Math.floor(Math.random() * 4);
        
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(colorOption[optionInt]);
    }
}
function buttonsReset() {
    for(let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

// Challenge 5: Blackjack
document.querySelector('#blackjackHit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjackStand-button').addEventListener('click', blackjackStand);
document.querySelector('#blackjackDeal-button').addEventListener('click', blackjackDeal);

let blackjackGame = {
    'you': {'scoreSpan': '#yourCount', 'div': '#yourCards', 'score': 0, 'cards': []},
    'dealer': {'scoreSpan': '#dealerCount', 'div': '#dealerCards', 'score': 0, 'cards': []}, 
    'results': {'wins': 0, 'losses': 0, 'draws': 0},
    'suits': ['spades','hearts','diamonds','clubs'],
    'cards': ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King','Ace'],
    'cardMap': [2,3,4,5,6,7,8,9,10,10,10,10,[1,11]],
    'sounds': {'win': 'static/sounds/cash.mp3', 'lose': 'static/sounds/aww.mp3', 'hit': 'static/sounds/swish.m4a'},
    'gameState': {'winner': 'none', 'state': 'hit'}
};

const SUITS = blackjackGame.suits;
const CARDS = blackjackGame.cards;
const CARDMAP = blackjackGame.cardMap;

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const SCORES = blackjackGame['results'];

const HITSOUND = new Audio(blackjackGame.sounds.hit);
const LOSSSOUND = new Audio(blackjackGame.sounds.lose);
const WINSOUND = new Audio(blackjackGame.sounds.win);

function blackjackHit() {
    
    if(YOU.score < 21 && blackjackGame.gameState['state'] == 'hit') {
        nextCard(YOU);

        updateScore(YOU);
   
        showScore(YOU);
    }
    

}

async function blackjackStand() {

    blackjackGame.gameState['state'] = 'stand';

    while (DEALER.score < 18 &&  DEALER.score < YOU.score) {
        
        nextCard(DEALER);

        updateScore(DEALER);

        showScore(DEALER);

        await sleep(1000);

    }
    findWinner();

    showResult();

    blackjackGame.gameState['state'] = 'deal';
}

function blackjackDeal() {

    if(blackjackGame.gameState['state'] == 'deal') {   
        let yourImages = document.querySelector('#yourCards').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealerCards').querySelectorAll('img');

        for(let i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        };

        for(let i = 0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        };
        
        YOU['cards'] = [];
        DEALER['cards'] = [];
        YOU.score = 0;
        DEALER.score = 0;
        blackjackGame.gameState['state'] = 'hit';
        blackjackGame.gameState['winner'] = 'none';

        document.querySelector(YOU.scoreSpan).innerText = YOU.score;
        document.querySelector(YOU.scoreSpan).style.color = '#ffffff';
        document.querySelector(DEALER.scoreSpan).innerText = DEALER.score;
        document.querySelector(DEALER.scoreSpan).style.color = '#ffffff';

        document.querySelector('#blackjack-announcement').innerHTML = "Let's Play";
        document.querySelector('#blackjack-announcement').style.color = '#000000';
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function nextCard(player) {
    let cardInt = Math.floor(Math.random()*52);
    let cardSuit = SUITS[Math.floor(cardInt / 13)];
    let cardNumber = cardInt % 13;
    player['cards'].push(cardNumber);
    let cardFace = CARDS[cardNumber];
    
    let cardImg = document.createElement('img');
    cardImg.src = `static/images/cards/${cardSuit}${cardFace}.jpg`;
    document.querySelector(player['div']).appendChild(cardImg);
    HITSOUND.play();

    return cardNumber;
}

function updateScore(player) {
    let cards = player['cards'];
    let cardValue = 0;
    let score = player.score;
    score = 0;

    for(let i = 0; i < cards.length; i++){
        let curCard = cards[i];
        if (curCard === 12) {
            if (score <= 10) {
                cardValue = CARDMAP[curCard][1];
            } else {
                cardValue = CARDMAP[curCard][0];
            }
        } else {
            cardValue = CARDMAP[curCard];
        }

        score = score + cardValue;
        player.score = score;
        
    }
    

}

function showScore(player) {

    if (player['score'] > 21){
        document.querySelector(player.scoreSpan).innerText = ' BUST!'
        document.querySelector(player.scoreSpan).style.color = '#FF0000'

    } else {
        document.querySelector(player.scoreSpan).innerText = player.score;
    }
}

function findWinner() {
    let winner = blackjackGame.gameState['winner'];

    if (YOU['score'] == 21) {
        // YOU win
        SCORES.wins++;
        WINSOUND.play();
        winner = 'you';

    } else if(YOU['score'] < 21) {
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21 ) {
            // YOU win
            SCORES.wins++;
            WINSOUND.play();
            winner = 'you';

        } else if (YOU['score'] < DEALER['score'] && DEALER['score'] <= 21) {
            SCORES.losses++;
            LOSSSOUND.play();
            winner = 'dealer';

        } else if (YOU['score'] === DEALER['score']) {
            SCORES.draws++;
            winner = 'draw';
        }
    } else {
        if(DEALER['score'] > 21) {
            SCORES.draws++;
            winner = 'draw';

        } else {
            SCORES.losses++;
            LOSSSOUND.play();
            winner = 'dealer';
        }
    }

    blackjackGame.gameState['winner'] = winner;
}

function showResult() {
    let winner = blackjackGame.gameState['winner'];

    document.querySelector('#winCount').innerHTML = blackjackGame.results.wins;
    document.querySelector('#lossCount').innerHTML = blackjackGame.results.losses;
    document.querySelector('#drawCount').innerHTML = blackjackGame.results.draws;
    
    if(winner == 'you'){
        document.querySelector('#blackjack-announcement').innerHTML = 'You WIN!';
        document.querySelector('#blackjack-announcement').style.color = 'green';
    } else if (winner == 'dealer') {
        document.querySelector('#blackjack-announcement').innerHTML = 'Dealer Wins!';
        document.querySelector('#blackjack-announcement').style.color = '#ff0000';
    } else {
        document.querySelector('#blackjack-announcement').innerHTML = 'You Draw';
    }
}

// Challenge 6: Fetch Random People
const URL = 'https://randomuser.me/api/?results=10';

document.querySelector('#fetchPeople-button').addEventListener('click', fetchPeople);
document.querySelector('#clearPeople-button').addEventListener('click', clearPeople);

function fetchPeople() {
    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            let people = data.results;

            for(let i = 0; i < people.length; i++) {
                let div =document.createElement('div');
                let image = document.createElement('img');
                let p = document.createElement('p');
                p.appendChild(document.createTextNode(`${people[i].name.first} ${people[i].name.last}`));
                image.src = people[i].picture.large;
                //image.height = 165;
                image.width = 175;
                div.appendChild(image);
                div.appendChild(p);
                document.querySelector('#peopleList').appendChild(div);
            }
        });
}

function clearPeople() {
    let peopleDivs = document.querySelector('#peopleList').querySelectorAll('div');


    for(let i = 0; i < peopleDivs.length; i++){
        peopleDivs[i].remove();
    };
}