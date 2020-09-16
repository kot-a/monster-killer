const monsterHealthBar = document.getElementById('monster-health');
const playerHealthBar = document.getElementById('player-health');

const attackButton = document.getElementById('attack');
const specialAttackButton = document.getElementById('special-attack');
const healButton = document.getElementById('heal');

const ATTACK_VALUE = 10;
const SPECIAL_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 24;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_SPECIAL_ATTACK = 'SPECIAL_ATTACK';
const LOG_PLAYER_ATTACK = 'ATTACK';
const LOG_PLAYER_SPECIAL_ATTACK = 'SPECIAL_ATTACK';
const LOG_PLAYER_HEAL = 'HEAL';


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
}


//----------------------------------------------------------------------------------
//Players and Monsters Moves
function dealMonsterDamage(damage) {
    const dealtDamage = Math.random() * damage;
    monsterHealthBar.value = parseInt(monsterHealthBar.value) - dealtDamage;
    return dealtDamage;
}

function dealPlayerDamage(damage) {
    const dealtDamage = Math.random() * damage;
    playerHealthBar.value = parseInt(playerHealthBar.value) - dealtDamage;
    return dealtDamage;
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'SPECIAL_ATTACK') {
        maxDamage = SPECIAL_ATTACK_VALUE;
    }
    const Monster_DamageTaken = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= Monster_DamageTaken;
    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function specialAttackHandler() {
    attackMonster('SPECIAL_ATTACK');
}

function increasePlayerHealth(healValue) {
    playerHealthBar.value = parseInt(playerHealthBar.value) + healValue;
}

function healPlayer() {
    let heal;
    if (currentPlayerHealth >= championHealth - HEAL_VALUE) {
        heal = championHealth - currentPlayerHealth;
        console.log(`Restored only ${Number((heal).toFixed(1))} HP - you can't healt more than your champion max health.`)
    } else {
        heal = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    endRound();
}


attackButton.addEventListener('click', attackHandler);
specialAttackButton.addEventListener('click', specialAttackHandler);
healButton.addEventListener('click', healPlayer);