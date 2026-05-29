function formatarData(dataStr) {

    const [ano, mes, dia] =
        dataStr.split('-');

    return `${dia}/${mes}/${ano}`;
}

function limparNumero(valor) {

    if (!valor) return 0;

    let limpo = valor
        .replace(/\./g, '')
        .replace(',', '.');

    return parseFloat(limpo) || 0;
}

function calcularStatus(dataStr) {

    const [ano, mes, dia] =
        dataStr.split('-');

    const dataValidade =
        new Date(ano, mes - 1, dia);

    const hoje = new Date();

    hoje.setHours(0,0,0,0);

    const dias = Math.ceil(
        (dataValidade - hoje) /
        (1000 * 60 * 60 * 24)
    );

    if (dias < 0) {

        return {
            dias,
            classe: 'danger',
            icon: 'fa-circle-xmark',
            texto: 'Vencido'
        };
    }

    if (dias <= 7) {

        return {
            dias,
            classe: 'danger',
            icon: 'fa-triangle-exclamation',
            texto: 'CRÍTICO'
        };
    }

    if (dias <= 30) {

        return {
            dias,
            classe: 'alert',
            icon: 'fa-triangle-exclamation',
            texto: 'Vence em breve'
        };
    }

    return {
        dias,
        classe: 'ok',
        icon: 'fa-circle-check',
        texto: 'No prazo'
    };
}