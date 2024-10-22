const farmTiles = document.querySelectorAll('.tile');
const plantButton = document.getElementById('plant-button'); // Corrigido o ID do botão de plantar
const coletaButton = document.getElementById('plant-Coleta');
const cropSelect = document.getElementById('crop-select');
const dinheiroDisplay = document.getElementById("dinheiro");
const milhoDisplay = document.getElementById("milho");
const algodaoDisplay = document.getElementById("algodao");
const feijaoDisplay = document.getElementById("feijao");
const arrozDisplay = document.getElementById("arroz");

let crops = {};
let dinheiro = 1000;
let milho = 0;
let algodao = 0;
let feijao = 0;
let arroz = 0;

// Função para plantar
farmTiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
        if (!tile.classList.contains('planted')) {
            let selectedCrop = cropSelect.value; // Obtém o nome da colheita
            tile.classList.add('planted');
            tile.innerHTML = selectedCrop;

            // Define o tempo de colheita (5 segundos para o exemplo)
            let harvestTime = 5000; // 5 segundos
            tile.dataset.harvestTime = Date.now() + harvestTime;

            // Adiciona colheita à lista de colheitas ativas
            crops[index] = {
                type: selectedCrop,
                harvestTime: Date.now() + harvestTime
            };

            // Exibe "Pronto" quando o tempo de colheita terminar
            setTimeout(() => {
                tile.innerHTML = `${selectedCrop} (Pronto)`;
                tile.dataset.ready = "true"; // Corrigido para string "true"
            }, harvestTime);

            // Atualiza a contagem de colheitas
            if (selectedCrop === "milho") {
                milho++;
            } else if (selectedCrop === "algodao") {
                algodao++;
            } else if (selectedCrop === "feijao") {
                feijao++;
            } else if (selectedCrop === "arroz") {
                arroz++;
            }
            updateDisplay();
        } else {
            alert("Este espaço já está plantado!");
        }
    });
});

// Função para atualizar o display
function updateDisplay() {
    dinheiroDisplay.textContent = `Seu Dinheiro: $${dinheiro}`;
    milhoDisplay.textContent = `Milho: ${milho}`;
    algodaoDisplay.textContent = `Algodão: ${algodao}`;
    feijaoDisplay.textContent = `Feijão: ${feijao}`;
    arrozDisplay.textContent = `Arroz: ${arroz}`;
}

// Função para coletar tudo
coletaButton.addEventListener('click', () => {
    farmTiles.forEach((tile, index) => {
        if (tile.classList.contains('planted') && tile.dataset.ready === "true") {
            alert(`Você coletou ${crops[index].type}!`);
            tile.classList.remove('planted');
            tile.innerHTML = ''; // Limpa o conteúdo do tile
            delete crops[index]; // Remove a colheita do objeto de colheitas ativas
        }
    });
});
