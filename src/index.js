const bola = document.querySelector('.bola');

document.addEventListener('mousemove', (event) => {
    // Posição do mouse
    const mausecima = event.clientX;
    const mauseenbaixo = event.clientY;

    // Movendo a bola com base na posição do mouse
    bola.style.transform = `translate(${mausecima - 25}px, ${mauseenbaixo - 25}px)`;
});