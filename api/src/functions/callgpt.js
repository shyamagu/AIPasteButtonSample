const { app } = require('@azure/functions');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
require('dotenv').config();

const apiKey = process.env.AOAI_API_KEY;
const endpoint = process.env.AOAI_ENDPOINT;
const model = process.env.AOAI_MODEL;


app.http('callgpt', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const data = await request.json();
        keys = data.keys;
        text = data.text;

        const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

        const system_prompt = `
        あなたはJSON生成器です。以下のキー情報に入力された内容をマッピングしたJSONを生成します。
        #キー情報: ${keys}
        `;

        const user_prompt = text;

        const messages = [
            {role: "system", content: system_prompt},
            {role: "user", content: user_prompt}
        ]

        const result = await client.getChatCompletions(model, messages, {responseFormat: { type: "json_object" }});

        let message;
        for (const choice of result.choices) {
          message = choice.message?.content;
        }

        const reply = {
            jsonStr: message
        }

        return { body: JSON.stringify(reply) };
    }
});
