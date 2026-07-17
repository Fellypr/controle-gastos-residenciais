import type { ResumoMoradoresProps } from "../types/MoradoresCadastrado";
import { useMoradoresCadastrados } from "../hook/UseMoradoresCadastrado";
import "./MoradoresCadastradosTable.css"

export function MoradoresCadastradoTable({ moradores }: ResumoMoradoresProps) {
  const { formatarDinheiro } = useMoradoresCadastrados();

  // Soma todas as receitas de todos os moradores
  const totalReceitas = moradores.reduce(
    (total, morador) => total + morador.receitas,
    0,
  );

  // Mesma coisa mas com despesas - a gente soma tudo
  const totalDespesas = moradores.reduce(
    (total, morador) => total + morador.despesas,
    0,
  );

  // Calcula quanto sobra (ou quanto falta) no total - receitas menos despesas
  const saldoGeral = totalReceitas - totalDespesas;

  return (
    <section className="resumo">
      <h2 className="resumo__titulo">Resumo por Morador</h2>

      <div className="resumo__card">
        <table className="resumo__tabela">
          <thead>
            <tr>
              <th>Morador</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>

          <tbody>
            {moradores.map((morador) => {
              // Calcula o saldo de cada morador individualmente
              const saldo = morador.receitas - morador.despesas;

              return (
                <tr key={morador.id}>
                  <td>
                    {morador.nome} ({morador.idade} anos)
                  </td>

                  <td>{formatarDinheiro(morador.receitas)}</td>

                  <td>{formatarDinheiro(morador.despesas)}</td>

                  {/* Se o saldo é positivo fica green, senão fica red - isso ajuda a visualizar rápido */}
                  <td
                    className={
                      saldo >= 0
                        ? "saldo saldo--positivo"
                        : "saldo saldo--negativo"
                    }
                  >
                    {formatarDinheiro(saldo)}
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <td>TOTAL GERAL</td>
              <td>{formatarDinheiro(totalReceitas)}</td>
              <td>{formatarDinheiro(totalDespesas)}</td>
              {/* Mesma lógica do saldo individual, mas agora pro total geral */}
              <td
                className={
                  saldoGeral >= 0
                    ? "saldo saldo--positivo"
                    : "saldo saldo--negativo"
                }
              >
                {formatarDinheiro(saldoGeral)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
