import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchProduct } from '../../api'
import { Box, Text, Button } from '@chakra-ui/react'
import moment from 'moment'
import ImageGallery from 'react-image-gallery'
import { useBasket } from '../../contexts/BasketContext'

function ProductsDetail() {

  const { product_id } = useParams()
  const { addToBasket, items } = useBasket()
  console.log(product_id)
  const { isLoading, isError, data } = useQuery(['product', product_id], () => fetchProduct(product_id))
  if (isLoading) {
    return <div>Loading......</div>
  }
  if (isError) {
    return <div>Error</div>
  }

  const findBasketItem = items.find((item) => item._id === product_id)
  const image = data.photos.map((url) => ({ original: url }))

  return (
    <div>

      <Text as="h2" fontSize="2x1">{data.title}</Text>
      <Box margin="10">
        <ImageGallery items={image} />
      </Box>
      <Button colorScheme={findBasketItem ? "red" : "yellow"} onClick={() => addToBasket(data, findBasketItem)}>

        {
          findBasketItem ? 'Remove from basket' : 'Add to basket'
        }

      </Button>


      <Text as="h2">{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <Text>{data.description}</Text>
    </div>
  )
}

export default ProductsDetail
