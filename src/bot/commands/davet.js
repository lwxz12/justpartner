const {MessageEmbed} = require("discord.js")

module.exports = {
  name: "davet",
  aliases: ["linkler", "linklerim", "invite", "davetet", "davet-et"],
  run: async (client, message, args) => {	 
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("Just Partner")
    .setAuthor(`${message.author.username}`, message.author.avatarURL({dynamic: true}))
    .setDescription(`> Merhaba, <@${message.author.id}>! Alanlarımı merak ettiğin için teşekkür ederim. Alttaki mavi yazıların üstüne tıklayarak istediğin linke erişim sağlayabilirsin.\n> \n> [Davet Et](https://discord.com/oauth2/authorize?client_id=652518857772367872&permissions=8&scope=bot) - [Destek Sunucusu](https://discord.gg/3XQM7XcAT9)`)
    .setFooter(`Partnerlik işlemlerinizi kolaylaştırıyorum!`, client.user.avatarURL())
    return message.channel.send(embed)
  }
}
