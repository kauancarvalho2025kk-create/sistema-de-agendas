/* =========================================
   BANCO LOCAL
========================================= */

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


/* =========================================
   USUÁRIO
========================================= */

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


/* =========================================
   DATAS
========================================= */

function dataLocalISO(data) {

    const ano =
        data.getFullYear();

    const mes =
        String(
            data.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            data.getDate()
        ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}


function getHoje() {

    return dataLocalISO(
        new Date()
    );

}


function getAmanha() {

    const data =
        new Date();

    data.setDate(
        data.getDate() + 1
    );

    return dataLocalISO(data);

}


function dataPermitida(data) {

    return (
        data === getHoje() ||
        data === getAmanha()
    );

}


function formatarData(data) {

    if (!data) return "";

    return data
        .split("-")
        .reverse()
        .join("/");
}


/* =========================================
   HORÁRIOS
========================================= */

const HORARIOS = [

    "07:30 - 08:30",
    "08:30 - 09:30",

    "09:30 - 09:50",

    "09:50 - 10:50",
    "10:50 - 11:50",

    "11:50 - 12:50",

    "12:50 - 13:50",
    "13:50 - 14:50",

    "14:50 - 15:10",

    "15:10 - 16:10",
    "16:10 - 17:10"

];


const INTERVALOS = [

    "09:30 - 09:50",
    "11:50 - 12:50",
    "14:50 - 15:10"

];


const HORARIOS_RESERVA =
    HORARIOS.filter(
        function(horario) {

            return !INTERVALOS.includes(
                horario
            );

        }
    );


/* =========================================
   LOGIN
========================================= */

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


/* =========================================
   CADASTRO
========================================= */

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

            if (nick.length < 3) {

                mostrarMensagem(
                    "O nick precisa ter pelo menos 3 caracteres.",
                    "erro"
                );

                return;
            }

            if (senha.length < 6) {

                mostrarMensagem(
                    "A senha precisa ter pelo menos 6 caracteres.",
                    "erro"
                );

                return;
            }

            if (senha !== confirmar) {

                mostrarMensagem(
                    "As senhas não são iguais.",
                    "erro"
                );

                return;
            }

            const usuarios =
                getUsuarios();

            if (
                usuarios.some(
                    function(u) {

                        return u.email === email;

                    }
                )
            ) {

                mostrarMensagem(
                    "Este e-mail já está cadastrado.",
                    "erro"
                );

                return;
            }

            if (
                usuarios.some(
                    function(u) {

                        return (
                            u.nick.toLowerCase() ===
                            nick.toLowerCase()
                        );

                    }
                )
            ) {

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
                mostrarLogin,
                1000
            );

        }
    );

}


/* =========================================
   TROCAR TELAS
========================================= */

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

        login.classList.remove(
            "hidden"
        );

        cadastro.classList.add(
            "hidden"
        );

    }
}


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


/* =========================================
   SENHA
========================================= */

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

        button.textContent =
            "🙈";

    } else {

        input.type = "password";

        button.textContent =
            "👁️";

    }

}


/* =========================================
   MENSAGEM
========================================= */

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


/* =========================================
   NOTIFICAÇÕES
========================================= */

function mostrarToast(
    texto,
    tipo = "success"
) {

    let container =
        document.querySelector(
            ".toast-container"
        );

    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.className =
            "toast-container";

        document.body.appendChild(
            container
        );
    }

    const toast =
        document.createElement(
            "div"
        );

    toast.className =
        `toast ${tipo}`;

    toast.textContent =
        texto;

    container.appendChild(
        toast
    );

    setTimeout(
        function() {

            toast.remove();

        },
        3500
    );
}


/* =========================================
   LOGOUT
========================================= */

function sair() {

    localStorage.removeItem(
        "usuarioLogado"
    );

    window.location.href =
        "index.html";

}


/* =========================================
   ADMIN
========================================= */

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


/* =========================================
   TEMA
========================================= */

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


document.addEventListener(
    "DOMContentLoaded",
    function() {

        aplicarTema();

    }
);


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


/* =========================================
   DISPONIBILIDADE
========================================= */

function contarReservas(
    data,
    horario,
    recurso
) {

    return getReservas().filter(
        function(r) {

            return (
                r.data === data &&
                r.horario === horario &&
                r.recurso === recurso
            );

        }
    ).length;

}


function disponibilidadeDataShow(
    data,
    horario
) {

    return contarReservas(
        data,
        horario,
        "Data Show"
    );

}


function disponibilidadeSala(
    data,
    horario
) {

    return contarReservas(
        data,
        horario,
        "Sala de Informática"
    );

}


/* =========================================
   STATUS DO DATA SHOW
========================================= */

function statusDataShow(
    quantidade
) {

    if (quantidade >= 5) {

        return {
            texto: "5/5 - CHEIO",
            classe: "status-cheio"
        };

    }

    if (quantidade > 0) {

        return {
            texto:
                `${quantidade}/5 - PARCIAL`,
            classe: "status-parcial"
        };

    }

    return {
        texto: "0/5 - LIVRE",
        classe: "status-livre"
    };

}


/* =========================================
   CANCELAR RESERVA
========================================= */

function cancelarMinhaReserva(
    id
) {

    const usuario =
        getUsuarioLogado();

    if (!usuario) return;

    const reservas =
        getReservas();

    const reserva =
        reservas.find(
            function(r) {

                return r.id === id;

            }
        );

    if (!reserva) {

        mostrarToast(
            "Reserva não encontrada.",
            "error"
        );

        return;
    }

    if (
        reserva.email !==
        usuario.email &&
        usuario.role !== "admin"
    ) {

        mostrarToast(
            "Você não pode cancelar esta reserva.",
            "error"
        );

        return;
    }

    const confirmar =
        confirm(
            `Cancelar a reserva de ${reserva.recurso} em ${formatarData(reserva.data)} às ${reserva.horario}?`
        );

    if (!confirmar) return;

    salvarReservas(
        reservas.filter(
            function(r) {

                return r.id !== id;

            }
        )
    );

    mostrarToast(
        "Reserva cancelada com sucesso.",
        "success"
    );

    if (
        typeof carregarPagina ===
        "function"
    ) {

        carregarPagina();

    }

}


/* =========================================
   EXPORTAR CSV
========================================= */

function exportarCSV(
    reservas = getReservas()
) {

    if (
        reservas.length === 0
    ) {

        mostrarToast(
            "Não existem reservas para exportar.",
            "warning"
        );

        return;
    }

    let csv =
        "Nick;E-mail;Recurso;Data;Horário\n";

    reservas.forEach(
        function(r) {

            csv +=
                `"${r.nick}";"${r.email}";"${r.recurso}";"${formatarData(r.data)}";"${r.horario}"\n`;

        }
    );

    const blob =
        new Blob(
            ["\ufeff" + csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const link =
        document.createElement(
            "a"
        );

    link.href =
        url;

    link.download =
        "reservas_escolares.csv";

    link.click();

    URL.revokeObjectURL(
        url
    );

}


/* =========================================
   IMPRESSÃO
========================================= */

function imprimirPagina() {

    window.print();

}