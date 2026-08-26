/* =====================================
   BANCO DE DADOS LOCAL
===================================== */

function getUsuarios() {

    return JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

}


function salvarUsuarios(usuarios) {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}


function getReservas() {

    return JSON.parse(
        localStorage.getItem("reservas")
    ) || [];

}


function salvarReservas(reservas) {

    localStorage.setItem(
        "reservas",
        JSON.stringify(reservas)
    );

}


/* =====================================
   USUÁRIO LOGADO
===================================== */

function getUsuarioLogado() {

    return JSON.parse(
        localStorage.getItem("usuarioLogado")
    );

}


function protegerPagina() {

    const usuario =
        getUsuarioLogado();

    if (!usuario) {

        window.location.href =
            "index.html";

        return null;
    }

    return usuario;
}


/* =====================================
   DATAS
===================================== */

function formatarDataISO(data) {

    return data
        .toISOString()
        .split("T")[0];

}


function getHoje() {

    return formatarDataISO(
        new Date()
    );

}


function getAmanha() {

    const data =
        new Date();

    data.setDate(
        data.getDate() + 1
    );

    return formatarDataISO(data);

}


function dataPermitida(data) {

    return (
        data === getHoje() ||
        data === getAmanha()
    );

}


/* =====================================
   LOGIN
===================================== */

const formLogin =
    document.getElementById(
        "formLogin"
    );


if (formLogin) {

    formLogin.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const senha =
                document
                    .getElementById(
                        "loginSenha"
                    )
                    .value;


            const usuarios =
                getUsuarios();


            const usuario =
                usuarios.find(
                    function(u) {

                        return (
                            u.email === email &&
                            u.senha === senha
                        );

                    }
                );


            if (!usuario) {

                mostrarMensagem(
                    "E-mail ou senha incorretos.",
                    "erro"
                );

                return;
            }


            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(usuario)
            );


            window.location.href =
                "home.html";

        }
    );

}


/* =====================================
   CADASTRO
===================================== */

const formCadastro =
    document.getElementById(
        "formCadastro"
    );


if (formCadastro) {

    formCadastro.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nick =
                document
                    .getElementById(
                        "cadastroNick"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "cadastroEmail"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const senha =
                document
                    .getElementById(
                        "cadastroSenha"
                    )
                    .value;


            const confirmar =
                document
                    .getElementById(
                        "confirmarSenha"
                    )
                    .value;


            if (
                nick.length < 3
            ) {

                mostrarMensagem(
                    "O nick precisa ter pelo menos 3 caracteres.",
                    "erro"
                );

                return;
            }


            if (
                senha.length < 6
            ) {

                mostrarMensagem(
                    "A senha precisa ter pelo menos 6 caracteres.",
                    "erro"
                );

                return;
            }


            if (
                senha !== confirmar
            ) {

                mostrarMensagem(
                    "As senhas não são iguais.",
                    "erro"
                );

                return;
            }


            const usuarios =
                getUsuarios();


            const emailExiste =
                usuarios.some(
                    function(u) {

                        return (
                            u.email === email
                        );

                    }
                );


            if (emailExiste) {

                mostrarMensagem(
                    "Este e-mail já está cadastrado.",
                    "erro"
                );

                return;
            }


            const nickExiste =
                usuarios.some(
                    function(u) {

                        return (
                            u.nick.toLowerCase() ===
                            nick.toLowerCase()
                        );

                    }
                );


            if (nickExiste) {

                mostrarMensagem(
                    "Este nick já está sendo usado.",
                    "erro"
                );

                return;
            }


            const novoUsuario = {

                id: Date.now(),

                nick: nick,

                email: email,

                senha: senha,

                role: "professor"

            };


            usuarios.push(
                novoUsuario
            );


            salvarUsuarios(
                usuarios
            );


            mostrarMensagem(
                "Conta criada com sucesso!",
                "sucesso"
            );


            formCadastro.reset();


            setTimeout(
                function() {

                    mostrarLogin();

                },
                1200
            );

        }
    );

}


/* =====================================
   MOSTRAR LOGIN
===================================== */

function mostrarLogin() {

    const login =
        document.getElementById(
            "loginArea"
        );

    const cadastro =
        document.getElementById(
            "cadastroArea"
        );


    if (login && cadastro) {

        cadastro.classList.add(
            "hidden"
        );

        login.classList.remove(
            "hidden"
        );

    }

}


/* =====================================
   MOSTRAR CADASTRO
===================================== */

function mostrarCadastro() {

    const login =
        document.getElementById(
            "loginArea"
        );

    const cadastro =
        document.getElementById(
            "cadastroArea"
        );


    if (login && cadastro) {

        login.classList.add(
            "hidden"
        );

        cadastro.classList.remove(
            "hidden"
        );

    }

}


/* =====================================
   MOSTRAR SENHA
===================================== */

function togglePassword(
    id,
    button
) {

    const input =
        document.getElementById(id);


    if (!input) return;


    if (
        input.type === "password"
    ) {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁️";

    }

}


/* =====================================
   MENSAGEM
===================================== */

function mostrarMensagem(
    texto,
    tipo
) {

    const elemento =
        document.getElementById(
            "mensagem"
        );


    if (!elemento) return;


    elemento.textContent =
        texto;

    elemento.className =
        tipo;

}


/* =====================================
   SAIR
===================================== */

function sair() {

    localStorage.removeItem(
        "usuarioLogado"
    );

    window.location.href =
        "index.html";

}


/* =====================================
   ADMIN
===================================== */

function verificarAdmin() {

    const usuario =
        getUsuarioLogado();


    if (
        !usuario ||
        usuario.role !== "admin"
    ) {

        window.location.href =
            "home.html";

        return false;
    }


    return true;

}


/* =====================================
   ADMIN PADRÃO
===================================== */

function criarAdminPadrao() {

    const usuarios =
        getUsuarios();


    const existe =
        usuarios.some(
            function(u) {

                return (
                    u.email ===
                    "admin@escola.com"
                );

            }
        );


    if (!existe) {

        usuarios.push({

            id: 1,

            nick: "Administrador",

            email: "admin@escola.com",

            senha: "admin123",

            role: "admin"

        });


        salvarUsuarios(
            usuarios
        );

    }

}


criarAdminPadrao();


/* =====================================
   TEMA
===================================== */

function abrirTemas() {

    const menu =
        document.getElementById(
            "themeMenu"
        );


    if (!menu) return;


    menu.classList.toggle(
        "hidden"
    );

}


function escolherTema(tema) {

    if (
        tema !== "light" &&
        tema !== "dark"
    ) {

        return;
    }


    localStorage.setItem(
        "tema",
        tema
    );


    aplicarTema();


    fecharMenuTema();

}


function aplicarTema() {

    const tema =
        localStorage.getItem(
            "tema"
        ) || "dark";


    if (
        tema === "light"
    ) {

        document.body.classList.add(
            "light"
        );

    } else {

        document.body.classList.remove(
            "light"
        );

    }

}


function fecharMenuTema() {

    const menu =
        document.getElementById(
            "themeMenu"
        );


    if (menu) {

        menu.classList.add(
            "hidden"
        );

    }

}


/* =====================================
   CARREGAR TEMA
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        aplicarTema();

    }
);


/* =====================================
   CLICAR FORA DO MENU
===================================== */

document.addEventListener(
    "click",
    function(event) {

        const seletor =
            document.querySelector(
                ".theme-selector"
            );

        const menu =
            document.getElementById(
                "themeMenu"
            );


        if (
            seletor &&
            menu &&
            !seletor.contains(
                event.target
            )
        ) {

            menu.classList.add(
                "hidden"
            );

        }

    }
);