document.addEventListener('DOMContentLoaded', function () {

    /* =========================================
       1. MENÚ HAMBURGUESA
    ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');

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

    /* =========================================
       2. SCROLL SUAVE
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* =========================================
       3. NAVBAR SHADOW EN SCROLL
    ========================================= */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
    });

    /* =========================================
       4. ACORDEÓN DE PAQUETES
       — Funciona aunque las tarjetas tengan
         opacity:0 por el scroll-reveal.
    ========================================= */
    document.querySelectorAll('.package-header').forEach(function (header) {
        header.addEventListener('click', function () {
            var card     = this.closest('.package-card');
            var isActive = card.classList.contains('active');

            // Cierra todos
            document.querySelectorAll('.package-card').forEach(function (c) {
                c.classList.remove('active');
                var btn = c.querySelector('.toggle-btn');
                if (btn) btn.textContent = '+';
            });

            // Abre el pulsado (si estaba cerrado)
            if (!isActive) {
                card.classList.add('active');
                var toggleBtn = card.querySelector('.toggle-btn');
                if (toggleBtn) toggleBtn.textContent = '×';
            }
        });
    });

    /* =========================================
       5. FORMULARIO DE CONTACTO → WHATSAPP
    ========================================= */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var name    = document.getElementById('name').value;
            var email   = document.getElementById('email').value;
            var phone   = document.getElementById('phone').value;
            var message = document.getElementById('message').value;

            var text = 'Hola, soy ' + name + '. ' + message +
                       '. Mi email es ' + email +
                       (phone ? ' y mi teléfono es ' + phone : '') + '.';

            window.open('https://wa.me/573007389527?text=' + encodeURIComponent(text), '_blank');
            contactForm.reset();
        });
    }

    /* =========================================
       6. SCROLL REVEAL (IntersectionObserver)
       — usa clase .reveal en lugar de inyectar
         opacity:0 en línea, para no bloquear
         el acordeón de paquetes.
    ========================================= */
    var revealEls = document.querySelectorAll('.service-card, .feature');
    var observer  = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
        el.classList.add('reveal');
        observer.observe(el);
    });

});