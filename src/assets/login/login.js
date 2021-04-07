funcoes = {

  // função de alerta generico recebendo tipo, alinhamento e mensagem
  showNotification2: function (tipo, localizacaotela, alinhamento, mensagem) {
    //color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "tim-icons icon-bell-55",
      message: mensagem

    }, {
      type: tipo,
      timer: 8000,
      placement: {
        from: localizacaotela,
        align: alinhamento
      }
    });
  }

}

