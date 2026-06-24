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

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:10px;
                    border-bottom:1px solid #ddd;
                "
            >

                <span>
                    ${d.email}
                </span>

                <button
                    class="btn-danger-outline"
                    onclick="removerDestinatario(${d.id})"
                >
                    <i class="fas fa-trash"></i>
                </button>

            </div>

        `).join('');
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

                        email
                    })
                }
            );

        if(!resposta.ok){

            throw new Error(
                'Erro ao adicionar'
            );
        }

        input.value = '';

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
window.removerDestinatario =
    removerDestinatario;