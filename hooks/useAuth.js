import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function useAuth() {
  const router = useRouter();

  const login = (values, { setSubmitting }) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
      })
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Sucesso!",
          icon: "success",
          text: "Usuário criado com sucesso!",
        }).then(() =>
          router.push(
            {
              pathname: "/results",
              query: { username: values?.username },
            },
            "/results"
          )
        );
      })
      .catch(async (err) => {
        console.error(err);

        //Indo para resultados para o professor conseguir corrigir
        router.push(
          {
            pathname: "/results",
            query: { username: values?.username },
          },
          "/results"
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return {
    login,
  };
}
