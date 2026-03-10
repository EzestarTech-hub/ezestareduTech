document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const mobileIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            mobileIcon.classList.remove('fa-bars');
            mobileIcon.classList.add('fa-xmark');
        } else {
            mobileIcon.classList.remove('fa-xmark');
            mobileIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileIcon.classList.remove('fa-xmark');
            mobileIcon.classList.add('fa-bars');
        });
    });

    // Sticky Navbar & Active Link Update on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If the element has stagger-reveal, animate children with delay
                if (entry.target.classList.contains('stagger-reveal')) {
                    const children = entry.target.children;
                    for (let i = 0; i < children.length; i++) {
                        children[i].style.transitionDelay = `${(i + 1) * 0.1}s`;
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const elementsToAnimate = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .stagger-reveal');
    elementsToAnimate.forEach(el => {
        animateOnScroll.observe(el);
    });

    // Interactive button hover effect (ripple/glow tracking)
    // Set up custom properties for hover effect on all .btn-glow elements
    const glowButtons = document.querySelectorAll('.btn-glow');
    glowButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Setting custom properties for potential advanced hover effects
            this.style.setProperty('--x', x + 'px');
            this.style.setProperty('--y', y + 'px');
        });
    });

    // 1. Start Learning Button - Scroll to Subjects
    const startLearningBtn = document.getElementById('startLearningBtn');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const subjectsSection = document.getElementById('subjects');
            if (subjectsSection) {
                subjectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 2. AI Tutor Simulation functionality
    const tutorInput = document.getElementById('tutorInput');
    const tutorSendBtn = document.getElementById('tutorSendBtn');
    const tutorChatArea = document.getElementById('tutorChatArea');

    if (tutorInput && tutorSendBtn && tutorChatArea) {
        // Function to create a chat message element
        function appendMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
            messageDiv.innerHTML = `<p>${text}</p>`;
            tutorChatArea.appendChild(messageDiv);
            // Scroll to the latest message
            tutorChatArea.scrollTop = tutorChatArea.scrollHeight;
        }

        // Logic to determine AI response
        function getAIResponse(question) {
            const lowerQuestion = question.toLowerCase();
            
            if (lowerQuestion.includes('example') && lowerQuestion.includes('newton')) {
                return "Here are 3 examples of Newton's Second Law (F = ma):<br>1. Pushing a car (large mass) requires more force than pushing a bicycle (small mass) to achieve the same acceleration.<br>2. A heavy truck takes longer to stop than a small car moving at the same speed.<br>3. Kicking a soccer ball softly gives it less acceleration compared to kicking it hard with more force.";
            } else if (lowerQuestion.includes('example') && (lowerQuestion.includes('differentiation') || lowerQuestion.includes('derivative'))) {
                return "Here are 3 worked examples of differentiation:<br>1. <strong>y = x²</strong> &rarr; dy/dx = 2x<br>2. <strong>y = 3x³ + 2x</strong> &rarr; dy/dx = 9x² + 2<br>3. <strong>y = sin(x)</strong> &rarr; dy/dx = cos(x)";
            } else if (lowerQuestion.includes('example') && (lowerQuestion.includes('bonding') || lowerQuestion.includes('chemical'))) {
                return "Examples of Chemical Bonding:<br><strong>Ionic Bonding:</strong> Electrons are transferred from a metal to a non-metal (e.g., NaCl - Sodium Chloride).<br><strong>Covalent Bonding:</strong> Electrons are shared between two non-metals (e.g., H₂O - Water).";
            } else if (lowerQuestion.includes('example') && lowerQuestion.includes('english')) {
                return "Here are some English grammar examples:<br><strong>Nouns (Names):</strong> Teacher, Lagos, Computer.<br><strong>Verbs (Actions):</strong> Run, Study, Think.<br><strong>Adjectives (Describing words):</strong> Beautiful, Smart, Fast.";
            } else if (lowerQuestion.includes('teach me') || lowerQuestion.includes('work me through examples')) {
                return "Sure! Please specify the topic such as differentiation, Newton's laws, chemical bonding, or English grammar.";
            } else if (lowerQuestion.includes('differentiation') || lowerQuestion.includes('derivative')) {
                return "Differentiation is a process in calculus used to find the rate at which a quantity changes. Simply put, if you have a curve, the derivative gives you the exact slope of that curve at any given point!";
            } else if (lowerQuestion.includes('newton')) {
                return "Newton's Second Law states that the force acting on an object is equal to the mass of the object multiplied by its acceleration (F = ma). For example, it takes more force to push a heavy car than a light bicycle.";
            } else if (lowerQuestion.includes('chemical bonding') || lowerQuestion.includes('bond')) {
                return "Chemical bonding is what holds atoms together in molecules. Elements share, gain, or lose electrons to achieve a stable, full outer shell, acting like pieces of a puzzle snapping together.";
            } else {
                return "That's a great question! As your AI tutor, I'm here to help break down complex subjects step-by-step. Try asking me specifically about your syllabus topics in Math, Science, or English.";
            }
        }

        // Handle sending message
        function handleSend() {
            const questionText = tutorInput.value.trim();
            if (questionText === '') return;

            // Show User Message
            appendMessage(questionText, true);
            tutorInput.value = '';

            // Simulate AI thinking and respond
            setTimeout(() => {
                const response = getAIResponse(questionText);
                appendMessage(response, false);
            }, 800);
        }

        tutorSendBtn.addEventListener('click', handleSend);
        tutorInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });
    }

    // 3. Practice Question Solution Toggle
    const showSolutionBtn = document.getElementById('showSolutionBtn');
    const solutionContainer = document.getElementById('solutionContainer');

    if (showSolutionBtn && solutionContainer) {
        showSolutionBtn.addEventListener('click', function() {
            const isHidden = solutionContainer.style.display === 'none';
            
            if (isHidden) {
                solutionContainer.style.display = 'block';
                showSolutionBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Solution';
                showSolutionBtn.classList.add('btn-primary');
                showSolutionBtn.classList.remove('btn-outline');
            } else {
                solutionContainer.style.display = 'none';
                showSolutionBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Show Solution';
                showSolutionBtn.classList.remove('btn-primary');
                showSolutionBtn.classList.add('btn-outline');
            }
        });
    }

    // 4. Feature Cards Interactions
    const cardAi = document.getElementById('card-ai');
    const cardPrep = document.getElementById('card-prep');
    const cardQuiz = document.getElementById('card-quiz');
    const cardTrack = document.getElementById('card-track');

    if (cardAi) {
        cardAi.addEventListener('click', () => {
            const tutorSection = document.getElementById('tutor');
            if (tutorSection) tutorSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (cardPrep) {
        cardPrep.addEventListener('click', () => {
            const practiceSection = document.getElementById('practice');
            if (practiceSection) practiceSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (cardQuiz) {
        cardQuiz.addEventListener('click', () => {
            const practiceSection = document.getElementById('practice');
            if (practiceSection) practiceSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (cardTrack) {
        cardTrack.addEventListener('click', () => {
            alert("Smart tracking feature coming soon. EzestarEduTech will soon track your learning progress.");
        });
    }

});
