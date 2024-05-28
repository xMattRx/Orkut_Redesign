import React from 'react'
import styles from './styles.module.scss'
import logo from '/assets/orkut-name.svg'

export function NavBar() {

  return (
    <div className={`${styles.navBar}`}>
      <div className={`${styles.navBar__container}`}>
      <a className={`${styles.navBar__listItem}`} href="/"><img src={logo} /></a>
        <nav className={`${styles.navBar__nav}`}>
          <ul className={`${styles.navBar__list}`}>
            <li><a className={`${styles.navBar__listItem}`} href="">Sobre o Orkut</a></li>
            <li><a className={`${styles.navBar__listItem}`} href="">Centro de segurança</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
