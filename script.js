document.addEventListener('DOMContentLoaded', function () {
  var btnTema = document.getElementById('btn-tema');
  var body = document.body;

  var temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') {
    body.classList.add('tema-escuro');
  }

  btnTema.addEventListener('click', function () {
    body.classList.toggle('tema-escuro');
    var temaAtual = body.classList.contains('tema-escuro') ? 'escuro' : 'claro';
    localStorage.setItem('tema', temaAtual);
  });

  var btnMenu = document.getElementById('btn-menu');
  var menuLista = document.getElementById('menu-lista');

  btnMenu.addEventListener('click', function () {
    menuLista.classList.toggle('menu-ativo');
    btnMenu.classList.toggle('ativo');
  });

  var linksMenu = menuLista.querySelectorAll('a');
  linksMenu.forEach(function (link) {
    link.addEventListener('click', function () {
      menuLista.classList.remove('menu-ativo');
      btnMenu.classList.remove('ativo');
    });
  });

  var formulario = document.getElementById('formulario-contato');

  function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function mostrarErro(campo, mensagem) {
    campo.classList.add('erro');
    var spanErro = campo.parentElement.querySelector('.msg-erro');
    if (spanErro) {
      spanErro.textContent = mensagem;
    }
  }

  function limparErro(campo) {
    campo.classList.remove('erro');
    var spanErro = campo.parentElement.querySelector('.msg-erro');
    if (spanErro) {
      spanErro.textContent = '';
    }
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var campoNome = document.getElementById('campo-nome');
    var campoEmail = document.getElementById('campo-email');
    var campoAssunto = document.getElementById('campo-assunto');
    var campoMensagem = document.getElementById('campo-mensagem');

    var formularioValido = true;

    limparErro(campoNome);
    limparErro(campoEmail);
    limparErro(campoAssunto);
    limparErro(campoMensagem);

    if (campoNome.value.trim() === '') {
      mostrarErro(campoNome, 'Por favor, informe seu nome.');
      formularioValido = false;
    }

    if (campoEmail.value.trim() === '') {
      mostrarErro(campoEmail, 'Por favor, informe seu e-mail.');
      formularioValido = false;
    } else if (!validarEmail(campoEmail.value.trim())) {
      mostrarErro(campoEmail, 'Por favor, informe um e-mail válido.');
      formularioValido = false;
    }

    if (campoAssunto.value.trim() === '') {
      mostrarErro(campoAssunto, 'Por favor, informe o assunto.');
      formularioValido = false;
    }

    if (campoMensagem.value.trim() === '') {
      mostrarErro(campoMensagem, 'Por favor, escreva sua mensagem.');
      formularioValido = false;
    }


    if (formularioValido) {
      formulario.reset();

      abrirModal();
    }
  });

  var todosOsCampos = formulario.querySelectorAll('input, textarea');
  todosOsCampos.forEach(function (campo) {
    campo.addEventListener('input', function () {
      limparErro(campo);
    });
  });

  var modalOverlay = document.getElementById('modal-sucesso');
  var btnFecharModal = document.getElementById('btn-fechar-modal');

  function abrirModal() {
    modalOverlay.classList.add('ativo');
  }

  function fecharModal() {
    modalOverlay.classList.remove('ativo');
  }

  btnFecharModal.addEventListener('click', fecharModal);

  modalOverlay.addEventListener('click', function (evento) {
    if (evento.target === modalOverlay) {
      fecharModal();
    }
  });
});
