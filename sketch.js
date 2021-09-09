/*
Variabler der bruges til frugten.
*/

// Frugten
let x = 0;
let y = 550;
const rad = 20;
let xspeed = 4;
let yspeed = -10;
let newspeed;
const col = [220,110,0];
let tid = 150;
const grav = 0.1; //tyngdeacceleration, ned af y-aksen.

// frugterne der bruges (undtagen lige lime)
let lime;


// Turbanen
let turban;

// Øvrige
let score = 0;
let missed = 0;
let liv = 8;
let spilIgang = true;   //flag

/*
 * Function der henter billedet og sætter det ind
 */

 let turbanbillede;
function preload() {
    turbanbillede = loadImage("turban.png");
}

function setup() {  // kører kun en gang, når programmet startes

    // Lave spillets bane man er på.
    createCanvas(595, 600);
    textAlign(CENTER, CENTER);

    newspeed = yspeed;
    x = rad;
    // parametrene fra kurv constructor i "kurv.js" (x, y, bredde, dybde, speed)
    turban = new Kurv(470, 100, 70, 50, 8);

    lime = new Frugt(20, 550, 20, 4, -10, [110,220,0]);

}

function draw() {
    background(0);

    if (spilIgang) {
        // Flyt og tegn lime, men virker ikke.
        lime.move();
        lime.checkScore();
        lime.display();

        //til at flytte frugten
        move();
        checkScore();
        display();

        turban.move();
    }
    else {  // så er det Game Over, der skal vises
        fill(col);
        textSize(46);
        text("Game Over",width/2 + random(-5,5), height/2 + random(3 ));
        text("Score: "+score, width/2, height/2 + 50);
    }
}
// Function som viser score og liv oppe i hjørnet.
function display() {
    fill(255);
    textSize(12);
    text("Score: "+score, width-80, 30);
    text("Liv: " + liv, width-160, 30);

    //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises
    if(tid > 0) {
        tid -= 1;
    }
    if (tid < 100) {
        fill(col);
        ellipse(x, y, rad*2, rad*2);

    }

    // Her vises turbanen, bare nu som billede
    turban.tegn();
}

function move() {
    //Her skal vi sørge for at frugten bevæger sig, hvis den er startet
    if (tid <= 0) {
        x += xspeed;
        y += yspeed;
        yspeed += grav;
    }
    if (x > width || y > height) {
        missed += 1;
        liv -= 1;
        if (liv < 1) {
            spilIgang = false;
            genstartKnap.show();
        }
        shootNew();
    }
}

function checkScore() {
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes den afsted igen
    if (yspeed > 0) {
        if (turban.grebet(x, y, rad)) {
            score += 1;
            shootNew();
        }
    }
}

function shootNew() {
    //Her skal vi sørge for at en ny frugt skydes afsted
    x = rad;
    y = random(200,550);
    yspeed = newspeed * (y/550);
    xspeed = random(4);
    tid = random(400);
}

/*
 * Her genstartes spillet ved at alle relevante værdier nulstilles
 */
function restart() {
    liv = 10;
    missed = 0;
    score = 0;
    spilIgang = true;
    genstartKnap.hide();
}

function mousePressed() {
    // Funktionen gør ingenting lige nu
    return false;  // Forebygger evt. browser default behaviour
}

/*
KONKLUSION

Meningen var at den skulle skifte billede hvert 10 point, og spille noget musik i baggrunden.

Musikken kunne ikke bare spille på loop per automatik, så lavede det til noget man selv skulle starte, så man også kunne slukke det hvis det var.

Prøvede at få lavet en page, da den ikke kunne få fat i billedet til turbanen af en eller anden grund, der gik også noget galt, da den ikke kunne hente noget
fra de forskellige libraries, er ikke helt klar over hvad der gik galt.

Kunne ikke få baggrunden til at skifte ved bestemt point, og fordi det lavede problemer, fjernede jeg den del af koden for at få spillet til at kunne køre.
Endte så ikke med at køre grundet det med billedet tror jeg nok. Den skrev "Loading..." på et tidspunkt, men nu viser den bare kun controlleren til Musikken,
og intet andet, mens den har problemer i consolen med billedet til turbanen og 3 .js filer den ikke kan hente noget fra af en eller anden grund.



(OPDATERING)

Har tænkt over det med at pages ikke duede med libraries fordi jeg satte dem ind manuelt, og det er nok grundet at i index.html, at den beder om at gå igennem
folderen "libraries" ved at søge "libraries/p5()" istedet for at bare søge efter p5()

*/
