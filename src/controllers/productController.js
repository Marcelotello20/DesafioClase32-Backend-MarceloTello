import { ProductsService } from "../repository";


export default class ProductController {

    constructor() {
        this.productService = new ProductsService();
    }

    async add(product) {
        const {title, description, code, price, stock, category, thumbnails} = product;

        if (!title || !code || !category || !price) {
            throw new Error('Error al crear el producto');
        }
        
        return await this.productService.addProduct({title, description, code, price, stock, category, thumbnails: thumbnails ?? []});
    }

    async getAll() {
        return await this.productService.getProducts();
    }

    async getByID(productId) {
        return await this.productService.getProductById(productId);
    }

    async update(productId,update) {
        if (!productId || !update ) {
            throw new Error('Error al actualizar el producto, falta información');
        }
        return await this.productService.updateProduct(productId,update);
    }
    
    async delete(productId) {
        return await this.productService.deleteProduct(productId);
    }

}