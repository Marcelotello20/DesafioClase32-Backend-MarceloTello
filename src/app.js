import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import __dirname from './utils/utils.js';
import initializePassport from './config/passport.config.js';
import config from './config.js';
import websocket from './websocket.js';
import errorHandler from './middlewares/errors/index.js';
import { addLogger } from './utils/logger.js';
import logger from './utils/logger.js';  // Importa el logger configurado

import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

const app = express();

// MongoDB connect
mongoose.connect(config.mongo_url);
mongoose.connection.on('connected', () => {
    logger.info('Conectado a MongoDB');
});
mongoose.connection.on('error', (err) => {
    logger.error('Error de conexión a MongoDB:', err);
});

// Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));
app.use(cookieParser());
app.use(addLogger);  
app.use(errorHandler);

// Session
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo_url,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3000,
    }),
    secret: "asd3ssfggwu22",
    resave: false,
    saveUninitialized: false
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/sessions', usersRouter);

const PORT = config.port || 8080;
const httpServer = app.listen(PORT, () => {
    logger.info("Escuchando por el puerto 8080");
});

const io = new Server(httpServer);

websocket(io);

app.get('/loggerTest', (req, res) => {
    req.logger.debug('Este es un mensaje de debug');
    req.logger.http('Este es un mensaje de http');
    req.logger.info('Este es un mensaje de info');
    req.logger.warning('Este es un mensaje de warning');
    req.logger.error('Este es un mensaje de error');
    req.logger.fatal('Este es un mensaje de fatal');
    res.send('Prueba de logger completada');
});