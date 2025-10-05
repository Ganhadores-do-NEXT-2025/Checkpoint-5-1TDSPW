import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'; 

const API_URL = 'http://localhost:3001/usuarios';

const cadastroAcessar = z.object({
    nome: z
    .string()
    .min(3, 'O nome é obrigatório e precisa ter no mínimo 3 caracteres.'),

    nomeUsuario: z
    .string()
    .min(4, 'O nome de usuário é obrigatório e precisa ter no mínimo 4 caracteres.')
    .regex(/^[a-zA-Z0-9]+$/, 'O nome de usuário não pode conter espaços ou caracteres especiais.') 
    .refine(async (nomeUsuario) => {
        try {
            const check_url = `${API_URL}?nomeUsuario=${nomeUsuario}`;
            const response = await axios.get(check_url);
            return response.data.length === 0;
        } catch (error) {
            return true; // Se a API falhar, não bloqueamos o cadastro
        }
    }, 'Este nome de usuário já está em uso.'),

    email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('Formato de e-mail inválido.')
    .toLowerCase()
    .refine(async (email) => {
        try {
            const check_url = `${API_URL}?email=${email}`;
            const response = await axios.get(check_url);
            return response.data.length === 0;
        } catch (error) {
            return true; // Se a API falhar, não bloqueamos o cadastro
        }
    }, 'Este e-mail já está em uso.'),
    
});

type CadastroFormData = z.infer<typeof cadastroAcessar>;

export default function Cadastro() {
    const navigate = useNavigate(); 
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }, 
    } = useForm<CadastroFormData>({
        resolver: zodResolver(cadastroAcessar), 
    }); 

    const onSubmit = async (data: CadastroFormData) => {
        setErrorMessage(''); 
        setSuccessMessage('');

        try {
            const response = await axios.post(API_URL, data);

            if (response.status === 201) {
                
                setSuccessMessage('Cadastro realizado com sucesso! Redirecionando para a página de Login...');

                setTimeout(() => {
                    navigate('/'); 
                }, 1500);

            } else {
                setErrorMessage('Erro ao registrar. Tente novamente.');
            }

        } catch (error) {
            console.error('Erro no cadastro:', error);
            setErrorMessage('Ocorreu um erro na conexão. Tente novamente mais tarde.');
        }
    };

    return (
        <main>
            <div className="form-container">
                <h1 className="form-title">Crie sua Conta</h1>
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="space-y-6"
                >
                    {successMessage && (
                        <div className="feedback-message feedback-success">{successMessage}</div>
                    )}
                    {errorMessage && (
                        <div className="feedback-message feedback-error">{errorMessage}</div>
                    )}

                    <div className="form-field">
                        <label htmlFor="nome" className="form-label">
                            Nome Completo
                        </label>
                        <input
                            id="nome"
                            type="text"
                            className="form-input"
                            {...register('nome')} 
                            placeholder="Seu nome completo"
                            />
                        {errors.nome && (
                            <p className="text-sm text-[var(--cor-erro)] mt-1">{errors.nome.message}</p>
                        )}
                    </div>


                    <div className="form-field">
                        <label htmlFor="nomeUsuario" className="form-label">
                            Nome de Usuário
                        </label>
                        <input
                            id="nomeUsuario"
                            type="text"
                            className="form-input"
                            {...register('nomeUsuario')} 
                            placeholder="Escolha seu nome de usuário"
                            />
                        {errors.nomeUsuario && (
                            <p className="text-sm text-[var(--cor-erro)] mt-1">{errors.nomeUsuario.message}</p>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="email" className="form-label">
                            E-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            {...register('email')} 
                            placeholder="seu@email.com"
                            />
                        {errors.email && <p className="text-sm text-[var(--cor-erro)] mt-1">{errors.email.message}</p>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="submit-button"
                            >
                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                    </button>

                    <p className="form-link">
                        Já tem uma conta? <Link to="/">Fazer Login</Link>
                    </p>

                </form>
            </div>
        </main>
    )
}
