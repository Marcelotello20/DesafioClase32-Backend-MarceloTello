import express from "express";

import MessageController from "../controllers/messageController.js";

const router = express.Router();
const chatRouter = router;

const MC = new MessageController();

router.get("/messages", async (req, res) => {
    try {
        const messages = await MC.getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/message", async (req, res) => {
    const { user, message } = req.body;

    if (!user || !message) {
        return res.status(400).json({ error: "El usuario y el mensaje son obligatorios" });
    }

    try {
        // Aquí deberías guardar el mensaje en MongoDB
        const newMessage = await MC.addMessage(user, message);
        
        // Emitir el mensaje a todos los clientes
        io.emit("messageLogs", await MC.getAllMessages());

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error al guardar el mensaje:", error);
        res.status(500).send("Error interno del servidor");
    }
});


export default chatRouter;