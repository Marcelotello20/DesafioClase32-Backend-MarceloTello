import { CartsService } from "../repository";

export default class CartController {

    constructor() {
        this.cartService = new CartsService();
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

    async purchase(cartId, userEmail) {
        return await this.cartService.purchaseCart(cartId, userEmail);
    }

    async delete(cartId) {
        return await this.cartService.deleteCart(cartId);
    }

}