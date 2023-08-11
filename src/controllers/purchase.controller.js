import purchaseModel from "../models/purchase.model";


export default {
    addToCart: async function (req, res) {
        try {
            let modelRes = await purchaseModel.addToCart(Number(req.params.user_id), req.body);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    },
    findCart: async function (req, res) {
        try {
            let modelRes = await purchaseModel.findCart(Number(req.params.user_id));
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    },
    deleteProductFromCart: async function (req, res) {
        try {
            const modelRes = await purchaseModel.deleteProductFromCart(Number(req.params.product_id));
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            console.log("Lỗi xử lý:", err);
            return res.status(500).json({
                message: "Lỗi xử lý!"
            });
        }
    },
    updateCart: async function (req, res) {

        try {
            let modelRes = await purchaseModel.updateCart(req.body);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    },

}