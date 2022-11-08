let formulario = document.querySelector('#formulario')

let btnNuevo = document.querySelector('#nuevo')

btnNuevo.addEventListener('click', function() {
    formulario.method='post'
    formulario.action='/mongooses/nuevo'
    formulario.submit()
});

let linkEditar = document.querySelectorAll('#linkEditar')

linkEditar.forEach(element => {
    element.addEventListener('click', function() {
        formulario.method='post'
        formulario.action='/mongooses/showedit?id=' + element.name
        console.log(formulario.action);
        formulario.submit()
    });
});

let linkVer = document.querySelectorAll('#linkVer')

linkVer.forEach(element => {
    element.addEventListener('click', function() {
        formulario.method='post'
        formulario.action='/mongooses/detail?id=' + element.name
        console.log(formulario.action);
        formulario.submit()
    });
});

let linkEliminar = document.querySelectorAll('#linkEliminar')

linkEliminar.forEach(element => {
    element.addEventListener('click', function() {
        formulario.method='post'
        formulario.action='/mongooses/borrar?id=' + element.name
        console.log(formulario.action);
        formulario.submit()
    });
});

