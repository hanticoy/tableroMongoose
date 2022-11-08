
let formulario = document.querySelector('#formulario')

let btnAgregar = document.querySelector('#agregar')
let btnVolver = document.querySelector('#volver')

btnAgregar.addEventListener('click', function() {
    formulario.method='post'
    formulario.action='/add'
    formulario.submit()
});

btnVolver.addEventListener('click', function() {
    formulario.method='get'
    formulario.action='../'
    formulario.submit()
});
