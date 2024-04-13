require('dotenv/config');
const{Client} = require('discord.js')
const{OpenAI} = require('openai')

const client = new Client({ 
    intents: ['Guilds', 'GuildMembers', 'GuildMessages','MessageContent'],
});

client.on('ready', () => {
    console.log('Bot online')
});
const CHANNELS = ['1228668707224682578']
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})
client.on('messageCreate', async (message) => { // <-- Mark the function as async
    if (message.author.bot)  return;
    if (!CHANNELS.includes(message.channelId)&& !message.mentions.users.has(client.user.id)) return;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: [
                {
                    role: 'system',
                    content: 'Chat GPT is chatbot'
                },
                {
                    role: 'user',
                    content: message.content,
                }
            ]
        });
        message.reply(response.choices[0].message.content);
    } catch (error) {
        console.error('OpenAI Error:\n', error);
    }
});


client.login(process.env.TOKEN);

