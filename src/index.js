const Discord = require("discord.js")
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
const {Client, MessageEmbed, Collection} = require("discord.js");
const Bot = new Client();
const db = require("./database/connector.js");
const app = require("express") ()
const deasync = require("deasync")

app.listen(process.env.PORT)

require("./bot/connector.js")(Bot)
require("./bot/utils/commandLoader.js")(Bot, Collection, db)

function userBul(ID) {
  return deasync(async(_ID, cb) => {
    let output = null;

    try {
      let user = await Bot.users.fetch(_ID);
      var moment = require("moment")
      moment.locale("tr")
      var cıritedat = moment(user.createdAt).format('DD/MM/YYYY')
      output = { 
        tag: user.tag,
        avatar: user.displayAvatarURL({dynamic: true, format:"png"}),
        name:user.username,
        bot:user.bot,
        createdAt: cıritedat,
        badges: user.flags.toArray()
      };
    } catch(err) { output = {tag:"Bulunamadı#0000",bot:null,name:"Bulunamadı",avatar:"https://cdn.discordapp.com/attachments/803014900501839933/803183603558776832/1cbd08c76f8af6dddce02c5138971129.png",davetlink:`https://discord.com/oauth2/authorize?client_id=${ID}&scope=bot&permissions=31`} }
    
    cb(null, output);
  })(ID);
}

var client = Bot

client.on("channelDelete", (channel) => {
  
  var guildChannels = Object.keys(db.get(`server`)).filter(a => db.get(`server.${a}.partner.kanal`) === channel.id)
  if (guildChannels.length === 0) return
  db.delete(`server.${channel.guild.id}.partner.kanal`)
  
})