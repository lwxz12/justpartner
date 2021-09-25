const Discord = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "sunucubilgi",
  aliases: ["sunucu-bilgi", "serverinfo", "server-info"],
  run: async (client, message, args, db) => {
    var uygunluk = ""
    var sesliaktif = 0
    if (message.guild.memberCount >= 800 && message.guild.premiumSubscriptionCount >= 2) {
      uygunluk = "**uygun!** [Ortaklığımıza başvur](https://discord.gg/YEfVfKCn)"
    } else {
      uygunluk = "**uygun değil!** "
    }
    
    const emb = new Discord.MessageEmbed()
    .setColor("#008cff")
    .setAuthor(`${message.guild.name}`, message.guild.iconURL({dynamic: true}))
    .setTitle("Just Partner - Sunucu için bilgiler.")
    .setDescription(`${(db.has(`server.${message.guild.id}.ourpartner`) === false) ? `Bu sunucu ortaklığımız için ${uygunluk}` : `Bu sunucu **Just Partner**'in ortağı!`}`)
    .setFooter(`Sunucuların partnerlik işlerini kolaylaştırıyorum!`, message.author.avatarURL({dynamic: true}))
    .addField(`<:kurucu:864068896549896212> Sunucu Sahibi`, `> **${message.guild.owner.user.tag}**`, true)
    .addField(`<:yetkili:864069913983582228> Sunucu Yöneticileri`, `> **${message.guild.members.cache.filter(a => a.permissions.has("ADMINISTRATOR") === true && a.user.bot === false).size} üye**`, true)
    .addField(`<:botlar:863787511854661664> Yönetici Botlar`, `> **${message.guild.members.cache.filter(a => a.permissions.has("ADMINISTRATOR") === true && a.user.bot === true).size} bot**`, true)
    .addField(`<:uye:864106405211275295> Üye Denetimi`, `> **${message.guild.members.cache.filter(a => a.user.bot === false).size} üye**,\n> **${message.guild.members.cache.filter(a => a.user.bot === true).size} bot**`, true)
    .addField(`<:aktflk:864107918168162335> Üye Aktifliği`, `> <:online:863801419978768404> **${message.guild.members.cache.filter(a => a.user.presence.status !== "offline").size} aktif,**\n> <:gorumez:864108761416990760> **${message.guild.members.cache.filter(a => a.user.presence.status === "offline").size} çevrimdışı**.`, true)
    .addField(`<:sesaktflk:864112559286911006> Sesli Aktifliği`, `> **${sesliaktif} üye**`, true)
    .addField(`<:kanal:864124099650519060> Toplam Kanal Sayısı`, `> **${message.guild.channels.cache.size} kanal**`, true)
    .addField(`<:rol:864124848317136916> Toplam Rol Sayısı`, `> **${message.guild.roles.cache.size} rol**`, true)
    .addField(`<:partner:864128180327022592> Toplam Partnerlik Sayısı`, `> **${(db.get(`server.${message.guild.id}.partner.partners`) || []).length} partnerlik**`, true)
    .addField(`<:katilma:863798674201772063> Sunucuya Katılma Tarihim`, `> **${moment(message.guild.members.cache.get(client.user.id).joinedAt).add(3, "hours").format("DD/MM/YYYY HH:mm")}**`, true)
    .addField(`<:kurulma:864127304111489024> Sunucu Açılış Tarihi`, `> **${moment(message.guild.createdAt).add(3, "hours").format("DD/MM/YYYY HH:mm")}**`, true)
    return message.channel.send(emb)
  }
}