import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const users = {
    "teste@gmail.com": "12345",
    "usuario@gmail.com": "usuario",
  };
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center h-100">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Endereço de email inválido")
            .required("Campo obrigatório"),
          password: Yup.string().required("Campo obrigatório"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log({ values });
            const { email, password } = values;
            if (email in users) {
              if (users[email] === password) {
                console.log("logado");
                router.push("/results");
              } else {
                console.log("senha errada");
              }
            } else {
              console.log("email errado");
            }

            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="d-flex flex-column align-items-center text-white">
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password">Senha</label>
            <Field name="password" type="password" className="form-control" />
            <div className="text-danger">
              <ErrorMessage name="password" />
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
        </Form>
      </Formik>
    </div>
  );
}
