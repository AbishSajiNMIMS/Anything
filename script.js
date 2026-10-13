const { createElement: h, useEffect, useState } = React;
const hiddenRepositories = new Set(["anything", "taskflow", "lab-7", "abish-html-testing", "abish_html_testing", "practice1", "practice", "time-your-messages", "linkedln-automation-project", "app.py", "campuspro-ai_bot", "student-app", "nfa", "nfa-news-for-all-", "news-for-all-nfa", "app_naive_bayes_test", "diabetes-1-2.csv", "diabetes-1-2-.csv", "assignment11", "assignment-11_2", "assignmentnaivebayesclassifier", "assignmentnaivebasedclassifier", "assignmentnaivebasedclassifier123", "assignmentnaivebasedclassifier12", "assignmentnaivebasedclassifier1"]);
const profiles = ["AbishSajiNMIMS", "Abish1212"];
const languageColors = { JavaScript: "#f7df1e", HTML: "#e34f26", CSS: "#563d7c", Python: "#3776ab", Java: "#f89820", TypeScript: "#3178c6" };
const previews = { connect4: ["https://connect4-friendadversalai.streamlit.app/", "Connect4"], safebank: ["https://abishsajinmims.github.io/SafeBank/", "SafeBank"], "equity-intelligence-dashboard-2": ["https://equity-intelligence-dashboard-2-takthjuvpv7gfysstzxdub.streamlit.app/", "Equity Intelligence Dashboard"] };
const credentials = [
    { type: "Internship Letter", icon: "briefcase", title: "Summer Internship Completion", subtitle: "DASCAIN AI Solutions · LinkedIn Content Manager · May-Jul 2026", image: "assets/certificates/dascain-internship-completion.jpg" },
    { type: "Certificate", icon: "award", title: "RAG Systems & Agentic Workflows", subtitle: "Board Infinity and Coursera · Completed Sep 2026", image: "assets/certificates/rag-agentic-workflows-coursera.jpg" },
    { type: "Certificate", icon: "people", title: "Enactus India National Exposition 2025", subtitle: "Certificate of participation for impact-focused action", image: "assets/certificates/enactus-national-exposition-2025.jpg" },
    { type: "Certificate", icon: "lightbulb", title: "Smart India Hackathon Ideathon 2025", subtitle: "Team Bots with Dots · MPSTME Ideathon participation", image: "assets/certificates/smart-india-hackathon-ideathon-2025.jpg" },
    { type: "Certificate", icon: "gem", title: "Polarizer 2025", subtitle: "Basic Science & Humanities Department · NMIMS MPSTME", image: "assets/certificates/polarizer-2025.jpg" },
    { type: "Certificate", icon: "cpu", title: "ADAPPT 3.0", subtitle: "IETE-SF MPSTME · Certificate of appreciation · Sep 2024", image: "assets/certificates/adappt-3-0.jpg" }
];
const hobbies = [
    ["bicycle", "Cycling"],
    ["dumbbell", "Gym"],
    ["film", "Watching movies"],
    ["dribbble", "Football"],
    ["controller", "Gaming"],
    ["youtube", "YouTube content creation"]
];

function formatNumber(value) { return new Intl.NumberFormat("en", { notation: value > 999 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value); }
function routeName() { return window.location.hash.replace("#", "") || "about"; }
function Icon({ name }) { return h("i", { className: `bi bi-${name}`, "aria-hidden": "true" }); }
function HobbyGraphic({ icon }) {
    return icon === "dumbbell" ? h("span", { className: "hobby-dumbbell", "aria-hidden": "true" }, h("span"), h("span"), h("span")) : h(Icon, { name: icon });
}

function ProfileFace({ profile, back = false }) {
    return h("span", { className: `flip-card-face${back ? " flip-card-back" : ""}` },
        h("span", { className: "profile-card-top" }, h("span", { className: "mini-label" }, "DEVELOPER CARD"), h("span", { className: "pulse-icon" })),
        h("span", { className: "avatar-frame" }, h("img", { src: profile.avatar, alt: `${profile.name} profile avatar` })),
        h("strong", { className: "flip-name" }, profile.name),
        h("span", { className: "profile-handle" }, profile.handle),
        h("span", { className: "profile-tags" }, profile.roles.map(role => h("span", { key: role }, role))),
        h("span", { className: "profile-card-footer" }, h("span", null, h(Icon, { name: "geo-alt" }), " India"), h("span", null, h(Icon, { name: "arrow-repeat" }), " Click to flip"))
    );
}

function FlipProfile() {
    const [flipped, setFlipped] = useState(false);
    const profiles = {
        primary: { name: "Abish Saji", handle: "@AbishSajiNMIMS", avatar: "https://avatars.githubusercontent.com/u/193383655?v=4", roles: ["Software Engineer", "Web Developer"] },
        alternate: { name: "Abish1212", handle: "@Abish1212", avatar: "https://avatars.githubusercontent.com/u/193383655?v=4", roles: ["Builder & explorer", "Web Developer"] }
    };
    return h("button", { className: `flip-card ${flipped ? "is-flipped" : ""}`, onClick: () => setFlipped(!flipped), "aria-label": `Show ${flipped ? "Abish Saji" : "Abish1212"} profile` },
        h("span", { className: "flip-card-inner" }, h(ProfileFace, { profile: profiles.primary }), h(ProfileFace, { profile: profiles.alternate, back: true }))
    );
}

function Header({ route }) {
    return h("header", { className: "site-header" }, h("a", { className: "brand", href: "#about" }, h("span", { className: "brand-mark" }, "</>"), h("span", null, "abish", h("span", { className: "accent" }, ".dev"))),
        h("nav", { className: "nav-links", "aria-label": "Main navigation" }, ["about", "projects", "skills", "certificates"].map(name => h("a", { key: name, className: route === name ? "active" : "", href: `#${name}` }, name[0].toUpperCase() + name.slice(1)))));
}

function AboutPage() {
    return h("section", { className: "page section-wrap about-page" },
        h("div", { className: "hero-copy reveal visible" },
            h("span", { className: "hero-rule" }),
            h("h1", null, "I'm Abish, a", h("br"), "Web Developer."),
            h("p", { className: "hero-description" }, "I build useful, polished web experiences with clean interfaces, practical code, and a constant bias toward learning."),
            h("a", { className: "hero-scroll-button", href: "#projects", "aria-label": "Explore projects" }, h(Icon, { name: "chevron-down" })),
            h("div", { className: "contact-row" }, h("a", { href: "mailto:abish.saji45@nmims.in" }, h(Icon, { name: "mortarboard" }), " abish.saji45@nmims.in"), h("a", { href: "mailto:abishsaji0809@gmail.com" }, h(Icon, { name: "envelope" }), " abishsaji0809@gmail.com"))),
        h("div", { className: "profile-orbit reveal visible" },
            h("figure", { className: "sih-side-card" }, h("img", { src: "assets/hero/profile-photo.png", alt: "Portrait of Abish Saji" }), h("figcaption", null, h("span", null, "ABISH"), h("strong", null, "SAJI")))),
        h("aside", { className: "hero-info-rail reveal visible" },
            h("div", { className: "hero-info-block" }, h("h2", null, "About me"), h("p", null, "Software engineer and web developer from Mumbai, focused on building simple, thoughtful products."), h("a", { href: "#skills" }, "Learn more ", h(Icon, { name: "arrow-right" }))),
            h("div", { className: "hero-info-block" }, h("h2", null, "My work"), h("p", null, "Projects across web apps, dashboards, automation, AI workflows, and hands-on experiments."), h("a", { href: "#projects" }, "Browse portfolio ", h(Icon, { name: "arrow-right" }))),
            h("div", { className: "hero-info-block hobbies-block" }, h("h2", null, "Hobbies"), h("div", { className: "hobbies-list" }, hobbies.map(([icon, label]) => h("div", { className: "hobby-item", key: label }, h("span", null, label), h("span", { className: "hobby-graphic" }, h(HobbyGraphic, { icon })))))),
            h("div", { className: "hero-info-block" }, h("h2", null, "Follow me"), h("div", { className: "social-row" }, h("a", { href: "https://github.com/AbishSajiNMIMS", target: "_blank", rel: "noreferrer", "aria-label": "GitHub" }, h(Icon, { name: "github" })), h("a", { href: "https://github.com/Abish1212", target: "_blank", rel: "noreferrer", "aria-label": "Alternate GitHub" }, h(Icon, { name: "code-slash" })), h("a", { href: "https://www.linkedin.com/in/abish-saji-30b790319", target: "_blank", rel: "noreferrer", "aria-label": "LinkedIn" }, h(Icon, { name: "linkedin" }))))));
}

function PreviewModal({ preview, close }) {
    if (!preview) return null;
    return h("div", { className: "preview-modal", role: "dialog", "aria-modal": "true", onClick: event => event.target.className === "preview-modal" && close() }, h("div", { className: "preview-modal-panel" }, h("div", { className: "preview-modal-header" }, h("div", null, h("span", { className: "section-kicker" }, "LIVE PROJECT"), h("h2", null, preview[1])), h("div", { className: "preview-modal-actions" }, h("a", { className: "button button-ghost", href: preview[0], target: "_blank", rel: "noreferrer" }, h(Icon, { name: "box-arrow-up-right" }), " New tab"), h("button", { className: "icon-button", onClick: close, "aria-label": "Close preview" }, h(Icon, { name: "x-lg" })))), h("iframe", { src: preview[0], title: `Expanded ${preview[1]} live preview`, allow: "fullscreen; clipboard-read; clipboard-write" })));
}

function ProjectsPage({ repositories }) {
    const [query, setQuery] = useState(""); const [owner, setOwner] = useState("all"); const [preview, setPreview] = useState(null);
    const visible = repositories.filter(repo => (owner === "all" || repo.owner.login === owner) && `${repo.name} ${repo.description || ""} ${repo.language || ""}`.toLowerCase().includes(query.toLowerCase()));
    return h("section", { className: "page section-wrap projects-page" }, h("div", { className: "section-heading reveal visible" }, h("div", null, h("span", { className: "section-kicker" }, "01 / SELECTED WORK"), h("h2", null, "Things I’ve built.")), h("p", null, "Every project is a little experiment in learning, creating, and making the web more delightful.")), h("div", { className: "project-toolbar" }, h("label", { className: "search-box" }, h(Icon, { name: "search" }), h("input", { value: query, onChange: event => setQuery(event.target.value), placeholder: "Search repositories...", "aria-label": "Search repositories" })), h("div", { className: "filter-group" }, ["all", "AbishSajiNMIMS", "Abish1212"].map(value => h("button", { key: value, className: `filter-button ${owner === value ? "active" : ""}`, onClick: () => setOwner(value) }, value === "all" ? "All repos" : value === "AbishSajiNMIMS" ? "NMIMS" : value)))), h("div", { className: "repo-grid" }, visible.map((repo, index) => h(RepoCard, { key: `${repo.owner.login}-${repo.name}`, repo, index, openPreview: setPreview }))), visible.length === 0 && h("p", { className: "empty-state" }, "No repositories match that search."), h(PreviewModal, { preview, close: () => setPreview(null) }));
}

function RepoCard({ repo, index, openPreview }) {
    const key = repo.name.toLowerCase(); const preview = previews[key]; const ongoing = key.replace(/_/g, "-") === "opencv-eigenfaces-for-face-recognition"; const description = repo.description || (key === "safebank" ? "An Android banking app concept with account management and SQLite-backed balance tracking." : key === "connect4" ? "A real-time Connect 4 game built for playing with a friend." : key === "equity-intelligence-dashboard-2" ? "A data-driven dashboard for exploring equity intelligence and market insights." : "A project built while exploring new ideas and sharpening the craft.");
    return h("article", { className: `repo-card${preview ? " featured-repo" : ""}`, style: { animationDelay: `${Math.min(index * 35, 350)}ms` } },
        h("div", { className: "repo-card-header" }, h(Icon, { name: "folder2-open" }), h("a", { className: "repo-link", href: repo.html_url, target: "_blank", rel: "noreferrer", "aria-label": `Open ${repo.name} on GitHub` }, h(Icon, { name: "arrow-up-right" }))),
        h("div", { className: "repo-owner" }, repo.owner.login),
        h("h3", null, repo.name),
        ongoing && h("span", { className: "repo-tag", "aria-label": "Project status: ongoing" }, "Ongoing"),
        h("p", null, description),
        preview && h("div", { className: "repo-preview" },
            h("div", { className: "repo-preview-toolbar" }, h("span", null, h(Icon, { name: "broadcast-pin" }), " Live embedded preview"), h("button", { className: "preview-expand-button", onClick: () => openPreview(preview) }, h(Icon, { name: "arrows-fullscreen" }), " Expand")),
            h("iframe", { src: preview[0], title: `Live preview of ${preview[1]}`, loading: "lazy", allow: "fullscreen; clipboard-read; clipboard-write" }),
            h("a", { className: "repo-preview-link", href: preview[0], target: "_blank", rel: "noreferrer" }, h(Icon, { name: "box-arrow-up-right" }), " Open live preview in a new tab")),
        h("div", { className: "repo-card-meta" },
            h("span", null, h("span", { className: "language-dot", style: { background: languageColors[repo.language] || "#8b5cf6" } }), repo.language || "Code"),
            h("span", null, h(Icon, { name: "star" }), formatNumber(repo.stargazers_count)),
            h("span", null, h(Icon, { name: "diagram-3" }), formatNumber(repo.forks_count))));
}

function SkillsPage() {
    const skills = [["window", "Frontend", "HTML · CSS · JavaScript · React"], ["server", "Backend", "Node.js · Django · REST APIs"], ["database", "Data & tools", "Git · GitHub · SQL · Bootstrap"], ["lightning-charge", "Mindset", "Learn · Build · Iterate · Share"]];
    return h("section", { className: "page section-wrap skills-page" },
        h("div", { className: "section-heading reveal visible" }, h("div", null, h("span", { className: "section-kicker" }, "02 / TOOLKIT"), h("h2", null, "Curious by nature.")), h("p", null, "A growing toolkit shaped by projects, experiments, and a lot of “what if?” moments.")),
        h("div", { className: "skills-grid reveal visible" }, skills.map(([icon, title, detail]) => h("div", { className: "skill-tile", key: title }, h(Icon, { name: icon }), h("span", null, title), h("small", null, detail)))));
}

function CertificatesPage() {
    const [selected, setSelected] = useState(null);
    return h("section", { className: "page section-wrap certificates-page" },
        h("div", { className: "section-heading reveal visible" }, h("div", null, h("span", { className: "section-kicker" }, "03 / CERTIFICATES & INTERNSHIPS"), h("h2", null, "Proof of practice.")), h("p", null, "A focused collection of certificates, participation work, and one internship completion letter.")),
        h("div", { className: "credential-grid reveal visible" }, credentials.map((item, index) => h("article", { className: `credential-card${item.type === "Internship Letter" ? " internship-card" : ""}`, key: item.title, style: { animationDelay: `${Math.min(index * 45, 300)}ms` } },
            h("button", { className: "credential-image-button", onClick: () => setSelected(item), "aria-label": `View ${item.title}` }, h("img", { src: item.image, alt: `${item.title} document`, loading: "lazy" })),
            h("div", { className: "credential-content" },
                h("span", { className: "credential-type" }, h(Icon, { name: item.icon }), item.type),
                h("h3", null, item.title),
                h("p", null, item.subtitle),
                h("button", { className: "preview-expand-button", onClick: () => setSelected(item) }, h(Icon, { name: "arrows-fullscreen" }), " View"))))),
        h(CertificateModal, { item: selected, close: () => setSelected(null) }));
}

function CertificateModal({ item, close }) {
    if (!item) return null;
    return h("div", { className: "preview-modal certificate-modal", role: "dialog", "aria-modal": "true", onClick: event => event.target.className.includes("preview-modal") && close() },
        h("div", { className: "preview-modal-panel certificate-modal-panel" },
            h("div", { className: "preview-modal-header" }, h("div", null, h("span", { className: "section-kicker" }, item.type.toUpperCase()), h("h2", null, item.title)), h("button", { className: "icon-button", onClick: close, "aria-label": "Close certificate preview" }, h(Icon, { name: "x-lg" }))),
            h("div", { className: "certificate-modal-image" }, h("img", { src: item.image, alt: `${item.title} full document` }))));
}

function App() {
    const [route, setRoute] = useState(routeName()); const [repositories, setRepositories] = useState([]); const [stats, setStats] = useState({ repos: "—", stars: "—", languages: "—", followers: "—" }); const [progress, setProgress] = useState(0);
    useEffect(() => { const onHash = () => setRoute(routeName()); window.addEventListener("hashchange", onHash); return () => window.removeEventListener("hashchange", onHash); }, []);
    useEffect(() => { document.body.classList.toggle("about-route", route === "about"); }, [route]);
    useEffect(() => {
        const onScroll = () => setProgress(Math.min(100, Math.max(0, window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1) * 100)));
        const observer = new ResizeObserver(onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        observer.observe(document.documentElement);
        onScroll();
        return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); observer.disconnect(); };
    }, [route]);
    useEffect(() => { Promise.allSettled(profiles.map(async profile => { const [user, repos] = await Promise.all([fetch(`https://api.github.com/users/${profile}`), fetch(`https://api.github.com/users/${profile}/repos?type=public&per_page=100&sort=updated`)]); if (!user.ok || !repos.ok) throw new Error("GitHub request failed"); return { user: await user.json(), repos: await repos.json() }; })).then(async results => { let data = results.filter(result => result.status === "fulfilled").flatMap(result => result.value.repos).filter(repo => !hiddenRepositories.has(repo.name.toLowerCase())); if (!data.length) data = await fetch("./fallback-repos.json").then(response => response.json()).then(items => items.filter(repo => !hiddenRepositories.has(repo.name.toLowerCase()))); data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); setRepositories(data); setStats({ repos: formatNumber(data.length), stars: formatNumber(data.reduce((sum, repo) => sum + repo.stargazers_count, 0)), languages: formatNumber(new Set(data.map(repo => repo.language).filter(Boolean)).size), followers: "—" }); }).catch(error => console.error(error)); }, []);
    const Page = route === "projects" ? h(ProjectsPage, { repositories }) : route === "skills" ? h(SkillsPage) : route === "certificates" ? h(CertificatesPage) : h(AboutPage);
    const statItems = [["repos", "Public repositories"], ["stars", "Community stars"], ["languages", "Languages explored"], ["followers", "GitHub followers"]];
    return h(React.Fragment, null,
        h("div", { className: "scroll-progress", role: "progressbar", "aria-label": "Page scroll progress", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": Math.round(progress) },
            h("span", { className: "scroll-progress-fill", style: { width: `${progress}%` } }, h("span", { className: "scroll-progress-label" }, `${Math.round(progress)}%`))),
        h(Header, { route }),
        h("main", { id: "top" }, Page, route === "about" && h("section", { className: "stats section-wrap" }, statItems.map(([key, label]) => h("div", { className: "stat", key }, h("strong", null, stats[key]), h("span", null, label)))))
    );
}
ReactDOM.createRoot(document.getElementById("root")).render(h(App));
