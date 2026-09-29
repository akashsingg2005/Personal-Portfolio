document.addEventListener('DOMContentLoaded', () => {
    // 1. Fallback Lucide Icons Initialization
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Mobile Navigation Drawer Toggle & Outside Click Closing Listener
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle('hidden');
            mobileNav.classList.toggle('flex');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('flex');
            });
        });

        // Close mobile drawer when user clicks anywhere outside of menu and toggle button
        document.addEventListener('click', (e) => {
            if (!mobileNav.classList.contains('hidden')) {
                const isClickInsideNav = mobileNav.contains(e.target);
                const isClickOnToggle = menuToggle.contains(e.target);

                if (!isClickInsideNav && !isClickOnToggle) {
                    mobileNav.classList.add('hidden');
                    mobileNav.classList.remove('flex');
                }
            }
        });
    }

    // 3. Profile Picture Expandable Lightbox Modal
    const avatarTrigger = document.getElementById('profile-avatar-trigger');
    const profileModal = document.getElementById('profile-modal');
    const closeModalBtn = document.getElementById('close-profile-modal');
    const modalContactLink = document.getElementById('modal-contact-link');

    if (avatarTrigger && profileModal) {
        avatarTrigger.addEventListener('click', () => {
            profileModal.classList.remove('hidden');
            profileModal.classList.add('flex');
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                profileModal.classList.add('hidden');
                profileModal.classList.remove('flex');
            });
        }

        if (modalContactLink) {
            modalContactLink.addEventListener('click', () => {
                profileModal.classList.add('hidden');
                profileModal.classList.remove('flex');
            });
        }

        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                profileModal.classList.add('hidden');
                profileModal.classList.remove('flex');
            }
        });
    }

    // 4. Project Filter & Live Search
    const filterTabs = document.querySelectorAll('.gradient-tab');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('gradient-search');

    let currentFilter = 'all';
    let searchQuery = '';

    function filterProjects() {
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const tags = (card.getAttribute('data-tags') || '').toLowerCase();
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const desc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

            const matchCat = (currentFilter === 'all' || category === currentFilter);
            const matchSearch = searchQuery === '' || title.includes(searchQuery) || desc.includes(searchQuery) || tags.includes(searchQuery);

            if (matchCat && matchSearch) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.getAttribute('data-filter');
            filterProjects();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterProjects();
        });
    }

    // 5. Interactive Experience Reader
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

    // 6. Active Navigation Link Scroll Highlighting
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