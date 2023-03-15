import { Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { fetchOrders } from '../../../api'
function Orders() {
  const { isLoading, isError, data } = useQuery('admin:orders', fetchOrders)
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error  </div>
  }
  return (
    <div>
      <Text fontSize="2xl" p={5}>Orders</Text>
      <Table variant={'simple'}>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Addres</Th>
            <Th isNumeric>Items</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data.map((item)=>(
              <Tr key={item._id}> 
                <Td>{item.user.email}</Td>
                <Td>{item.adress}</Td>
                <Td isNumeric>{item.items.length}</Td>
              </Tr>
            ))
          }
        </Tbody>
          <TableCaption >The orders list</TableCaption>
      </Table>
    </div>
  )
}

export default Orders
