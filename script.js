        // Initialize Lucide Icons
        lucide.createIcons();

        // Reveal animations on scroll
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(el => revealObserver.observe(el));

        // Neural Network Background Logic
        const canvas = document.getElementById('neural-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            // Adjust density based on screen size
            let numberOfParticles = (canvas.width * canvas.height) / 11000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

                // Mouse interaction
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 1.5;
                    if (mouse.x > this.x && this.x > this.size * 10) this.x -= 1.5;
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 1.5;
                    if (mouse.y > this.y && this.y > this.size * 10) this.y -= 1.5;
                }
            }
            draw() {
                ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function connect() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - distance / 20000) * 0.15})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connect();
            requestAnimationFrame(animate);
        }

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('resize', () => {
            initCanvas();
        });

        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        initCanvas();
        animate();
