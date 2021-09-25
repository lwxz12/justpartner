const {MessageEmbed} = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "kullanıcıbilgi",
  aliases: ["kullanıcı-bilgi", "userinfo", "user-info", "kullanıcı", "user"],
  run: async (client, message, args) => {	 
    var user = message.mentions.users.first() || message.author
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("Kullanıcı Bilgilerin")
    .setDescription(`» Sunucularım arasında sana ait olan **${client.guilds.cache.filter(a => a.ownerID === user.id).size} sunucu** bulunuyor.`)
    .setAuthor(`${user.username}`, user.avatarURL({dynamic: true}))
    .setThumbnail(user.avatarURL({dynamic: true}))
    .addField(`👤 Kullanıcı Adı`, `\`${user.username}\``, true)
    .addField(`<:bot:863787511854661664> Bot Mu`, `\`${(user.bot === true) ? "Evet" : "Hayır"}\``, true)
    .addField(`<:tarih:864127304111489024> Oluşturulma Tarihi`, `\`${moment(user.createdAt).add(3, "hours").format("DD/MM/YYYY HH:mm:SS")}\``, true)
    .addField(`<:aktiflik:864107918168162335> Durum/Aktivite`, `\`${(user.presence.activities.length === 0 || user.presence.activities[0].type !== "CUSTOM_STATUS" && user.presence.activities[0].type !== "PLAYING") ? "Yok." : ((user.presence.activities[0].type === "CUSTOM_STATUS") ? `${user.presence.activities[0].state}` : `${user.presence.activities[0].name} Oynuyor`).replace(null, "Yok.")}\``)
    return message.channel.send(embed)
  }
}
