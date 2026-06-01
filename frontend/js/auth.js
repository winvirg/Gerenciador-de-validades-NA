let adminLogado = false;

const loginOverlay =
    document.getElementById(
        'loginOverlay'
    );

function abrirLogin(){

    loginOverlay.classList.add(
        'active'
    );
}

function fecharLogin(){

    loginOverlay.classList.remove(
        'active'
    );
}

function atualizarPermissoes(){

    const botoesRestritos = [

        'btnNovo',
        'btnImportar'
    ];

    botoesRestritos.forEach(id => {

        const el =
            document.getElementById(id);

        if(!el) return;

        el.style.display =
            adminLogado
                ? 'inline-flex'
                : 'none';
    });

    const btnLogin =
        document.getElementById(
            'btnLogin'
        );

    const btnLogout =
        document.getElementById(
            'btnLogout'
        );

    if(adminLogado){

        btnLogin.style.display = 'none';

        btnLogout.style.display =
            'inline-flex';

    }else{

        btnLogin.style.display =
            'inline-flex';

        btnLogout.style.display =
            'none';
    }

    renderizar();
}

function logout(){

    adminLogado = false;

    localStorage.removeItem(
        'admin_token'
    );

    atualizarPermissoes();

    mostrarToast(
        'Logout realizado!'
    );
}

const btnFecharLogin =
    document.getElementById(
        'btnFecharLogin'
    );

btnFecharLogin.addEventListener(
    'click',
    fecharLogin
);

loginOverlay.addEventListener(
    'click',
    function(e){

        if(e.target === loginOverlay){

            fecharLogin();
        }
    }
);

function verificarLoginSalvo(){

    const token =
        localStorage.getItem(
            'admin_token'
        );

    adminLogado =
        !!token;

    atualizarPermissoes();
}

const formLogin =
    document.getElementById(
        'formLogin'
    );

formLogin.addEventListener(
    'submit',
    async function(e){

        e.preventDefault();

        const user =
            document
                .getElementById(
                    'loginUser'
                )
                .value;

        const pass =
            document
                .getElementById(
                    'loginPass'
                )
                .value;

        try {

            const resposta =
                await fetch(
                    `${API_BASE}/auth/login`,
                    {

                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            user,
                            pass
                        })
                    }
                );

            const resultado =
                await resposta.json();

            if(resultado.sucesso){

                adminLogado = true;

                localStorage.setItem(
                    'admin_token',
                    resultado.token
                );

                fecharLogin();

                atualizarPermissoes();

                mostrarToast(
                    'Login realizado!'
                );

            }else{

                mostrarToast(
                    'Usuário ou senha inválidos!',
                    'error'
                );
            }

        }catch(err){

            console.error(err);

            mostrarToast(
                'Erro ao conectar ao servidor',
                'error'
            );
        }
    }
);