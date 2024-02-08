const url = `https://api.github.com/users/animeshyash`;
const repo_url = `${url}/repos`;
let userName = document.querySelector("#name");
let userBio = document.querySelector("#bio");
let userLocation = document.querySelector("#location");
let githubUrl = document.querySelector("#github_url");
let twitterUrl = document.querySelector("#twitter");
let avatar = document.querySelector("#avatar_url");
let project_technology = document.querySelector(".project_technology");
let project_title = document.querySelector(".project_title");
let pagination = document.querySelector(".pagination");
let project_bio = document.querySelector(".project_bio");
let repos = document.querySelector(".repos");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let page_Number = document.querySelector(".page_Number");
let current_page = 1;
let data = {};
let language = {};
let repo_data;
let pageNumbers = 0;
let start = 0;

async function fetchData(start) {
  const response = await fetch(url);
  const repo_url_res = await fetch(repo_url);
  data = await response.json();
  repo_data = await repo_url_res.json();
  pageNumbers = Math.floor(repo_data.length / 10);
  updateData(start);
  page_Change();
}

async function fetchLang(url) {
  const response = await fetch(url);
  language = await response.json();
}

async function updateData(start) {
  if (current_page === 1) left.classList.add("disable");
  else if (current_page > 1) left.classList.remove("disable");
  if (current_page === Math.ceil(repo_data.length / 10))
    right.classList.add("disable");
  else if (current_page < Math.ceil(repo_data.length / 10))
    right.classList.remove("disable");

  userName.innerHTML = data.name;
  userBio.innerHTML = data.bio.length > 100 ? `${data.bio.substring(0, 100)}....` : `${data.bio}`;
  userLocation.innerHTML = data.location;
  githubUrl.innerHTML = data.html_url;
  twitterUrl.innerHTML = `https://twitter.com/${data.twitter_username}`;
  avatar.src = `${data.avatar_url}`;

  let count = 0;
  for (let i = start; i < repo_data.length; i++) {
    if (count < 10) {
      const repo_box = document.createElement("div");
      repo_box.classList.add("repos_box");
      const lang_url = `https://api.github.com/repos/animeshyash/${repo_data[i].name}/languages`;
      await fetchLang(lang_url);

      const customElement = document.createElement("div");
      customElement.classList.add("projectDiv");
      customElement.innerHTML = `<p class="project_title">${repo_data[i].name}</p> <p class="project_bio">${repo_data[i].description}</p>`;

      repo_box.appendChild(customElement);

      const langDiv = document.createElement("div");
      langDiv.classList.add("langDiv");
      for (const lang in language) {
        const customLang = document.createElement("span");
        customLang.innerHTML = `<span class="project_technology">${lang}</span>`;
        langDiv.appendChild(customLang);
      }
      repo_box.appendChild(langDiv);
      repos.appendChild(repo_box);
      count++;
    } else {
      break;
      count = 0;
    }
  }
}

function page_Change() {
  page_Number.innerHTML = `<p>${current_page}</p>`;
}

left.addEventListener("click", () => {
  current_page--;
  start = start - 10;
  page_Change();
  repos.innerHTML = "";
  fetchData(start);
});
right.addEventListener("click", () => {
  current_page++;
  start = start + 10;
  page_Change();
  repos.innerHTML = "";
  fetchData(start);
});

fetchData(start);
