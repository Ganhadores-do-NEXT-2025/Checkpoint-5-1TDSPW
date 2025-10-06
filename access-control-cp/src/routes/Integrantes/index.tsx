import { useEffect } from "react";
import CardIntegrante from "../../components/CardIntegrantes/CardIntegrantes";
import { membros } from "../../Data/Integrantes";

export default function Integrantes() {
  useEffect(() => {
    document.title = "CP5";
  }, []);

  return (
    <main className="pagina_integrantes_main">
      
      <section className="pagina_integrantes_cabecalho">
        <h2>Membros</h2>
      </section>

      
      <section className="grid_integrantes">
        {membros.map((membro) => (
          <CardIntegrante key={membro.rm} {...membro} />
        ))}
      </section>
    </main>
  );
}