// import {  } from "discord.js"
// import axios, { AxiosResponse } from "axios"

// interface AxiosProps{
//   avatar_url: string
// }

// type ENVProps = {
//   githubActor: string | undefined
// }

// // Função para obter a foto de perfil do autor do pull request
// async function getAuthorAvatar(username: string | undefined ) {
//   try {
//     const response = await axios.get(
//       `https://api.github.com/users/${username}`, {
//         headers : {
//           'Accept-Encoding': "application/json"
//         }
//       }
//     );
//     if (response.status === 200) {
//       return response.data.avatar_url;
//     }
//   } catch (error) {
//     console.error("Erro ao obter a foto de perfil:", error);
//   }
//   return null;
// }

// async function createEmbed() {
//   const githubActor = process.env.GITHUB_ACTOR

//   const data = {
//     embeds: [
//       {
//         author: {
//           name: "",
//           url: "",
//         },
//         description: "acabou de ter um pull request aceito! Parabéns! Continue assim.",
//         color: 0,
//       },
//     ],
//   };

//   try {
//     const avatarUrl = await getAuthorAvatar(githubActor); // Obtém a URL da foto de perfil do autor

//     const embed = new Discord.EmbedBuilder().setColor("Random");
//     const color = embed.data.color;

//     data.embeds[0].color = color;
//     data.embeds[0].author.name = githubActor;
//     data.embeds[0].author.url = avatarUrl;

//     return data;
//   } catch (error) {
//     console.error("Erro ao criar o embed:", error);
//     return null;
//   }
// }

// // Como createEmbed é assíncrona, você deve esperar a promessa ser resolvida antes de imprimir o resultado
// createEmbed()
//   .then((embed) => {
    
//     if (embed) {
//       console.log(JSON.stringify(embed));
//       return JSON.stringify(embed);
//     } else {
//       console.log("Erro ao criar o embed.");
//     }
//   })
//   .catch((err) => {
//     console.error("Erro inesperado:", err);
//   });

import axios from "axios";
import Discord from "discord.js";

interface AxiosResponseProps {
  data: {
    avatar_url: string;
  };
  status: number;
}

// Função para obter a foto de perfil do autor do pull request
async function getAuthorAvatar(username: string | undefined | number) {
  try {
    const { data, status }: AxiosResponseProps = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          "Accept-Encoding": "application/json",
        },
      }
    );
    if (status === 200) {
      return data.avatar_url;
    }
  } catch (error) {
    console.error("Erro ao obter a foto de perfil:", error);
  }
  return null;
}

async function createEmbed() {
  let githubActor = process.env.GITHUB_ACTOR;

  if (githubActor === undefined) {
    githubActor = "Nome de Usuário Padrão"; // Substitua pelo valor padrão desejado
  }

  const data = {
    embeds: [
      {
        author: {
          name: "",
          url: "",
        },
        description: "acabou de ter um pull request aceito! Parabéns! Continue assim.",
        color: 0,
      },
    ],
  };

  try {
    const avatarUrl = await getAuthorAvatar(githubActor); // Obtém a URL da foto de perfil do autor

    const embed = new Discord.EmbedBuilder().setColor("Random");
    const color = String(embed.data.color);

    const newColor = String(data.embeds[0].color);
    data.embeds[0].author.name = githubActor;
    if (avatarUrl !== null) {
      data.embeds[0].author.url = avatarUrl;
    } else {
      console.warn("A URL da foto de perfil é nula."); // Ou lide com isso de acordo com sua lógica
    }

    return data;
  } catch (error) {
    console.error("Erro ao criar o embed:", error);
    return null;
  }
}

// Como createEmbed é assíncrona, você deve esperar a promessa ser resolvida antes de imprimir o resultado
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
