const form = document.getElementById("formPalestrante");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    try {

        const resposta = await fetch("http://localhost:3000/palestrantes", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                email: email
            })

        });

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.mensagem);
            return;

        }

        alert("cadastro concluído com sucesso");

        form.reset();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com a API");

    }

});