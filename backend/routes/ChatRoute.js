import { Router } from 'express';
import { handleChat } from '../controller/ChatController.js';

const route = Router();

route.post('/chat', handleChat);

export default route;
