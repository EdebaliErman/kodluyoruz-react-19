import React from 'react'
import { message } from 'antd';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from '../../../api'
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { Formik, FieldArray } from 'formik'
import validationSchema from './validations'
function ProductDetail() {
    const { product_id } = useParams()
    const { isLoading, isError, data, error } = useQuery(['product', product_id], () => fetchProduct(product_id))
    const handleSubmit = async (values, bag) => {
        console.log("submitted")
        message.loading({ content: "loading...", key: "product_update" })
        try {
            await updateProduct(values, product_id)
            message.success({
                content: 'The product succesfully updated',
                key: "product_update",
                duration: 2
            })
        } catch (error) {
                message.error('the product does not')
        }

    }
    if (isLoading) {
        return <div>Loading..</div>
    }
    if (isError) {
        return <div>Error {error.massege}</div>
    }
    return (
        <div>
            <Text fontSize="2xl">Edit</Text>
            <Formik initialValues={{
                title: data.title,
                description: data.description,
                price: data.price,
                photos: data.photos
            }} validationSchema={validationSchema}
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
                                                            <br></br>
                                                            <Button mt={5} onClick={() => arayHelpers.push('')}>Add a foto</Button>
                                                        </div>))
                                                }
                                            </div>)}
                                    />
                                </FormControl>
                                <Button
                                    mt={4}
                                    width="full"
                                    type='submit'
                                    isLoading={isSubmitting}
                                >
                                    Update
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

export default ProductDetail
