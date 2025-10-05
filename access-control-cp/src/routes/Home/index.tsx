import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    nome: string;
    nomeUsuario: string;
    email: string;
}

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            // Se não houver usuário, redireciona para o login
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) {
        // Renderiza um loader ou nada enquanto verifica o usuário
        return <div>Carregando...</div>;
    }

    return (
        <main>
            <div>
                {/* Mensagem de boas-vindas (Toast simulado) */}
                <div>
                    Olá, {user.nome}! Seja bem-vindo(a).
                </div>

                <h1>Página Inicial</h1>
                <p>Você está logado como:</p>
                <p><strong>Nome:</strong> {user.nome}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button onClick={handleLogout}>Sair</button>
            </div>
        </main>
    );
}