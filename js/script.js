// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
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

    // Navbar transparente en scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window. scrollY > 50) {
                navbar. style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Funcionalidad de expandir/colapsar paquetes
    const packageHeaders = document.querySelectorAll('.package-header');
    
    console.log('Paquetes encontrados:', packageHeaders.length); // Para debug
    
    packageHeaders.forEach(header => {
        header. addEventListener('click', function() {
            const packageCard = this.closest('.package-card');
            const isActive = packageCard.classList. contains('active');
            
            // Cerrar todos los paquetes
            document.querySelectorAll('.package-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Abrir el paquete clickeado si no estaba activo
            if (!isActive) {
                packageCard.classList. add('active');
            }
            
            console.log('Click en paquete:', this.querySelector('h3').textContent); // Para debug
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
            const whatsappURL = `https://wa.me/573007389527? text=${encodeURIComponent(whatsappMessage)}`;
            
            // Abrir WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Limpiar formulario
            contactForm.reset();
        });
    }

    // Animación de entrada para las tarjetas
    const observerOptions = {
        threshold:  0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style. opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas las tarjetas
    document.querySelectorAll('.service-card, .package-card, .feature').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

});
