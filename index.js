console.log(require('discord.js').version)

const { Client, Intents, MessageEmbed, Permissions, MessageActionRow, MessageButton, } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] });
// const fs = require('fs');
const Tesseract = require('tesseract.js');

const prefix = '!'
// let connections = {};
// let speak_chs = {};

DISCORD_BOT_TOKEN = "BOTTOKEN"
LOG_CHANNEL_ID = '937190204693958706'

client.on('ready', () => {
    //This will get the amount of servers and then return it.
    const servers = client.guilds.cache.size
    // const users = client.users.cache.size

    console.log(`Botは今 ${servers} 個のサーバーに入ってるよー`)

    client.user.setActivity(`!help | 導入数 ${servers} `, {
        type: 'PLAYING',
    })
})

client.on('messageCreate', async message => {

    async function sendError(err) {
        const err_embed = new MessageEmbed({
            description: '```\n' + err.toString() + '\n```',
            footer: {
                text: `サーバー: ${message.guild.id} | ${message.content}`
            }
        })
        const ch = await client.channels.fetch(LOG_CHANNEL_ID)
        if (ch) {
            ch.send({ embeds: [err_embed] })
        }
    }

    if (message.author.bot) {
        return;
    }

    if (message.content.indexOf(prefix) !== 0) return;
    const [command, ...args] = message.content.slice(prefix.length).split(' ')

    switch (command) {
        case 'gsh':
            flag = 1;
            let msg = '検索したいキーワード';
            // let channel = message.channel;
            // let author = message.author.username;

            message.reply(msg)
                .then(() => console.log(`Sent message: ${msg}`))
                .catch(console.error);

            if (flag === 1) {
                flag = 0;
                // let channel = message.channel;
                // let author = message.author.username;
                let url_val = 'https://www.google.com/search?q='
                for (let i = 0; i < args.length; i++) {
                    url_val += "+" + encodeURI(args[0]);
                }

                message.reply(url_val)
                    .then(() => console.log(`Sent message: ${url_val}`))
                    .catch(console.error);
                return;
            }
            break;

        case 'support':
            var embed = new MessageEmbed({
                title: "サポートサーバーです",
                description: "SupportServer",
                color: 0xffff00,
                fields: [{
                    name: "URL",
                    value: "https://discord.gg/Y6w5Jv3EAR",
                    inline: false,
                }]
            })
            message.channel.send({ embeds: [embed] });
            break;

        case 'help':
            var embed = new MessageEmbed({
                title: "helpです",
                description: "This is Help commands",
                color: 0xffff12,
                fields: [
                    {
                        name: "!help",
                        value: "今、表示しているやつです"
                    },
                    {
                        name: "!in",
                        value: "botのリンクを出します"
                    },
                    {
                        name: "!ping",
                        value: "ping値を出します"
                    },
                    {
                        name: "!support",
                        value: "サポサバのURLを表示します"
                    },
                    {
                        name: "!sp",
                        value: "制作協力者の紹介です"
                    },
                    {
                        name: "!gban",
                        value: "グローバルチャットでのban申請のサイトURLがでます"
                    },
                    {
                        name: "!c <消したい量の数> (管理者のみです)",
                        value: "指定した数分のメッセージを削除できます"
                    },
                    {
                        name: "!g-rule",
                        value: "グローバルチャットの利用規約を出します"
                    },
                    {
                        name: "!web",
                        value: "このBOTのサイトを表記します"
                    },
                    {
                        name: "!pi",
                        value: "このBOTの運営を紹介します"
                    },
                    {
                        name: "!donation",
                        value: "BOT支援送金フォームです"
                    },
                    {
                        name: "!user [メンションもしくはID]",
                        value: "ユーザー情報を出せます"
                    },
                    {
                        name: "グローバルチャット",
                        value: "このチャンネルを作成するとグローバルチャットが使用できます"
                    },
                    {
                        name: "!player [ID]",
                        value: "Minecraftのユーザー情報を出せます"
                    },
                    {
                        name: "!beserver [IP]",
                        value: "MinecraftServer(be)情報を出せます"
                    },
                    {
                        name: "!server [IP]",
                        value: "MinecraftServer情報を出せます"
                    },
                    {
                        name: "!uuid [MCID]",
                        value: "MinecraftユーザーUUID情報を出せます"
                    },
                    {
                        name: "!poll [タイトル] [投票1] [投票2] ● ● ●",
                        value: "投票ができます"
                    },
                    {
                        name: "!ban [メンションまたはID]",
                        value: "ユーザーをBANします"
                    },
                    {
                        name: "!tc [メンションまたはID]",
                        value: "ticketを作ります。"
                    },
                    {
                        name: "!omikuji",
                        value: "コマンドの通りおみくじだよ"
                    },
                    {
                        name: "!gsh 検索する文字",
                        value: "Google検索"
                    },
                    {
                        name: "!timeout [ユーザーID、またはメンション] [タイムアウトする時間(分)]",
                        value: "ユーザーをタイムアウトします。"
                    },
                    {
                        name: "!untimeout",
                        value: "タイムアウトしたユーザーを解除する。"
                    },
                    {
                        name: "!tc [ticketのタイトル]",
                        value: "ticketを作ります。"
                    }
                ]
            })
            message.channel.send({ embeds: [embed] })
            break;

        case 'omikuji':
            let arr = ["大吉", "中吉", "小吉", "吉", "凶", "大凶"];
            var random = Math.floor(Math.random() * arr.length);
            var result = arr[random];
            message.reply({ content: result });
            break;

        case 'ping':
            message.channel.send({ content: ` Ping を確認しています...` })
                .then((pingcheck) => {
                    pingcheck.edit(
                        `botの速度|${pingcheck.createdTimestamp - message.createdTimestamp} ms`
                    )
                });
            break;

        case 'c':
            if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("❌ 権限が不足しています。"); //権限がなかったら表示
            if (!args[0]) return message.channel.send("エラー: 空白がない または数字が書いていません"); //空白がないまたは数字がない場合表示
            if (args[0] > 100) return message.channel.send({ content: "エラー: 削除する数は100以下で指定してください。" })
            if (args[0].isNaN()) return message.channel.send({ content: "エラー: 削除する数は数字で指定してください。" })
            const messages = await message.channel.messages.fetch({
                limit: args[0]
            }); //していした数を削除
            message.channel.bulkDelete(messages)
                .then((msg) => {
                    return message.channel.send({ content: `${msg.size} メッセージ 削除しました。` })
                })
                .catch(reason => {
                    sendError(reason)
                    return message.channel.send({ content: "エラーが発生しました" })
                })


            break;

        case 'g-rule':
            var embed = new MessageEmbed({
                title: "グローバルチャット利用規約",
                description: "グローバルチャットの利用を始めたときに利用規約同意したものとみなします。",
                color: 0xffff00,
                fields: [
                    {
                        name: "1.個人情報の送信禁止。例外あり",
                        value: "(送信可能、都道府県・年齢 送信禁止、電話番号・生年月日・市・丁目・マンション名・学校名・マイナンバー・その他、個人情報が特定できそうなのは禁止)"
                    },
                    {
                        name: "2.宣伝禁止。例外あり",
                        value: "(自分のディスコ―ドサーバー招待URL・BotURL・自分のサイトURLは禁止/Owner・Admin・moderatorから、許可する場合もあります。)※ Admin-運営 moderator-モデレーター の方は許可。"
                    },
                    {
                        name: "3.R-18系禁止",
                        value: "(R-18などを送信した場合、そのサーバーでの利用を停止)"
                    },
                    {
                        name: "4.スパム禁止",
                        value: "(あいうえお、など、連続チャットは禁止。負荷軽減の為、2.3秒開けての投稿をおねがいします。)"
                    },
                    {
                        name: "5.他のユーザーに成りすまし禁止",
                        value: "(ほかのユーザーと同じアイコン・名前などはできるだけ控えてください。)"
                    },
                    {
                        name: "6.その他、Owner・Adminが禁止するみなす行為禁止",
                        value: "(この利用規約はいつでも改訂しますので、何日がごとに見ることをおすすめします。(Botから見ている場合: $g-ruleで見れます。 )"
                    },
                    {
                        name: "規約情報",
                        value: "2021/03/22"
                    }
                ]
            });
            message.channel.send({ embeds: [embed] });
            break;

        case 'web':
            var embed = new MessageEmbed({
                title: "webサイトです",
                description: "",
                color: 0xffff00,
                fields: [{
                    name: "webサイトです",
                    value: "https://kuroneko6423.com/"
                }]
            })
            message.channel.send({ embeds: [embed] });
            break;

        case 'gban':
            var embed = new MessageEmbed({
                title: "グローバルBANをするためのフォームです",
                description: "",
                color: 0xffff00,
                fields: [{
                    name: "こちらからどうぞ",
                    value: "https://forms.gle/B1rv2DWGQTnZcYuJ7"
                }]
            })
            message.channel.send({ embeds: [embed] });
            break;

        case 'sp':
            var embed = new MessageEmbed({
                title: "制作にて協力してくれた方と主の紹介",
                description: "",
                color: 0xffff00,
                fields: [
                    {
                        name: "黒猫ちゃん(管理者)",
                        value: "Discord | https://discord.gg/Ya6YqBr | web | https://kuroneko6423.com/"
                    },
                    {
                        name: "Yuukiさん",
                        value: "Discord | https://discord.gg/uc5KfSPwSX"
                    },
                    {
                        name: "cronさん",
                        value: "web | https://cron.jp"
                    },
                    {
                        name: "Nabrさん",
                        value: "よろしく"
                    },
                    {
                        name: "forestblackさん",
                        value: "web | https://komoro.work/"
                    },
                    {
                        name: "YHさん",
                        value: "寄付 | https://ko-fi.com/yh82667"
                    }
                ]
            })
            message.channel.send({ embeds: [embed] });
            break;

        //bot導入宣伝
        case 'in':
            var embed = new MessageEmbed({
                title: "BOT導入",
                description: "こちらから導入してください",
                color: 0xffff00,
                fields: [
                    {
                        name: "BOTリンク",
                        value: "bot導入URL https://discord.com/api/oauth2/authorize?client_id=894075966224220233&permissions=8&scope=bot"
                    }
                ]
            })
            message.channel.send({ embeds: [embed] });
            break;

        //寄付サイト
        case 'donation':
            var embed = new MessageEmbed({
                title: "BOT支援",
                description: "こちらから送金してください",
                color: 0xffff00,
                fields: [
                    {
                        name: "BOT支援送金フォーム",
                        value: "https://forms.gle/vNz5jQQt1gM4gtcu6"
                    },
                    {
                        name: "クレカやpaypayでの寄付",
                        value: "https://fantia.jp/kuroneko6423"
                    }
                ]
            })
            message.channel.send({ embeds: [embed] });
            break;

        //MinecraftServerルール
        case 'MinecraftRule':
            var embed = new MessageEmbed({
                title: "～～minecraftServer Rule",
                description: "",
                color: 0xffff15,
                fields: [
                    {
                        name: "マインクラフト",
                        value: "禁止事項"
                    },
                    {
                        name: "第１条",
                        value: "荒らし禁止"
                    },
                    {
                        name: "第２条",
                        value: "チート機能禁止（xrayなど）"
                    },
                    {
                        name: "第３条",
                        value: "暴言禁止"
                    },
                    {
                        name: "第４条",
                        value: "窃盗禁止"
                    },
                    {
                        name: "第５条",
                        value: "他人の建築物を勝手に改造するのも禁止"
                    },
                    {
                        name: "第６条",
                        value: "ophack禁止"
                    },
                    {
                        name: "第7条",
                        value: "これのルールに対して変更等がある場合には運営側がルールを変更する場合がある"
                    },
                    {
                        name: "第8条",
                        value: "第１条から第7条までに同意できる方のみserverに参加を許可する"
                    },
                    {
                        name: "その他",
                        value: "これに対して運営は変更を加えられるものとする"
                    },
                    {
                        name: "その他ルール",
                        value: "注意点等"
                    },
                    {
                        name: "第１条",
                        value: "鯖の自作発言は禁止"
                    },
                    {
                        name: "第２条",
                        value: "配信,録画する際は運営に必ず言ってください。"
                    }
                ]
            })
            message.channel.send({ embeds: [embed] });
            break;

        //運営リスト
        case 'pi':
            var embed = new MessageEmbed()
                .setTitle("KuronekoServer運営List")　//Embedのタイトル
                .setURL("https://kuroneko6423.com/Admin")　//タイトルに埋め込むURL
                .setAuthor("KuronekoServerAdminList", "https://github.com/KuronekoServer/typing-web/blob/main/kuroneko.jpg?raw=true") //Embedのアウター
                .setThumbnail("https://github.com/KuronekoServer/typing-web/blob/main/kuroneko.jpg?raw=true")　//Embedのサムネイル
                .setImage("https://github.com/kuroneko6423/kuroneko6423/blob/main/kuronekoServer.jpg?raw=true")　//Embedのイメージ
                .addField("KuronekoServer WebSite", "https://kuroneko6423.com")　//Embedのフィールド
                .addField("運営、開発者募集中", "https://kuroneko6423.com/Application")　//Embedのフィールド
                .addField("黒猫ちゃん(管理者&運営)", "https://profile.kuroneko6423.com/")　//Embedのフィールド
                .addField("Yuukiさん(モデレーター)", "https://kuroneko6423.com/Yuuki")　//Embedのフィールド
                .addField("cronさん(共同開発者)", "https://cron.jp")　//Embedのフィールド
                .addField("Nabrさん(共同開発者)", "WEBサイト未作成")　//Embedのフィールド
                .addField("YHさん(共同開発者)", "WEBサイト未作成")　//Embedのフィールド
                .addField("forestblackさん(共同開発者)", "https://komoro.work/")　//Embedのフィールド
                .setFooter("KuronekoServer")　//Embedのフッター
                .setColor("RANDOM")　//Embedのカラー
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
            break;

        //ユーザー情報
        case 'user':
            let user_id = (message.mentions.members.size > 0) ? message.mentions.members.first().id : args[0];
            if (!user_id) return message.channel.send({ content: "エラー: IDが入力されていません" });

            const member = message.guild.members.cache.get(user_id);
            if (!member) return message.channel.send({ content: "エラー: 指定されたIDが見つかりません" })

            const presence_data = { "online": "オンライン", "offline": "オフライン", "dnd": "取り込み中", "idle": "退席中" }
            message.channel.send({
                embeds: [
                    {
                        title: `───${member.user?.username}の情報───`,
                        description: `${member.user?.username}の情報を表示しています`,
                        color: "RANDOM", //色
                        timestamp: new Date(),
                        footer: {
                            icon_url: message.guild.iconURL(),
                            text: `サーバー名：${message.guild.name}`
                        },
                        thumbnail: {
                            url: member.user.avatarURL()
                        },
                        fields: [
                            {
                                name: "ユーザータグ",
                                value: `${member.user.tag}`
                            },
                            {
                                name: "ユーザーメンション",
                                value: `${member}`
                            },
                            {
                                name: "ユーザーID",
                                value: `${member.id}`
                            },
                            {
                                name: "アカウントの種類",
                                value: member.bot ? "BOT" : "ユーザー",
                                inline: true
                            },
                            {
                                name: "現在のステータス",
                                value: `${presence_data[member.presence.status]}`,
                                inline: true
                            },
                            {
                                name: "userguild",
                                value: `${member.guild}`
                            }
                        ]
                    }
                ]

            });
            break;

        //アンケート機能
        case 'poll':
            const [title, ...choices] = args
            if (!title) return message.channel.send({ content: 'タイトルを指定してください' })
            const emojis = ['🇦', '🇧', '🇨', '🇩']

            if (choices.length < 2 || choices.length > emojis.length)
                return message.channel.send({ content: `選択肢は2から${emojis.length}つを指定してください` })
            const poll = await message.channel.send({
                embeds: [
                    {
                        title: title,
                        description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')
                    }
                ]
            });
            emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
            break;

        //BAN機能
        case 'ban':
            if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.channel.send("❌ 権限が不足しています。"); //権限がなかったら表示

            const ban_user_id = (message.mentions.members.size > 0) ? message.mentions.members.first().id : args[0];
            if (!ban_user_id) return message.channel.send({ content: "エラー: メンバーが指定されていません\nIDかメンションで指定してください" });
            const ban_member = message.guild.members.cache.get(ban_user_id);
            if (!ban_member) return message.channel.send({ content: "エラー: 指定されたIDが見つかりません" })
            if (!ban_member.bannable) return message.channel.send({ content: "エラー: Botより上の役職を持っているメンバーをBanすることはできません。" })
            ban_member.ban()
                .then((banned_user) => {
                    return message.channel.send({ content: `${banned_user.user.tag} をBanしました` })
                })
                .catch(reason => {
                    console.warn(reason)
                    return message.channel.send({ content: "エラーが発生しました" })
                })
            break;

        //kick機能
        case 'kick':
            if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.channel.send("❌ 権限が不足しています。"); //権限がなかったら表示

            const kick_user_id = (message.mentions.members.size > 0) ? message.mentions.members.first().id : args[0];
            if (!kick_user_id) return message.channel.send({ content: "エラー: メンバーが指定されていません\nIDかメンションで指定してください" });
            const kick_member = message.guild.members.cache.get(kick_user_id);
            if (!kick_member) return message.channel.send({ content: "エラー: 指定されたIDが見つかりません" })
            if (!kick_member.kickable) return message.channel.send({ content: "エラー: Botより上の役職を持っているメンバーをKickすることはできません。" })
            kick_member.kick()
                .then((kicked_user) => {
                    return message.channel.send({ content: `${kicked_user.user.tag} をKickしました` })
                })
                .catch(reason => {
                    console.warn(reason)
                    return message.channel.send({ content: "エラーが発生しました" })
                })
    }
})

//自動返信
client.on('messageCreate', async message => {

    var msg = null

    if (message.author.bot) return;

    switch (message.content) {
        case 'こんにちは':
            msg = '...こんにちは～'
            break;
        case 'おはよう':
            msg = 'おはようです...(眠たい...)'
            break;
        case 'おはようございます':
            msg = 'おはようございま～す！'
            break;
        case 'なにしてるの？':
            msg = '私も気になる！'
            break;
        case 'おやすみなさい':
            msg = 'おやすみ～'
            break;
        case 'こんばんは':
            msg = 'こんばんは！'
            break;
        case 'こんばんはー':
            msg = 'こんばんちわ！'
            break;
        case 'おはようー':
            msg = 'おはようです！！'
            break;
        case 'おはー':
            msg = 'おはよ～うオーディションして....ってあぁぁぁぁぁぁぁぁ。絶対聞かなかったことにしてくださいね！'
            break;
        case '暇':
            msg = '雑談します？ [Botだけどね]'
            break;
        case '課題':
            msg = '課題なんて燃やしちゃえ★'
            break;
        case 'は？':
            msg = '怒らないで(´;ω;｀)'
            break;
        case 'あ？':
            msg = '怒らないで(´;ω;｀)'
            break;
        case '嫌い':
            msg = 'そんなこと言わないで(´;ω;｀)'
            break;
        case 'あけおめ':
            msg = 'あけおめ！ :boom::boom::boom: '
            break;
    }
    if (msg) {
        message.channel.send({ content: msg })
    }
})

//グローバルチャット
client.on("messageCreate", message => {
    if (message.author?.bot || message.channel.name != "グローバルチャット") return;

    client.channels.cache.forEach(ch => {
        console.log(ch.name)
        if (ch.type == "GUILD_TEXT" && ch.name === "グローバルチャット") {
            var embed = new MessageEmbed({
                title: "",
                color: "RANDOM",
                description: message.content, // メッセージの内容を説明欄に
                timestamp: new Date(), // 時間を時間の欄に
                footer: {
                    icon_url: message.guild.iconURL(), // フッターのアイコンのURLをメッセージが送信されたサーバーのアイコンのURLに
                    text: message.guild.name // 文字をサーバーの名前に
                },
                image: {
                    url: message.attachments.first() || null//もしメッセージの中にファイルが有るなら、メッセージの中のはじめのファイルのURLを。無いならnull(無し)を。
                },
                author: {
                    name: message.author.tag,//メッセージの送信者のタグ付きの名前を送信者名の欄に
                    url: `https://discord.com/users/${message.author.id}`,//名前を押すとその人のプロフィールが出されるように(https://discord.com/users/ その人のID)
                    icon_url: message.author.displayAvatarURL({ format: 'png' })//メッセージ送信者のアイコンのURLを送信者のアイコンの欄に
                }
            });
            ch.send({ embeds: [embed] })
                .catch(e => console.log(e))
        };
    });

    const attachment_list = [];// 添付ファイルリスト
    message.attachments.forEach((attachment) => {// 添付ファイルをすべて参照
        const att = attachment.toJSON();// 添付ファイルをJSONに
        att.content_type = attachment.contentType;// DiscordAPIに仕様を合わせる
        attachment_list.push(att);// 添付ファイルリストに入れる
    });
    const send_msg = message.toJSON();// メッセージをJSONに
    send_msg.attachments = attachment_list;// メッセージをJSONにしたものに添付ファイルリストを入れる
    send_msg.reference = message.reference;// メッセージをJSONにしたものに返信情報を入れる
    let chid = "949862388969119755";// 接続するチャンネル ※変更しないでください
    client.channels.cache.get(chid).send({// 送信
        embeds: [{// 埋め込み(s)
            description: Buffer.from(// バッファをここから
                JSON.stringify({// オブジェクトの文字列化
                    channel: {// チャンネル情報
                        name: message.channel.name,// チャンネル名
                        id: message.channel.id// チャンネルID
                    },
                    author: {// 送信者情報
                        username: message.author.username,// ユーザー名
                        discriminator: message.author.discriminator,// ユーザーディスクリミネーター
                        id: message.author.id,// ユーザーID
                        avatarURL: message.author.avatarURL({// ユーザーアバター
                            dynamic: true,// ダイナミックを有効
                            format: "png",// pngフォーマット
                            size: 512// 512x512 px
                        }),
                        bot: message.author.bot// Botかどうか
                    },
                    guild: {// サーバー情報
                        name: message.guild.name,// サーバー名
                        id: message.guild.id,// サーバーID
                        iconURL: message.guild.iconURL({// サーバーアイコン
                            dynamic: true,// ダイナミックを有効
                            format: "png",// pngフォーマット
                            size: 256// 256x256 px
                        })
                    },
                    message: send_msg// メッセージ情報
                })
            ).toString("base64")// base64でエンコード
        }]
    });
    message.delete({ timeout: 1000 }).catch((e) => message.channel.send(`メッセージを削除する際にエラーが起きました\nエラー:${e.message}`))
})
    //グローバルチャット連携
    .on("messageCreate", async (msg) => {
        if (msg.channelId !== "949862388969119755") return;// 接続するチャンネル ※変更しないでください
        if (msg.author.id === client.user.id) return;// 自分なら止める
        if (!msg.embeds[0].description) return;// 連携グローバルチャットの情報が無ければ止める

        const message = JSON.parse(// 連携メッセージ情報をオブジェクト化
            Buffer.from(msg.embeds[0].description, "base64")// base64デコード
        );

        msg.react("🤔");// 認識したことを示す

        if (message.author.bot) return msg.react("👍");// Botを弾く

        /* 以下コピペと連携用の修正 */
        client.channels.cache.forEach(ch => {
            console.log(ch.name)
            if (ch.type == "GUILD_TEXT" && ch.name === "グローバルチャット") {
                var embed = new MessageEmbed({
                    title: "",
                    color: "RANDOM",
                    description: message.message.content, // メッセージの内容を説明欄に
                    timestamp: new Date(), // 時間を時間の欄に
                    footer: {
                        icon_url: message.guild.iconURL, // フッターのアイコンのURLをメッセージが送信されたサーバーのアイコンのURLに
                        text: message.guild.name // 文字をサーバーの名前に
                    },
                    image: {
                        url: (message.message.attachments.length) ? message.message.attachments[0].url : null//もしメッセージの中にファイルが有るなら、メッセージの中のはじめのファイルのURLを。無いならnull(無し)を。
                    },
                    author: {
                        name: `${message.author.username}#${message.author.discriminator}`,//メッセージの送信者のタグ付きの名前を送信者名の欄に
                        url: `https://discord.com/users/${message.author.id}`,//名前を押すとその人のプロフィールが出されるように(https://discord.com/users/ その人のID)
                        icon_url: message.author.avatarURL//メッセージ送信者のアイコンのURLを送信者のアイコンの欄に
                    }
                });
                ch.send({ embeds: [embed] })
                    .catch(e => console.log(e))
            };
        });
        /* 以上コピペと連携用の修正 */

        msg.react("👍");// 処理完了を示す
    })

    //timeout機能
    .on('messageCreate', message => {
        if (message.content.startsWith("!timeout")) {
            if (!message.member.permissions.has("MODERATE_MEMBERS") || !message.channel.permissionsFor(message.guild.me).has("MODERATE_MEMBERS")) return message.reply("権限不足");
            const args = message.content.split(" "), member = message.mentions.members.first() ?? message.guild.members.cache.get(args[1]);
            if (!member) return message.reply(`ユーザーが見つかりませんでした`);
            if (isNaN(args[2])) return message.reply(`数字を入れてください`);
            member.timeout(Number(args[2]) * 60 * 1000, args.slice(3)?.join(" ") || `なし`)
                .then(message.reply(`正常にタイムアウトしました\n詳細\n対象ユーザー:${member} 時間:${args[2]}分 理由:${args.slice(3)?.join(" ") || "なし"}`))
                .catch(e => message.reply(`エラー:${e}`));
        }
        if (message.content.startsWith("!untimeout")) {
            if (!message.member.permissions.has("MODERATE_MEMBERS") || !message.channel.permissionsFor(message.guild.me).has("MODERATE_MEMBERS")) return message.reply("権限不足");
            const args = message.content.split(" ")[1], member = message.mentions.members.first() ?? message.guild.members.cache.get(args);
            if (!member) return message.reply(`ユーザーが見つかりませんでした`);
            member.timeout(0)
                .then(message.reply(`正常にタイムアウトを解除しました\n対象ユーザー${member}`))
                .catch(e => message.reply(`エラー:${e}`));
        }
    })

//ticket機能
client.on('messageCreate', async message => {
    if (message.content.startsWith("!tc")) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send('NOADOMIN');
        const args = message.content.split(" ").slice(1);
        if (!args[0]) return message.reply("コンテンツがないよ");
        const tic1 = new MessageButton().setCustomId("ticket").setStyle("PRIMARY").setLabel("チケット");
        await message.channel.send({
            embeds: [{
                description: String(args.join(" "))
            }],
            components: [new MessageActionRow().addComponents(tic1)]
        });
        if (message.guild.channels.cache.find(name => name.name === "ticket")) return;
        message.guild.channels.create('ticket', {
            type: 'GUILD_CATEGORY'
        });
        //ticketというカテゴリーを作る
    }
});
client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === "ticket") {
        const ticketid = interaction.user.id
        if (interaction.guild.channels.cache.find(name => name.name === ticketid)) return interaction.reply({
            content: "これ以上作れないよ",
            ephemeral: true
        });
        const ct = interaction.guild.channels.cache.find(name => name.name === "ticket")
        if (!ct) return interaction.channel.send("ticketカテゴリーがありません");
        interaction.guild.channels.create(ticketid, {
            permissionOverwrites: [{
                id: interaction.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
            }],
            parent: ct.id
        }).then(channels => {
            channels.permissionOverwrites.edit(interaction.user.id, {
                VIEW_CHANNEL: true
            });
            const tic2 = new MessageButton().setCustomId("close").setStyle("PRIMARY").setLabel("閉じる");
            //buttonを作成
            channels.send({
                embeds: [{
                    description: "チケットを閉じますか?"
                }],
                components: [new MessageActionRow().addComponents(tic2)]
            })
            interaction.reply({
                content: `${channels}を作りました`,
                ephemeral: true
            });
        }).catch(e => interaction.reply(`エラー:${e.message}`))
    }
    if (interaction.customId === "close") {
        //buttonIDがcloseのボタンが押されたら実行
        interaction.channel.delete().catch(e => interaction.reply(`エラー:${e.message}`))
    }
});

//画像読み込み機能
const lang = ["jpn", "eng"]
/*
https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html
ここのLangCodeの部分を追加していく(現在はjpnとengのみ自分でやって)
*/
client.on('messageCreate', async message => {
    //メッセージイベント
    if (message.content.startsWith("!読み込み")) {
        //メッセージの初めの文字が!読み込みだった場合実行
        let n = 0;
        //nに0を代入してる
        let i = 0;
        //iに0を代入する
        const args = message.content.split(" ")[1];
        //argsに空白で区切った配列の1番目の文字を代入
        if (!args) return message.reply({
            //argsが何もなかったら
            embeds: [{
                description: "言語を指定してください言語リスト\n[click me](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)\nLangCodeの部分を打ってね"
            }]
        });
        if (!lang.includes(args)) return message.reply({
            //argsにlang以外の文字があったら
            embeds: [{
                description: `無効な言語\n現在使えるのは**${lang}**のみです\n[click me](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)\nLangCodeの部分を打ってね`
            }]
        })
        const file = message.attachments.first()
        ///ファイルを取得
        if (!file) return message.reply("添付ファイルがないよ");
        //なにもなかった場合
        if (!file.height && !file.width) return message.reply("画像じゃないよ");
        //画像じゃなかった場合
        const msg = await message.reply("処理中")
        //処理中と表示
        await Tesseract.recognize(file.url, args, {
            //画像を解析
            logger: m => {
                //LOG
                msg.edit({
                    content: `処理中${i}処理目\n${"#".repeat(n)}`,
                    embeds: [{
                        description: JSON.stringify(m)
                    }]
                })
                if (n >= 10) {
                    //nが10以上の場合はnを1にする
                    n = 1
                } else {
                    //10以下だった場合足していく
                    n++
                }
                i++
                //iを足していく
            }
        }).then(({
            data: {
                text
            }
        }) => {
            msg.edit({
                content: `処理完了言語${args}`,
                embeds: [{
                    description: text
                }]
            });
            //解析結果を出す
        }).catch(e => msg.edit({
            content: "エラー",
            embeds: [{
                description: e.message
            }]
        }))
    }
})

console.log(1)

client.login(DISCORD_BOT_TOKEN).catch(err => console.warn(err));
