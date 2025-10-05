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
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) {
        return (
            <main>
                <div className="form-container text-center">
                    <p className="text-lg">Carregando...</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="form-container text-center">
                <div className="feedback-message feedback-info">
                    Olá, {user.nome}! Seja bem-vindo(a).
                </div>

                <h1 className="form-title">Página Inicial</h1>
                <p className="text-lg">Você está logado como:</p>
                <p className="text-base"><strong className="font-semibold">Nome:</strong> {user.nome}</p>
                <p className="text-base"><strong className="font-semibold">Email:</strong> {user.email}</p>
                <button onClick={handleLogout} className="logout-button">Fazer logout</button>
            </div>
        </main>
    );
}