import { useState } from 'react';

// import styles of this component
import styles from '../Forms.module.css'

// import other component to use
import FormInput from '../FormInput/FormInput';

// import other pkg to use
import { useFormik } from 'formik';
import { object, string, date, ref } from 'yup'
import PropTypes from 'prop-types';
import { v4 as uniqid } from 'uuid';
import { Container, Button, Form } from 'react-bootstrap';

// import utils 
import { getStorage, setUserId, setUserInStorage } from '../../../utils/storage';

const RegisterForm = ({ onRegister, onLogin }) => {
    const [submit, setSubmit] = useState(false)


    const checkUser = (username, email) => {
        const users = getStorage('users')
        const isIterateUsername = users.some(user => user.username === username)
        const isIterateEmail = users.some(user => user.email === email)

        return [isIterateUsername , isIterateEmail]
    }

    return (
        <Container fluid className={`${styles.container} d-flex justify-content-center align-items-center px-5`}>
            <Form noValidate className={styles.form} >
                <h2>Register</h2>

                <FormInput 
                    className="mt-5 mb-4"
                    controlId="usernameInp"
                    name="username"
                    text="Username"
                    placeholder="Enter your username"
                    successMsg="done"
                />

                <FormInput 
                    className="mb-4"
                    controlId="emailInp"
                    name="email"
                    text="Email"
                    successMsg="done"

                />

                <FormInput 
                    className="mb-4"
                    type="date"
                    controlId="birthdayInp"
                    name="birthday"
                    text="birthday"
                    placeholder="Enter your birthday date"
                    successMsg="done"
                />

                <FormInput 
                    className="mb-4"
                    type="password"
                    controlId="passwordInp"
                    name="password"
                    text="Password"
                    placeholder="Enter your Password"
                    successMsg="done"
                />

                <FormInput 
                    className="mb-4"
                    type="password"
                    controlId="confirmPasswordInp"
                    name="confirmPassword"
                    text="Confirm Password"
                    placeholder="Enter your Confirm Password"
                    successMsg="done"
                />

                <Button 
                    onClick={() => onLogin('login')}
                    className='shadow-none mt-4 p-0'
                    type="button"
                    variant="">
                    you have an account ?
                </Button>

                <Button 
                    className={`${styles["submit-btn"]} w-100`} 
                    onClick={() => setSubmit(true)}
                    variant="primary" 
                    type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    )
}



export default RegisterForm