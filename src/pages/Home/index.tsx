import { Footer } from '../../components/atomic/organisms/Footer'
import { Form } from '../../components/atomic/organisms/Form'
import { NavBar } from '../../components/atomic/organisms/NavBar'
import styles from './styles.module.scss'
function Home() {
    return (
        <div>
            <NavBar />
            <div className={styles.Home}>
                <div className={styles.Home__container}>
                    <div className={styles.Home__banner}>
                        <div className={styles.Home__layer}>
                            <p className={styles.Home__bannerParagraph}>Conecta-se aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                        </div>
                    </div>
                    <Form />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home