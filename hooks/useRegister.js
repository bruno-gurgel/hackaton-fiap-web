import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function useRegister() {
  const router = useRouter();

  const register = (values, { setSubmitting }) => {
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        Swal.fire({
          title: "Sucesso!",
          icon: "success",
          text: "Usuário criado com sucesso!",
        }).then(() =>
          router.push(
            {
              pathname: "/login",
              query: { username: values?.username },
            },
            "/login"
          )
        );
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Erro!",
          icon: "error",
          text: "Usuário não foi criado!",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return {
    register,
  };
}
