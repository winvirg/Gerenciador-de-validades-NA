function imprimirRelatorio() {

    const lista =
        obterProdutosFiltrados();

    if (lista.length === 0) {

        mostrarToast(
            'Nada para imprimir!',
            'error'
        );

        return;
    }

    const dataAtual =
        new Date().toLocaleString(
            'pt-BR'
        );

    let linhas = '';

    lista.forEach((produto, index) => {

        const status =
            calcularStatus(
                produto.validade
            );

        linhas += `

            <tr>

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${produto.nome}
                </td>

                <td>
                    ${produto.local}
                </td>

                <td>
                    ${produto.qtd}
                </td>

                <td>
                    ${produto.lote || '-'}
                </td>

                <td>
                    ${formatarData(
                        produto.validade
                    )}
                </td>
                <td
                    class="
                        ${
                            status.dias <= 7
                            ? 'danger'
                            : status.classe
                        }
                    "
                >

                    ${
                        status.dias < 0
                        ? `${Math.abs(status.dias)} dias vencido`
                        : `${status.dias} dias`
                    }

                </td>

            </tr>
        `;
    });

    const janela =
        window.open(
            '',
            '_blank'
        );

    janela.document.write(`

        <html>

        <head>

            <title>
                Relatório de Validades
            </title>

            <style>

                body{

                     margin: 0;

                    font-family: Arial, sans-serif;

                    background: #0d2c8b;

                    padding: 20px;

                    color: #333;

                .relatorio{

                    width: 100%;

                    background: white;

                    overflow: hidden;

                    border-radius: 6px;

                    border: 1px solid #dcdcdc;
                }

                .topo{

                    background: #0d2c8b;

                    color: white;

                    padding: 35px 30px;

                    border-bottom: 5px solid #f0c400;

                    display: flex;

                    justify-content: space-between;

                    align-items: center;

                    margin-bottom: 0;
                }

                .topo h1{

                    font-size: 34px;

                    margin-bottom: 6px;

                    letter-spacing: 1px;

                    color: white;
                }

                .topo .info{

                    font-size: 18px;

                    color: rgba(255,255,255,0.85);
                }

                .logo{

                    font-size: 28px;

                    font-weight: bold;

                    text-align: right;

                    line-height: 1.1;

                    color: white;
                }

                table{

                    width: 100%;

                    border-collapse: collapse;

                    margin-top: 0;

                }

                thead{

                     background: #0d2c8b;

                     color: white;
                }

                th{

                    padding: 14px 10px;

                    border: 1px solid #1e40af;

                    font-size: 14px;

                    text-align: left;

                    color: white;

                    background: #0d2c8b;
                }

                td{

                    padding: 12px 10px;

                    border: 1px solid #e5e5e5;

                    font-size: 13px;
                }

                tbody tr:nth-child(even){

                    background: #fafafa;
                }

                .ok{

                    color: #16a34a;

                    font-weight: bold;
                }

                .alert{

                    color: #d97706;

                    font-weight: bold;
                }

                .danger{

                    color: #dc2626;

                    font-weight: bold;
                }

                .rodape{

                    text-align: right;

                    padding: 12px;

                    font-size: 12px;

                    color: #777;
                }

                @media print {

                    body{

                        background: white;

                        padding: 0;
                    }

                    .relatorio{

                        border: none;
                    }
                }

            </style>

        </head>

        <body>

            <div class="relatorio">

                <div class="topo">

                    <div>

                        <h1>
                            CONTROLE DE VALIDADES
                        </h1>

                        <div class="info">

                            Gerado em:
                            ${dataAtual}

                            ·

                            Total de itens:
                            ${lista.length}

                        </div>

                    </div>

                    <div class="logo">

                        NOSSO<br>
                        ATACAREJO

                    </div>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Produto</th>

                            <th>Local</th>

                            <th>Qtd</th>

                            <th>Código</th>

                            <th>Validade</th>

                            <th>Dias</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${linhas}

                    </tbody>

                </table>

                <div class="rodape">

                    Documento interno • Sistema Gerenciador de Validades

                </div>

            </div>

        </body>

        </html>
    `);

    janela.document.close();

    janela.focus();

    janela.print();

    janela.close();
}