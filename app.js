const cols = document.querySelectorAll('.col');
// прописали функцию для рандомного цвета и его названия
function generateRandomColor() {
    // RGB
    // red #ff0000
    // green #00ff00
    // blue #0000ff

    const hexCodes = '0123456789ABCDEF';

    let color = '';

    for (let i = 0; i < 6; i++){
        color += hexCodes[Math.floor(Math.random()*hexCodes.length)]
    };
    return '#' + color;
};


document.addEventListener('keydown', (event) => {

    event.preventDefault(); // отменим дефолтное поведение при нажатии клавиш, для предотвращения багов с нажатием для др функций(например смена иконки lock)
    // console.log(event.code) чтобы узнать код нажатой клавиши
    if (event.code.toLowerCase() === 'space' ) {
        setRandomColors();
    };

});

document.addEventListener('click', (event) => {
// ПОЛУЧАЕМ ЗНАЧЕНИЕ ДАТА-СЕТ
// console.log(event.target.dataset);

    const type = event.target.dataset.type

    if(type === 'lock') {
        // console.log('perform lock'); 
        // console.log(event.target);

        const node =
            event.target.tagName.toLowerCase() === 'i'
                ? event.target 
                : event.target.children[0];
        
        
        // console.log(node);
        
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');

    } else if(type === 'copy'){
        copyToClickboard(event.target.textContent)
    }
});


function setRandomColors(isInitial) {
   
    const colors = isInitial ? getColorsFromHash() : [];
   
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const button = col.querySelector('button');
        

        if(isLocked){
            colors.push(text.textContent);
            return
        };

        // const color = chroma.random();
        const color = isInitial 
            ? colors[index] 
                ? colors[index]
                : chroma.random()
            : chroma.random();

        if (!isInitial) {
            colors.push(color);
        }

        text.textContent = color;
        col.style.background = color;

        setTextColor(text, color);
        setTextColor(button, color);
    });

    updateColorshash(colors);

};

function copyToClickboard(text) {
    
    return navigator.clipboard.writeText(text);
};

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';

};

function updateColorshash(colors =[]) {

    // document.location.hash = colors.toString();
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1);
    }).join('-');

};

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
        .substring(1)
        .split('-')
        .map((color) => '#' + color)
    }
    return [];
}


setRandomColors(true); 