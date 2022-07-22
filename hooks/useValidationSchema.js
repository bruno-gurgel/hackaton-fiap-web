import * as yup from "yup";

export default function useValidationSchema() {
  return {
    registerSchema: yup.object().shape({
      username: yup.string().required("Por favor insira um usuário."),
      email: yup.string().email().required("Por favor insira um e-mail."),
      password: yup
        .string()
        .required("Por favor crie uma senha.")
        .min(8, "A senha precisa ter no mínimo 8 caracteres."),
      confirm_password: yup
        .string()
        .required("Por favor confirme sua senha.")
        .oneOf([yup.ref("password")], "Senhas não batem"),
    }),

    loginSchema: yup.object().shape({
      username: yup.string().required("Usuário é obrigatório."),
      password: yup.string().required("A senha é obrigatória."),
    }),
  };
}
