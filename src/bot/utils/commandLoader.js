const fs = require("fs")
const {MessageEmbed} = require("discord.js")

module.exports = (Bot, Collector, db) => {
  Bot.commands = new Collector()
  Bot.aliases = new Collector()

  fs.readdir(`./src/bot/commands/`, (err, files) => {
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
      return console.log("BOT | Command's length is 0.");
    } else {
    if (err) {
      return console.error("BOT | Error: " + err);
    }
    console.log(`BOT | ${jsfiles.length} command loading...`);
    jsfiles.forEach(f => {
      let props = require(`../commands/${f}`);
      Bot.commands.set(props.name, props);
      props.aliases.forEach(alias => {
        Bot.aliases.set(alias, props.name);
      });
    });
    }
  });

  Bot.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(require("../settings/setting.json").prefix)) return;

    var command = message.content.split(" ")[0].slice(require("../settings/setting.json").prefix.length);
    var args = message.content.split(" ").slice(1);
    var cmd = "";

    if (Bot.commands.has(command)) {
      var cmd = Bot.commands.get(command);
    } else if (Bot.aliases.has(command)) {
      var cmd = Bot.commands.get(Bot.aliases.get(command));
    }
    if (cmd.onlyOwners === true && require("../settings/setting.json").admins.includes(message.author.id) === false) return message.channel.send(`Bot yetkilisi değilsin.`)
    if (cmd) {
      const embedd = new MessageEmbed()
      .setColor("AQUA")
      .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
      .setDescription(`» Botu kullanmaya başlamadan önce, yapman gereken bir adım kaldı! Kurallarımızı kabul etmek.\n
      ⋆ Just Partner sahipleri; \`${Bot.users.cache.get("831123996526247966").username}\` ve \`${Bot.users.cache.get("642752306441617417").username}\`'dir. Asla ortalıkta botun sahibi benim diye gezen dolandırıcılara inanmayın!
      ⋆ Bottaki herhangi bir sistemi çalmak veya özenmek yasaktır.
      ⋆ Botun altyapısını izinsiz olarak paylaşmak veya bir kopyasını yapmak yasaktır.
      ⋆ Bota hakaret etmek tamamen yasaktır! Emeğe saygı gösterin, beğenmiyorsanız kullanmayın.
      ⋆ Önerilerinizi ve şikayetlerinizi [destek sunucumuza](https://discord.gg/3XQM7XcAT9) gelerek bildirin. Veya **j!öneri** ile **j!şikayet** komutlarını kullanın.
      ⋆ Lütfen botu spam amaçlı kullanmayın! Just Partner sizin oyuncağınız değildir.\n
      ❤ Bu kurallar \`${Bot.users.cache.get("831123996526247966").username}\` ve \`${Bot.users.cache.get("642752306441617417").username}\` tarafından yazılmıştır.\n
      » Kuralları kabul etmek için alttaki tepkiye basabilirsin!
      `)
      .setFooter(Bot.user.username, Bot.user.avatarURL({dynamic: true}))
      .setThumbnail(Bot.user.avatarURL())
      if (db.has(`user.${message.author.id}.verified`) === false) return message.channel.send(embedd).then(async (msg) => {
        
        var filtre = (reaction, user) => user.id === message.author.id && user.id !== Bot.user.id
        
        var collector = msg.createReactionCollector(filtre, {
          time: 30000
        })
        
        await msg.react("864067085890224148")
        
        collector.on("collect", (reaction, user) => {
          
          if (reaction.emoji.id === "864067085890224148") {
            
            db.set(`user.${message.author.id}.verified`, true)
            embedd.setTitle("Anlaştık!")
            embedd.setDescription(`<:partner:864128180327022592> Sanırım seninle ilk konuda partnerliğimizi yaptık, kuralları kabul ettin! Botu kullanmaya devam edebilirsin.`)
            msg.delete({timeout: 10000})
            return msg.edit(embedd)
            
          }
          
        })
        
        collector.on("end", (collected) => {
          msg.delete()
        })
        
      })
      cmd.run(Bot, message, args, db);
    }
  });

}