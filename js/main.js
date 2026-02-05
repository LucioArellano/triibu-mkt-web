// SIMULACIÓN DE DATOS (Puedes agregar tantos como quieras)
const portfolioItems = [
    { title: "TOYOTA MODESTO", category: "Automotive", img: "/assets/img/portfolio.jpg", link: "/portfolio/toyota-modesto.html" },
    { title: "COSTA ALEGRE", category: "Hospitality", img: "/assets/img/portfolio.jpg", link: "/portfolio/costa-alegre.html" },
    { title: "DR. SMILE", category: "Healthcare", img: "/assets/img/portfolio.jpg", link: "/portfolio/dr-smile.html" },
    { title: "NISSAN GDL", category: "Automotive", img: "/assets/img/portfolio.jpg", link: "/portfolio/nissan-gdl.html" },
    { title: "MARRIOTT CANCUN", category: "Hospitality", img: "/assets/img/portfolio.jpg", link: "/portfolio/marriott.html" },
    { title: "CLINICA VITAL", category: "Healthcare", img: "/assets/img/portfolio.jpg", link: "/portfolio/vital.html" },
    { title: "FORD COUNTRY", category: "Automotive", img: "/assets/img/portfolio.jpg", link: "/portfolio/ford.html" },
    { title: "HILTON LOS CABOS", category: "Hospitality", img: "/assets/img/portfolio.jpg", link: "/portfolio/hilton.html" },
    { title: "MAZDA ZAPOPAN", category: "Automotive", img: "/assets/img/portfolio.jpg", link: "/portfolio/mazda.html" },
    { title: "DENTALia", category: "Healthcare", img: "/assets/img/portfolio.jpg", link: "/portfolio/dentalia.html" },
    { title: "KIA MOTORS", category: "Automotive", img: "/assets/img/portfolio.jpg", link: "/portfolio/kia.html" },
    { title: "HYATT ZIVA", category: "Hospitality", img: "/assets/img/portfolio.jpg", link: "/portfolio/hyatt.html" },
    { title: "AUDI CENTER", category: "Automotive", img: "/assets/img/portfolio.jpg", link: "/portfolio/audi.html" },
    // ... Agrega más objetos para probar la página 2
    { title: "MAZDA ZAPOPAN", category: "Automotive", img: "/assets/img/portfolio.jpg", link: "/portfolio/mazda.html" },
    { title: "DENTALia", category: "Healthcare", img: "/assets/img/portfolio.jpg", link: "/portfolio/dentalia.html" },
    { title: "KIA MOTORS", category: "Automotive", img: "/assets/img/portfolio.jpg", link: "/portfolio/kia.html" },
    { title: "HYATT ZIVA", category: "Hospitality", img: "/assets/img/portfolio.jpg", link: "/portfolio/hyatt.html" },
    { title: "AUDI CENTER", category: "Automotive", img: "/assets/img/portfolio.jpg", link: "/portfolio/audi.html" },
];

// 1. Definimos el Observer de forma global para que sea accesible por todas las funciones
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 2. Función para cargar componentes (Header/Footer)
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const content = await response.text();
            const container = document.getElementById(id);
            container.innerHTML = content;
            
            if (id === 'header-placeholder') {
                initMenuLogic();
                setActiveLink();
            }


            // --- ESTA ES LA CLAVE ---
            // Una vez inyectado el HTML, buscamos los elementos para animarlos
            const elementsInComponent = container.querySelectorAll('.footer-h3, .footer-p, .social-icons a, .footer-col');
            elementsInComponent.forEach(el => {
                // Les aseguramos la clase de animación y los observamos
                el.classList.add('reveal-on-scroll');
                observer.observe(el);
            });
        }
    } catch (error) {
        console.error("Error cargando el componente:", error);
    }
}

function initMenuLogic() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.onclick = () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        };
        document.querySelectorAll('.nav-link, .logo a').forEach(link => {
            link.onclick = () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('is-active');
            };
        });
    }
}

function setActiveLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href').includes(currentPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 3. Inicio al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    // Cargamos componentes dinámicos
    loadComponent('header-placeholder', '/components/header.html');
    loadComponent('footer-placeholder', '/components/footer.html');

    /**
     * Función para inicializar animaciones en elementos estáticos
     * La metemos en una función para poder llamarla con una pequeña espera si fuera necesario
     */
    const initStaticAnimations = () => {
        const staticElements = document.querySelectorAll(`
            .portfolio-title, .portfolio-subtitle, .portfolio-card, .pagination,
            .hero-content, .target-section, .manifesto-header, .philosophy-title, 
            .clients-title, .target-title, .build-title, .contact-title,
            .sub-text, .manifesto-body, .clients-description, .target-text, .contact-subtitle,
            .manifesto-image, .philosophy-images, .target-image, .build-image,
            .client-card, .philosophy-list li, .target-list li, .build-list li,
            .hero-btns a
        `);

        staticElements.forEach((el) => {
            // Verificamos que no esté ya observado para no duplicar esfuerzos
            if (!el.classList.contains('reveal-on-scroll')) {
                el.classList.add('reveal-on-scroll');
            }
            observer.observe(el);
        });
    };

    // Ejecutamos la animación de los elementos de la página actual
    initStaticAnimations();
    
    // Opcional: Re-escanear después de un breve momento por si el renderizado fue lento
    setTimeout(initStaticAnimations, 100); 
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar componentes
    loadComponent('header-placeholder', '/components/header.html');
    loadComponent('footer-placeholder', '/components/footer.html');

    // 2. Función de observación robusta
    const initAnimations = () => {
        const elements = document.querySelectorAll('.reveal-on-scroll, .portfolio-card');
        elements.forEach(el => {
            // Si por alguna razón no tiene la clase base, se la ponemos
            if (!el.classList.contains('reveal-on-scroll')) {
                el.classList.add('reveal-on-scroll');
            }
            observer.observe(el);
        });
    };

    // 3. Ejecuciones en tiempos distintos para asegurar el renderizado
    initAnimations(); // Inmediato
    window.addEventListener('load', initAnimations); // Cuando TODAS las imágenes carguen
    setTimeout(initAnimations, 500); // Respaldo final
});

async function initPage() {
    // 1. Cargamos componentes primero
    await loadComponent('header-placeholder', '/components/header.html');
    await loadComponent('footer-placeholder', '/components/footer.html');
    
    // 2. Una vez cargado el HTML, activamos el Observer
    const allReveal = document.querySelectorAll('.reveal-on-scroll, .case-title, .case-subtitle, .case-hero-image');
    allReveal.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initPage);

// VARIABLES DE ESTADO
let currentPage = 1;
const itemsDesktop = 12; // 6 filas x 2 col
const itemsMobile = 8;   // Regla móvil

function getItemsPerPage() {
    return window.innerWidth < 1024 ? itemsMobile : itemsDesktop;
}

// 1. FUNCIÓN PRINCIPAL DE RENDERIZADO
function renderPortfolio() {
    const gridContainer = document.getElementById('portfolio-grid');
    const paginationContainer = document.getElementById('pagination-container');
    
    // Si no estamos en la página de portfolio, salimos para evitar errores
    if (!gridContainer) return;

    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);

    // Calcular índices (start y end)
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToShow = portfolioItems.slice(start, end);

    // A. GENERAR HTML DE LAS CARDS
    gridContainer.innerHTML = itemsToShow.map(item => `
        <article class="portfolio-card reveal-on-scroll">
            <a href="${item.link}" class="portfolio-link">
                <div class="portfolio-img-wrapper">
                    <img src="${item.img}" alt="${item.title}">
                </div>
                <div class="portfolio-info">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
            </a>
        </article>
    `).join('');

    // B. GENERAR PAGINACIÓN (< 1 2 3 >)
    let paginationHTML = '';
    
    // Flecha Prev
    if (currentPage > 1) {
        paginationHTML += `<a href="#" class="arrow prev-page"><i class="fas fa-chevron-left"></i></a>`;
    }

    // Números
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<a href="#" class="page-num ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>`;
    }

    // Flecha Next
    if (currentPage < totalPages) {
        paginationHTML += `<a href="#" class="arrow next-page"><i class="fas fa-chevron-right"></i></a>`;
    }

    paginationContainer.innerHTML = paginationHTML;

    // C. RE-ACTIVAR ANIMACIONES (Crucial)
    // Como acabamos de crear HTML nuevo, el Observer "viejo" no lo conoce.
    const newCards = document.querySelectorAll('.portfolio-card');
    newCards.forEach(card => {
        // Forzamos el estado inicial en CSS
        card.style.opacity = '0'; 
        observer.observe(card);
    });

    // D. ASIGNAR EVENTOS CLICK A LA PAGINACIÓN
    attachPaginationEvents();
}

// 2. MANEJAR CLICKS (Sin recargar)
function attachPaginationEvents() {
    document.querySelectorAll('.page-num').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = parseInt(e.target.dataset.page);
            changePage();
        });
    });

    const prevBtn = document.querySelector('.prev-page');
    const nextBtn = document.querySelector('.next-page');

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                changePage();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const totalPages = Math.ceil(portfolioItems.length / getItemsPerPage());
            if (currentPage < totalPages) {
                currentPage++;
                changePage();
            }
        });
    }
}

// 3. EFECTO SUAVE AL CAMBIAR PÁGINA
function changePage() {
    // Hacemos scroll suave hacia arriba del grid
    const sectionTop = document.querySelector('.portfolio-grid-section').offsetTop - 100;
    window.scrollTo({ top: sectionTop, behavior: 'smooth' });

    // Pequeño delay para dar sensación de carga
    setTimeout(() => {
        renderPortfolio();
    }, 300);
}

// 4. INICIALIZAR
document.addEventListener("DOMContentLoaded", () => {
    // ... tus otros inits ...
    renderPortfolio();
    
    // Escuchar cambios de tamaño de ventana para ajustar items (8 vs 12)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderPortfolio(); // Re-renderiza si cambia de movil a escritorio
        }, 250);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    
    const form = document.getElementById("contactForm");
    const statusText = document.getElementById("form-status");
    const submitBtn = form ? form.querySelector(".btn-send") : null;

    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault(); // Stop recarga

            const formData = new FormData(form);
            
            // Feedback Visual
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
            statusText.style.display = "none";

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    // ÉXITO (Código 200)
                    statusText.innerText = result.message; // "Thanks!..."
                    statusText.style.color = "#4CAF50"; 
                    statusText.style.display = "block";
                    form.reset();
                } else {
                    // ERROR (Código 400 o 500)
                    statusText.innerText = result.message;
                    statusText.style.color = "#FF5722";
                    statusText.style.display = "block";
                }
            } catch (error) {
                // ERROR DE RED
                statusText.innerText = "Connection error. Please try again later.";
                statusText.style.color = "#FF0000";
                statusText.style.display = "block";
            } finally {
                // RESTAURAR
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                
                // Borrar mensaje de éxito tras 5 segundos
                if (statusText.style.color === "rgb(76, 175, 80)") {
                    setTimeout(() => {
                        statusText.style.display = "none";
                    }, 5000);
                }
            }
        });
    }
});