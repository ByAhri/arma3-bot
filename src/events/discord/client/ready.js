const {
    Client, Events, ActivityType
} = require("discord.js");
const { getArmaServer, deployCommands } = require("../../../functions/util");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * @param {Client} client 
     */
    async execute(client) {
        console.log(client.user?.tag.cyan + ` esta online !!`);
        deployCommands(client);

        async function clientPresenceLoop() {
            let presenceData = {
                status: "dnd",
                activities: [
                    {
                        name: "😴",
                        type: ActivityType.Custom,
                        url: "https://www.youtube.com/watch?v=WjrgyufSsus"
                    }
                ]
            };
            try {
                const info = await getArmaServer();
                if (info) {
                    presenceData.status = "online";
                    presenceData.activities[0].name = `${info.map}`;
                    presenceData.activities[0].type = ActivityType.Competing;
                }
            } catch (error) {
                console.error(error);
            };
            client.user.setPresence(presenceData);
        };

        clientPresenceLoop();
        
        setInterval(() => {
            clientPresenceLoop();
        }, 30 * 1000);
    }
}