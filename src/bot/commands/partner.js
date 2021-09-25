const {MessageEmbed} = require("discord.js")
const tool = require("../utils/functions.js")
const moment = require("moment")
moment.locale("tr")
module.exports = {
  name: "partner",
  aliases: ["partner-sistemi", "partnersistemi"],
  run: async (client, message, args, db) => {	 
    var constool = new tool({client})
    var categories = ["ayarla", "sıfırla", "bul", "ol"]
    var systems = ["kanal", "yetkili-rol", "text", "şart", "aktif-şart"]
    var category = args[0]
    var system = args[1]
    if (category !== "bul" && !category && message.member.permissions.has("ADMINISTRATOR") === false) return client.embed({message, type: "h", text: "Partnerlik sisteminde ayarlama yapmak için sunucuda **Yönetici** yetkiniz bulunmalıdır!"})
    if (categories.includes(category) === false) return client.embed({
      message,
      type: "h",
      text: "Lütfen bir argüman belirtin.\n\nListe: [" + categories.map(a => `\`${a}\``).join(", ") + "]"
    })
    if (category === categories[0]) {
  
      if (systems.includes(system) === false) return client.embed({
        message,
        type: "h",
        text: "Lütfen bir sistem belirtin.\n\nListe: [" + systems.map(a => `\`${a}\``).join(", ") + "]"
      })
      
      if (system === systems[0]) {
        var kanal = message.mentions.channels.first()
        if (!kanal) return client.embed({message, type: "h", text: "Lütfen bir kanal belirtin!"})
        if (db.has(`server.${message.guild.id}.partner.kanal`) === true) return client.embed({message, type: "h", text: "Bu sunucuda partnerlik kanalı ayarlı! Sıfırlayıp tekrar ayarlayabilirsin. `j!partner sıfırla kanal`"})
        db.set(`server.${message.guild.id}.partner.kanal`, kanal.id)
        return client.embed({message, type: "b", text: "Sunucunun partnerlik kanalı <#" + kanal.id + "> olarak ayarlandı!"})
      } else if (system === systems[1]) {
        var rol = message.mentions.roles.first()
        if (!rol) return client.embed({message, type: "h", text: "Lütfen bir rol belirtin!"})
        if (db.has(`server.${message.guild.id}.partner.rol`) === true) return client.embed({message, type: "h", text: "Bu sunucuda partner yetkilisi rolü ayarlı! Sıfırlayıp tekrar ayarlayabilirsin. `j!partner sıfırla yetkili-rol`"})
        db.set(`server.${message.guild.id}.partner.rol`, rol.id)
        return client.embed({message, type: "b", text: "Sunucunun partner yetkilisi rolü <@&" + rol.id + "> olarak ayarlandı!"})
      } else if (system === systems[2]) {
        var text = args.slice(2).join(" ")
        if (!text) return client.embed({message, type: "h", text: "Lütfen partnerlik mesajınızı belirtin!"})
        if (db.has(`server.${message.guild.id}.partner.text`) === true) return client.embed({message, type: "h", text: "Bu sunucuda partnerlik mesajı ayarlı! Sıfırlayıp tekrar ayarlayabilirsin. `j!partner sıfırla text`"})
        if (tool.control(text).kufur === true) return client.embed({message, type: "h", text: "Partnerlik mesajın küfür içeriyor! Küfür içermiyorsa lütfen [destek sunucumuz](https://discord.gg/3XQM7XcAT9)dan iletişime geç."})
        if (tool.control(text).reklam === false) return client.embed({message, type: "h", text: "Partnerlik mesajında en az 1 link bulundurman şart!"})
        if (text.includes("@everyone") === false && text.includes("@here") === false) return client.embed({message, type: "h", text: "Lütfen partnerlik mesajında en az 1 etiket bulundur! Örneğin; @everyone veya @here gibi gibi..."})
        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(client.user.username, client.user.avatarURL())
        .setDescription(`${text}`)
        message.channel.send(embed).then(async (msgcik) => {
          
          var filtre = (reaction, user) => user.id !== "657278379053154313" && user.id === message.author.id;
          var collector = msgcik.createReactionCollector(filtre, {
            time: 300000
          });
          
          await msgcik.react("864067085890224148")
          await msgcik.react("864067105192411136")
          
          collector.on("collect", async (reaction, user) => {
          
            if (reaction.emoji.id === "864067105192411136") {
              
              embed.setFooter(`Bu partner mesajı ${message.author.username} tarafından iptal edildi.`, "https://cdn.discordapp.com/emojis/864067105192411136.png?v=1")
              
              try {
              msgcik.reactions.removeAll()
              }catch(err){}
              return msgcik.edit(embed)
              
            } else if (reaction.emoji.id === "864067085890224148") {
              
              embed.setFooter(`Bu partner mesajı sunucunun partnerlik mesajı olarak ayarlandı.`, "https://cdn.discordapp.com/emojis/864067085890224148.png")
              db.set(`server.${message.guild.id}.partner.text`, text)
              try{msgcik.reactions.removeAll()}catch(err){}
              msgcik.edit(embed)
              
            }
          
          })
          
        })
      } else if (system === systems[3]) {
        
        var sayi = args[2]
        if (!sayi) return client.embed({message, type: "h", text: "Lütfen bir şart sayı belirtin!"})
        if (db.has(`server.${message.guild.id}.partner.sart`) === true) return client.embed({message, type: "h", text: "Bu sunucuda partnerlik şartı ayarlı! Sıfırlayıp tekrar ayarlayabilirsin. `j!partner sıfırla şart`"})
        if (isNaN(sayi) === true) return client.embed({message, type: "h", text: "Lütfen bir şart **__sayı__** belirtin!"})
        db.set(`server.${message.guild.id}.partner.sart`, sayi)
        return client.embed({message, type: "b", text: "Sunucunun partnerlik şartı **en az " + sayi + " üye** olarak ayarlandı!"})
        
      } else if (system === systems[4]) {

        var sayi = args[2]
        if (!sayi) return client.embed({message, type: "h", text: "Lütfen bir aktif şartı için sayı belirtin!"})
        if (db.has(`server.${message.guild.id}.partner.aktifsart`) === true) return client.embed({message, type: "h", text: "Bu sunucuda partner aktiflik şartı ayarlı! Sıfırlayıp tekrar ayarlayabilirsin. `j!partner sıfırla aktif-şart`"})
        if (isNaN(sayi) === true) return client.embed({message, type: "h", text: "Lütfen bir şart **__sayı__** belirtin!"})
        if (db.has(`server.${message.guild.id}.partner.sart`) && Number(db.get(`server.${message.guild.id}.partner.sart`)) < sayi) return client.embed({message, type: "h", text: "Belirttiğin partner aktiflik şartı, ayarladığın sunucu partner üye şartından fazla!"})
        db.set(`server.${message.guild.id}.partner.aktifsart`, sayi)
        return client.embed({message, type: "b", text: "Sunucunun partner aktiflik şartı **en az " + sayi + " üye** olarak ayarlandı!"})
        
      } else if (system === systems[5]) {
        
        
        
      }
        
    } else if (category === categories[1]) {
      
      if (systems.includes(system) === false) return client.embed({
        message,
        type: "h",
        text: "Lütfen bir sistem belirtin.\n\nListe: [" + systems.map(a => `\`${a}\``).join(", ") + "]"
      })
      
      if (system === systems[0]) {
        
        if (db.has(`server.${message.guild.id}.partner.kanal`) === false) return client.embed({message, type: "h", text: "Bu sunucunun partnerlik kanalı zaten ayarlı değil!"})
        db.delete(`server.${message.guild.id}.partner.kanal`)
        return client.embed({message, type: "b", text: "Sunucunun partnerlik kanalı başarıyla sıfırlandı! Partnerlik kanalı ayarlı olmadan partnerlik sistemine erişemeyeceğini unutma."})
        
      } else if (system === systems[1]) {
        
        if (db.has(`server.${message.guild.id}.partner.rol`) === false) return client.embed({message, type: "h", text: "Bu sunucunun partnerlik rolü zaten ayarlı değil!"})
        db.delete(`server.${message.guild.id}.partner.rol`)
        return client.embed({message, type: "b", text: "Sunucunun partnerlik rolü başarıyla sıfırlandı! Partnerlik rolü ayarlı olmadan partnerlik sistemine erişemeyeceğini unutma."})
        
      } else if (system === systems[2]) {
        
        if (db.has(`server.${message.guild.id}.partner.text`) === false) return client.embed({message, type: "h", text: "Bu sunucunun partnerlik mesajı zaten ayarlı değil!"})
        db.delete(`server.${message.guild.id}.partner.text`)
        return client.embed({message, type: "b", text: "Sunucunun partnerlik mesajı başarıyla sıfırlandı! Partnerlik mesajı ayarlı olmadan partnerlik sistemine erişemeyeceğini unutma."})
        
      } else if (system === systems[3]) {
        
        if (db.has(`server.${message.guild.id}.partner.sart`) === false) return client.embed({message, type: "h", text: "Bu sunucunun partnerlik şartı zaten ayarlı değil!"})
        db.delete(`server.${message.guild.id}.partner.sart`)
        return client.embed({message, type: "b", text: "Sunucunun partnerlik şartı başarıyla sıfırlandı!"})
        
      } else if (system === systems[4]) {
        
        if (db.has(`server.${message.guild.id}.partner.aktifsart`) === false) return client.embed({message, type: "h", text: "Bu sunucunun partner aktiflik şartı zaten ayarlı değil!"})
        db.delete(`server.${message.guild.id}.partner.aktifsart`)
        return client.embed({message, type: "b", text: "Sunucunun partner aktiflik şartı başarıyla sıfırlandı!"})
        
      }
      
    } else if (category === categories[2]) {
      if (tool.kurulum(message.guild.id) === false) return client.embed({message, type: "h", text: "Bu sunucuda partnerlik sisteminin kurulumu bitirilmemiş. **j!yardım** yazıp partner kategorisini seçerek adımları takip edin!"})
      if (db.has(`server.${message.guild.id}.partner.rol`) && message.member.roles.cache.has(db.get(`server.${message.guild.id}.partner.rol`)) === false) return client.embed({message, type: "h", text: `Bu komutu yalnızca \`${message.guild.roles.cache.get(db.get(`server.${message.guild.id}.partner.rol`)).name}\` rolüne sahip olanlar kullanabilir.`})
      const embbbb = new MessageEmbed()
      .setColor("AQUA")
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription(`Sunucular yükleniyor...`)
      .setFooter(message.author.username, message.author.avatarURL({dynamic: true}))
      .setTimestamp()
      .setThumbnail(client.user.avatarURL())
      return message.channel.send(embbbb)
      .then(async (msg) => { 
        var data = client.guilds.cache.filter(a => db.has(`server.${a.id}.partner.kanal`) && db.has(`server.${a.id}.partner.rol`) && db.has(`server.${a.id}.partner.text`))
        var veriler = data.sort((a, b) => b.memberCount - a.memberCount).array()
        var sayfa = 1
        var content = veriler.slice((sayfa - 1) * 3, sayfa * 3);
        var toplamsayfa = veriler.length % 3 == 0 ? veriler.length / 3 : (((veriler.length - (veriler.length % 3)) / 3) + 1)
        var filtre = (reaction, user) => user.id !== "657278379053154313" && user.id === message.author.id;
        var collector = msg.createReactionCollector(filtre, {
          time: 300000
        });
        
        await msg.react("865133473853341706")
        await msg.react("865133644052955147")
        
        embbbb.setDescription("Bulunduğun sayfa: " + sayfa + "/" + toplamsayfa)
        content.forEach((dat) => {
          embbbb.addField(`${dat.name}`, `<:uye:864171169719648307> Üye sayısı: \`${dat.memberCount} kişi\`\n<:aktif:864107918168162335> Aktif üye sayısı: \`${dat.members.cache.filter(a => a.user.presence.status !== "offline").size} kişi\`\n<:tac:864068896549896212> Sunucu kurucusu: \`${dat.owner.user.tag}\`\n<:acls:864127304111489024> Sunucu açılış: \`${moment(dat.createdAt).fromNow()}\`\n<:partner:864128180327022592> Partnerlik sayısı: \`${(db.get(`server.${dat.id}.partner.partners`) || []).length}\`${(db.has(`server.${dat.id}.partner.sart`) === true) ? `\n<:sart:865147962479869953> Şart üye: \`en az ${db.get(`server.${dat.id}.partner.sart`)} kişi\`` : ""}${(db.has(`server.${dat.id}.partner.aktifsart`) === true) ? `\n<:sart:865147962479869953> Şart aktif üye: \`en az ${db.get(`server.${dat.id}.partner.aktifsart`)} kişi\`` : ""}\n<:url:865149013602336788> Sunucu URL: \`${db.get(`server.${dat.id}.partner.url`) || dat.id}\``)
        })
        await msg.edit(embbbb)
        
        collector.on("end", (collected) => {
          msg.delete()
        })
        
        collector.on("collect", (reaction, user) => {
          try {
            reaction.users.remove(user.id)
          }catch(err){}
          switch (reaction.emoji.id){
              
            case "865133473853341706":
              
              sayfa--
              if (sayfa === 0) return sayfa = toplamsayfa
              content = veriler.slice((sayfa - 1) * 3, sayfa * 3);
              embbbb.fields = []
              content.forEach((dat) => {
                embbbb.addField(`${dat.name}`, `<:uye:864171169719648307> Üye sayısı: \`${dat.memberCount} kişi\`\n<:aktif:864107918168162335> Aktif üye sayısı: \`${dat.members.cache.filter(a => a.user.presence.status !== "offline").size} kişi\`\n<:tac:864068896549896212> Sunucu kurucusu: \`${dat.owner.user.tag}\`\n<:acls:864127304111489024> Sunucu açılış: \`${moment(dat.createdAt).fromNow()}\`\n<:partner:864128180327022592> Partnerlik sayısı: \`${(db.get(`server.${dat.id}.partner.partners`) || []).length}\`${(db.has(`server.${dat.id}.partner.sart`) === true) ? `\n<:sart:865147962479869953> Şart üye: \`en az ${db.get(`server.${dat.id}.partner.sart`)} kişi\`` : ""}${(db.has(`server.${dat.id}.partner.aktifsart`) === true) ? `\n<:sart:865147962479869953> Şart aktif üye: \`en az ${db.get(`server.${dat.id}.partner.aktifsart`)} kişi\`` : ""}\n<:url:865149013602336788> Sunucu URL: \`${db.get(`server.${dat.id}.partner.url`) || dat.id}\``)
              })
              embbbb.setDescription("Bulunduğun sayfa: " + sayfa + "/" + toplamsayfa)
              msg.edit(embbbb)
              
            break;
              
            case "865133644052955147":
              
              sayfa++
              content = veriler.slice((sayfa - 1) * 3, sayfa * 3);
              if (content.length === 0) { sayfa = 1; content = veriler.slice((sayfa - 1) * 3, sayfa * 3) }
              embbbb.fields = []
              content.forEach((dat) => {
                embbbb.addField(`${dat.name}`, `<:uye:864171169719648307> Üye sayısı: \`${dat.memberCount} kişi\`\n<:aktif:864107918168162335> Aktif üye sayısı: \`${dat.members.cache.filter(a => a.user.presence.status !== "offline").size} kişi\`\n<:tac:864068896549896212> Sunucu kurucusu: \`${dat.owner.user.tag}\`\n<:acls:864127304111489024> Sunucu açılış: \`${moment(dat.createdAt).fromNow()}\`\n<:partner:864128180327022592> Partnerlik sayısı: \`${(db.get(`server.${dat.id}.partner.partners`) || []).length}\`${(db.has(`server.${dat.id}.partner.sart`) === true) ? `\n<:sart:865147962479869953> Şart üye: \`en az ${db.get(`server.${dat.id}.partner.sart`)} kişi\`` : ""}${(db.has(`server.${dat.id}.partner.aktifsart`) === true) ? `\n<:sart:865147962479869953> Şart aktif üye: \`en az ${db.get(`server.${dat.id}.partner.aktifsart`)} kişi\`` : ""}
                <:url:865149013602336788> Sunucu URL: \`${db.get(`server.${dat.id}.partner.url`) || dat.id}\``)
              })
              embbbb.setDescription("Bulunduğun sayfa: " + sayfa + "/" + toplamsayfa)
              msg.edit(embbbb)
              
            break;
              
          }
        })
      })
      
    } else if (category === categories[3]) {
      
      if (tool.kurulum(message.guild.id) === false) return client.embed({message, type: "h", text: "Bu sunucuda partnerlik sisteminin kurulumu bitirilmemiş. **j!yardım** yazıp partner kategorisini seçerek adımları takip edin!"})
      if (db.has(`server.${message.guild.id}.partner.rol`) && message.member.roles.cache.has(db.get(`server.${message.guild.id}.partner.rol`)) === false) return client.embed({message, type: "h", text: `Bu komutu yalnızca \`${message.guild.roles.cache.get(db.get(`server.${message.guild.id}.partner.rol`)).name}\` rolüne sahip olanlar kullanabilir.`})
      var url = args[1]
      if (!url) client.embed({message, type: "h", text: "Lütfen bir url belirtin!"})
      if (!client.guilds.cache.get(url) && Object.keys(db.get("server")).filter(a => db.get(`server.${a}.partner.url`) === url).length === 0) return client.embed({message, type: "h", text: "Bu url'ye sahip bir sunucu bulunamadı!"})
      
      var sunucu = Object.keys(db.get("server")).filter(a => db.get(`server.${a}.partner.url`) === url) || url
      
      
    }
  }
}
