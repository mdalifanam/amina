// Default config
        const defaultConfig = {
            hero_name: "Amina Khanom Shorna",
            hero_profession: "Front End Web Developer",
            hero_location: "Front End Web Developer from Bangladesh",
            contact_email: "aminakhanomsorna02@gmail.com",
            contact_address: "Shapla Chattar, Rangpur, Bangladesh",
            about_text: "I am a passionate Front-End Web Developer specializing in creating responsive, modern and interactive websites using HTML, CSS and JavaScript. I love building user-friendly web interfaces and improving user experience through design and performance optimization."
        };

        // Typing animation
        const typingTexts = [
            "Front End Web Developer",
            "UI/UX Enthusiast",
            "Responsive Design Expert",
            "Problem Solver"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.getElementById('typingText');

        function typeText() {
            const currentText = typingTexts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                setTimeout(typeText, 500);
            } else {
                setTimeout(typeText, isDeleting ? 50 : 100);
            }
        }

        // Start typing animation
        typeText();

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Animate progress bars
                    const progressBars = entry.target.querySelectorAll('.progress-fill');
                    progressBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        setTimeout(() => {
                            bar.style.width = progress + '%';
                        }, 200);
                    });
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Create success message
            const successDiv = document.createElement('div');
            successDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            successDiv.innerHTML = `
                <strong>✓ Message Sent!</strong><br>
                Thank you ${name}! I'll get back to you soon.
            `;

            document.body.appendChild(successDiv);

            // Remove message after 3 seconds
            setTimeout(() => {
                successDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => successDiv.remove(), 300);
            }, 3000);

            // Reset form
            contactForm.reset();
        });

        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Element SDK Configuration
        async function onConfigChange(config) {
            const heroName = document.getElementById('heroName');
            const typingText = document.getElementById('typingText');
            const heroLocation = document.getElementById('heroLocation');
            const contactEmail = document.getElementById('contactEmail');
            const contactAddress = document.getElementById('contactAddress');
            const aboutText = document.getElementById('aboutText');
            const aboutEmail = document.getElementById('aboutEmail');
            const aboutAddress = document.getElementById('aboutAddress');

            if (heroName) heroName.textContent = config.hero_name || defaultConfig.hero_name;
            if (heroLocation) heroLocation.textContent = config.hero_location || defaultConfig.hero_location;
            if (contactEmail) contactEmail.textContent = config.contact_email || defaultConfig.contact_email;
            if (contactAddress) contactAddress.textContent = config.contact_address || defaultConfig
                .contact_address;
            if (aboutText) aboutText.textContent = config.about_text || defaultConfig.about_text;
            if (aboutEmail) aboutEmail.textContent = config.contact_email || defaultConfig.contact_email;
            if (aboutAddress) aboutAddress.textContent = config.contact_address || defaultConfig.contact_address;
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["hero_name", config.hero_name || defaultConfig.hero_name],
                ["hero_profession", config.hero_profession || defaultConfig.hero_profession],
                ["hero_location", config.hero_location || defaultConfig.hero_location],
                ["contact_email", config.contact_email || defaultConfig.contact_email],
                ["contact_address", config.contact_address || defaultConfig.contact_address],
                ["about_text", config.about_text || defaultConfig.about_text]
            ]);
        }

        // Initialize Element SDK
        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig: defaultConfig,
                onConfigChange: onConfigChange,
                mapToCapabilities: mapToCapabilities,
                mapToEditPanelValues: mapToEditPanelValues
            });
        }