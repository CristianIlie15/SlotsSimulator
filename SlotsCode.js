const fruits = [
    { name: 'Cherry', value: 0, tiers: 0 }, 
    { name: 'Lemon', value: 1, tiers: 1 }, 
    { name: 'Orange', value: 2, tiers: 1 },
    { name: 'Plum', value: 3, tiers: 1 },
    { name: 'Scatter', value: 4, tiers: 2 },
    { name: 'Watermelon', value: 5, tiers: 3 },
    { name: 'Grape', value: 6, tiers: 3 },
    { name: '7', value: 7, tiers: 4 }
];

const tiers = [
    { tier: 0, pay: [0, 1, 4, 10, 40] },
    { tier: 1, pay: [0, 0, 4, 10, 40] },
    { tier: 2, pay: [0, 0, 2, 10, 50] },
    { tier: 3, pay: [0, 0, 10, 40, 100] },
    { tier: 4, pay: [0, 0, 20, 200, 1000] }
];


function CreateRandom(bet) //Function that generates Random fruits and symbols.
{ let num, arr=[];
for( let i=0;i<15;i++)
{
     num = Math.floor(Math.random() * 8); // Generate random number between 0 and 7
            if (num == 4 && Math.floor(Math.random() * 3) < 2) { //Adjust not to have scatters payments all the time
                num = Math.floor(Math.random() * 7);
            if (num == 7 && Math.floor(Math.random()*15>8)) //Adjust 7 occurences to happen less than expected.
                num = Math.floor(Math.random() * 6);
            }
            if (i > 4) {    //Makes sure not to have scatters on the same row
                while (num == 4 && arr[i - 5] == 4) {
                    num = Math.floor(Math.random() * 8);
                }
                if (i > 9) {  //Makes sure not to have scatters on the same row
                    while (num == 4 && (arr[i - 5] == 4 || arr[i - 10] == 4)) {
                        num = Math.floor(Math.random() * 8);
                    }
                }
            }
            arr.push(num);``
}   
 if(CalculeazaWin(arr, bet)>bet*18 && Math.floor(Math.random()*18>15))
 {
 arr=CreateRandom(bet);
 }

return arr;
    
}

function PlataMare(bet, t) { //Big Win function
    let array = [];
    let plata = 0;
    const minWin = Math.floor((t * bet*(Math.random()+1))/3); 
    const maxWin = minWin*(Math.floor(Math.random()*5)+1); // Maximum payout
    do {
        array = CreateRandom(bet);
        plata = CalculeazaWin(array, bet);

        // Add randomness to the payout range
        const randomMultiplier = 0.5 + Math.random() * 0.5; 
        const randomizedTarget = Math.floor(t * bet * randomMultiplier);

        if (plata >= randomizedTarget && plata <= maxWin) {
            break; 
        }
    } while (true);

    return array;
}

function PlataMedie(bet, t) { //Function that pays a medium ammount
    let array = [];
    let plata = 0;
    const minWin = Math.floor(t * bet * 0.5); 
    const maxWin = bet * (t + Math.floor(bet * 7 / 3)); // Maximum payout

    do {
        array = CreateRandom(bet);
        plata = CalculeazaWin(array, bet);

        // Add randomness to the payout range
        const randomMultiplier = 0.5 + Math.random() * 0.5; // Random factor between 0.5 and 1.0
        const randomizedTarget = Math.floor(t * bet * randomMultiplier);

        if (plata >= randomizedTarget && plata <= maxWin) {
            break; // Exit the loop if we fall betweeb the range
        }
    } while (true);

    return array;
}


function CalculeazaWin(a, bet) //The place where magic happens
{ let row1, row2, row3, stw=0, d1=1,d2=1;
row1=a.slice(0,5);
row2=a.slice(5,10);
row3=a.slice(10,15);
stw+=Consecutive (row1,bet);
stw+=Consecutive (row2, bet);
stw+=Consecutive (row3, bet);
stw+=Scatters(a, bet);
if(row1[0] ==row2[1]) d1++; //Diagonal 1 consecutive checking
if(d1==2 &&  row1[0]==row3[2]) d1++;
if(d1==3 && row1[0]==row2[3]) d1++;
if(d1==4 && row1[0]==row1[4]) d1++;

if(d1>1) 
{
stw+=tiers[fruits[row1[0]].tiers].pay[d1-1]*bet;
}
if(row3[0]==row2[1]) d2++; //Diagonal 2 consecutive checking
if(d2==2 && row3[0]==row1[2]) d2++;
if(d2==3 && row3[0]==row2[3]) d2++;
if(d2==4 && row3[0]==row3[4]) d2++;

if(d2>1)
{
    stw += tiers[fruits[row3[0]].tiers].pay[d2 - 1] * bet;
}
return stw;
}

function GreatGuy(a, ok) //Function I don't remember what I was going to use for and left it unfinished
{
    for(let i=0;i<5;i++)
    { if(a[0]==a[1] && fruits[a[0]].tiers<=1) a[2]=a[0];
    else if(a[0]==a[2] && fruits[a[0]].tiers<=1 ) a[1]=a[0];
    else if(a[1]==a[2] && fruits[a[1]].tiers<=1) a[0]=a[1];
    }
    return a;
    
}


function DoubleGame(bet)  //Funtion I plan to use in future implementations, when the game will have an interface
{  let win=bet;
  let playerGuess=Math.floor(Math.random()*18), computerGuess=Math.floor(Math.random()*17)+3;
    if(playerGuess>=computerGuess)
    {
        win=win*2;
    }
    else win=0;
    return win;
}

function Scatters(big,bet) //Scatter function implementation
{ 
let scatters=0;
 for(let i=0 ;i<big.length;i++)
    {
        if(big[i]==4) scatters++;
    }
    if(scatters>2)
    return tiers[2].pay[scatters-1]*bet; 
    else return 0;
}

function Oftica(numberOfSearches, levelOfOftica, a,bet) { //The function that pays 0 and makes you mad
    for (let j = 0; j < numberOfSearches; j++) {
        let ofticaArray = [];
        let repetitii = 8;
        let copy = Array(8).fill(0);
        let row1 = [], row2 = [], row3 = [];
                ofticaArray=CreateRandom(bet);
        for (let i = 0; i < 15; i++) {
            copy[ofticaArray[i]]++;
            repetitii = copy.filter(count => count < 1).length;
            if (repetitii <=levelOfOftica && CalculeazaWin(ofticaArray,bet)==0 ) {
                return ofticaArray;
            }
        }
    }
    return [];
}

function Consecutive(array,bet)
{
    let count = 1,element=array[0],lineWin=0;
    let newArray=[...array];
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] === array[i + 1]) {
            count++;
        } else {
            break;
        }
    }
    lineWin+=CheckWin (newArray , count , element, bet);
    return lineWin;
}

function CheckWin(array, count, element, bet) {
    let win = 0;
    let fruit = fruits[element]; 
    if (fruit && fruit.value !== 4) {  // Check to exclude having a line of scatteres , they got a different type of function 
        let num = fruit.tiers;
        for (const tier of tiers) {
            if (tier.tier === num)
                win += tier.pay[count - 1] * bet;
        }
    }
    return win;
}

let stw2=0,bet=5,profit=0,steps=40000, steps2=steps;

const n = 15; 
let a = [], row1=[],row2=[],row3=[],totalWin=0,stw=0, d1=1,d2=1;
for (let i = 0; i < n; i++) {
   let num=CreateRandom(bet);
    a=num;
}
let chance1=Math.floor(Math.random()*100);
if(chance1<23)  //Ajust for chance1 to get more or less randomness in the generated output.
{
    let chance2=Math.ceil(Math.random()*2+2);
let ofticaSequence = Oftica(20000, chance2, a,bet);
if (ofticaSequence.length === 15) {
    // Assign the sequence to the main array 'a'
    a = ofticaSequence;
}
}
if(chance1>90) //Play with the ranges to balance the game, now it's kind of unrealistic, paying all the time.
a=PlataMare(bet, 70);
if(chance1>50 && chance1<89)
a=PlataMedie(bet, 3);
stw2=stw;
row1=a.slice(0,5);
row2=a.slice(5,10);
row3=a.slice(10,15);
console.log(row1);
console.log(row2);
console.log(row3);
console.log(" ");
console.log(CalculeazaWin(a, bet)); //This logs the actual payment
profit+=stw;  //This and the next line implement profit counting, i was using a for loop with many steps to calculate the totalWin and figure out how fair the game is
profit-=bet;  //Now the game is favoring the player 
console.log(chance1);





