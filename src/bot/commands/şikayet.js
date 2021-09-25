const Discord = require("discord.js")
const {control} = require("../utils/functions.js")

module.exports = {
  name: "şikayet",
  aliases: ["bildir", "bildiri", "sikayet", "bug"],
  run: async (client, message, args, db) => {	
    let sikayet = args.join(" ")
    if (!sikayet) return client.embed({message, type: "h", text: "Lütfen şikayetinizi belirterek komutu tekrar kullanmayı deneyin."})
    if (control(sikayet).kufur === true) return client.embed({message, type: "h", text: "Lütfen şikayetinizde küfür bulundurmayın. Bu tür durumlarda cezanız karalisteye kadar uzanabilir."})   
    if (control(sikayet).reklam === true) return client.embed({message, type: "h", text: "Lütfen şikayetinizde reklam bulundurmayın. Bu tür durumlarda cezanız karalisteye kadar uzanabilir."})
    const embed2 = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setAuthor(`${message.author.username}`, message.author.avatarURL({dynamic: true}))
    .setTitle("Just Partner - Yeni bir şikayet!")
    .setDescription(`${sikayet}`)
    .addField(`<a:sunucu:864152991971672074> Sunucu`, `${message.guild.name}`, true)
    .addField(`<:tac:864068896549896212> Sunucu Kurucusu`, `${message.guild.owner.user.tag}`, true)
    .setFooter(`Şikayetleriniz bizim için önemli. Teşekkür ederiz!`, client.user.avatarURL())
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    client.channels.cache.get("864061350232981514").send(embed2)
    message.delete({timeout: 10000})
    return client.embed({message, type: "b", text: "Şikayetleriniz [bizlere](https://discord.gg/3XQM7XcAT9) başarıyla bildirildi, <@" + message.author.id + ">! Çok teşekkür ederiz.", timeout: 10000})     
  }
}