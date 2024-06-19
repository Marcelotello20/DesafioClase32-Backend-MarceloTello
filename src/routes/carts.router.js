import express from "express";
import __dirname from '../utils/utils.js';
import CartController from "../controllers/cartController.js"

const router = express.Router();
const cartsRouter = router;

const CC = new CartController();

router.post("/", async (req, res) => {
    try {
        const newCart = await CC.createCart();
        res.status(200).json(newCart);
    } catch (error) {
        console.error("Error al crear el carrito");
        res.status(500).send("Error al crear el carrito", error);
    }
});

router.get("/", async (req, res) => {
    try {
        const cart = await CC.getCarts();

        if (!cart) {
            console.error("No se pudo encontrar el carrito con ID:", cartId);
            return res.status(404).json({
                error: `No se encontró el carrito con ID ${cartId}`
            });
        }

        return res.json(cart);
    } catch (error) {
        console.error("Error al obtener el carrito");
        return res.status(500).send("Error interno del servidor", error);
    }
});

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const cart = await CC.getCartById(cartId);

        if (!cart) {
            console.error("No se pudo encontrar el carrito con ID:", cartId);
            return res.status(404).json({
                error: `No se encontró el carrito con ID ${cartId}`
            });
        }

        return res.json(cart);
    } catch (error) {
        console.error("Error al obtener el carrito:");
        return res.status(500).send("Error interno del servidor", error);
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const { quantity } = req.body;

    
    try {
        await CC.addProductToCart(cartId, productId, quantity);
        res.status(200).send("Producto agregado al carrito");
    } catch (error) {
        console.error("Error al agregar producto al carrito");
        res.status(500).send("Error al agregar producto al carrito", error);
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    
    try {
        await CC.removeProductFromCart(cartId, productId);
        res.send('Producto eliminado del carrito correctamente');
    } catch (error) {
        console.error("Error al eliminar el producto del carrito:");
        res.status(500).send('Error al eliminar el producto del carrito', error);
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const { quantity } = req.body;

    try {
        await CC.updateProductQuantity(cartId, productId, quantity);
        res.send('Cantidad de producto actualizada correctamente');
    } catch (error) {
        console.error("Error al actualizar la cantidad del producto:");
        res.status(500).send('Error al actualizar la cantidad del producto', error);
    }
});

router.put('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    const { products } = req.body;
    try {
        await CC.updateCart(cartId, products);
        res.send('Carrito actualizado correctamente');
    } catch (error) {
        console.error("Error al actualizar la cantidad del producto:");
        res.status(500).send('Error al actualizar la cantidad del producto', error);
    }
})

router.delete('/:cid', async (req, res) => {
    //DB
    const cartId = req.params.cid;

    try {
        await CC.removeAllProductsFromCart(cartId);
        res.send('Productos eliminados del carrito correctamente');
    } catch (error) {
        console.error("Error al eliminar los productos del carrito:");
        res.status(500).send('Error al eliminar los productos del carrito', error);
    }
});

export default cartsRouter;