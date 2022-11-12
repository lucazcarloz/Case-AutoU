class Colaborador{

    constructor(nome, sobrenome, matricula, email, departamento, cargo, like, orgulho, excelenteTrabalho, colaboracao){

        this.nome               = nome;
        this.sobrenome          = sobrenome;
        this.matricula          = matricula;
        this.email              = email;
        this.departamento       = departamento;
        this.cargo              = cargo;
        this.like               = like;
        this.orgulho            = orgulho;
        this.excelenteTrabalho  = excelenteTrabalho;
        this.colaboracao        = colaboracao;
    }
}

const colaboradores = [
    new Colaborador("Lucas",    "Fernandes",   "3748", "lucas.fernandes@cliente.com",  "Financeiro",   "Analista",      0, 0, 0, 0),
    new Colaborador("Pedro",    "Lima",        "2482", "pedro.lima@cliente.com",       "Logística",    "Transportador", 0, 0, 0, 0),
    new Colaborador("Maria",    "Julianelli",  "6449", "maria.julianelli@cliente.com", "Logística",    "Planejador",    0, 0, 0, 0),
    new Colaborador("Kevin",    "Restom",      "2749", "kevin.restom@cliente.com",     "Logística",    "Transportador", 0, 0, 0, 0),
    new Colaborador("Amanda",   "Amorim",      "4128", "amanda.amorim@cliente.com",    "Suprimentos",  "Operador",      0, 0, 0, 0)
];

const colaboradoresR = [
    {nome: "Lucas Fernandes",     pontuacao: 0},
    {nome: "Pedro Lima",          pontuacao: 0},
    {nome: "Maria Julianelli",    pontuacao: 0},
    {nome: "Kevin Restom",        pontuacao: 0},
    {nome: "Amanda Amorim",       pontuacao: 0}
];

//------------------------------------------------------------------------------------------------------------------------------------//
let resposta;
let enviar = document.querySelector("#enviar");
let formulario = document.querySelector('#formulario');
let tabela = document.querySelector('#lista-colaboradores');
let listaPreencher = document.querySelectorAll('#colaborador-membro');
let tabelaIndividual = document.getElementById('reacoes-usuario');
enviar.addEventListener("click", function (event){

    let contadorErro = 0;

    event.preventDefault();

    resposta = document.querySelector("#email-matricula").value;

    for(let i=0; i<colaboradores.length; ++i){

        if(resposta === colaboradores[i].email || resposta === colaboradores[i].matricula){

            formulario.classList.add('esconder');
            sair.classList.remove('esconder');
            tabela.classList.remove('esconder');
            listaPreencher[i].classList.add('esconder');             

            preencheReacoes(i);

            contadorErro++;
        }
        else{
            listaPreencher[i].innerHTML = `${colaboradores[i].nome} ${colaboradores[i].sobrenome}`;
        }
    }
    if(contadorErro === 0){

        alert("E-mail ou Matrícula fornecidos não estão cadastrados no sistema!");
    }
})

//------------------------------------------------------------------------------------------------------------------------------------//
let reacoes = document.querySelector('#reacoes');
let sair = document.querySelector('#botaoSair');

sair.addEventListener("click", function (event){

    event.preventDefault();

    rankingVisibilidade.classList.toggle('esconder');
    for(let i=0; i<colaboradores.length; ++i){
        
        if(listaPreencher[i].className === 'marcado utilizavel'){

            alert("Por favor desmarque a caixa do colaborador antes de sair.")
        }
        else if(listaPreencher[i].className === 'utilizavel'){

            formulario.classList.remove('esconder');
            sair.classList.add('esconder');
            tabela.classList.add('esconder');
            reacoes.classList.add('esconder');

            for(let i=0; i<colaboradores.length; ++i){

                if(resposta === colaboradores[i].email || resposta === colaboradores[i].matricula){

                    listaPreencher[i].classList.remove('esconder');
                }
            }
        }
    }
})
//------------------------------------------------------------------------------------------------------------------------------------//
//Ao selecionar um colaborador para enviar uma reação:
function marcaDesmarcaElementos(elemento,index){

    elemento[index].classList.toggle('marcado');
    elemento[index].classList.toggle('utilizavel');
    reacoes.classList.toggle('esconder');
    reacoes.classList.toggle('reacoes');
    tabelaIndividual.classList.toggle('tabela-reacoes');
    tabelaIndividual.classList.toggle('esconder');

    for(let i=0; i<elemento.length; ++i){

        elemento[i].classList.toggle('utilizavel');
    }
}

//Impedir que o usuário selecione mais de um colaborador simultaneamente
for(let i=0; i<listaPreencher.length; ++i){
    
    listaPreencher[i].addEventListener("click", () => {
        
        if(listaPreencher[i].className === 'utilizavel'){

            marcaDesmarcaElementos(listaPreencher,i);      
        }
        else if(listaPreencher[i].className === 'marcado utilizavel'){

            marcaDesmarcaElementos(listaPreencher,i);
        }
    })
}
//------------------------------------------------------------------------------------------------------------------------------------//
//Função responsável por iniciar os contadores de reações dos feedbacks
let botoesReacao = document.querySelectorAll('#reacao-nome');
let nomesReacoes = ["like", "orgulho", "excelenteTrabalho", "colaboracao"];
let salvaReacao = document.querySelectorAll("#reacao-qtd");

function contaReacoes(index){
    for(let i=0; i<botoesReacao.length; ++i){

        botoesReacao[i].addEventListener("click", () => {

            if(listaPreencher[index].className === 'marcado utilizavel'){

            colaboradores[index][nomesReacoes[i]] += 1;            
            console.log(`${colaboradores[index].nome}:${nomesReacoes[i]}:${colaboradores[index][nomesReacoes[i]]}`);

            pontuacaoIndividualTotal(index);
            }           
        })
    }
}

for(let i=0; i<listaPreencher.length; ++i){
    contaReacoes(i);
}

//------------------------------------------------------------------------------------------------------------------------------------//
//EXIBE AS REAÇÕES QUE CADA USUÁRIO RECEBEU
let nomesReacoes2 = ["LIKE", "ORGULHO", "EXCELENTE TRABALHO", "COLABORAÇÃO"];

function preencheReacoes(index){

    for(let i=0; i<botoesReacao.length; ++i){

        salvaReacao[i].innerHTML = `${nomesReacoes2[i]}: ${colaboradores[index][nomesReacoes[i]]}`
    }
}
//------------------------------------------------------------------------------------------------------------------------------------//
//CONTROLANDO VISIBILIDADE DO RANKING
let exibeRanking = document.getElementById('exibe-ranking');
let rankingVisibilidade = document.getElementById('ranking');

exibeRanking.addEventListener("click", () => {

    rankingVisibilidade.classList.toggle('esconder');
})

//------------------------------------------ranking
//Calcula a quantidade total de reações de um usuário para o ranking
function pontuacaoIndividualTotal(index){

    colaboradores[index].pontuacao = 0 + colaboradores[index].like + colaboradores[index].orgulho + colaboradores[index].excelenteTrabalho + colaboradores[index].colaboracao;

    for(let i = 0; i<colaboradores.length; ++i){

        if(colaboradoresR[i].nome === `${colaboradores[index].nome} ${colaboradores[index].sobrenome}`){
    
            colaboradoresR[i].pontuacao = colaboradores[index].pontuacao;
        }
    }
    organizaMenorMaior(colaboradoresR)

    for(let maior = 0; maior < colaboradores.length; ++maior){

        posicoes[maior].innerHTML = `${colaboradoresR[maior].nome}: ${colaboradoresR[maior].pontuacao} reações ao todo.`
    }

    //console.log(`${colaboradores[index].nome}:${colaboradores[index].pontuacao}`);
}
//------------------------------------------ranking

//Organiza a posição dos colaboradores na tabela de rank do HTML por meio do método InsertionSort
let posicoes = document.querySelectorAll('.rank-colaborador');
function organizaMenorMaior(lista){

    for(let atual = 0; atual < lista.length; ++atual){

        let analise = atual;

        while(analise > 0 && lista[analise].pontuacao > lista[analise - 1].pontuacao){

            let itemAnalise = lista[analise];
            let itemAnterior = lista[analise - 1];

            lista[analise] = itemAnterior
            lista[analise - 1] = itemAnalise;
            
            --analise;
        }
    }
}


