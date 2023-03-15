import {
    Alert, Box, Button, Image, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, FormLabel, FormControl, useDisclosure, Textarea
} from '@chakra-ui/react'

import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { postOrder } from '../../api'
import { useBasket } from '../../contexts/BasketContext'

function Basket() {
    const [address, setAddress] = useState('')
    const { items, removeFromBasket, emptyBasket } = useBasket()

    const handleSubmitForm = async () => {
        const itemsIds = items.map((item) => item._id)
        const input = {
            address,
            items: JSON.stringify(itemsIds)
        }
        const response = await postOrder(input)

        emptyBasket()
        onClose()
        console.log(response)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const total = items.reduce((acc, obj) => acc + obj.price, 0)
    return (
        <div>
            {items.length < 1 && <Alert status='warning'>Sorry guys , havent item</Alert>}
            {items.length > 0 &&
                <>
                    <ul >
                        {items.map((item) =>
                            <li key={item._id}>
                                <NavLink to={`/product/${item._id}`}>
                                    {item.title}-{item.price}
                                    <Image
                                        htmlWidth={200}
                                        alt="basket item"
                                        src={item.photos[0]} ></Image>
                                </NavLink>
                                <Button
                                    mt={2} size="sm"
                                    colorScheme={"red"}
                                    onClick={() => removeFromBasket(item._id)}
                                >
                                    Remove
                                </Button>
                            </li>)}
                    </ul>
                    <Box mt={10}>
                        <Text fontSize={22}> Total :{total} TL</Text>
                    </Box>

                    <Button mt={2} colorScheme="green" onClick={onOpen}>Order</Button>
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Order</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <FormControl>
                                    <FormLabel>Address</FormLabel>
                                    <Textarea ref={initialRef} placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                                </FormControl>

                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    colorScheme='blue'
                                    mr={3}
                                    onClick={handleSubmitForm}
                                >
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            }


        </div>
    )
}

export default Basket
