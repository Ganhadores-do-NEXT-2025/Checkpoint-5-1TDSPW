import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'; 

const loginSchema = z.object({
    nomeUsuario: z
    .string()
    .min(1, 'O nome de usuário é obrigatório.'),

    email: z
    .string()
    .min(1, 'O e-mail é obrigatório.')
    .email('Formato de e-mail inválido.'),

});

export default function Login() {

    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }, 
    } = useForm({
        resolver: zodResolver(loginSchema), 
    }); 

    const onSubmit = async (data) => {
        console.log('Dados submetidos:', data);

        try {

            const API_URL = `http://localhost:3001/usuarios`;

            await new Promise(resolve => setTimeout(resolve, 1500)); 

            const response = await axios.get(API_URL);

            if (response.data.length > 0) { 
            alert('Login realizado com sucesso!');

            } else {
                alert('Credenciais inválidas. Tente novamente.');
            }

        } catch (error) {
            console.error('Erro no login:', error);
            alert('Ocorreu um erro ao tentar fazer login.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Entrar na Conta</h1>

                <div>
                    <label htmlFor="nomeUsuario">Nome de Usuário</label>
                    <input
                        id="nomeUsuario"
                        type="text"
                        {...register('nomeUsuario')} 
                    />
                    {errors.nomeUsuario && (
                        <p>{errors.nomeUsuario.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')} 
                    />
                    {errors.email && (
                        <p>{errors.email.message}</p>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                >
                    {isSubmitting ? 'Entrando...' : 'Login'}
                </button>
            </form>
        </div>
    )
}