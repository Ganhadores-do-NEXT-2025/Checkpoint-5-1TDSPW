import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'; 

const loginSchema = z.object({
    nomeUsuario: z
    .string()
    .min(1, 'Por favor, insira seu nome de usuário.'), 

    email: z
    .string()
    .min(1, 'O e-mail não pode ficar vazio.')
    .email('O formato do e-mail é inválido. Ex: seuemail@dominio.com'), 
});

export default function Login() {

    const {
        register, 
        handleSubmit, 
        setError,
        formState: { errors, isSubmitting }, 
    } = useForm({
        resolver: zodResolver(loginSchema), 
    }); 

    const onSubmit = async (data) => {
        console.log('Dados submetidos (já validados):', data);

        try {
            const API_URL = `http://localhost:3001/usuarios`;

            await new Promise(resolve => setTimeout(resolve, 1500)); 

            const response = await axios.get(API_URL);

            if (response.data.length > 0) { 
                alert('Login realizado com sucesso! Redirecionando...');

            } else {

                setError("root.serverError", { 
                    type: "manual",
                    message: "Credenciais inválidas. Verifique seu nome de usuário ou e-mail.",
                });
            }

        } catch (error) {
            console.error('Erro no login:', error);
            setError("root.serverError", {
                type: "manual",
                message: "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>

                {errors.root?.serverError && (
                    <p style={{ color: 'white', backgroundColor: 'red', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                        {errors.root.serverError.message}
                    </p>
                )}

                <div>
                    <label htmlFor="nomeUsuario">Nome de Usuário</label>
                    <input
                        id="nomeUsuario"
                        type="text"
                        {...register('nomeUsuario')} 
                    />
                    {errors.nomeUsuario && (
                        <p style={{ color: 'red', margin: '5px 0' }}>
                            {errors.nomeUsuario.message}
                        </p>
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
                        <p style={{ color: 'red', margin: '5px 0' }}>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                >
                    {isSubmitting ? 'Verificando credenciais...' : 'Login'}
                </button>
            </form>
        </div>
    )
}