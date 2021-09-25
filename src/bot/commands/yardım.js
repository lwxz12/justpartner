const {MessageEmbed} = require("discord.js")

module.exports = {
  name: "yardım",
  aliases: ["help"],
  run: async (client, message, args, db) => {			
    const emb = new MessageEmbed()
    .setTitle(`${client.user.username} - Komutlar`)
    .setAuthor("Just Partner - Türkçe partnerlik ve anlaşma botu.", client.user.avatarURL())
    .addField(`<:robot:863787511854661664> Bot Sayfası`, "Botun istatistikleri, bilgileri, gecikmelerini gösteren komutlar.", true)
    .addField(`<:uye:864171169719648307> Kullanıcı Sayfası`, "Kullanıcı bilgileri, sunucu bilgileri ve bütün kullanıcıların kullanabileceği komutlar.", true)
    .addField(`<:partner:864128180327022592> Partnerlik Sayfası`, "Yetkililerin partnerlik işlemleri yapabileceği komutlar.", true)
    .setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true}))
    .setColor("#05a3fa")
    .setThumbnail(client.user.avatarURL())
    return message.channel.send(emb).then(async (msg) => {
      
      var filtre = (reaction, user) => user.id !== "657278379053154313" && user.id === message.author.id;
      var collector = msg.createReactionCollector(filtre, {
        time: 300000
      });

      await msg.react("863787511854661664")
      await msg.react("864171169719648307")
      await msg.react("864128180327022592")

      collector.on("collect", async (reaction, user) => {
        try {
          reaction.users.remove(user)
        } catch(err) {}

        switch (reaction.emoji.id) {

          case "863787511854661664":

            emb.fields = []
            emb.setTitle("Just Partner - Bot Sayfası")
            emb.setDescription(`> **j!ping** - **Botun gecikme süresini gösterir.**\n> **j!öneri** - **Bot hakkında bir öneri paylaşırsınız.**\n> **j!yardım** - **Botun yardım menüsünü görüntülersiniz.**\n> **j!şikayet** - **Bot hakkında bir şikayet paylaşırsınız.**\n> **j!ilet** - **Bot sahibine özel bir mesaj iletirsiniz.**\n> **j!davet** - **Botun ilgili linklerini ve davet linklerini görüntülersiniz.**`)
            msg.edit(emb)

          break;

          case "864171169719648307":

            emb.fields = []
            emb.setTitle("Just Partner - Kullanıcı Sayfası")
            emb.setDescription(`> **j!sunucubilgi** - **Sunucunun bilgilerini gösterir.**\n> **j!kullanıcıbilgi** - **Kullanıcının bilgilerini gösterir.**`)
            msg.edit(emb)

          break;

          case "864128180327022592":
            
          try {
            emb.fields = []
            emb.setTitle("Just Partner - Partnerlik Sayfası")  
            if (db.has(`server.${message.guild.id}.partner`) === false || db.has(`server.${message.guild.id}.partner.kanal`) === false || db.has(`server.${message.guild.id}.partner.rol`) === false || db.has(`server.${message.guild.id}.partner.text`) === false) {
              emb.setDescription("Bu sunucuda partner sistemi kurulumu yapılmamış. Adımlar:" + `\n
              ${(db.has(`server.${message.guild.id}.partner.kanal`) === false) ? "Partner kanalını ayarla: `j!partner ayarla kanal #KANAL`\n\n" : ""}${(db.has(`server.${message.guild.id}.partner.rol`) === false) ? "Partner yetkilisi rolünü ayarla: `j!partner ayarla rol @ROL`\n\n" : ""}${(db.has(`server.${message.guild.id}.partner.text`) === false) ? "Partner textini ayarla: `j!partner ayarla text PARTNER_MESAJIN`\n\n" : ""}
              Bu ayarlamaları tamamladıktan sonra, yardım komutunu tekrar kullanmayı ve partner sayfasını açmayı deneyin. Partnerlik komutları gösterilecektir!`)
            } else {
              emb.setDescription("Komutlarvıdıdıdı")
            }
            msg.edit(emb)
          } catch(err) {
            console.log(err)            
          }
          break;

        }
      })

    })
  }
}
