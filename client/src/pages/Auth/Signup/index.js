import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik'
import validationSchema from './validations'
import { fetchRegister } from '../../../api'
import { useAuth } from '../../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

function Signup() {
    const { login, loggedIn } = useAuth()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: ""
        },
        validationSchema,

        onSubmit: async (values, bag) => {
            try {
                const registerResponse = await fetchRegister({ email: values.email, password: values.password });
                login(registerResponse)
                console.log(registerResponse,)


            } catch (e) {
                bag.setErrors({ general: e.response.data.message })

            }
        }
    })


    return (

        <div> {loggedIn === true && <Navigate to="/" />}
            <Flex align="center" width="full" justifyContent="center">
                <Box pt="10">
                    <Box textAlign="center">
                        <Heading >Signup</Heading>
                    </Box>
                    <Box my={5}>
						{formik.errors.general && (
							<Alert status="error">{formik.errors.general}</Alert>
						)}
					</Box>
                    <Box my={5} textAlign="left">
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormLabel >E mail</FormLabel>
                                <Input name='email'
                                    type="email"
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel  >Password</FormLabel>
                                <Input name='password'
                                    type="password"
                                    isInvalid={formik.touched.password && formik.errors.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password} />
                            </FormControl>
                            <FormControl>
                                <FormLabel >Password confirm</FormLabel>
                                <Input name='passwordConfirm'
                                    type="password"
                                    isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.passwordConfirm} />
                            </FormControl>
                            <Button type='submit' width="full">
                                Signup
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Flex>


        </div>
    )
}

export default Signup
