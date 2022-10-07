window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const imgFondo = document.createElement('img')
  imgFondo.src = 'images/road.png'
  const imgCoche = document.createElement('img')
  imgCoche.src = 'images/car.png'
  let xCar = (canvas.width-60)/2
  window.addEventListener('keydown', (e) => {
    if(e.key == "ArrowLeft") {if(xCar > 0) {xCar-=30}}
    else if(e.key == "ArrowRight") {if(xCar < canvas.width-60) {xCar+=30}}
  })
  let frames = 0
  const obstaculos = [];
  let intervalId;
  function startGame() {
    intervalId = setInterval(update, 20);
  }

  function update() {
    frames++
    //limpiar
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //recalcular : posicion obstaculos
    obstaculos.forEach(obstaculo => {
      obstaculo.y += 5;
    })
    if(frames%150 == 0) { 
      let obstaculo = new Obstaculo() 
      obstaculos.push(obstaculo)
    }
  
    //repintar : posicion fondo, obstáculos, coche
    ctx.drawImage(imgFondo, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgCoche, xCar, 550, 60, 110);
    obstaculos.forEach(obstaculo => {
      obstaculo.choca()
    })
    obstaculos.forEach(obstaculo => {
      obstaculo.pintar()
    })

  }
  class Obstaculo {
    constructor() {
      this.width = Math.floor(Math.random() * (canvas.width-120))
      this.height = 30;
      this.x = Math.floor(Math.random() * this.width)
      this.y = -30
    }
    pintar() {
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    choca() {
      if(!(xCar+60 < this.x || 550 > this.y+this.height
         || xCar > this.x+this.width || 660 < this.y)) { clearInterval(intervalId) }
    }
  }
};
