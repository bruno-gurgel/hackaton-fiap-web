import useSWR from "swr";

export default function Results() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("http://localhost:8090/reclamacao/", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  async function imageToBlob(b64Data) {
    return fetch(b64Data)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob));
  }

  return (
    <div className="container d-flex flex-column align-items-center h-100 mt-5 text-white">
      <h1>Tabela de Resultados</h1>
      <table className="table table-hover table-striped bg-white">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome do Usuário</th>
            <th scope="col">Produto</th>
            <th scope="col">Data da compra</th>
            <th scope="col">Cidade</th>
            <th scope="col">Problemas</th>
            <th scope="col">Anexos</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (i) =>
              console.log({ i }) || (
                <tr key={i.id}>
                  <th scope="row">{i.id}</th>
                  <td>{i.nome}</td>
                  <td>{i.produto}</td>
                  <td>{i.data}</td>
                  <td>{i.cidade}</td>
                  <td>{i.problema}</td>
                  <td
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={async () => {
                      const response = await fetch(
                        `http://localhost:8091/reclamacao/${i.id}`
                      );
                      const json = await response.json();

                      if (!json) return;
                      const bytes = json.anexo;
                      const blob = await imageToBlob(
                        "data:image/png;base64," + bytes
                      );
                      const anchor = document.createElement("a");
                      anchor.href = blob;
                      anchor.target = "_blank";
                      anchor.click();
                    }}
                  >
                    Anexo
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
