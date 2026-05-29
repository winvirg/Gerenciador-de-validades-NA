function salvar() {

    salvarStorage();

    renderizar();
}

function adicionarProduto(dados) {

    produtos.push({
        id: Date.now(),
        ...dados
    });

    salvar();

    mostrarToast(
        'Produto adicionado!'
    );
}

function atualizarProduto(id, dados) {

    const index =
        produtos.findIndex(
            p => p.id === id
        );

    if (index !== -1) {

        produtos[index] = {
            ...produtos[index],
            ...dados
        };

        salvar();

        mostrarToast(
            'Produto atualizado!'
        );
    }
}

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

            await atualizarProduto(
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