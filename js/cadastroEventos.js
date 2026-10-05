const form = document.getElementById("formEvento");
const selectPalestrante = document.getElementById("palestrante");
const botao = form.querySelector("button");

// Verifica se existe um ID na URL
const parametros = new URLSearchParams(window.location.search);
const idEvento = parametros.get("id");


// Carregar os palestrantes
async function carregarPalestrantes() {

    try {

        const resposta = await fetch("http://localhost:3000/palestrantes");

        const palestrantes = await resposta.json();

        palestrantes.forEach(function(palestrante) {

            const option = document.createElement("option");

            option.value = palestrante.id;
            option.textContent = palestrante.nome;

            selectPalestrante.appendChild(option);

        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar os palestrantes");

    }
}


// Carregar os dados do evento para editar
async function carregarEvento() {

    if (!idEvento) {
        return;
    }

    try {

        const resposta = await fetch(
            `http://localhost:3000/eventos/${idEvento}`
        );

        const evento = await resposta.json();

        if (!resposta.ok) {

            alert(evento.mensagem);
            return;

        }

        document.getElementById("nome").value = evento.nome;
        document.getElementById("descricao").value = evento.descricao;
        document.getElementById("local").value = evento.local;

        if (evento.palestrantes.length > 0) {

            selectPalestrante.value =
                evento.palestrantes[0].palestrante.id;

        }

        // Muda o texto da página quando estiver editando
        document.querySelector(".title").textContent = "Editar Evento";

        botao.textContent = "Atualizar";

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar o evento");

    }
}


// Cadastrar ou atualizar evento
form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const local = document.getElementById("local").value;
    const palestrante = document.getElementById("palestrante").value;


    // Se tiver ID, atualiza
    // Se não tiver ID, cadastra
    const url = idEvento
        ? `http://localhost:3000/eventos/${idEvento}`
        : "http://localhost:3000/eventos";

    const metodo = idEvento ? "PUT" : "POST";


    try {

        const resposta = await fetch(url, {

            method: metodo,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                descricao: descricao,
                local: local,
                palestrantes: [Number(palestrante)]
            })

        });


        const dados = await resposta.json();


        if (!resposta.ok) {

            alert(dados.mensagem);
            return;

        }


        if (idEvento) {

            alert("Evento atualizado com sucesso");

        } else {

            alert("cadastro concluído com sucesso");

        }


        // Volta para o gerenciador
        window.location.href = "eventos.html";


    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com a API");

    }

});


// Primeiro carrega os palestrantes
// Depois, se for edição, carrega o evento
async function iniciar() {

    await carregarPalestrantes();

    await carregarEvento();

}

iniciar();