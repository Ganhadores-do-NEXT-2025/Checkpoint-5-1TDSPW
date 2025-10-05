import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <main>
            <div className="form-container text-center">
                <h1 className="form-title text-[var(--cor-erro)]">Oops! Algo deu errado.</h1>
                <p className="text-lg text-gray-600 mb-6">
                    A página que você está procurando não foi encontrada ou ocorreu um erro inesperado.
                </p>
                <Link to="/" className="neutral-button">
                    Voltar para o Login
                </Link>
            </div>
        </main>
    );
}