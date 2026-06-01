const API_URL =
    'http://10.7.80.7:3000/produtos';

async function carregarProdutos() {

    try {

        const resposta =
            await fetch(API_URL);

        produtos =
            await resposta.json();

        renderizar();

    } catch(err) {

        console.error(err);

        mostrarToast(
            'Erro ao carregar produtos',
            'error'
        );
    }
}

async function salvarProduto(produto) {

    try {

        const resposta =
            await fetch(API_URL, {

                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json'
                },

                body: JSON.stringify(
                    produto
                )
            });

        return await resposta.json();

    } catch(err) {

        console.error(err);

        mostrarToast(
            'Erro ao salvar produto',
            'error'
        );
    }
}

async function atualizarProduto(
    id,
    produto
){

    try {

        await fetch(
            `${API_URL}/${id}`,
            {

                method: 'PUT',

                headers: {
                    'Content-Type':
                        'application/json'
                },

                body: JSON.stringify(
                    produto
                )
            }
        );

    } catch(err){

        console.error(err);

        mostrarToast(
            'Erro ao atualizar',
            'error'
        );
    }
}

async function deletarProduto(id){

    try {

        await fetch(
            `${API_URL}/${id}`,
            {
                method:'DELETE'
            }
        );

    } catch(err){

        console.error(err);

        mostrarToast(
            'Erro ao deletar',
            'error'
        );
    }
}

async function deletarTodosProdutos(){

    try {

        await fetch(API_URL, {
            method: 'DELETE'
        });

    } catch(err){

        console.error(err);

        mostrarToast(
            'Erro ao limpar produtos',
            'error'
        );
    }
}