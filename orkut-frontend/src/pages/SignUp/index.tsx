import React from 'react'
import { Footer } from '../../components/atomic/organisms/Footer'
import { Form } from '../../components/atomic/organisms/Form'
import { NavBar } from '../../components/atomic/organisms/NavBar'
import styles from './styles.module.scss'


function SignUp() {
    return (
        <div>
            <NavBar />
            <div className={styles.SignUp}>
                <div className={styles.SignUp__container}>
                    <Form page={"SignUp"} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp