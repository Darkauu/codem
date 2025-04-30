// Courses category navbar
document.addEventListener("DOMContentLoaded", function () {
    // Solo seleccionamos los enlaces dentro de la sección de categorías de cursos
    const filters = document.querySelectorAll(".courses-categories .nav-link");
    const courses = document.querySelectorAll(".course-card");

    filters.forEach(filter => {
        filter.addEventListener("click", function (event) {
            event.preventDefault();

            // Remover la clase "active" de todos los filtros
            filters.forEach(f => f.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-filter");

            courses.forEach(course => {
                if (category === "all" || course.getAttribute("data-category") === category) {
                    course.classList.add("show");
                } else {
                    course.classList.remove("show");
                }
            });
        });
    });
});

// Documentation search bar
 document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar input");
    const docCards = document.querySelectorAll(".doc-card");

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim().toLowerCase();

        docCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(query) || query === "") {
                card.parentElement.style.display = "";
            } else {
                card.parentElement.style.display = "none";
            }
        });
    });
});

// Documentation category nav bar
document.addEventListener("DOMContentLoaded", function () {
    const categoryLinks = document.querySelectorAll(".sidebar .nav-link");
    // Selecciona todas las secciones de documentación
    const sections = document.querySelectorAll(".documentation-content .doc-section");

    categoryLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            // Remover la clase 'active' de todos y agregarla al enlace actual
            categoryLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");

            // Obtener la categoría del href del enlace
            let category = this.getAttribute("href");
            if (category === "#" || category === "") {
                category = "all";  // 'Ver todas' mostrará todas las secciones
            } else {
                // Remueve el '#' para obtener el id real de la sección
                category = category.substring(1);
            }

            // Itera sobre cada sección y la muestra u oculta según corresponda
            sections.forEach(section => {
                if (category === "all" || section.id === category) {
                    section.style.display = "";
                } else {
                    section.style.display = "none";
                }
            });
        });
    });
});

// Blog navigation
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogItems = document.querySelectorAll('.blog-item');

    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filterValue = this.getAttribute('data-filter');

            // Filter blog items
            blogItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Script para manejar los parámetros de URL en la página del blog
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en la página del blog
    if (window.location.pathname === '/blog') {
        // Obtener el parámetro filter de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');

        // Si existe un parámetro de filtro, activar el filtro correspondiente
        if (filterParam) {
            const filterButtons = document.querySelectorAll('.filter-btn');

            // Desactivar todos los botones primero
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Activar el botón correspondiente al filtro
            const targetButton = document.querySelector(`.filter-btn[data-filter="${filterParam}"]`);
            if (targetButton) {
                targetButton.classList.add('active');

                // Filtrar los elementos del blog
                const blogItems = document.querySelectorAll('.blog-item');
                blogItems.forEach(item => {
                    if (item.getAttribute('data-category') === filterParam) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        }
    }
});

// Carousel de Testimonios
document.addEventListener('DOMContentLoaded', function() {
    // Configuración del carrusel
    const testimoniosCarousel = document.querySelector('.testimonios-carousel');
    const testimoniosRow = testimoniosCarousel.querySelector('.row');
    const testimonioItems = Array.from(testimoniosCarousel.querySelectorAll('.testimonio-item'));
    const prevButton = document.querySelector('.testimonios-control.prev');
    const nextButton = document.querySelector('.testimonios-control.next');

    // Variables de control
    let currentIndex = 0;
    const totalTestimonios = testimonioItems.length;
    let itemsPerSlide = 3; // Por defecto en pantallas grandes
    let isAnimating = false; // Para evitar clics múltiples durante la animación

    // Preparar el DOM para la animación
    function setupCarouselStructure() {
        // Crear el contenedor y track para la animación
        const trackContainer = document.createElement('div');
        trackContainer.className = 'testimonios-track-container';

        const track = document.createElement('div');
        track.className = 'testimonios-track';

        // Mover los items al track
        testimonioItems.forEach(item => {
            // Eliminar la clase col-md-4 que podría interferir con nuestro layout
            item.classList.remove('col-md-4');
            track.appendChild(item);
        });

        // Limpiar el contenedor original y agregar la nueva estructura
        testimoniosRow.innerHTML = '';
        trackContainer.appendChild(track);
        testimoniosRow.appendChild(trackContainer);
    }

    // Función para actualizar el número de testimonios por slide según el ancho de pantalla
    function updateItemsPerSlide() {
        const oldItemsPerSlide = itemsPerSlide;

        if (window.innerWidth < 768) {
            itemsPerSlide = 1; // Móviles: 1 testimonio por slide
        } else if (window.innerWidth < 992) {
            itemsPerSlide = 2; // Tablets: 2 testimonios por slide
        } else {
            itemsPerSlide = 3; // Escritorio: 3 testimonios por slide
        }

        // Si cambió el número de items por slide, actualizar la visualización
        if (oldItemsPerSlide !== itemsPerSlide) {
            // Asegurarse de que el índice actual sea múltiplo del nuevo itemsPerSlide
            currentIndex = Math.floor(currentIndex / itemsPerSlide) * itemsPerSlide;
            updateCarousel(false); // Sin animación al cambiar el tamaño
        }
    }

    // Función para actualizar la visualización del carrusel
    function updateCarousel(animate = true) {
        const track = document.querySelector('.testimonios-track');

        if (animate && !isAnimating) {
            isAnimating = true;

            // Calcular el desplazamiento
            const slideWidth = 100 / itemsPerSlide;
            const translateValue = -currentIndex * slideWidth;

            // Aplicar la transformación con animación
            track.style.transform = `translateX(${translateValue}%)`;

            // Restablecer el estado después de la animación
            setTimeout(() => {
                isAnimating = false;
            }, 500); // Coincidir con la duración de la transición CSS
        } else {
            // Actualización sin animación (por ejemplo, al cambiar el tamaño de la ventana)
            const slideWidth = 100 / itemsPerSlide;
            const translateValue = -currentIndex * slideWidth;
            track.style.transition = 'none';
            track.style.transform = `translateX(${translateValue}%)`;

            // Forzar un reflow para que se aplique el cambio sin transición
            track.offsetHeight;

            // Restaurar la transición
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }

        // Actualizar estado de los botones
        updateButtonStates();

        // Actualizar los dots
        updateActiveDot();
    }

    // Función para actualizar el estado de los botones (habilitado/deshabilitado)
    function updateButtonStates() {
        // Habilitar/deshabilitar botón anterior
        if (currentIndex <= 0) {
            prevButton.classList.add('disabled');
            prevButton.setAttribute('aria-disabled', 'true');
        } else {
            prevButton.classList.remove('disabled');
            prevButton.setAttribute('aria-disabled', 'false');
        }

        // Habilitar/deshabilitar botón siguiente
        const maxIndex = totalTestimonios - itemsPerSlide;
        if (currentIndex >= maxIndex) {
            nextButton.classList.add('disabled');
            nextButton.setAttribute('aria-disabled', 'true');
        } else {
            nextButton.classList.remove('disabled');
            nextButton.setAttribute('aria-disabled', 'false');
        }
    }

    // Función para ir al slide anterior
    function goToPrevSlide() {
        if (currentIndex > 0 && !isAnimating) {
            currentIndex = Math.max(0, currentIndex - itemsPerSlide);
            updateCarousel();
        }
    }

    // Función para ir al siguiente slide
    function goToNextSlide() {
        const maxIndex = totalTestimonios - itemsPerSlide;
        if (currentIndex < maxIndex && !isAnimating) {
            currentIndex = Math.min(maxIndex, currentIndex + itemsPerSlide);
            updateCarousel();
        }
    }

    // Crear indicadores de puntos (dots)
    function createDots() {
        // Calcular el número total de slides
        const totalSlides = Math.ceil(totalTestimonios / itemsPerSlide);

        // Solo crear dots si hay más de un slide
        if (totalSlides > 1) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'testimonios-dots';

            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'testimonios-dot';
                if (i === 0) dot.classList.add('active');

                // Agregar evento para navegar al hacer clic en un punto
                dot.addEventListener('click', function() {
                    if (!isAnimating) {
                        currentIndex = i * itemsPerSlide;
                        updateCarousel();
                    }
                });

                dotsContainer.appendChild(dot);
            }

            // Insertar los dots después de los controles
            const controlsContainer = document.querySelector('.testimonios-controls');
            controlsContainer.parentNode.insertBefore(dotsContainer, controlsContainer.nextSibling);
        }
    }

    // Actualizar el dot activo
    function updateActiveDot() {
        const dots = document.querySelectorAll('.testimonios-dot');
        const activeSlideIndex = Math.floor(currentIndex / itemsPerSlide);

        dots.forEach((dot, index) => {
            if (index === activeSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Inicializar el carrusel
    function initCarousel() {
        // Preparar la estructura del DOM
        setupCarouselStructure();

        // Si hay más testimonios que los que caben en un slide, mostrar controles
        if (totalTestimonios > itemsPerSlide) {
            document.querySelector('.testimonios-controls').style.display = 'flex';
            createDots();
        } else {
            document.querySelector('.testimonios-controls').style.display = 'none';
        }

        // Configurar el carrusel según el tamaño de pantalla actual
        updateItemsPerSlide();

        // Agregar event listeners a los botones
        prevButton.addEventListener('click', goToPrevSlide);
        nextButton.addEventListener('click', goToNextSlide);

        // Escuchar cambios en el tamaño de la ventana
        window.addEventListener('resize', updateItemsPerSlide);

        // Habilitar navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
            }
        });
    }

    // Iniciar el carrusel
    initCarousel();
});
