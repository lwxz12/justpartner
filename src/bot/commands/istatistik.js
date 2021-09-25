const Discord = require('discord.js');
const moment = require('moment');
moment.locale('tr');
const momentdurat = require('moment-duration-format');

module.exports = {
  name: "istatistik",
  aliases: ["i","botbilgi","bot-bilgi","botinfo","bot-info","stats"],
  run: async (client, message, args) => {     
  
  var os = require('os')
  let iş = os.cpus()[0]

  return message.channel.send(new Discord.MessageEmbed()
  .setColor("BLUE")
  .setThumbnail(message.author.avatarURL({dynamic: true}))
  .setAuthor(client.user.username+' | İstatistikler', client.user.avatarURL())
  .addField("❯ Bot Kurucuları", `\`${client.users.cache.get("642752306441617417").tag}\` & \`${client.users.cache.get("831123996526247966").tag}\``)
  .addField('❯ Ping', `\`${client.ws.ping}ms\``, true)
  .addField('❯ Uptime', `\`${moment.duration(client.uptime).format(`w [hafta] d [gün] h [saat] m [dakika] s [saniye]`)}\``, true)
  .addField('❯ Kullanıcı Sayısı', `\`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``, true)
  .addField("❯ Sunucu Sayısı", `\`${client.guilds.cache.size.toLocaleString()}\``, true)
  .addField("❯ Kanal Sayısı", `\`${client.channels.cache.size.toLocaleString()}\``, true)
  .addField("❯ Discord.JS Versiyonu", `\`v${Discord.version}\``, true)
  .addField("❯ Node.JS Versiyonu", `\`${process.version}\``, true)
  .addField('❯ CPU Kullanımı', '`'+ (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)+' MB`', true))
  .setFooter(`${message.author.username}`, message.author.avatarURL())
  .setTimestamp()
  }
}