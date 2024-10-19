let input = document.querySelector('.input'),
    btn = document.querySelector('.btn'),
    time = document.querySelector('.time'),
    gameZone = document.querySelector('.game__zone'),
    score = 0,
    gameTime = 0,
    interval = 0;

btn.addEventListener('click', () => {
    if (input.value > 4) {
        gameTime = input.value;
        input.value = '';
        gameZone.innerHTML = '';
        score = 0;
        startGame();
    } else {
        alert('Нужно ввести минимум 5 секунд');
    }
});

gameZone.addEventListener('click', (event) => {
    if (event.target.classList.contains('shape')) {
        score++;
        event.target.remove();
        createShape();
    }
});

function startGame() {
    time.innerHTML = gameTime;
    interval = setInterval(() => decreaseTime(), 1000);
    createShape();
}

function decreaseTime() {
    if (gameTime == 1) {
        time.innerHTML = 0;
        endGame();
    } else {
        time.innerHTML = --gameTime;
    }
}

function endGame() {
    gameZone.innerHTML = `<h2>Вы набрали ${score} баллов</h2>`;
    clearInterval(interval);
}

function createShape() {
    let shape = document.createElement('div');
    shape.classList.add('shape');
    
    // Случайный выбор формы
    const shapes = ['circle', 'square', 'triangle'];
    let randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    shape.classList.add(randomShape);
    
    // Случайный размер
    let size = random(20, 60);
    if (randomShape !== 'triangle') {
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
    }

    // Случайный цвет
    shape.style.background = getRandomColor();
    
    // Координаты появления
    let coor = gameZone.getBoundingClientRect();
    let leftValue = random(0, coor.width - size);
    let topValue = random(0, coor.height - size);
    shape.style.left = leftValue + 'px';
    shape.style.top = topValue + 'px';
    
    shape.style.position = 'absolute';
    
    gameZone.append(shape);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

