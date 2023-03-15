import { Flex, Box, Heading, FormControl, FormLabel, Input, Button,Alert } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik'
import validationSchema from './validations'
import { fetchLogin } from '../../../api'
import { useAuth } from '../../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

function Signin() {
    const { login, loggedIn } = useAuth()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,

        onSubmit: async (values, bag) => {
            try {
                const loginResponse = await fetchLogin({ email: values.email, password: values.password });
                login(loginResponse)
                console.log(loginResponse,)


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
                        <Heading >Sign In</Heading>
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

                            <Button type='submit' width="full">
                                Sign In
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Flex>


        </div>
    )
}

export default Signin
