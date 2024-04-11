const { app } = require('@azure/functions');

app.http('user', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const data = await request.json();
        console.log(data)
        const reply = {
            message:"ok"
        }

        return { body: JSON.stringify(reply) };
    }
});
