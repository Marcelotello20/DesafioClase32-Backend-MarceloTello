import { CartsService } from "../repository";

export default class CartController {

    constructor() {
        this.cartService = new CartsService();
    }

    async createCart() {
        return await this.cartService.create();
    }

    async addProductToCart(cartId, productId, quantity) {
        return await this.cartService.addProduct(cartId, productId, quantity);
    }

    async getCarts() {
        return await this.cartService.getAll();
    }

    async getCartById(cartId) {
        return await this.cartService.getById(cartId);
    }

    async deleteCart(cartId) {
        return await this.cartService.delete(cartId);
    }

    async removeAllProductsFromCart(cartId) {
        return await this.cartService.removeAllProducts(cartId);
    }

    async removeProductFromCart(cartId, productId) {
        return await this.cartService.removeProduct(cartId, productId);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await this.cartService.updateQuantity(cartId, productId, quantity);
    }

    
    async updateCart(cartId,productsData) {
        if (!productId || !productsData ) {
            throw new Error('Error al actualizar el carrito, falta información');
        }
        return await this.cartService.update(cartId,productsData);
    }

}