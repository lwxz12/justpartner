const Discord = require("discord.js");
const { control } = require("../utils/functions.js");

module.exports = {
  name: "öneri",
  aliases: ["öner", "öneri-söyle"],
  run: async (client, message, args, db) => {
    let öneri = args.join(" ");
    if (!öneri)
      return client.embed({
        message,
        type: "h",
        text: "Lütfen önerinizi belirterek komutu tekrar kullanmayı deneyin."
      });
    if (control(öneri).kufur === true)
      return client.embed({
        message,
        type: "h",
        text:
          "Lütfen önerinizde küfür bulundurmayın. Bu tür durumlarda cezanız karalisteye kadar uzanabilir."
      });
    if (control(öneri).reklam === true)
      return client.embed({
        message,
        type: "h",
        text:
          "Lütfen önerinizde reklam bulundurmayın. Bu tür durumlarda cezanız karalisteye kadar uzanabilir."
      });
    const embed2 = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        `${message.author.username}`,
        message.author.avatarURL({ dynamic: true })
      )
      .setTitle("Just Partner - Yeni bir öneri!")
      .setDescription(`${öneri}`)
      .addField(
        `<a:sunucu:864152991971672074> Sunucu`,
        `${message.guild.name}`,
        true
      )
      .addField(
        `<:tac:864068896549896212> Sunucu Kurucusu`,
        `${message.guild.owner.user.tag}`,
        true
      )
      .setFooter(
        `Önerileriniz bizim için önemli. Teşekkür ederiz!`,
        client.user.avatarURL()
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
    client.channels.cache.get("864061225986293760").send(embed2);
    message.delete({ timeout: 10000 });
    return client.embed({
      message,
      type: "b",
      text:
        "Öneriniz [bizlere](https://discord.gg/3XQM7XcAT9) başarıyla bildirildi, <@" +
        message.author.id +
        ">! Çok teşekkür ederiz.",
      timeout: 10000
    });
  }
}