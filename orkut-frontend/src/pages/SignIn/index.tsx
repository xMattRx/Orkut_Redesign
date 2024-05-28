import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/atomic/organisms/Footer';
import { Form } from '../../components/atomic/organisms/Form';
import { NavBar } from '../../components/atomic/organisms/NavBar';
import styles from './styles.module.scss';

function SignIn() {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            navigate(`/Profile/${userId}`);
        }
    }, [navigate]);

    return (
        <div>
            <NavBar />
            <div className={styles.SignIn}>
                <div className={styles.SignIn__container}>
                    <div className={styles.SignIn__banner}>
                        <div className={styles.SignIn__layer}>
                            <p className={styles.SignIn__bannerParagraph}>Conecta-se aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                        </div>
                    </div>
                    <Form page={"SignIn"} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SignIn;
