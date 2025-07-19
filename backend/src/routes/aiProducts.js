const express = require('express');
const router = express.Router();
const openAIController = require('../controllers/openAIController');
const translatorController = require('../controllers/translatorController');

// Route for OpenAI
router.post('/openai', openAIController.generateText);

// Route for AI Translator
router.post('/translate', translatorController.translateText);

module.exports = router;
