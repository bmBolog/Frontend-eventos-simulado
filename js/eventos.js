const listaEventos = document.querySelector(".eventos");


// Buscar os eventos cadastrados
async function carregarEventos() {

    try {

        const resposta = await fetch("http://localhost:3000/eventos");

        const eventos = await resposta.json();

        listaEventos.innerHTML = "";

        eventos.forEach(function(evento) {

            const card = document.createElement("div");

            card.classList.add("card");

            let palestrante = "Não informado";

            if (evento.palestrantes.length > 0) {
                palestrante = evento.palestrantes[0].palestrante.nome;
            }

            card.innerHTML = `
                <p><strong>Nome:</strong> ${evento.nome}</p>

                <p><strong>Descrição:</strong> ${evento.descricao}</p>

                <p><strong>Local:</strong> ${evento.local}</p>

                <p><strong>Palestrante:</strong> ${palestrante}</p>

                <div class="botoes">
                    <button onclick="editarEvento(${evento.id})">Editar</button>
                    <button onclick="excluirEvento(${evento.id})">Excluir</button>
                </div>
            `;

            listaEventos.appendChild(card);

        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar os eventos");

    }
}


// Ir para a edição
function editarEvento(id) {

    window.location.href = `cadastroEventos.html?id=${id}`;

}


// Excluir evento
async function excluirEvento(id) {

    const confirmar = confirm("Tem certeza que deseja excluir este evento?");

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(`http://localhost:3000/eventos/${id}`, {
            method: "DELETE"
        });

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.mensagem);
            return;

        }

        alert(dados.mensagem);

        carregarEventos();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir o evento");

    }

}


// Carregar eventos quando abrir a página
carregarEventos();