
let formulario = document.querySelector('#formulario')

let btnActualizar = document.querySelector('#actualizar')
let btnVolver = document.querySelector('#volver')

btnActualizar.addEventListener('click', function() {
    formulario.method='post'
    formulario.action='/saveEdit'
    formulario.submit()
});

btnVolver.addEventListener('click', function() {
    formulario.method='get'
    formulario.action='../'
    formulario.submit()
});
