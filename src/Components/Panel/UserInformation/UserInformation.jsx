import { useState } from 'react';

// import other component
import FormInput from '../../Forms/FormInput/FormInput';
import Titles from '../../Titles/Titles';

// import other pkg
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { object, string, date } from 'yup'
import PropTypes from 'prop-types';

// import utils
import { getStorage } from '../../../utils/storage';


const UserInformation = ({ username , firstName, lastName, email, birthday, onChangeInfo }) => {
    const [submit, setSubmit] = useState(false)


    return (
        <>
            <Titles title='Replicate Your option' text="Choose the parameters of the option you'd like to replicate" />
            
            <Form >
                <Row className="mt-5 px-3">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0"
                        name="token0"
                        controlId=""
                        text="Token 0"
                        placeholder="Address of token 0"
                        size='sm'
                        successMsg="done"
                    />
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0 ms-lg-5 mt-3 mt-lg-0"
                        name="token1"
                        controlId=""
                        text="Token 1"
                        placeholder="Address of token 1"
                        size='sm'

                        successMsg="done"
                    />
                </Row>

                <Row className="mt-3 mt-lg-4 px-3">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0"
                        name="amountOfToken0"
                        controlId=""
                        text="Amount of token 0"
                        placeholder="uint256"
                        size='sm'

                    />

                </Row>
                <Row className="mt-3 px-3">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0  mt-3 mt-lg-0"
                        name="fees"
                        controlId=""
                        text="Fees you agree to split between your position hedgers"
                        size='sm'
                        placeholder="uint256"

                    />
                </Row>
                <Row className="mt-3 px-3">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0"
                        name="hedgePerDay"
                        controlId=""
                        text="Number of delta hedges per day"
                        placeholder="uint"
                        size='sm'
                        successMsg="done"
                    />
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0 ms-lg-5 mt-4 mt-lg-3"
                        name="strike"
                        controlId=""
                        text="Strike Price"
                        placeholder="uint256"
                        size='sm'

                        successMsg="done"
                    />
                </Row>
                <Row className="mt-3 px-3">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0"
                        name="expirationDate"
                        controlId=""
                        text="Expiration Date"
                        placeholder="uint256"
                        size='sm'
                        successMsg="done"
                    />
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0 ms-lg-5 mt-4 mt-lg-0"
                        name="riskFreeRate"
                        controlId=""
                        text="Risk Free Rate"
                        placeholder="uint256"
                        size='sm'

                        successMsg="done"
                    />
                </Row>
                <p className='mt-3 px-1 fw-bold'>Choose the parameters of Jump Diffusion Model:</p>
                <Row className="mt-3 px-3">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0"
                        name="sigma"
                        controlId=""
                        text="Volatility (sigma)"
                        placeholder="uint256"
                        size='sm'
                        successMsg="done"
                    />
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0 ms-lg-5 mt-4 mt-lg-0"
                        name="riskFreeRate (r)"
                        controlId=""
                        text="Risk Free Rate"
                        placeholder="uint256"
                        size='sm'

                        successMsg="done"
                    />
                </Row>
                <Row className="mt-3 px-3">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0"
                        name="meanRateOfJump"
                        controlId=""
                        text="Mean of Merton's Jump size (m)"
                        placeholder="uint256"
                        size='sm'
                        successMsg="done"
                    />
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0 ms-lg-5 mt-4 mt-lg-0"
                        name="stdOfJump"
                        controlId=""
                        text="Standart Deviation of Jump size (v)"
                        placeholder="uint256"
                        size='sm'

                        successMsg="done"
                    />
                </Row>
                <Row className="mt-3 px-3">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-0"
                        name="intensityOfJump"
                        controlId=""
                        text="Intensity Of Jump (lam)"
                        placeholder="uint256"
                        size='sm'
                        successMsg="done"
                    />

                </Row>
                {/*<Button 
                    onClick={() => setSubmit(true)}
                    disabled={submit && !formik.isValid ? true : false}
                    variant="primary" className='mt-5 py-2 px-4'
                    type="submit">
                    Update
                </Button>*/}
                <Button variant="primary" className="mt-5 py-2 px-40">
                Start replication
                </Button>
            </Form>
        </>
    )
}

// validate the component
UserInformation.propTypes = {
    username: PropTypes.string.isRequired, 
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired, 
    birthday: PropTypes.string.isRequired, 
    onChangeInfo: PropTypes.func.isRequired,
}

export default UserInformation