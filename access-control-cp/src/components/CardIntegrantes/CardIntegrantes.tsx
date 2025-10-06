type CardIntegranteProps = {
  nome: string;
  rm: string;
  turma: string;
};

export default function CardIntegrante({
  nome,
  rm,
  turma,
}: CardIntegranteProps) {
  return (
    <div className="cartao-integrante">

      
      <h3>{nome}</h3>

      
      <p>
        RM: {rm} | Turma: {turma}
      </p>

    </div>
  );
}