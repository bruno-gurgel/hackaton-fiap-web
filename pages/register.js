import { Formik } from "formik";
import useValidationSchema from "../hooks/useValidationSchema";
import useRegister from "../hooks/useRegister";
import Link from "next/link";
import { Button, Container, Form } from "react-bootstrap";

export default function Register() {
  const { registerSchema } = useValidationSchema();
  const { register } = useRegister();

  return (
    <Container>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={register}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, values, handleSubmit, handleChange, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Usuário"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.username}
              />
              <Form.Text>{errors?.username}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.email}
              />
              <Form.Text isError>{errors?.email}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha</Form.Label>
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
              <Form.Label>Confirme a senha</Form.Label>
              <Form.Control
                type="password"
                name="confirm_password"
                placeholder="Confirme a senha"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.confirm_password}
              />
              <Form.Text isError>{errors?.confirm_password}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Text href="/login">
                Já tem uma conta? <Link href="/login">Log in</Link>
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
