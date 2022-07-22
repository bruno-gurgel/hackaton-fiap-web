import { Formik } from "formik";
import useAuth from "../hooks/useAuth";
import useValidationSchema from "../hooks/useValidationSchema";
import { useRouter } from "next/router";
import { Button, Form, Container } from "react-bootstrap";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { success } = router.query;

  const { loginSchema } = useValidationSchema();
  const { login } = useAuth();

  return (
    <Container>
      {success === "true" && (
        <div
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            color: "green",
          }}
        >
          You`&apos;`re signed up!
        </div>
      )}
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={login}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          isSubmitting,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Usuário ou email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.username}
              />
              <Form.Text isError>{errors?.username}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Senha"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.password}
              />
              <Form.Text isError>{errors?.password}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Text>
                Não tem conta?
                <Link href="/register">Cadastrar</Link>.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
