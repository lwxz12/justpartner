const Discord = require("discord.js")
const {control} = require("../utils/functions.js")

module.exports = {
  name: "ilet",
  aliases: ["ileti", "sahibimeilet", "sahibime-ilet", "sahip-ilet", "sahipilet"],
  run: async (client, message, args, db) => {	
    let ileti = args.join(" ")
    if (!ileti) return client.embed({message, type: "h", text: "Lütfen sahibime iletmek istediğiniz mesajı belirterek komutu tekrar kullanmayı deneyin."})
    if (control(ileti).kufur === true) return client.embed({message, type: "h", text: "Lütfen iletinizde küfür bulundurmayın. Bu tür durumlarda cezanız karalisteye kadar uzanabilir."})   
    if (control(ileti).reklam === true) return client.embed({message, type: "h", text: "Lütfen iletinizde reklam bulundurmayın. Bu tür durumlarda cezanız karalisteye kadar uzanabilir."})
    const embed2 = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setAuthor(`${message.author.username}`, message.author.avatarURL({dynamic: true}))
    .setTitle("Just Partner - Yeni bir mesaj!")
    .setDescription(`${ileti}`)
    .addField(`<a:sunucu:864152991971672074> Sunucu`, `${message.guild.name}`, true)
    .addField(`<:tac:864068896549896212> Sunucu Kurucusu`, `${message.guild.owner.user.tag}`, true)
    .setFooter(`Bu iletiyi gönderen kullanıcı: ${message.author.tag}'dır!`, client.user.avatarURL())
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    client.users.cache.get("642752306441617417").send(embed2)
    message.delete({timeout: 10000})
    return client.embed({message, type: "b", text: "İletmek istediğin mesajı sahibime ulaştırdım!", timeout: 10000})     
  }
}