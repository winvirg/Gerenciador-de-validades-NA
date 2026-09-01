const destinatariosOverlay =
    document.getElementById(
        'destinatariosOverlay'
    );

async function abrirDestinatarios(){

    await carregarDestinatarios();

    destinatariosOverlay.classList.add(
        'active'
    );
}

function fecharDestinatarios(){

    destinatariosOverlay.classList.remove(
        'active'
    );
}

document
    .getElementById(
        'btnDestinatarios'
    )
    .addEventListener(
        'click',
        abrirDestinatarios
    );

document
    .getElementById(
        'btnFecharDestinatarios'
    )
    .addEventListener(
        'click',
        fecharDestinatarios
    );

document
    .getElementById(
        'btnAdicionarDestinatario'
    )
    .addEventListener(
        'click',
        adicionarDestinatario
    );

destinatariosOverlay.addEventListener(
    'click',
    function(e){

        if(
            e.target ===
            destinatariosOverlay
        ){

            fecharDestinatarios();
        }
    }
);

const DESTINATARIOS_URL =
    `${API_BASE}/destinatarios`;

async function carregarDestinatarios(){

    try {

        const resposta =
            await fetch(

                DESTINATARIOS_URL,

                {
                    headers: {

                        authorization:
                            localStorage.getItem(
                                'admin_token'
                            )
                    }
                }
            );

        const lista =
            await resposta.json();

        renderizarDestinatarios(
            lista
        );

    } catch(err){

        console.error(err);

        mostrarToast(
            'Erro ao carregar destinatários',
            'error'
        );
    }
}

function renderizarDestinatarios(
    lista
){

    const container =
        document.getElementById(
            'listaDestinatarios'
        );

    if(!lista.length){
            container.innerHTML = `
            <p>
                Nenhum destinatário cadastrado
            </p>
        `;

        return;
    }

        container.innerHTML =
            lista.map(d => `

                <div class="destinatario-item">

                    <div class="destinatario-info">

                        <div class="destinatario-top-row">

                            <div class="destinatario-email">

                                ${d.email}

                            </div>

                            <button
                                class="btn-danger-outline"
                                onclick="removerDestinatario(${d.id})"
                            >

                                <i class="fas fa-trash"></i>

                            </button>

                        </div>

                        <div class="destinatario-opcoes">

                            <label>
                                <input
                                    type="checkbox"
                                    ${d.alerta_crc ? 'checked' : ''}
                                    onchange="alterarAlertas(${d.id}, this)"
                                    data-tipo="crc"
                                >
                                CRC
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    ${d.alerta_picking ? 'checked' : ''}
                                    onchange="alterarAlertas(${d.id}, this)"
                                    data-tipo="picking"
                                >
                                Picking
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    ${d.alerta_pulmao ? 'checked' : ''}
                                    onchange="alterarAlertas(${d.id}, this)"
                                    data-tipo="pulmao"
                                >
                                Pulmão
                            </label>

                        </div>

                    </div>

                </div>

            `).join('');

        return;
    }


async function adicionarDestinatario(){

    const input =
        document.getElementById(
            'novoDestinatario'
        );

    const email =
        input.value.trim();

    if(!email){

        mostrarToast(
            'Informe um email',
            'error'
        );

        return;
    }

    try {

        const resposta =
            await fetch(

                DESTINATARIOS_URL,

                {

                    method: 'POST',

                    headers: {

                        'Content-Type':
                            'application/json',

                        authorization:
                            localStorage.getItem(
                                'admin_token'
                            )
                    },

                    body: JSON.stringify({

                        email,

                        alerta_crc:
                            document.getElementById(
                                'alertaCRC'
                            ).checked ? 1 : 0,

                        alerta_picking:
                            document.getElementById(
                                'alertaPicking'
                            ).checked ? 1 : 0,

                        alerta_pulmao:
                            document.getElementById(
                                'alertaPulmao'
                            ).checked ? 1 : 0
                    })
                }
            );

        if(!resposta.ok){

            throw new Error(
                'Erro ao adicionar'
            );
        }

        input.value = '';

        document.getElementById(
            'alertaCRC'
        ).checked = true;

        document.getElementById(
            'alertaPicking'
        ).checked = true;

        document.getElementById(
            'alertaPulmao'
        ).checked = true;

        await carregarDestinatarios();

        mostrarToast(
            'Destinatário adicionado!'
        );

    } catch(err){

        console.error(err);

        mostrarToast(
            'Erro ao adicionar destinatário',
            'error'
        );
    }
}

async function removerDestinatario(id){

    if(
        !confirm(
            'Remover este destinatário?'
        )
    ){
        return;
    }

    try {

        await fetch(

            `${DESTINATARIOS_URL}/${id}`,

            {

                method: 'DELETE',

                headers: {

                    authorization:
                        localStorage.getItem(
                            'admin_token'
                        )
                }
            }
        );

        await carregarDestinatarios();

        mostrarToast(
            'Destinatário removido!'
        );

    } catch(err){

        console.error(err);

        mostrarToast(
            'Erro ao remover destinatário',
            'error'
        );
    }
}

async function alterarAlertas(
    id,
    checkbox
){

    const item =
        checkbox.closest(
            '.destinatario-item'
        );

    const checkboxes =
        item.querySelectorAll(
            'input[type="checkbox"]'
        );

    const dados = {

        alerta_crc:
            checkboxes[0].checked ? 1 : 0,

        alerta_picking:
            checkboxes[1].checked ? 1 : 0,

        alerta_pulmao:
            checkboxes[2].checked ? 1 : 0
    };

    try{

        const resposta =
            await fetch(

                `${DESTINATARIOS_URL}/${id}`,

                {

                    method: 'PUT',

                    headers: {

                        'Content-Type':
                            'application/json',

                        authorization:
                            localStorage.getItem(
                                'admin_token'
                            )
                    },

                    body: JSON.stringify(
                        dados
                    )
                }
            );

        if(!resposta.ok){

            throw new Error();
        }

        mostrarToast(
            'Preferências atualizadas!'
        );

    }catch(err){

        console.error(err);

        mostrarToast(
            'Erro ao atualizar',
            'error'
        );

        carregarDestinatarios();
    }
}

window.alterarAlertas =
    alterarAlertas;