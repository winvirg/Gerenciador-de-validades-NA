const API_URL =
    `${API_BASE}/produtos`;

function obterHeaders(){

    const token =
        localStorage.getItem(
            'admin_token'
        );

    return {

        'Content-Type':
            'application/json',

        authorization:
            token || ''
    };
}

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

                headers:
                    obterHeaders(),

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

                headers:
                    obterHeaders(),

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
                method:'DELETE',

                headers: {

                    authorization:
                        localStorage.getItem(
                            'admin_token'
                        ) || ''
                }
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