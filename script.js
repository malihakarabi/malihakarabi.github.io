/**
 * Main Script to fetch JSON data and render the portfolio
 */

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // FETCH DATA
        const response = await fetch('data.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const portfolioData = await response.json();
        
        // RENDER CONTENT
        renderPortfolio(portfolioData);
        
        // INITIALIZE ANIMATIONS
        initObserver();
        
    } catch (error) {
        console.error("Could not load portfolio data:", error);
        document.body.innerHTML = `<div style="text-align:center; padding:50px;">
            <h1>Error Loading Portfolio</h1>
            <p>Please ensure you are running this on a local web server (e.g., Live Server) to load the JSON data.</p>
        </div>`;
    }
});

function renderPortfolio(data) {
    // Render Nav
    const navContainer = document.getElementById('nav-container');
    data.nav.forEach(item => {
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.text;
        navContainer.appendChild(a);
    });

    // Render Hero
    document.getElementById('hero-name').textContent = data.hero.name;
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    document.getElementById('hero-image').style.backgroundImage = `url('${data.hero.imageUrl}')`;

    // Render Philosophy
    document.getElementById('phil-title').textContent = data.philosophy.title;
    document.getElementById('phil-desc').textContent = data.philosophy.description;

    // Render Approach
    document.getElementById('approach-title').textContent = data.approach.title;
    document.getElementById('approach-desc').textContent = data.approach.description;
    document.getElementById('approach-img').style.backgroundImage = `url('${data.approach.imageUrl}')`;

    // Render Education
    const eduList = document.getElementById('edu-list');
    data.education.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `edu-item reveal delay-${(index + 1) * 100}`;
        div.innerHTML = `
            <h3>${item.degree}</h3>
            <span class="edu-meta">${item.school}</span>
            <span class="edu-date">${item.date}</span>
            <p>${item.description}</p>
        `;
        eduList.appendChild(div);
    });

    // Render Skills
    const skillsContainer = document.getElementById('skills-container');
    data.skills.forEach((col, index) => {
        const div = document.createElement('div');
        div.className = `skill-col reveal delay-${(index + 1) * 100}`;
        const listItems = col.items.map(item => `<li>${item}</li>`).join('');
        div.innerHTML = `
            <h3>${col.title}</h3>
            <ul>${listItems}</ul>
        `;
        skillsContainer.appendChild(div);
    });

    // Render Projects
    const projectsContainer = document.getElementById('projects-container');
    data.projects.forEach((proj, index) => {
        const div = document.createElement('div');
        div.className = `project-card reveal delay-${(index + 1) * 100}`;
        div.innerHTML = `
            <div class="project-title">${proj.title}</div>
            <div class="project-visual">
                <img src="${proj.image}" alt="${proj.title}">
            </div>
            <div class="project-details">
                <div class="detail-block">
                    <span class="detail-label">Context</span>
                    <div class="detail-text">${proj.context}</div>
                </div>
                <div class="detail-block">
                    <span class="detail-label">Action</span>
                    <div class="detail-text">${proj.action}</div>
                </div>
                <div class="detail-block">
                    <span class="detail-label">Result</span>
                    <div class="detail-text">${proj.result}</div>
                </div>
            </div>
        `;
        projectsContainer.appendChild(div);
    });

    // Render Contact
    document.getElementById('contact-title').textContent = data.contact.title;
    document.getElementById('contact-desc').textContent = data.contact.description;
    document.getElementById('contact-link').href = `mailto:${data.contact.email}`;
}

function initObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}