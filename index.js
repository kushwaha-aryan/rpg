let xp=0;
let health=100;
let gold=50;

let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory=["stick"];

const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xpText=document.querySelector("#xpText");
const healthText=document.querySelector("#healthText");
const goldText=document.querySelector("#goldText");
const monsterStats=document.querySelector("#monsterStats");
const monsterNameText=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealth");
const monsterImg =document.querySelector("#monsterImg");

const weapons=[
    {
        name:"stick",
        power:5
    },
    {
        name: "dagger",
        power:30
    },
    {
        name:"CLaw Hammer",
        power:50
    },
    {
        name: "Sword",
        power: 100
    }
];

const locations=[
    {
        name : "Town square",
        "button text":["Go to Store","Go to cave","Fight Dragon"],
        "button functions":[goStore,goCave,fightDragon],
        text:"You are in Town Square . You see a sign that says \"store\"."
    },
    {
        name : "store",
        "button text":["Buy 10 Health (10 gold)","Buy weapon (30 gold)","Go to town square"],
        "button functions":[buyHealth,buyWeapon,goTown],
        text:"you entered a Store"
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast,goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "Fight",
        "button text": ["Attack","Dodge","Run"],
        "button functions": [attack,dodge,run],
        text:"You are Fighting a monster."
    },
    {
        name: "Kill Monster",
        "button text": ["Play Cricket","Secret Game","Go to Town Square"],
        "button functions":[openCricket,easterEgg,goTown],
        text:"You just killed the Monster. You got GOLD"
    },
    {
        name: "lose",
        "button text":["Replay ?","Replay ?","Replay ?"],
        "button functions":[restart,restart,restart],
        text:"YOU DIED .☠️☠️",
    },
    {
        name: "win",
        "button text": ["Celebrate , by Cricket !!", "Replay ?", "Replay ?"],
        "button functions": [openCricket, restart, restart],
        text: "You won .☠🥳🙌",
    },
    {
        name: "EasterEgg",
        "button text": ["Pick 6","Pick 7","Go to Town Square"],
        "button functions": [pick6,pick7,goTown],
        text: "If you choose correct number out of 10 randomly choose , you wil 20 gold🪙 , else you lose 10 health❤️‍🩹"
    }
]

const monsters = [
    {
        name:"Slime",
        level:2,
        health:20,
        img:"slime.webp"
    },
    {
        name:"Fanged Beast",
        level:8,
        health:60,
        img:"FangedBeast.webp"
    },
    {
        name:"Dragon",
        level:20,
        health:300,
        img:"Dragon.webp"
    }
];

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

function openCricket() {
    window.open("https://doodlecricket.github.io/", "_blank");
}

function update(location){
    monsterStats.style.display = "none";
    monsterImg.style.display = "none";
    button1.innerText=location["button text"][0];
    button2.innerText=location["button text"][1];
    button3.innerText=location["button text"][2];
    button1.onclick=location["button functions"][0];
    button2.onclick=location["button functions"][1];
    button3.onclick=location["button functions"][2];
    text.innerText=location.text;
}

function goStore () {
    update(locations[1]);
}

function goTown() {
    update(locations[0]);
}

function goCave () {
    update(locations[2]);
}

function buyHealth () {
    if(gold>=10){
        gold-=10
        health+=10
        goldText.innerText=gold;
        healthText.innerText=health;
    }
    else {
        text.innerText="Not Sufficient gold"
    }
}

function buyWeapon(){
    if(currentWeapon+1<weapons.length){
        if(gold>=30){
            gold-=30
            currentWeapon+=1
            goldText.innerText=gold;
            let newWeapon=weapons[currentWeapon].name
            text.innerText="You now have a "+newWeapon+".";
            inventory.push(newWeapon)
        }
        else {
            text.innerText="Not Sufficient gold"
        }
    }
    else {
        text.innerText="You already have all Weapons";
        button2.innerText="Sell Weapon for 20 gold !!";
        button2.onclick=sellWeapon;
    }
}

function sellWeapon(){
    if(inventory.length>1){
        gold+=20;
        goldText.innerText=gold;
        let soldWeapon=inventory.shift()
        text.innerText="You just sold"+soldWeapon+" for 20 gold !! You now have : "+inventory;
    }
    else{
        text.innerText="You can't sell you only weapon"
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight () {
    update(locations[3]);
    monsterHealth=monsters[fighting].health;
    monsterStats.style.display="block";
    monsterNameText.innerText=monsters[fighting].name;
    monsterHealthText.innerText=monsterHealth
    monsterImg.src=monsters[fighting].img;
    monsterImg.style.display = "block";
}

function attack(){
    text.innerText="The "+monsters[fighting].name+" attacks . ";
    text.innerText+="You attack it with your "+weapons[currentWeapon].name+".";
    if(monsterHit()) health-=getmonsterAttack(monsters[fighting].level);
    else text.innerText+=" Monster Missed !!"
    monsterHealth-=weapons[currentWeapon].power+Math.floor(Math.random()*xp)+1;
    healthText.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if(health<=0){
        lose();
    }
    else if(monsterHealth<=0){
        fighting===2 ? winGame() : defeatMonster();
    }

    if(Math.random()<0.1 && inventory.length!==1){
        text.innerText+="You "+inventory.pop()+" breaks !!";
        currentWeapon--;
    }
}

function monsterHit () {
    return (Math.random()>0.25 || health<=20);
}

function getmonsterAttack(level){
    let hit=level*5 - Math.floor(Math.random()*xp);
    console.log(hit);
    return hit>0 ? hit : 0
}

function dodge(){
    text.innerText="You dodged attack from "+monsters[fighting].name+" .";
}

function defeatMonster(){
    gold+=Math.floor(monsters[fighting].level*6.7);
    xp+=monsters[fighting].level;
    goldText.innerText=gold;
    xpText.innerText=xp;
    update(locations[4]);
}

function lose(){
    health=0;
    healthText.innerText=health;
    update(locations[5]);
}

function restart(){
    xp=0;
    health=100;
    gold=50;
    currentWeapon=0;
    inventory=["stick"];
    goldText.innerText=gold
    healthText.innerText=health;
    xpText.innerText=xp;
    goTown()
}

function run(){
    update(locations[0])
}

function winGame(){
    update(locations[6]);
}

function easterEgg(){
    update(locations[7]);
}

function pick6(){
    pick(6);
}

function pick7(){
    pick(7);
}

function pick(guess){
    let number=[]
    for(let i=0; i<10; i++){
        number.push(Math.floor(Math.random()*11));
    }
    let output = "You picked : " + guess + " , Here are the lucky numbers :\n";
    for (let i = 0; i < 10; i++) {
        output += number[i] + "  ";  // double space
    }
    text.innerText = output;
    text.innerText+="\n";

    if(number.indexOf(guess)!==-1){
        text.innerText+=" You WON !!🙌you get 20 gold🪙";
        gold+=20;
        goldText.innerText=gold;
    }
    else {
        text.innerText+="You Lose 😭😭 , you lost 10 health❤️‍🩹!!";
        health-=10;
        healthText.innerText=health;
        if(health<=0) lose();
    }

}
