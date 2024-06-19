import UserService from "../dao/mongo/user.mongo.js";
import UserRepository from "./UsersRepository.js";
import ProductService from "../dao/mongo/product.mongo.js";
import ProductRepository from "./ProductsRepository.js";
import CartService from "../dao/mongo/cart.mongo.js";
import CartRepository from "./CartsRepository.js";
import MessageService from "../dao/mongo/message.mongo.js";
import MessageRepository from "./MessagesRepository.js";

export const UsersService = new UserRepository(new UserService());
export const ProductsService = new ProductRepository(new ProductService());
export const CartsService = new CartRepository(new CartService());
export const MessagesService = new MessageRepository(new MessageService());
