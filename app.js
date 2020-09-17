const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');

const attackButton = document.getElementById('attack');
const specialAttackButton = document.getElementById('special-attack');
const healButton = document.getElementById('heal');

const battleLog = document.getElementById('battle-log');
let displayedBattleLog = [];
let enteredInfo;

const ATTACK_VALUE = 10;
const SPECIAL_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 24;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_SPECIAL_ATTACK = 'SPECIAL_ATTACK';
const LOG_PLAYER_ATTACK = 'ATTACK';
const LOG_PLAYER_SPECIAL_ATTACK = 'SPECIAL_ATTACK';
const LOG_PLAYER_HEAL = 'HEAL';
const LOG_MONSTER_ATTACK = 'MONSTER ATTACK';
const GAME_OVER = 'GAME OVER';


//----------------------------------------------------------------------------------
//It will be much complex later - different stats for different champions and monsters.
let monsterHealth = 100;
let championHealth = 100;

let currentMonsterHealth = monsterHealth;
let currentPlayerHealth = championHealth;


//----------------------------------------------------------------------------------
//There will be more adjustment later. 
//Don't sure if I really need seperate functions for this... Will check this later. 
function adjustMonsterHealthBar(maxLife) {
    monsterHealthBar.max = maxLife;
    monsterHealthBar.value = maxLife;
}

function adjustPlayerHealthBar(maxLife) {
    playerHealthBar.max = maxLife;
    playerHealthBar.value = maxLife;
}

adjustMonsterHealthBar(monsterHealth);
adjustPlayerHealthBar(championHealth);

function endRound() {
    const Player_DamageTaken = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= Player_DamageTaken;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        console.log("YOU WON!");
    } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0) {
        console.log("YOU LOST!");
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        console.log("Draw!");
    }
    writeToLog(LOG_MONSTER_ATTACK, Player_DamageTaken);
}


//----------------------------------------------------------------------------------
//Players and Monsters Moves
function dealMonsterDamage(damage) {
    const dealtDamage = (Math.random() * damage).toFixed(1);
    monsterHealthBar.value = parseInt(monsterHealthBar.value) - dealtDamage;
    return dealtDamage;
}

function dealPlayerDamage(damage) {
    const dealtDamage = (Math.random() * damage).toFixed(1);
    playerHealthBar.value = parseInt(playerHealthBar.value) - dealtDamage;
    return dealtDamage;
}

function attackMonster(mode) {
    let maxDamage;
    let logEvent;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_PLAYER_ATTACK;
    } else if (mode === MODE_SPECIAL_ATTACK) {
        maxDamage = SPECIAL_ATTACK_VALUE;
        logEvent = LOG_PLAYER_SPECIAL_ATTACK;
    }
    const Monster_DamageTaken = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= Monster_DamageTaken;
    writeToLog(logEvent, Monster_DamageTaken);
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function specialAttackHandler() {
    attackMonster(MODE_SPECIAL_ATTACK);
}

function increasePlayerHealth(healValue) {
    playerHealthBar.value = parseInt(playerHealthBar.value) + healValue;
}

function healPlayer() {
    let heal;
    let logEntry;
    if (currentPlayerHealth >= championHealth - HEAL_VALUE) {
        heal = championHealth - currentPlayerHealth;
        logEntry =`<p> >>> Restored only ${(Number(heal)).toFixed(1)} HP - you can't healt more than your champion max health.</p>`;
        displayedBattleLog.push(logEntry);
        showOnWeb(displayedBattleLog);
    } else {
        heal = HEAL_VALUE;
        logEntry = `<p> >>> Restored ${(Number(heal)).toFixed(1)} HP.</p>`;
        displayedBattleLog.push(logEntry);
        showOnWeb(displayedBattleLog);
    }

    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    endRound();
}

//----------------------------------------------------------------------------------
//Working on Battle Log

function writeToLog(event, value) {
    let logEntry;
    if (event === LOG_PLAYER_ATTACK){
        logEntry = `<p> >>> You used normal attack and dealt to monster ${value} damage. </p>`
        displayedBattleLog.push(logEntry);
    } else if (event === LOG_PLAYER_SPECIAL_ATTACK) {
        logEntry = `<p> >>> Special attack! You dealt to monster ${value} damag! </p>`
        displayedBattleLog.push(logEntry);
    } else if (event === LOG_MONSTER_ATTACK) {
        logEntry = ` <p> >>> Monster attacked you and dealt ${value} damage to your champion. </p>`
        displayedBattleLog.push(logEntry);
    }
    showOnWeb(displayedBattleLog);
}

function showOnWeb(msg){
    battleLog.innerHTML = msg;
}



attackButton.addEventListener('click', attackHandler);
specialAttackButton.addEventListener('click', specialAttackHandler);
healButton.addEventListener('click', healPlayer);