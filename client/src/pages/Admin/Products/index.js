import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

import { fetchProductsList, deleteProduct } from '../../../api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, Flex, Text } from '@chakra-ui/react'
import { Table, Popconfirm } from 'antd'
function Products() {
    const { isLoading, isError, data, error } = useQuery('admin:products', fetchProductsList)
    const queryClient = useQueryClient();
    const deleteMutation = useMutation(deleteProduct, {
        // refetchQueries: ["admin:products"]
        onSuccess: queryClient.invalidateQueries("admin:products")

    })

    const columns = useMemo(() => {
        return [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => <>
                <NavLink to={`/admin/products/${record._id}`}>Edit</NavLink>
                <Popconfirm
                    title="Are you sure?"
                    onConfirm={() => {
                        deleteMutation.mutate(record._id, {
                            onSuccess: () => {
                                console.log("succes")

                            }
                        })
                    }}
                    onCancel={() => console.log("iptal edildi")

                    }
                    okText="Yes"
                    canselText="No"
                    placement='right'
                >
                    <a href='#' style={{ marginLeft: 10 }}> Delete</a>
                </Popconfirm>
            </>
        }

        ]

    })
    if (isLoading) {
        return <div>Loading..</div>
    }
    if (isError) {
        return <div>Error {error.message}</div>
    }

    return (
        <div>
            <Flex
                justifyContent={"space-between"}

            >
                <Text fontSize="2xl">Products</Text>
                <NavLink to="/admin/products/new">   <Button >New </Button></NavLink>
            </Flex>
            <Table dataSource={data} columns={columns} rowKey="_id" />;
        </div>
    )
}

export default Products
