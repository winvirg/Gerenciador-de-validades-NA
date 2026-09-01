function selecionarTipo(tipo){

    tipoEnderecoSelecionado = tipo;

    document
        .querySelectorAll('.tipo-endereco')
        .forEach(btn =>

            btn.classList.remove(
                'active'
            )
        );

    document
        .getElementById(

            tipo === 'PULMAO'
            ? 'btnPulmao'

            : tipo === 'PICKING'
            ? 'btnPicking'

            : tipo === 'ACOUGUE'
            ? 'btnAcougue'

            : 'btnCRC'

        )
        .classList.add(
            'active'
        );

    renderizar();
}

document.addEventListener(

    'DOMContentLoaded',

    () => {

        document
            .getElementById('btnLogin')
            .addEventListener(
                'click',
                abrirLogin
            );

        document
            .getElementById('btnLogout')
            .addEventListener(
                'click',
                logout
            );

        document
            .getElementById('btnCRC')
            .addEventListener(
                'click',
                () => selecionarTipo('CRC')
            );

        document
            .getElementById('btnPulmao')
            .addEventListener(
                'click',
                () => selecionarTipo('PULMAO')
            );

        document
            .getElementById('btnPicking')
            .addEventListener(
                'click',
                () => selecionarTipo('PICKING')
            );

        document
            .getElementById('btnNovo')
            .addEventListener(
                'click',
                () => abrirModal()
            );

        document
            .getElementById('btnImportar')
            .addEventListener(
                'click',
                () => {

                    document
                        .getElementById(
                            'fileInput'
                        )
                        .click();
                }
            );

        document
            .getElementById('fileInput')
            .addEventListener(
                'change',
                importarArquivo
            );

        document
            .getElementById('btnImprimir')
            .addEventListener(
                'click',
                imprimirRelatorio
            );

        document
            .getElementById('searchInput')
            .addEventListener(
                'input',
                renderizar
            );

        document
            .getElementById('filterStatus')
            .addEventListener(
                'change',
                renderizar
            );

        document
            .getElementById('alertDays')
            .value = diasAlerta;

        (async () => {

            await carregarProdutos();

            verificarAlertas();

            verificarLoginSalvo();

            selecionarTipo(
                tipoEnderecoSelecionado
            );

        })();
    }
);