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

//------------------------------------------------------------------------------------------------------------------------------------//
let resposta;
let enviar = document.querySelector("#enviar");
let formulario = document.querySelector('#formulario');
let tabela = document.querySelector('#lista-colaboradores');
let listaPreencher = document.querySelectorAll('#colaborador-membro');

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
            }            
        })
    }
}

for(let i=0; i<listaPreencher.length; ++i){
    contaReacoes(i);
}

//------------------------------------------------------------------------------------------------------------------------------------//

function preencheReacoes(index){

    for(let i=0; i<botoesReacao.length; ++i){

        salvaReacao[i].innerHTML = `${nomesReacoes[i].toUpperCase()}: ${colaboradores[index][nomesReacoes[i]]}`
    }
}