//variáveis do canvas
let xFinalCanvas = 600;
let yFinalCanvas = 400;

//variáveis da bolinha
let xBola = 300;
let yBola = 200;
let diamBola = 20;
let raio = diamBola / 2;

//velocidade da bolinha
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//variáveis raquetes
let widthRaquete = 10;
let heightRaquete = 90;
let limiteInicioRaqueteY = 5;
let limiteFinalRaqueteY = yFinalCanvas - heightRaquete - limiteInicioRaqueteY;
//hero
let xRaqueteHero = 0;
let yRaqueteHero = 150;
let velocidadeYHero = 5;
//enemy
let xRaqueteEnemy = 590;
let yRaqueteEnemy = 150;
let velocidadeYEnemy = 5;
//placar do jogo
let heroPoints = 0;
let enemyPoints = 0;
//sons do jogo
let raquetada;
let ponto;
let trilha;
//features
let colidiu = false;
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");  
}

function setup() {
  createCanvas(xFinalCanvas, yFinalCanvas);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  quicarBordas();
  mostraRaquete(xRaqueteHero,yRaqueteHero);
  mostraRaquete(xRaqueteEnemy,yRaqueteEnemy);
  movimentaRaqueteHero();
  movimentaRaqueteEnemy();
  //enemy2ndPlayer();
  verifyColisaoRaquete(xRaqueteHero, yRaqueteHero);
  verifyColisaoRaquete(xRaqueteEnemy, yRaqueteEnemy);
  incluirPlacar();
  marcarPonto();
}

function mostraBolinha() {
  circle(xBola, yBola, diamBola);
}

function movimentaBolinha() {
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function quicarBordas() {
  if (xBola + raio > width || xBola - raio < 0) {
    velocidadeXBola *= -1;
  } else if (yBola + raio > height || yBola - raio < 0) {
    velocidadeYBola *= -1;
  }
}

function mostraRaquete(x,y) {
  rect(x, y, widthRaquete, heightRaquete);
}

function movimentaRaqueteHero() {
  if (keyIsDown(UP_ARROW) && yRaqueteHero > limiteInicioRaqueteY) {
    yRaqueteHero -= velocidadeYHero;
  } else if (keyIsDown(DOWN_ARROW) && yRaqueteHero < limiteFinalRaqueteY) {
    yRaqueteHero += velocidadeYHero;
  }
}

function movimentaRaqueteEnemy() {
  velocidadeYEnemy = yBola -yRaqueteEnemy - widthRaquete / 2 - 30;
  yRaqueteEnemy += velocidadeYEnemy + chanceDeErrar
  calculaChanceDeErrar()
}

function enemy2ndPlayer() {
    if (keyIsDown(87) && yRaqueteEnemy > limiteInicioRaqueteY) {
    yRaqueteEnemy -= velocidadeYEnemy;
  } else if (keyIsDown(83) && yRaqueteEnemy < limiteFinalRaqueteY) {
    yRaqueteEnemy += velocidadeYEnemy;
  }
}

function verifyColisaoRaquete(x,y) {
  colidiu = collideRectCircle(
    x,
    y,
    widthRaquete,
    heightRaquete,
    xBola,
    yBola,
    raio
  );

  if (colidiu) {
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function incluirPlacar() {
  stroke(255)
  textAlign(CENTER);
  textSize(25);
  fill(0);
  rect(258,5,40,25);
  fill(255);
  text(heroPoints, 278, 26);
  fill(0);
  rect(301,5,40,25);
  fill(255);
  text(enemyPoints, 321, 26);  
}

function marcarPonto() {
  if (xBola > xFinalCanvas-10) {
    heroPoints += 1
    xBola = 300
    yBola = 200
    ponto.play();
  } 
  if (xBola < 10){
    enemyPoints += 1 
    xBola = 300
    yBola = 200
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (enemyPoints >= heroPoints) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}