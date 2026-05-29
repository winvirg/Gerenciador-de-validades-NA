const modalOverlay =
    document.getElementById(
        'modalOverlay'
    );

const formProduto =
    document.getElementById(
        'formProduto'
    );

const modalTitle =
    document.getElementById(
        'modalTitle'
    );

let editandoId = null;

function abrirModal(produto = null) {

    if(!adminLogado){

        mostrarToast(
            'Acesso permitido apenas para administradores!',
            'error'
        );

        return;
    }

    formProduto.reset();

    editandoId = null;

    if (produto) {

        editandoId = produto.id;

        modalTitle.innerHTML =
            '<i class="fas fa-edit"></i> Editar Produto';

        document.getElementById(
            'nomeProduto'
        ).value = produto.nome;

        document.getElementById(
            'localProduto'
        ).value = produto.local;

        document.getElementById(
            'qtdProduto'
        ).value = produto.qtd;

        document.getElementById(
            'loteProduto'
        ).value = produto.lote || '';

        document.getElementById(
            'statusProduto'
        ).value = produto.status || '';

        document.getElementById(
            'dataProduto'
        ).value = produto.validade;

    } else {

        modalTitle.innerHTML =
            '<i class="fas fa-box"></i> Novo Produto';
    }

    modalOverlay.classList.add('active');
}

function fecharModal() {

    modalOverlay.classList.remove(
        'active'
    );

    editandoId = null;
}

document
    .getElementById('btnFechar')
    .addEventListener(
        'click',
        fecharModal
    );

document
    .getElementById('btnCancelar')
    .addEventListener(
        'click',
        fecharModal
    );

modalOverlay.addEventListener(
    'click',
    (e) => {

        if (e.target === modalOverlay) {
            fecharModal();
        }
    }
);

document.addEventListener(
    'keydown',
    (e) => {

        if (e.key === 'Escape') {
            fecharModal();
        }
    }
);