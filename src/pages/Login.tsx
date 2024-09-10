import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import InputLabel from '../components/input/InputLabel';
import Button from '../components/button/Button';
import { Link, useNavigate } from 'react-router-dom';
// import { Api } from '../services/Api';
import { RootState, useAppDispatch } from '../store';
import { loginUser } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Login = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state:RootState) => state.auth)

  useEffect(() =>{
    if (isLogin) {
      navigate("/dashboard");
    }
  }, [isLogin]);

  // Valores iniciales
  const initialValues = {
    email: '',
    password: '',
  };
  
  // Validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Formato de email inválido').required('El email es requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(50, 'La contraseña debe tener max 50 caracteres').required('La contraseña es requerida'),
  });
  
  // Función de envío del formulario
  const onSubmit = (values: typeof initialValues) => {
    dispatch(loginUser(values)).then((response) => {
      navigate("/dashboard");
      // console.log(response);
      })
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registrarme
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, handleSubmit, handleChange }) => (
                <Form onSubmit={handleSubmit} className="space-y-5">
                  {/* {JSON.stringify(errors)} */}
                  <InputLabel
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Ingrese su email"
                    error={errors.email}
                    onChange={handleChange}
                  />
                  <InputLabel
                    id="password"
                    name="password"
                    type="password"
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    error={errors.password}
                    onChange={handleChange}
                  />
                  <Button
                    value="Ingresar"
                    type="submit"
                  />
                  <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Crear cuenta
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login