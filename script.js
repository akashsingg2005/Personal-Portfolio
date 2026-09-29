document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
            mobileNav.classList.toggle('flex');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('flex');
            });
        });
    }

    // 3. Fresh Project Filtering & Search
    const freshTabs = document.querySelectorAll('.fresh-tab');
    const freshCards = document.querySelectorAll('.fresh-project-card');
    const freshSearch = document.getElementById('fresh-search-input');

    let currentCat = 'all';
    let currentQuery = '';

    function updateFreshProjects() {
        freshCards.forEach(card => {
            const category = card.getAttribute('data-cat');
            const tags = (card.getAttribute('data-tags') || '').toLowerCase();
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const desc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

            const matchCat = (currentCat === 'all' || category === currentCat);
            const matchSearch = currentQuery === '' || title.includes(currentQuery) || desc.includes(currentQuery) || tags.includes(currentQuery);

            if (matchCat && matchSearch) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    }

    freshTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            freshTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCat = tab.getAttribute('data-fresh-filter');
            updateFreshProjects();
        });
    });

    if (freshSearch) {
        freshSearch.addEventListener('input', (e) => {
            currentQuery = e.target.value.toLowerCase().trim();
            updateFreshProjects();
        });
    }

    // 4. Dynamic Interactive Experience Reader
    const expData = [
        {
            period: "Jun 2026 – Jul 2026",
            title: "Web Developer Intern",
            org: "Prabandhan’26, IIT Kanpur & EISystems Services",
            details: [
                "Developed ExpenseFlow Pro, a personal finance and expense management system using HTML5, CSS3, Bootstrap 5, and JavaScript.",
                "Implemented transaction management, dashboard analytics, income/expense calculations, search/filter functionality, reports, and LocalStorage-based data handling."
            ]
        },
        {
            period: "May 2026 – Present",
            title: "Freelance Full Stack Developer",
            org: "Chakradhari Traders ERP (Client Project)",
            details: [
                "Delivered a production-ready ERP solution for a real client, digitizing inventory, billing, sales, purchase, and customer management processes.",
                "Reduced manual business record maintenance by centralizing 500+ records into a secure MongoDB database.",
                "Coordinated directly with the client to gather requirements, implement requested features, and deploy the application successfully."
            ]
        },
        {
            period: "Apr 2026 – Jun 2026",
            title: "Python Full Stack Development Virtual Intern",
            org: "AICTE EduSkills Academy",
            details: [
                "Completed an 8-week Python Full Stack Development with Project Virtual Internship.",
                "Built full-stack applications using Python, Django, HTML, CSS, JavaScript, and MySQL."
            ]
        },
        {
            period: "Dec 2025 – Mar 2026",
            title: "Python Full Stack Developer Intern",
            org: "EduSkills Academy",
            details: [
                "Developed responsive web applications and integrated backend with MySQL."
            ]
        },
        {
            period: "Jun 2025 – Jul 2025",
            title: "Full Stack Development Intern",
            org: "CertED Technologies – Haridwar University",
            details: [
                "Built responsive webpages and integrated frontend components with backend functionality during practical training.",
                "Collaborated on multiple full-stack development tasks using HTML, CSS, JavaScript, and databases."
            ]
        },
        {
            period: "Sep 2025 – Nov 2025",
            title: "Team Leader – Smart India Hackathon",
            org: "Smart City Solution Project",
            details: [
                "Led a team of four members to build a crowdsourced smart city issue reporting and resolution solution."
            ]
        }
    ];

    const expBtns = document.querySelectorAll('.exp-btn');
    const expPeriod = document.getElementById('exp-period');
    const expTitle = document.getElementById('exp-title');
    const expOrg = document.getElementById('exp-org');
    const expDetails = document.getElementById('exp-details');

    if (expBtns.length > 0) {
        expBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                expBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const item = expData[index];
                if (item) {
                    expPeriod.textContent = item.period;
                    expTitle.textContent = item.title;
                    expOrg.textContent = item.org;

                    expDetails.innerHTML = item.details.map(d => `<p>• ${d}</p>`).join('');
                }
            });
        });
    }

    // 5. Active Nav Observer
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});