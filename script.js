document.addEventListener('DOMContentLoaded', () => {
  const pincel = {
    ativo: false,
    movendo: false,
    pos: {
      x: 0, y: 0
    },
    posAnterior: null
  }

  const tela = document.querySelector('#tela');
  const context = tela.getContext('2d');

  tela.width = 700;
  tela.height = 500;
  context.lineWidth = 7;
  context.strokeStyle = "#F1F1F1";

  const desenharLinha = (linha) => {
    context.beginPath();
    context.moveTo(linha.posAnterior.x, linha.posAnterior.y);
    context.lineTo(linha.pos.x, linha.pos.y);
    context.stroke();
  }

  tela.onmousedown = (_event) => {pincel.ativo = true};
  tela.onmouseup = (_event) => {pincel.ativo = false};

  tela.onmousemove = (event) => {
    pincel.pos.x = event.clientX
    pincel.pos.y = event.clientY
    pincel.movendo = true;
  }

  const ciclo = () => {
    if (pincel.ativo && pincel.movendo && pincel.posAnterior) {
      desenharLinha({
        pos: pincel.pos,
        posAnterior: pincel.posAnterior
      });
      pincel.movendo = false;
    }
    pincel.posAnterior = {
      x: pincel.pos.x,
      y: pincel.pos.y
    }

    setTimeout(ciclo, 10);
  }

  ciclo();
});