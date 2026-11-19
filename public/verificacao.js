function fazerLogin() {
    let campoUsuario = document.getElementById('username') || document.getElementById('administrador');
    let campoSenha = document.getElementById('senha');

    if (!campoUsuario || !campoSenha) {
        alert("Erro: campos de login não encontrados no HTML.");
        return;
    }

    let loginDigitado = campoUsuario.value.trim();
    let senhaDigitada = campoSenha.value.trim();

    fetch('/pessoas')
        .then(resposta => resposta.json())
        .then(dados => {
            // 1. Verifica se é administrador (pelo campo "administrador" ou "username")
            let admin = dados.find(p => 
                String(p.administrador || '').trim() === loginDigitado && 
                String(p.senha || '').trim() === senhaDigitada
            );

            if (admin) {
                window.location.href = 'administracao.html';
                return;
            }

            // 2. Verifica se é usuário comum (pelo "username" ou "email")
            let usuario = dados.find(p => 
                (String(p.username || '').trim() === loginDigitado || String(p.email || '').trim() === loginDigitado) && 
                String(p.senha || '').trim() === senhaDigitada
            );

            if (usuario) {
                window.location.href = 'bemvindo.html';
            } else {
                alert("Usuário/Senha Incorretos! Tente Novamente");
            }
        })
        .catch(erro => {
            console.error("Erro ao fazer login:", erro);
            alert("Erro de conexão com o servidor.");
        });
}