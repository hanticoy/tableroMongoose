
let formulario = document.querySelector('#formulario')
let btnVolver = document.querySelector('#volver')

btnVolver.addEventListener('click', function() {
    formulario.method='get'
    formulario.action='../'
    formulario.submit()
});
