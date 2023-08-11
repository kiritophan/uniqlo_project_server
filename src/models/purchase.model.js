import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default {
    addToCart: async function (user_id, cart_detail_record) {
        try {
            let userCart = await prisma.carts.findUnique({
                where: {
                    user_id
                }
            })
            if (userCart) {
                console.log("đã vào trường hợp đầu tiên!")
                /* Đã có giỏ hàng */
                let existRecord = await prisma.cart_details.findMany({
                    where: {
                        AND: [
                            {
                                cart_id: userCart.id
                            },
                            {
                                product_id: Number(cart_detail_record.product_id)
                            }
                        ]
                    }
                })

                if (existRecord.length != 0) {
                    // sản phẩm đã tồn tại trong carts
                    await prisma.cart_details.update({
                        where: {
                            id: existRecord[0].id
                        },
                        data: {
                            quantity: (cart_detail_record.quantity + existRecord[0].quantity)
                        }
                    })

                    let updatedCart = await prisma.carts.findUnique({
                        where: {
                            user_id
                        },
                        include: {
                            cart_details: {
                                include: {
                                    product: true
                                }
                            },
                        },
                    });

                    return {
                        status: true,
                        message: "Thêm sản phẩm vào giỏ hàng thành công!",
                        data: updatedCart
                    }
                } else {
                    console.log("đã vào trường hợp đầu tiên! 1")
                    // chưa từng
                    await prisma.cart_details.create({
                        data: {
                            ...cart_detail_record,
                            cart_id: userCart.id
                        }
                    })

                    let updatedCart = await prisma.carts.findUnique({
                        where: {
                            user_id
                        },
                        include: {
                            cart_details: {
                                include: {
                                    product: true
                                }
                            },
                        },
                    });

                    return {
                        status: true,
                        message: "Thêm sản phẩm vào giỏ hàng thành công!",
                        data: updatedCart
                    }
                }
            } else {
                /* Không có giỏ hàng */
                await prisma.carts.create({
                    data: {
                        user_id: user_id,
                        cart_details: {
                            create: [
                                cart_detail_record
                            ]
                        },
                    },
                    include: {
                        cart_details: true, // Include all posts in the returned object
                    },
                })

                let updatedCart = await prisma.carts.findUnique({
                    where: {
                        user_id
                    },
                    include: {
                        cart_details: {
                            include: {
                                product: true
                            }
                        },
                    },
                });

                return {
                    status: true,
                    message: "Thêm sản phẩm vào giỏ hàng thành công!",
                    data: updatedCart
                }

            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "Lỗi!"
            }
        }
    },
    findCart: async function (user_id) {
        try {
            let userCart = await prisma.carts.findUnique({
                where: {
                    user_id
                },
                include: {
                    cart_details: true,
                    cart_details: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                status: true,
                message: "Lay gio hang thanh cong!",
                data: userCart ? userCart : null
            }

        } catch (err) {
            console.log("err.purchase", err);
            return {
                status: false,
                message: "Lay gio hang that bai!"
            }
        }
    },
    deleteProductFromCart: async function (product_id) {
        try {
            await prisma.cart_details.delete({
                where: {
                    id: product_id
                },
            });
            return {
                status: true,
                message: "Delete product successfully"
            }
        } catch (err) {
            return {
                status: false,
                message: "Delete product fail"
            }
        }

    },
    updateCart: async function (data) {
        //0 delete , 1 increase,2 decrease
        try {

            if (data.type) {
                await prisma.cart_details.update({
                    where: {
                        id: data.cart_detail_record_edited.id
                    },
                    data: {
                        quantity: data.cart_detail_record_edited.quantity
                    }
                })
            } else {
                await prisma.cart_details.delete({
                    where: {
                        id: data.cart_detail_record_edited.id
                    }
                })
            }
            return {
                status: true,
                message: 'Updated Successfully'
            }
        } catch (err) {
            console.log("err update", err);
            return {
                status: false,
                message: "Update Cart failed"
            }
        }
    }
}