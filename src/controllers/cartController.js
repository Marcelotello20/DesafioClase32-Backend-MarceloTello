import { TicketsService, ProductsService, CartsService } from "../repository";

export default class CartController {

    constructor() {
        this.cartService = CartsService;
        this.ticketService = TicketsService;
        this.productService = ProductsService;
    }

    async create() {
        return await this.cartService.createCart();
    }

    async addProduct(cartId, productId, quantity) {
        return await this.cartService.addProductToCart(cartId, productId, quantity);
    }

    async getAll() {
        return await this.cartService.getCarts();
    }

    async getById(cartId) {
        return await this.cartService.getCartById(cartId);
    }

    async removeAllProducts(cartId) {
        return await this.cartService.removeAllProductsToCart(cartId);
    }

    async removeProduct(cartId, productId) {
        return await this.cartService.removeProductToCart(cartId, productId);
    }

    async update(cartId,productsData) {
        if (!productId || !productsData ) {
            throw new Error('Error al actualizar el carrito, falta información');
        }
        return await this.cartService.updateCart(cartId,productsData);
    }

    async updateQuantity(cartId, productId, quantity) {
        return await this.cartService.updateProductQuantity(cartId, productId, quantity);
    }

    async purchaseCart(cartId, userEmail) {
        try {
            const cart = await this.cartService.getCartById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            let totalAmount = 0;
            let productsNotProcessed = [];

            await Promise.all(cart.products.map(async (item) => {
                const product = await this.productService.getProductByID(item.product._id);

                if (product.stock >= item.quantity) {
                    product.stock -= item.quantity;
                    await this.productService.update(product._id, product);
                    totalAmount += product.price * item.quantity;
                } else {
                    productsNotProcessed.push(item.product._id);
                }
            }));

            if (totalAmount > 0) {
                const ticket = await this.ticketService.createTicket({
                    purchase_datetime: new Date(),
                    amount: totalAmount,
                    purchaser: userEmail,
                });

                cart.products = cart.products.filter(item => !productsNotProcessed.includes(item.product._id));
                await this.cartService.updateCart(cartId, cart);

                return { ticket, productsNotProcessed };
            } else {
                throw new Error('No hay productos disponibles para la compra.');
            }
        } catch (error) {
            console.error('Error al procesar la compra:', error);
            throw new Error('Error al procesar la compra.');
        }
    }

    async delete(cartId) {
        return await this.cartService.deleteCart(cartId);
    }

}