let adminLogado = false;

const ADMIN_USER = 'admin';
const ADMIN_PASS = '123456';

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
        'admin_logado'
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

    const salvo =
        localStorage.getItem(
            'admin_logado'
        );

    adminLogado =
        salvo === 'true';

    atualizarPermissoes();
}

const formLogin =
    document.getElementById(
        'formLogin'
    );

formLogin.addEventListener(
    'submit',
    function(e){
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

        if(
            user === ADMIN_USER &&
            pass === ADMIN_PASS
        ){
            adminLogado = true;

            localStorage.setItem(
                'admin_logado',
                'true'
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
    }
);