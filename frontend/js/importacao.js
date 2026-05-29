async function importarArquivo(event) {

    if(!adminLogado){

        mostrarToast(
            'Acesso permitido apenas para administradores!',
            'error'
        );

        return;
    }

    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = async function(e) {

        const text =
            e.target.result;

        await processarCSV(text);
    };

    reader.readAsText(
        file,
        'ISO-8859-1'
    );

    event.target.value = '';
}

async function processarCSV(text) {

    const registros =
        text.split(/\r?\n/);

    let importados = 0;

    for (const [index, registroOriginal] of registros.entries()) {

        let registro =
            registroOriginal.trim();

        if (!registro) continue;

        const colunas =
            registro.split(';');

        if (colunas.length < 17)
            continue;

        const codigo =
            colunas[0]?.trim();

        const nome =
            colunas[1]?.trim();

        const statusSistema =
            colunas[4]?.trim();

        const local =
            colunas[11]?.trim();

        const qtd =
            limparNumero(
                colunas[13] || '0'
            );

        const recebido =
            colunas[16]?.trim();

        const validade =
            colunas[15]?.trim();

        if (
            !nome ||
            !local ||
            !validade
        ) {
            continue;
        }

        const localMaiusculo =
            local.toUpperCase();

        if (
            localMaiusculo.includes('PICKING')
            ||
            localMaiusculo.includes('CRC')
        ) {
            continue;
        }

        const enderecoValido =
            /^(D|V)\d+/i.test(
                localMaiusculo
            );

        if (!enderecoValido)
            continue;

        let dataFormatada = '';

        if (validade.includes('/')) {

            const partes =
                validade.split('/');

            if (partes.length === 3) {

                dataFormatada =
                    `${partes[2]}-${partes[1].padStart(2,'0')}-${partes[0].padStart(2,'0')}`;
            }
        }

        if (!dataFormatada)
            continue;

        const existe =
            produtos.some(p =>

                p.nome === nome &&
                p.local === local &&
                p.validade === dataFormatada &&
                p.recebido === recebido
            );

        if (existe) continue;

        const novoProduto = {

            id: Date.now() + index,

            nome,

            local,

            qtd,

            lote: codigo,

            status: statusSistema,

            validade: dataFormatada,
            
            recebido
        };

        const resultado =
            await salvarProduto(
                novoProduto
            );

        if(resultado?.id){

            novoProduto.id =
                resultado.id;

            produtos.push(
                novoProduto
            );

            importados++;
        }
    }

    renderizar();

    mostrarToast(
        `${importados} produtos importados!`
    );
}