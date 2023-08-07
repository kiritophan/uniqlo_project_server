import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

module.exports = {
    create: async function (newCategory) {
        try {
            let category = await prisma.categories.create({
                data: newCategory
            })
            return {
                status: true,
                message: "Thêm danh mục thành công!",
                data: category
            }
        } catch (err) {
            if (err.meta?.target == "categories_title_key") {
                return {
                    status: false,
                    message: "Danh mục đã tồn tại!"
                }
            }
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    readMany: async function (status = undefined) {
        try {
            let categories = await prisma.categories.findMany({
                where: status == undefined ? {
                    deleted: false
                } : {
                    status,
                    deleted: false
                }
            });
            return {
                status: true,
                message: status == undefined
                    ? "Lấy tất cả danh mục thành công!"
                    : `Lấy danh mục ${status ? "đang bán" : "đã dừng bán"} thành công!`,
                data: categories
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    update: async function (categoryId, categoryEditData) {
        try {
            let categoryEdited = await prisma.categories.update({
                where: {
                    id: categoryId,
                },
                data: categoryEditData
            })
            return {
                status: true,
                message: "Update danh mục thành công!",
                data: categoryEdited
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
}
