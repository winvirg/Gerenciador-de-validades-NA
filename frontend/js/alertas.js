let diasAlerta = 30;

function mostrarToast(
    mensagem,
    tipo = 'success'
) {

    const toast =
        document.getElementById('toast');

    const toastMessage =
        document.getElementById(
            'toastMessage'
        );

    toast.classList.remove(
        'show',
        'error'
    );

    void toast.offsetWidth;

    toastMessage.textContent =
        mensagem;

    if (tipo === 'error') {

        toast.classList.add(
            'error'
        );
    }

    toast.classList.add('show');

    setTimeout(() => {

        toast.classList.remove(
            'show'
        );

    }, 3000);
}

function tocarSomAlerta() {

    const audio = new Audio(
        'https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
    );

    audio.volume = 1;

    audio.play();
}

function calcularStatus(validade) {

    const hoje =
        new Date();

    hoje.setHours(
        0,0,0,0
    );

    const dataValidade =
        new Date(validade);

    dataValidade.setHours(
        0,0,0,0
    );

    const diff =
        dataValidade - hoje;

    const dias =
        Math.ceil(
            diff / 86400000
        );

    if(dias < 0){

        return {

            classe: 'danger',

            texto: 'Vencido',

            icon:
                'fa-circle-xmark',

            dias
        };
    }

    if(dias <= 7){

        return {

            classe: 'danger',

            texto: 'Crítico',

            icon:
                'fa-circle-xmark',

            dias
        };
    }

    if(dias <= diasAlerta){

        return {

            classe: 'alert',

            texto:
                'Próx. Vencimento',

            icon:
                'fa-triangle-exclamation',

            dias
        };
    }

    return {

        classe: 'ok',

        texto: 'No Prazo',

        icon:
            'fa-circle-check',

        dias
    };
}

function verificarAlertas() {

    const select =
        document.getElementById(
            'alertDays'
        );

    if(select){

        diasAlerta =
            parseInt(select.value);

        select.addEventListener(
            'change',
            () => {

                diasAlerta =
                    parseInt(
                        select.value
                    );

                renderizar();
            }
        );
    }

    const produtosCriticos =
        produtos.filter(p => {

            const status =
                calcularStatus(
                    p.validade
                );

            return (
                status.classe === 'alert'
                ||
                status.classe === 'danger'
            );
        });

    if (produtosCriticos.length > 0) {

        const criticos =
            produtosCriticos.filter(p => {

                const status =
                    calcularStatus(
                        p.validade
                    );

                return status.dias <= 7;
            });

        if (criticos.length > 0) {

            mostrarToast(
                `🚨 ${criticos.length} produtos críticos!`,
                'error'
            );

        } else {

            mostrarToast(
                `⚠️ ${produtosCriticos.length} produtos próximos do vencimento!`,
                'error'
            );
        }

        tocarSomAlerta();
    }
}