'use strict';

// let banco = [
//   { 'tarefa': 'estudar js', 'status': '' },
//   { 'tarefa': 'netflix', 'status': '' },
//   { 'tarefa': 'teste', 'status': '' },
// ]

const banco = getBanco()

function getBanco() {
  return JSON.parse(localStorage.getItem('todo__list')) ?? []
}

function criarItem(tarefa, status, indice) {
  const item = document.createElement('label')
  item.classList.add('todo__item')
  item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
  `
  document.getElementById('todo__list').appendChild(item)
}

function limparTarefaz() {
  const todoList = document.getElementById('todo__list')
  while (todoList.firstChild) { //! parte1 aqui parece que se tiver algo dentro de todoList apenas o 1°
    todoList.removeChild(todoList.lastChild) //! parte2 remove todos os outro filhos que vierem depois do 1°
  }
}

function atualizarTela() {
  limparTarefaz()
  banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice))
}

function setBanco() {
  localStorage.setItem('todo__list', JSON.stringify(banco))
}

function inserirItem(evento) {
  const tecla = evento.key
  const textoDigitadoNoInput = evento.target.value
  if (tecla === 'Enter') {
    banco.push({ 'tarefa': textoDigitadoNoInput, 'status': '' })
    setBanco(banco)
    atualizarTela()
    evento.target.value = '' //! faz o input voltar ao normal
  }
}

function removerItem(indice) {
  banco.splice(indice, 1); //! splice vai remover o indece 1 no caso o indece que esta sendo clicado
  setBanco(banco)
  atualizarTela()
}

function atualizarItem(indice) {
  banco[indice].status = banco[indice].status === '' ? 'checked' : ''
  setBanco(banco)
}

function clickItem(evento) {
  const elemento = evento.target
  if (elemento.type === 'button') {
    const indice = elemento.dataset.indice //! dataset, set ou adiciona algo, no caso no dentro de indice
    removerItem(indice)
  } else if (elemento.type === 'checkbox') {
    const indice = elemento.dataset.indice
    atualizarItem(indice)
  }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem)
document.getElementById('todo__list').addEventListener('click', clickItem)

atualizarTela()
