module.exports = (Bot) => {
  Bot.login(require("./settings/setting.json").token)
  Bot.on("ready", async () => {
    console.log(`BOT | Bot connected discord.`)
    Bot.user.setActivity("Partnerleri ve istekleri", {type: "WATCHING"})
    Bot.embed = require("./utils/functions.js").embed
  })
}