const {MessageEmbed} = require("discord.js")
const deasync = require("deasync")
const db = require("croxydb")

class FunctionsManager {

  constructor(a = {}) {
    this.client = a.client
  }
  
  fetchUser(ID){  
    return deasync(async(_ID, cb) => {
    let output = null;

    try {
      let user = await this.client.users.fetch(_ID);
      output = { 
        tag: user.tag,
        avatar: user.displayAvatarURL({dynamic: true, format:"png"}),
        name:user.username,
        bot:user.bot,
        createdAt: user.createdAt,
        badges: user.flags.toArray()
      };
    } catch(err) { output = {tag:"Bulunamadı#0000",bot:null,name:"Bulunamadı",avatar:"https://cdn.discordapp.com/attachments/803014900501839933/803183603558776832/1cbd08c76f8af6dddce02c5138971129.png"} }
    
    cb(null, output);
    })(ID);
  }
  
  static kurulum(ID){
    if (db.has(`server.${ID}.partner.kanal`) && db.has(`server.${ID}.partner.rol`) && db.has(`server.${ID}.partner.text`)) {
      var kurulum = true
    } else {
      var kurulum = false
    }
    return kurulum
  }
  
  static embed(a = {}) {
    var embed = new MessageEmbed()
    if (a.type === "h" || a.type === "b") {
      embed.setColor("#008cff")
      embed.setAuthor(`Just Partner - ${(a.type === "b") ? "Başarılı!" : "Hata!"}`, a.message.client.user.avatarURL())
      embed.setDescription(`${(a.type === "h") ? "<:hata:864067105192411136>" : "<:basarili:864067085890224148>"} ${a.text}`)
      embed.setFooter(`${a.message.author.tag} - Beni kullandığın için teşekkürler!`, a.message.author.avatarURL())
      return a.message.channel.send(embed).then((msg) => {
        if (a.timeout) {
          msg.delete({timeout: a.timeout})
        }
      })
    } else {
    if (a.title) {
      embed.setTitle(a.title)
    }
    if (a.color) {
      embed.setColor(a.color)
    }
    if (a.description) {
      embed.setDescription(a.description)
    }
    if (a.author) {
      if (a.author.text) {
        var authortext = a.author.text
      }
      if (a.author.url) {
        var authorimg = a.author.url
      }
      embed.setAuthor(authortext, (authorimg !== undefined) ? authorimg : undefined)
    }
    if (a.footer) {
      if (a.footer.text) {
        var footertext = a.footer.text
      }
      if (a.footer.url) {
        var footerimg = a.footer.url
      }
      embed.setFooter(footertext, (footerimg !== undefined) ? footerimg : undefined)
    }
    return embed
    }
  }

  static control(text){
  const kufur = [
    "mk",
    "amk",
    "aq",
    "orospu",
    "oruspu",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "sg",
    "siktir git",
    "am"
  ];
  const reklam = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".rf.gd",
    ".az",
    ".party"
  ];
  var urls = text.split(" ")
  var kufurmu = "";
  var reklammu = "";
  if (kufur.some(word => text.includes(word))) {
    kufurmu = true
  } else {
    kufurmu = false
  }

  if (reklam.some(word => text.includes(word))) {
    reklammu = true
  } else {
    reklammu = false
  }

  return {
    "text": text,
    "kufur": kufurmu,
    "reklam": reklammu
  }
  
  }

}

module.exports = FunctionsManager