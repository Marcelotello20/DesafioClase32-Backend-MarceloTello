import { ProductsService } from "../repository";


export default class ProductController {

    constructor() {
        this.productService = new ProductsService();
    }

    async addProduct(product) {
        const {title, description, code, price, stock, category, thumbnails} = product;

        if (!title || !code || !category || !price) {
            throw new Error('Error al crear el producto');
        }
        
        return await this.productService.add({title, description, code, price, stock, category, thumbnails: thumbnails ?? []});
    }

    async getProducts() {
        return await this.productService.getAll();
    }

    async getProductByID(productId) {
        return await this.productService.getById(productId);
    }

    async updateProduct(productId,update) {
        if (!productId || !update ) {
            throw new Error('Error al actualizar el producto, falta información');
        }
        return await this.productService.update(productId,update);
    }
    
    async deleteProduct(productId) {
        return await this.productService.delete(productId);
    }

}