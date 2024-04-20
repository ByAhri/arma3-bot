const { Client, SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const { GameDig } = require("gamedig");
const { getArmaServer } = require("../../../functions/util");
require("colors");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("arma")
    .setDMPermission(true)
    .setDescription("arma server info"),
    category: "game",
    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(client, interaction, color) {

        const { user, member } = interaction;

        let info, embed;

        try {
            info = await getArmaServer();
        } catch (error) {
            console.error(error);
        }

        if (info) {
            const players = `\`${info.numplayers}/${info.maxplayers}\`\n\`\`\`js\n${info.players.map(p => `\n- ${p.name}\nscore: ${p.raw.score}`).join("\n\n")}\n\`\`\``;
            embed = new EmbedBuilder()
            .setTitle(info.name)
            .setFields([
                {
                    name: `estado`,
                    value: `online`,
                    inline: true
                },
                {
                    name: `ping`,
                    value: `${info.ping}`,
                    inline: true
                },
                {
                    name: `mapa`,
                    value: `${info.map}`,
                    inline: true
                },
                {
                    name: `jugadores`,
                    value: players,
                    inline: true
                }
            ])
            .setColor("#85dd86")
            ;
        } else {
            embed = new EmbedBuilder()
            .setTitle("server offline")
            .setDescription(`${member.displayName}, no pude conectar con el servidor`)
            .setFields({
                name: `estado`,
                value: `offline`
            })
            .setColor("#da5454");
        }

        return interaction.reply({ embeds: [embed] });
    },
};