module.exports = {
  name: "ping",
  aliases: ["gecikme"],
  run: async (client, message, args, db) => {
    var ping = client.ws.ping
    var ping2 = Date.now() - message.createdTimestamp;			
    var yorumnormal = ""
    var yorummesaj = ""
    if (ping < 70) {
      yorumnormal = "oldukca iyi"
    } else if (ping >= 70 && ping < 120) {
      yorumnormal = "orta"
    } else if (ping >= 120) {
      yorumnormal = "kötü"
    }
    if (ping2 < 70) {
      yorummesaj = "oldukca iyi!"
    } else if (ping2 >= 70 && ping2 < 120) {
      yorummesaj = "orta!"
    } else if (ping2 >= 120) {
      yorummesaj = "kötü!"
    }
    return message.channel.send(
      client.embed({
        title: "Just Partner - Gecikme Süresi",
        color: "BLUE",
        description: `<:ping:863798674201772063> Botun ws gecikmesi **${ping}ms** ve botun mesaj gecikmesi **${ping2}ms**'dir. Botun ws gecikmesi **${yorumnormal}**, mesaj gecikmesi ise **${yorummesaj}**`,
        author: {
          text: `${message.author.username}, sizler için hızlı çalışmak için geliştiriliyorum.`,
          url: message.author.avatarURL({dynamic: true})
        },
        footer: {
          text: "Gecikme bilgilerimi kontrol ettiğin için teşekkürler!"
        }
      })
    )
  }
}