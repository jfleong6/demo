document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const resultDiv = document.getElementById('error');
    resultDiv.textContent = "";

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            resultDiv.textContent = "Credenciales inválidas";
            return;
        }

        const data = await response.json();

        // Guardar token
        sessionStorage.setItem('token', data.token);

        // Redirigir
        window.location.href = '/dashboard';

    } catch (err) {
        resultDiv.textContent = "Error de conexión";
    }
};
