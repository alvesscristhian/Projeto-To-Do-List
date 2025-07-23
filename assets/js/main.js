const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

function divFilho(li) {
    const div = document.createElement('div');
    div.setAttribute('class', 'botoes');
    li.appendChild(div);
    return div;
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    const div = divFilho(li);
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(div);
    criaCheckBox(div)
    salvarTarefas();
}

function criaCheckBox(div) {
    const botaoCheck = document.createElement('input');
    botaoCheck.type = 'checkbox';
    botaoCheck.id = 'checkbox'
    botaoCheck.setAttribute('class', 'verificado');
    div.appendChild(botaoCheck)
}

function criaBotaoApagar(div) {
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = '✖';
    botaoApagar.setAttribute('class', 'apagar') // Cria atributo + valor para um elemento
    div.appendChild(botaoApagar);
}

function limpaInput() {
    inputTarefa.value = ''; // Seta o valor do input
    inputTarefa.focus(); // Adiciona um focus no elemento HTML
}

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('✖', '').trimEnd(); // .trim: Remove espaço em branco no fim
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); // Converte um elemento HTML em uma string JSON
    localStorage.setItem('tarefas', tarefasJSON); // Podemos salvar strings em uma base de dados no navegador
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas'); // Pega itens da base de dados
    const listaDeTarefas = JSON.parse(tarefas) || []; // Converte um JSON de volta para um objeto JS
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();

inputTarefa.addEventListener('keypress', function (e) { //Captura o evento ao pressionar uma tecla
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function (e) {
    const el = e.target;
    // classList.contains no JavaScript é usado para verificar se um elemento possui uma class CSS específica.

    if (el.classList.contains('apagar')) {
        el.parentElement.parentElement.remove() // Usado para verificar o pai desse elemento e remove-lo
        salvarTarefas();
    }
})

document.addEventListener('change', function (e) {
    const el = e.target;
    if (el.checked) {
        el.parentElement.parentElement.classList.add('concluido');
    }
    else {
        el.parentElement.parentElement.classList.remove('concluido');
    }
})
