import React from 'react'
import { message } from 'antd';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { Formik, FieldArray } from 'formik'
import validationSchema from './validations'
import { postProduct } from '../../../api'
import { useMutation, useQueryClient } from 'react-query'
function NewProduct() {
    const queryClient = useQueryClient();

    const newProductMutation = useMutation(postProduct, {
        // refetchQueries: ["admin:products"]
        onSuccess: () => queryClient.invalidateQueries("admin:products")

    })

    const handleSubmit = async (values, bag) => {
        message.loading({ content: "loading...", key: "product_update" })

        const newValues = {
            ...values,
            photos: JSON.stringify(values.photos)
        }
        newProductMutation.mutate(newValues, {
            onSuccess: () => {
                console.log("succes")
                message.success({
                    content: 'The product succesfully updated',
                    key: "product_update",
                    duration: 2,

                })
            }
        })
    }

    return (
        <div>
            <Text fontSize="2xl">New Product</Text>
            <Formik initialValues={{
                title: "",
                description: "",
                price: "",
                photos: [],
            }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >

                {({ handleSubmit,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    values,
                    isSubmitting }) =>
                (<>
                    <Box>
                        <Box m={5}>
                            <form onSubmit={handleSubmit}>
                                <Text color={"red.500"} >
                                    {touched.title && errors.title}
                                </Text>
                                <FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <Input name='title'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                        disabled={isSubmitting}
                                        isInvalid={touched.title && errors.title}

                                    />
                                </FormControl>
                                <Text color={"red.500"} >
                                    {touched.description && errors.description}
                                </Text>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Input name='description'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        disabled={isSubmitting}
                                        isInvalid={touched.description && errors.description}

                                    />
                                </FormControl>
                                <Text color={"red.500"} >
                                    {touched.price && errors.price}
                                </Text>
                                <FormControl>
                                    <FormLabel>Price</FormLabel>
                                    <Input name='price'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                        disabled={isSubmitting}
                                        isInvalid={touched.Price && errors.Price}

                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Photos</FormLabel>
                                    <FieldArray name='photos'
                                        render={(arayHelpers) => (
                                            <div>
                                                {
                                                    values.photos && values.photos.map((photo, index) => (
                                                        <div key={index}>
                                                            <Input mt={3}
                                                                name={`photos.${index}`}
                                                                value={photo}
                                                                disabled={isSubmitting}
                                                                onChange={handleChange}
                                                            />
                                                            <Button mt="4" colorScheme={"red"} onClick={() => arayHelpers.remove(index)} >Remove</Button>
                                                            <br />
                                                        </div>

                                                    ))
                                                }
                                                <Button mt={5} onClick={() => arayHelpers.push("")}>Add a foto</Button>
                                            </div>)}
                                    />
                                </FormControl>
                                <Button
                                    mt={5}
                                    width="full"
                                    type='submit'
                                    isLoading={isSubmitting}
                                >
                                    Save
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </>)
                }
            </Formik>
        </div>
    )
}

export default NewProduct
