const imgRyu = document.querySelector("#ryuImg");
const poderzinho = document.querySelector("#fireboll");

const hadouken = document.querySelector("#hadouken");

console.log(imgRyu);
console.log(poderzinho);

let ryuPosition = {left: 50, right: 50};

document.addEventListener('keydown', (event) =>{
    if(event.key == 'd'){
        ryuPosition.left += 10; 
        imgRyu.style.left = `${ryuPosition.left}px`;
    }
    if(event.key == 'a'){
        ryuPosition.left -= 10;
        imgRyu.style.left = `${ryuPosition.left}px`;
    }
    if(event.key == 'f'){
        poderzinho.style.display = 'block';
        poderzinho.style.left = `${ryuPosition.left + 50}px`;
        imgRyu.src = './img/ryu-magia.png'
        hadouken.play();

        let poderzinhoMove = setInterval(() => {
            poderzinho.style.left = `${parseInt(poderzinho.style.left) + 50}px`;
            
            if(parseInt(poderzinho.style.left) > window.innerWidth){
                clearInterval(poderzinhoMove);
                poderzinho.style.display = 'none';
                imgRyu.src = './img/ryu-ginga.gif';
            }
        }, 20)
    }
})