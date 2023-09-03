const { MessageEmbed } = require('discord.js');
const axios = require('axios');

// Função para obter a foto de perfil do autor do pull request
async function getAuthorAvatar(username) {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  if (response.status === 200) {
    return response.data.avatar_url;
  }
  return null;
}

async function createEmbed() {
  const githubActor = process.env.GITHUB_ACTOR; // Obtém o autor do pull request do ambiente do GitHub
  const avatarUrl = await getAuthorAvatar(githubActor); // Obtém a URL da foto de perfil do autor

  const embed = new MessageEmbed()
    .setColor('#36a64f')
    .setTitle('Pull Request Aceito')
    .setDescription(`${githubActor} acabou de ter um pull request aceito! Parabéns! Continue assim.`)
    .setThumbnail(avatarUrl); // Define a thumbnail com a URL da foto de perfil

  console.log(JSON.stringify(embed));
}

createEmbed();
