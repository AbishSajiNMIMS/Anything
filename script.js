const profiles = ["AbishSajiNMIMS", "Abish1212"];
const state = { repositories: [], owner: "all", query: "" };
const repoGrid = document.querySelector("#repo-grid");
const emptyState = document.querySelector("#empty-state");

const languageColors = { JavaScript: "#f7df1e", HTML: "#e34f26", CSS: "#563d7c", Python: "#3776ab", Java: "#f89820", TypeScript: "#3178c6" };

function formatNumber(value) {
    return new Intl.NumberFormat("en", { notation: value > 999 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value);
}

function repoCard(repo, index) {
    const description = repo.description || "A project built while exploring new ideas and sharpening the craft.";
    const language = repo.language || "Code";
    return `<article class="repo-card" style="animation-delay:${Math.min(index * 35, 350)}ms">
        <div class="repo-card-header"><i class="bi bi-folder2-open repo-icon"></i><a class="repo-link" href="${repo.html_url}" target="_blank" rel="noreferrer" aria-label="Open ${repo.name} on GitHub"><i class="bi bi-arrow-up-right"></i></a></div>
        <div class="repo-owner">${repo.owner.login}</div><h3>${repo.name}</h3><p>${description}</p>
        <div class="repo-card-meta"><span><span class="language-dot" style="background:${languageColors[language] || "#8b5cf6"}"></span>${language}</span><span><i class="bi bi-star"></i>${formatNumber(repo.stargazers_count)}</span><span><i class="bi bi-diagram-3"></i>${formatNumber(repo.forks_count)}</span></div>
    </article>`;
}

function renderRepositories() {
    const visible = state.repositories.filter((repo) => {
        const matchesOwner = state.owner === "all" || repo.owner.login === state.owner;
        const haystack = `${repo.name} ${repo.description || ""} ${repo.language || ""}`.toLowerCase();
        return matchesOwner && haystack.includes(state.query.toLowerCase());
    });
    repoGrid.innerHTML = visible.map(repoCard).join("");
    emptyState.hidden = visible.length > 0;
}

async function loadGithubData() {
    try {
        const responses = await Promise.all(profiles.map(async (profile) => {
            const [userResponse, repoResponse] = await Promise.all([
                fetch(`https://api.github.com/users/${profile}`),
                fetch(`https://api.github.com/users/${profile}/repos?type=public&per_page=100&sort=updated`)
            ]);
            if (!userResponse.ok || !repoResponse.ok) throw new Error("GitHub data could not be loaded.");
            return { user: await userResponse.json(), repos: await repoResponse.json() };
        }));
        state.repositories = responses.flatMap(({ repos }) => repos).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        const stars = state.repositories.reduce((total, repo) => total + repo.stargazers_count, 0);
        const languages = new Set(state.repositories.map((repo) => repo.language).filter(Boolean));
        document.querySelector("#repo-count").textContent = formatNumber(state.repositories.length);
        document.querySelector("#star-count").textContent = formatNumber(stars);
        document.querySelector("#language-count").textContent = formatNumber(languages.size);
        document.querySelector("#follower-count").textContent = formatNumber(Math.max(...responses.map(({ user }) => user.followers)));
        document.querySelector("#hero-avatar").src = responses[0].user.avatar_url;
        renderRepositories();
    } catch (error) {
        repoGrid.innerHTML = `<div class="loading-state"><i class="bi bi-wifi-off" style="font-size:25px;color:var(--pink)"></i><p>GitHub is taking a moment. <a class="accent" href="https://github.com/AbishSajiNMIMS" target="_blank" rel="noreferrer">View projects directly →</a></p></div>`;
        console.error(error);
    }
}

document.querySelector("#repo-search").addEventListener("input", (event) => { state.query = event.target.value; renderRepositories(); });
document.querySelector("#owner-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-owner]");
    if (!button) return;
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.owner = button.dataset.owner;
    renderRepositories();
});
document.querySelector("#theme-toggle").addEventListener("click", (event) => {
    document.body.classList.toggle("light-theme");
    const light = document.body.classList.contains("light-theme");
    event.currentTarget.innerHTML = `<i class="bi bi-${light ? "moon-stars-fill" : "sun-fill"}" aria-hidden="true"></i>`;
    event.currentTarget.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
});
document.querySelector("#year").textContent = new Date().getFullYear();
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: .12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
loadGithubData();
