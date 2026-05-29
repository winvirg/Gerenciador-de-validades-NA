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

        })();
    }
);