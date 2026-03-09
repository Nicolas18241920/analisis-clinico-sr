// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll con clase .scrolled
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Funcionalidad de expandir/colapsar paquetes
    const packageHeaders = document.querySelectorAll('.package-header');
    
    packageHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const packageCard = this.closest('.package-card');
            const isActive = packageCard.classList.contains('active');
            
            // Cerrar todos los paquetes
            document.querySelectorAll('.package-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Abrir el paquete clickeado si no estaba activo
            if (!isActive) {
                packageCard.classList.add('active');
            }
        });
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Crear mensaje para WhatsApp
            const whatsappMessage = `Hola, soy ${name}. ${message}. Mi email es ${email}${phone ? ` y mi teléfono es ${phone}` : ''}.`;
            const whatsappURL = `https://wa.me/573007389527?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Abrir WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Limpiar formulario
            contactForm.reset();

            // Mostrar confirmación visual
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Mensaje enviado';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Animación de entrada para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .package-card, .feature, .contact-item, .stat-item').forEach(card => {
        card.classList.add('slide-up');
        observer.observe(card);
    });

    // Año dinámico en el footer
    const yearEl = document.querySelector('.footer-bottom p');
    if (yearEl) {
        yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
    }

});
