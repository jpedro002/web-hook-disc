const { MessageEmbed } = require('discord.js');

// Função para obter a foto de perfil do autor do pull request
async function getAuthorAvatar(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (response.ok) {
    const userData = await response.json();
    return userData.avatar_url;
  } else {
    console.error(`Erro ao obter dados do usuário do GitHub: ${response.status} ${response.statusText}`);
    return null;
  }
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
