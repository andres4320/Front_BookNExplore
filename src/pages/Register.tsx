import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import InputLabel from '../components/input/InputLabel';
import Button from '../components/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { registerUser } from '../store/authSlice';

const Register = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Valores iniciales
  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  
  // Validación con Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre de usuario es requerido'),
    email: Yup.string().email('Formato de email inválido').required('El email es requerido'),
    password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(50, 'La contraseña debe tener max 50 caracteres').required('La contraseña es requerida'),
    password_confirmation: Yup.string().oneOf([Yup.ref("password")], "Las contraselas no coinciden").required('La confirmación de la contraseña es requerida'),
  });
  
  // Función de envío del formulario
  const onSubmit = (
    values: typeof initialValues, 
    { setFieldError }: FormikHelpers<typeof initialValues>
  ) => {
    dispatch(registerUser(values)).then((response) => {
      if (response.type === 'auth/registerUser/fulfilled') {
        navigate("/dashboard");
      } else {
        Object.entries(response.payload.errors).forEach(([key, value]) => {
          setFieldError(key, value[0]);
        }); 
        // setFieldError("email", "El correo ya esta en uso"); 
      }
    });
  }

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
                    id="name"
                    name="name"
                    type="text"
                    label="Nombre de usuario"
                    placeholder="Ingrese su nombre de usuario"
                    error={errors.name}
                    onChange={handleChange}
                  />
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
                  <InputLabel
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    label="Confirmar Contraseña"
                    placeholder="Ingrese su contraseña"
                    error={errors.password_confirmation}
                    onChange={handleChange}
                  />
                  <Button
                    value="Registrarme"
                    type="submit"
                  />
                  <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Iniciar sesión
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
