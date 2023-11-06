let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const xpText = document.querySelector("#xpText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");
///////////////////////////////////////

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

///////////////////////////////////////
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15 
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60 
  },
  {
    name: "dragon",
    level: 20,
    health: 300 
  }
];



//////////////////////Locations used to store data///////////////////////
const locations = [
  //Storing Town square data//
  {
    name: "town square", 
    "button text": ["Go to store", "Go to cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You're in town you see a sign that says \"store.\""
  },
  //storing the store data//
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Welcome to the store."
  },
  //storing the cave data//
  {
    name:  "cave",
    "button text": ["Fight slime", "fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Welcome to the cave, try not to die!"
  },
  {
    //storing the fight data//
    name:  "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "Don't die pwease!"
  },
  //storing the kill monster data//
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
      text: "I'll give it to you, you kicked the monster's ass. You gained experience points and won gold. (you lucky bastard!)"
  },
  //storing the lose data//
  {
    name: "lose",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "You may rest in peace."
  },
  //storing the winGame data//
  {
    name: "win",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    text: "Wow, I had zero faith in you but you still did it. This tells a lot about you, you are a strong person."
  },
  //storing the easterEgg data//
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "This is an aftercare feature after all this hard time I gave you in the game. There is going to be a selection of random numbers from 0 to 10, if your choice matches the random outcome, you're going to win! "
  }
  
    
  
];
 
// Initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
////////////////////////////////////////////////////
function update(location){
   monsterStats.style.display = "none";
   button1.innerText = location["button text"][0];
   button2.innerText = location["button text"][1];
   button3.innerText = location["button text"][2];
   button1.onclick = location["button functions"][0];
   button2.onclick = location["button functions"][1];
   button3.onclick = location["button functions"][2];
   text.innerText = location.text;  
}
////////////////////////////////
function goTown(){
  update(locations[0]);
 }
////////////////////////////////
 function goStore(){
   update(locations[1]);
 }
//////////////////////////////////
 function goCave(){
   update(locations[2]);
 }
/////////////////////////////////
 



function buyHealth(){
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }else{
    text.innerText = "You're currently broke! Fight your way and gain more money (BrOke BitSheS sHoUld NEVER laUgH !).";
  }
  
  
 }
function buyWeapon(){
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
     gold -= 30;
     currentWeapon++;
     goldText.innerText = gold;
     let newWeapon = weapons[currentWeapon].name;
     text.innerText = "You now have a new " + newWeapon + "." + " Let's see what you got !";
     inventory.push(newWeapon);
     text.innerText += " In your inventory you have: " + inventory;  
   }else{
     text.innerText = "You are too broke to buy this, (BrOke BitSheS sHoUld NEVER laUgH !)";
   }
  }else{
    text.innerText = "You have the ultimate weapon! (when are you going to make you parents proud !?)";
    button2.innerText = "Sell your weapon (or kidney) for 15 gold";
    button2.onclick = sellWeapon;
  } 
 }

function sellWeapon(){
  if (inventory.length > 1) {
    gold =+ 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold your" + currentWeapon + ".";
    text.innerText = "Your inventory consists of: " + inventory + " LoL";
    
  }else{
    text.innerText = "Look at you, fighting the beasts with the power of friendship (you're actually so stupid!)";
  }
}

function fightSlime(){
  fighting = 0;
  goFight();
}

function fightBeast(){
  fighting = 1;
  goFight();
}

function fightDragon(){
   fighting = 2;
   goFight();
 }

function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack(){
  text.innerText = monsters[fighting].name + " is attacking you, do something! Wait why are you pissing your pants?";
  text.innerText += " You should probably use the " + weapons[currentWeapon].name + ".";
  
  if (isMonsterHit()) {
  health -= getMonsterAttackValue(monsters[fighting].level);
  }else{
    text.innerText += " You need to consult an optician because there is no way you missed a gigantic beast! ";
  }
  
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) +1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0){
    fighting === 2 ? winGame() : defeatMonster();
  }

  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level){
  let hit = (level * 5) - (Math.floor(Math.random() * xp) + 1);
  console.log(hit);
  return hit;
}

function isMonsterHit(){
  return Math.random() > .2 || health < 25;
}

function dodge(){
  text.innerText = "You dodged an attack from the " + monsters[fighting].name +".";
}

function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose(){
  update(locations[5]);
  
}

function winGame() {
  update(locations[6]);
}

function restart(){
 xp = 0;
 health = 100;
 gold = 50;
 currentWeapon = 0;
 inventory = ["stick"];
 goldText.innerText = gold;
 xpText.innerText = xp;
 goTown(); 
}

function easterEgg (){
  update(locations[7]);
}


function pickTwo(){
  pick(2);
}
function pickEight(){
  pick(8);
}

function pick(guess){
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }


  if(numbers.indexOf(guess) !== -1) {
    text.innerText += "Winner Winner, mabrouk +20 gold!"
    gold+= 20;
    goldText.innerText = gold;
  }else{
    text.innerText += "You lost the bet, as a result, you lose 15 health!"
    health -= 15;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
  
}