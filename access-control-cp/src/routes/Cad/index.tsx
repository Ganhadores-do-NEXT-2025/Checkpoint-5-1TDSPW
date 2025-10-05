import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'; 

const API_URL = `http://localhost:3001/usuarios`;

const cadastroSchema = z.object({
    nomeUsuario: z
    .string()
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres.')
    .max(20, 'O nome de usuário deve ter no máximo 20 caracteres.'),

    email: z
    .string()
    .min(1, 'O e-mail é obrigatório para o cadastro.')
    .email('O formato de e-mail é inválido. Por favor, corrija.'),

});

export default function Cadastro() {

    const {
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }, 
        setError, 
        reset, 
    } = useForm({
        resolver: zodResolver(cadastroSchema),
    }); 

    const onSubmit = async (data) => {
        console.log('Dados de Cadastro submetidos (já validados):', data);

        try {
            const response = await axios.post(API_URL, data);

            console.log('Resposta da API (Cadastro):', response.data);
            
            if (response.status === 201 || response.status === 200) {
                alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
                reset(); 
            } else {
                 throw new Error('Erro ao processar o cadastro com status: ' + response.status);
            }

        } catch (error) {
            console.error('Erro no Cadastro:', error);

            const err = error as any;

            if (err.response) {
                if (err.response.status === 409) {
                     setError("email", { 
                        type: "manual",
                        message: "Este e-mail já está em uso. Tente outro ou faça login.",
                    });
                } else {
                     setError("root.serverError", { 
                        type: "manual",
                        message: `Erro do Servidor: ${err.response.status}. Não foi possível completar o cadastro.`,
                    });
                }
            }
            else {
                 setError("root.serverError", {
                    type: "manual",
                    message: "Não foi possível conectar ao servidor. Verifique a API ou sua conexão.",
                });
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Cadastro</h1>
                
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
                    {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    )
}