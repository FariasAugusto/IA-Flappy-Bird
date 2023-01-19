// Criação do jogo
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// Carregando assets
function preload() {
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
}

// Variáveis
var bird;
var pipes;
var gapSize = 100;
var gapMargin = 50;
var pipeGroup;
var pipeInterval = 1.75;

// Criando o jogo
function create() {
    game.stage.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(bird);
    bird.body.gravity.y = 1000;
    bird.body.collideWorldBounds = true;
    game.input.onDown.add(jump, this);
    pipes = game.add.group();
    pipeGroup = game.add.group();
    pipeGroup.enableBody = true;
    pipeGroup.createMultiple(20, 'pipe');
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, addPipe);
    game.time.events.stop(false);
}

// Atualizando o jogo
function update() {
    game.physics.arcade.collide(bird, pipeGroup, gameOver);
    if (bird.y < 0) {
        gameOver();
    }
}

// Pulando
function jump() {
    bird.body.velocity.y = -350;
}

// Adicionando os tubos
function addPipe() {
    var pipeHolePosition = game.rnd.between(50, 430 - gapSize);
    addPipeBlock(pipeHolePosition - gapMargin, 0);
    addPipeBlock(pipeHolePosition + gapSize + gapMargin, 1);
}

// Adicionando blocos de tubos
function addPipeBlock(y, side) {
    var pipeBlock = pipeGroup.getFirstDead();
    pipeBlock.reset(side * 800, y);
    pipeBlock.body.velocity.x = -200;
    pipeBlock.checkWorldBounds = true;
    pipeBlock.outOfBoundsKill = true;
}

// Fim de jogo
function gameOver() {
    game.state.restart();
}
