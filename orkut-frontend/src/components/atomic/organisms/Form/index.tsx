import { FormikProps, useFormik } from 'formik';
import React from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser, registerUser } from '../../../../api/auth';

import styles from './styles.module.scss';
import logo from '/assets/orkut-logo.png';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  rememberPassword: boolean;
}

interface InputFieldProps {
  id: keyof FormValues;
  type: string;
  placeholder: string;
  formik: FormikProps<FormValues>;
}

interface CheckboxFieldProps {
  id: keyof FormValues;
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface FormProps {
  page: 'SignIn' | 'SignUp';
}

function InputField({ id, type, placeholder, formik }: InputFieldProps) {
  return (
    <div className={styles.form__inputContainer}>
      <input
        id={id}
        type={type}
        className={styles.form__input}
        placeholder={placeholder}
        {...formik.getFieldProps(id)}
        aria-invalid={formik.touched[id] && formik.errors[id] ? 'true' : undefined}
        aria-describedby={formik.touched[id] && formik.errors[id] ? `${id}-error` : undefined}
      />
      {formik.touched[id] && formik.errors[id] && (
        <div id={`${id}-error`} className={styles.form__error}>
          {formik.errors[id]}
        </div>
      )}
    </div>
  );
}

function CheckboxField({ id, label, isChecked, onChange }: CheckboxFieldProps) {
  return (
    <div className={styles.form__passwordContainer}>
      <div className={styles.form__containerCheckbox}>
        <input
          type="checkbox"
          id={id}
          className={styles.form__checkbox}
          checked={isChecked}
          onChange={onChange}
        />
        <div
          onClick={onChange}
          className={`${styles.form__check} ${isChecked ? styles.visible : ''}`}
        ></div>
      </div>
      <label htmlFor={id} className={styles.form__label}>
        {label}
      </label>
    </div>
  );
}

function Button({ type = 'button', className, children, onClick }: ButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export function Form({ page }: FormProps) {
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberPassword: false,
    },
    validationSchema: Yup.object().shape({
      name: page === 'SignUp' ? Yup.string().required('O nome é obrigatório') : Yup.string(),
      email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
      password: Yup.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('A senha é obrigatória'),
      confirmPassword: page === 'SignUp' ? Yup.string()
        .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
        .required('Confirmar senha é obrigatório') : Yup.string(),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const submitValues: FormValues = {
          ...values,
          rememberPassword: values.rememberPassword ?? false,
        };

        let responseData;
        if (page === 'SignIn') {
          responseData = await loginUser(submitValues);
          if (responseData.userId) {
            sessionStorage.setItem('userId', responseData.userId);
            navigate(`/Profile/${responseData.userId}`);

          }
        } else {
          responseData = await registerUser(submitValues);
          if (responseData.message === 'User registered successfully') {
            navigate('/');
          }
        }

        if (responseData.redirect) {
          navigate(responseData.redirect);
        }
      } catch (error) {
        console.error(error instanceof Error ? error.message : 'Unknown error');
        if (error instanceof Error) {
          setFieldError('confirmPassword', 'Email já está sendo utilizado');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCheckboxChange = () => {
    formik.setFieldValue('rememberPassword', !formik.values.rememberPassword);
  };

  return (
    <div className={styles.form}>
      <div className={styles.form__container}>
        
      {page === 'SignUp' && (<div onClick={()=>{navigate(-1);}} className={styles.form__back}>
        <FaArrowLeftLong color='#ED2590' fontSize="2rem" />
      </div>)}

        <form className={styles.form__data} onSubmit={formik.handleSubmit}>
          <img className={styles.form__logo} src={logo} alt="Orkut Logo" />
          <h1 className={styles.form__title}>
            {page === 'SignIn' ? 'Acesse o Orkut' : 'Crie sua conta no Orkut'}
          </h1>
          {page === 'SignUp' && (
            <InputField
              id="name"
              type="text"
              placeholder="Nome"
              formik={formik}
            />
          )}
          <InputField
            id="email"
            type="email"
            placeholder="E-mail"
            formik={formik}
          />
          <InputField
            id="password"
            type="password"
            placeholder="Senha"
            formik={formik}
          />
          {page === 'SignUp' && (
            <>
            <InputField
              id="confirmPassword"
              type="password"
              placeholder="Confirmar senha"
              formik={formik}
            />
            </>
          )}
          {page === 'SignIn' && (
            <CheckboxField
              id="rememberPassword"
              label="Lembrar minha senha"
              isChecked={formik.values.rememberPassword || false}
              onChange={handleCheckboxChange}
            />
          )}
          <div className={styles.form__containerButton}>
            {page === 'SignIn' && (
              <Button type="submit" className={`${styles.form__button} ${styles.form__signIn}`}>
                Entrar na conta
              </Button>
            )}
            <Button
              onClick={() => {
                if (page === 'SignIn') {
                  navigate('/SignUp');
                } else {
                  formik.handleSubmit();
                }
              }}
              type={page === 'SignIn' ? 'button' : 'submit'}
              className={`${styles.form__button} ${styles.form__createAccount}`}
            >
              {page === 'SignIn' ? 'Criar uma conta' : 'Enviar'}
            </Button>
          </div>
            
          {page === 'SignIn' && (
            <a href="#" className={styles.form__forgetPassword}>
              Esqueci a senha
            </a>
          )}
        </form>
      </div>
    </div>
  );
}
