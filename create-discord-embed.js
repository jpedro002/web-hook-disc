const Discord = require('discord.js');
const axios = require('axios');

// Função para obter a foto de perfil do autor do pull request
async function getAuthorAvatar(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    if (response.status === 200) {
      return response.data.avatar_url;
    }
  } catch (error) {
    console.error('Erro ao obter a foto de perfil:', error);
  }
  return null;
}

async function createEmbed() {
  const githubActor = process.env.GITHUB_ACTOR;

  try {
    const avatarUrl = await getAuthorAvatar(githubActor); // Obtém a URL da foto de perfil do autor

    const embed = new Discord.EmbedBuilder()
      .setColor('Random')
      .setTitle('Pull Request Aceito')
      .setDescription(`${githubActor} acabou de ter um pull request aceito! Parabéns! Continue assim.`)
      .setThumbnail(avatarUrl); // Define a thumbnail com a URL da foto de perfil

    return embed;
  } catch (error) {
    console.error('Erro ao criar o embed:', error);
    return null;
  }
}

// Como createEmbed é assíncrona, você deve esperar a promessa ser resolvida antes de imprimir o resultado
createEmbed()
  .then(embed => {
    if (embed) {
      console.log(embed);
    } else {
      console.log('Erro ao criar o embed.');
    }
  })
  .catch(err => {
    console.error('Erro inesperado:', err);
  });


