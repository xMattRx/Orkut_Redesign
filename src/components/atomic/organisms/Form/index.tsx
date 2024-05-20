import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import logo from '/assets/orkut-logo.png';

interface FormValues {
    email: string;
    password: string;
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

export function Form() {
    const formik = useFormik<FormValues>({
        initialValues: {
            email: '',
            password: '',
            rememberPassword: false,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('Insira um e-mail válido')
                .required('O e-mail é obrigatório'),
            password: Yup.string()
                .min(6, 'A senha deve ter no mínimo 6 caracteres')
                .required('A senha é obrigatória'),
        }),
        onSubmit: (values) => {
            console.log('Valores do formulário:', values);
        },
    });

    const handleCheckboxChange = () => {
        formik.setFieldValue('rememberPassword', !formik.values.rememberPassword);
    };

    return (
        <div className={styles.form}>
            <div className={styles.form__container}>
                <form className={styles.form__data} onSubmit={formik.handleSubmit}>
                    <img className={styles.form__logo} src={logo} alt="Orkut Logo" />
                    <h1 className={styles.form__title}>Acesse o Orkut</h1>
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
                    <CheckboxField
                        id="rememberPassword"
                        label="Lembrar minha senha"
                        isChecked={formik.values.rememberPassword}
                        onChange={handleCheckboxChange}
                    />
                    <div className={styles.form__containerButton}>
                        <button type="submit" className={`${styles.form__button} ${styles.form__createAccount}`}>
                            Criar uma conta
                        </button>
                        <button type="submit" className={`${styles.form__button} ${styles.form__signIn}`}>
                            Entrar na conta
                        </button>
                    </div>
                    <a href="#" className={styles.form__forgetPassword}>
                        Esqueci a senha
                    </a>
                </form>
            </div>
        </div>
    );
}
