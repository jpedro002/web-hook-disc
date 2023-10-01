const Discord = require("discord.js");
const axios = require("axios");

async function getAuthorAvatar(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    if (response.status === 200) {
      return response.data.avatar_url;
    }
  } catch (error) {
    console.error("Erro ao obter a foto de perfil:", error);
  }
  return null;
}

async function createEmbed() {
  const githubActor = process.env.GITHUB_ACTOR

  const data =[
      {
        author: {
          name: "",
          icon_url: "",
        },
        description:
          "acabou de ter um pull request aceito! Parabéns! Continue assim.",
        color: 0,
      },
    ]

  try {
    const avatarUrl = await getAuthorAvatar(githubActor);  

    const embed = new Discord.EmbedBuilder().setColor("Random");
    const color = embed.data.color;

    data[0].color = color;
    data[0].author.name = githubActor;
    data[0].author.icon_url = avatarUrl;

    

    return data;
  } catch (error) {
    console.error("Erro ao criar o embed:", error);
    return null;
  }
}

createEmbed()
  .then((embed) => {
    if (embed) {
      console.log(JSON.stringify(embed));
      return JSON.stringify(embed); 
    } else {
      console.log("Erro ao criar o embed.");
    }
  })
  .catch((err) => {
    console.error("Erro inesperado:", err);
  });
 