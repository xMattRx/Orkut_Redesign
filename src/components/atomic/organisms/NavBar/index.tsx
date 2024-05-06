import styles from './styles.module.scss'
import logo from '/assets/orkut-name.svg'

export function NavBar() {
  return (
    <div className={`${styles.NavBar}`}>
        <img src={logo} />
    </div>
  )
}
