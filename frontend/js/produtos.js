async function deletar(id){

    if(
        !confirm(
            'Deseja excluir?'
        )
    ){
        return;
    }

    await deletarProduto(id);

    await carregarProdutos();

    mostrarToast(
        'Produto removido!'
    );
}

async function limparBanco(){

    if(
        !confirm(
            'Deseja apagar TODOS os produtos?'
        )
    ){
        return;
    }

    await deletarTodosProdutos();

    await carregarProdutos();

    mostrarToast(
        'Banco limpo!'
    );
}

function editar(id) {

    const produto =
        produtos.find(
            p => p.id === id
        );

    if (produto) {
        abrirModal(produto);
    }
}

formProduto.addEventListener(
    'submit',
    async function(e){

        e.preventDefault();

        const dados = {

            nome:
                document
                    .getElementById(
                        'nomeProduto'
                    )
                    .value
                    .trim(),

            local:
                document
                    .getElementById(
                        'localProduto'
                    )
                    .value
                    .trim(),

            qtd:
                parseInt(
                    document
                        .getElementById(
                            'qtdProduto'
                        )
                        .value
                ),

            lote:
                document
                    .getElementById(
                        'loteProduto'
                    )
                    .value
                    .trim(),

            status:
                document
                    .getElementById(
                        'statusProduto'
                    )
                    .value
                    .trim(),

            validade:
                document
                    .getElementById(
                        'dataProduto'
                    )
                    .value
        };

        if(editandoId){

            await window.atualizarProduto(
                editandoId,
                dados
            );

            mostrarToast(
                'Produto atualizado!'
            );

        }else{

            await salvarProduto(
                dados
            );

            mostrarToast(
                'Produto salvo!'
            );
        }

        fecharModal();

        carregarProdutos();
    }
);
window.editar = editar;
window.deletar = deletar;
window.limparBanco = limparBanco;