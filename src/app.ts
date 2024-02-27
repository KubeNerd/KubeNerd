import * as fs from "fs/promises"; // Usando fs/promises para suporte a async/await
import markdownIt from "markdown-it"; // Importando markdown-it
// import { fetchRssData } from "./fetchRssData";
// import { fetchGitHubData } from "./fetchGitHubData";


import { fetchGitHubData } from "./fetchGithubData";
import { fetchRssData } from "./fetchRssData";

// Configuração inicial do markdown-it
const md = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

// URLs e informações de usuário
const githubUsername = "your_github_username";
const newsletterUrl = "https://bawd.bolajiayodeji.com";
const twitterUrl = "https://twitter.com/@engineer_yaml";
const linkedinUrl = "https://www.linkedin.com/in/vinicius-p-538340ba/";

// Função para gerar o Markdown dinamicamente
async function generateMarkdown() {
  // Geração dos badges
  const badges = [
    `![Newsletter Badge](https://img.shields.io/badge/-Newsletter-3B7EBF?style=for-the-badge&logo=Substack&logoColor=white&link=${newsletterUrl})`,
    `![LinkedIn Badge](https://img.shields.io/badge/-LinkedIn-3B7EBF?style=for-the-badge&logo=Linkedin&logoColor=white&link=${linkedinUrl})`,
    `![Twitter Badge](https://img.shields.io/badge/-Twitter-3B7EBF?style=for-the-badge&logo=Twitter&logoColor=white&link=${twitterUrl})`,
    `![Profile Views Count Badge](https://komarev.com/ghpvc/?username=${githubUsername}&style=for-the-badge)`,
  ].join(" ");

  // Seção RSS (simulando retorno da função fetchRssData)
  const rssSection = await fetchRssData("https://hackernewsrss.com/feed.xml");

  // Seção GitHub (simulando retorno da função fetchGitHubData)
  const githubDataSection = await fetchGitHubData(["nlw-expert", "aluratube"]);

  // Concatenação das seções para formar o README
  const readmeContent = md.render(`
<div align="center">

${badges}

## ✨ Sobre mim ✨

Desde 2018 vivo e respiro desenvolvimento web e testes de software.

🚀 Amante de tecnologia e automação.

<h2>🌍 Experiências Profissionais 🌍</h2>

[Ver currículo completo](https://www.linkedin.com/in/vinicius-p-538340ba/)

<h2>🧑‍🎓 Formações Acadêmicas 🏫</h2>

[Curso Full Stack Developer - Alura](https://cursos.alura.com.br/)

<h2>🛠 Ferramentas e Tecnologias 🛠</h2>

- HTML, CSS, JavaScript, TypeScript
- Node.js, Express, Next.js
- React.js, Redux, Context API
- Testing Library, Jest, Cypress

## 🌐 Redes Sociais 🌐

- [Instagram](https://instagram.com/_your_username_)
- [Facebook](https://www.facebook.com/your_page_)
- [LinkedIn](https://www.linkedin.com/in/vinicius-p-538340ba/)
- [WhatsApp](https://wa.me/+55XXXXXXXXXXX)
- [Telegram](https://t.me/your_username_)
- [Gmail](mailto:_your_email@example.com_)

</div>
`);

  try {
    await fs.writeFile("README.md", readmeContent);
    console.log("✅ README.md file was successfully generated.");
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  }
}

generateMarkdown();