import styles from './styles.module.scss'
import logo from '/assets/orkut-logo.png'

export function Form() {
    return (
        <div className={styles.Form}>
            <div className={styles.Form__container}>
                <form className={styles.Form__data}>
                    <img className={styles.Form__logo} src={logo} />
                    <h1 className={styles.Form__title}>Acesse o Orkut</h1>
                    <input type="email" className={styles.Form__input} placeholder='E-mail' />
                    <input type="password" className={styles.Form__input} placeholder='Senha' />


                    <div  className={styles.Form__passwordContainer} >
                        <input type="checkbox" name="password" id="password" />
                        <input type="submit" value="Lembrar minha senha" />
                    </div>


                </form>
            </div>
        </div>
    )
}
