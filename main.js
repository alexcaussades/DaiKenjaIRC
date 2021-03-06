const tmi = require('tmi.js');
const config = require("./twich.json")
const chalk = require("chalk");
const colors = new chalk.Instance({level: 3});
const CryptoJS = require('crypto-js');

const opts = {
    connection: {reconnect: true, secure: true,},
    identity: {username: "Dai_Kenja", password: config.data.auth.bot.client_id},
    channels: ["alexcaussades"]
};
const client = new tmi.client(opts)
client.connect();

client.on("chat", (channel, userstate, message, self) => {
    if (self) return;
        const channelName = CryptoJS.MD5(channel).toString()
    const colorChannel = channelName.substr(0,6)
    const colorChannelName = colors.hex(colorChannel)(channel.substr(1))
    const user = userstate.username;
    const text = message.trim();
    const arrow = '=>'
    const twoPoints = ':'
    const badges = userstate["badges-raw"];
    const prout = badges.split(",")
    prout.forEach(element => {
        const log = element.split("/")
        console.log(log[0])
    })

    /*
    if (badges === null){
        if (userstate.color === null){
            let nick = chalk.yellow(`${user}`)
            console.log(`${colorChannelName}${twoPoints}${nick} ${arrow} ${text}`);
        } else {
            let color = userstate.color
            let nick = colors.hex(color)(`${user}`);
            console.log(`${colorChannelName}${twoPoints} ${nick} ${arrow} ${text}`);
        }
    } else if (badges.broadcaster === '1' && badges.subscriber === '3012'){
        const badge = colors.hex('FF0000')("STREAMER-T3.12")
        let color = userstate.color
            let nick = colors.hex(color)(`${user}`);
            console.log(`${colorChannelName}${twoPoints} ${badge} ${nick} ${arrow} ${text}`);
    } else if (badges.founder === '0') {
        const badge = colors.hex('FF1010')("FIRST SUB ♥")
        let color = userstate.color
            let nick = colors.hex(color)(`${user}`);
            console.log(`${colorChannelName}${twoPoints} ${badge} ${nick} ${arrow} ${text}`);
    } 
    else if ( badges.subscriber === '3012'){
        const badge = colors.hex('FFD700')("SUB.T3")
            let color = userstate.color
            let nick = colors.hex(color)(`${user}`);
            console.log(`${colorChannelName}${twoPoints} ${badge} ${nick} ${arrow} ${text}`);
        }
    else if ( badges.vip === '1'){
        const badge = colors.hex('9B30FF')("VIP")
            let color = userstate.color
            let nick = colors.hex(color)(`${user}`);
            console.log(`${colorChannelName}${twoPoints} ${badge} ${nick} ${arrow} ${text}`);
        }
    else if (badges.premium === '1'){
        const badge = colors.hex('0000FF')("PRIME")
        let color = userstate.color
            let nick = colors.hex(color)(`${user}`);
            console.log(`${colorChannelName}${twoPoints} ${badge} ${nick} ${arrow} ${text}`);
    }
    else if (badges.glitchcon2020 === '1'){
        const badge = colors.hex('FF69B4')("DINO")
        let color = userstate.color
            let nick = colors.hex(color)(`${user}`);
            console.log(`${colorChannelName}${twoPoints} ${badge} ${nick} ${arrow} ${text}`);
    }
    else if (badges.moderator === '1'){
        const badge = colors.hex('00FF00')("MODO")
        let color = userstate.color
            let nick = colors.hex(color)(`${user}`);
            console.log(`${colorChannelName}${twoPoints} ${badge} ${nick} ${arrow} ${text}`);
    }*/
})


client.on('message', (target, context, msg, self) => {
    if (self) return;
    const commandName = msg.trim();
    const discordLink = 'https://discord.gg/V9t5k5z'
    let commandNamelist = ['discord','skarab','purple','git','project','battle']
    if (commandName === config.prefix + 'discord') client.say(target, `Lien pour rejoindre mon discord => ${discordLink}`)
    if (commandName === config.prefix + 'skarab') client.say(target, "Va suivre Skarab ou j'te tape Kappa (https://www.twitch.tv/skarab42)")
    if (commandName === config.prefix + 'purple') client.say(target, "Va suivre Purple ou j'te tape Kappa (https://www.twitch.tv/purpleorwel)")
    if (commandName === config.prefix + 'git') client.say(target, 'mon Github => https://github.com/Kae-Tempest')
    if (commandName === config.prefix + 'project') client.say(target, 'Mon project un un RPG, actuellement disponible sur Discord, au futur disponible sur web, mobile et twitch.')
    if (commandName === config.prefix + 'help') client.say(target, `|| ${commandNamelist.join(' || ')} ||`)
    if (commandName === config.prefix + 'battle') {target, battle()}

    function battle () {
        let playerHP = 50;
        let hostileHP = 50;
        const playerATK = Math.floor(Math.random() * Math.floor(10) + 1);
        const hostileATK = Math.floor(Math.random() * Math.floor(10) + 1);
        client.say(target, `Player ATK => ${playerATK} \n Monster ATK =>${hostileATK}`)
        for (let i = 1; hostileHP >= 0 || playerHP > 0; i++) {
            const priority = Math.floor(Math.random() * Math.floor(1));
            if (priority === 0) {
                playerHP -= hostileATK
                hostileHP -= playerATK
            }
            if (priority === 1) {
                hostileHP -= playerATK
                playerHP -= hostileATK
            }
            if (hostileHP <= 0) {
                return client.say(target, `Après ${i} tours tu as tué le monstre !`);
            }
            if (playerHP <= 0) {
                return client.say(target, `Après ${i} tours tu as été tué par le monstre !`)
            }
        }
    }
});
client.on('connected', () => {
    //let now = new Date().toLocaleString('fr-FR')
    //console.clear()
    //console.log('\033[2J')
    console.log(opts.identity.username + ' connected')
});