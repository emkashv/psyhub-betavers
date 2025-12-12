// Burger Menu Toggle 
const burgerBtn = document.getElementById('burgerBtn'); 
const sidebar = document.getElementById('sidebar'); 
 
if (burgerBtn && sidebar) { 
    burgerBtn.addEventListener('click', () => { 
        burgerBtn.classList.toggle('active'); 
        sidebar.classList.toggle('active'); 
    }); 
 
    // Close sidebar when clicking outside 
    document.addEventListener('click', (e) => { 
        if (!sidebar.contains(e.target) && !burgerBtn.contains(e.target) && sidebar.classList.contains('active')) { 
            burgerBtn.classList.remove('active'); 
            sidebar.classList.remove('active'); 
        } 
    }); 
} 
 
// Language Switcher 
const langButtons = document.querySelectorAll('.lang-btn'); 
let currentLang = localStorage.getItem('language') || 'ru'; 
 
// Set initial language 
setLanguage(currentLang); 
 
langButtons.forEach(btn => { 
    btn.addEventListener('click', () => { 
        const lang = btn.getAttribute('data-lang'); 
        currentLang = lang; 
        localStorage.setItem('language', lang); 
         
        // Update active button 
        langButtons.forEach(b => b.classList.remove('active')); 
        btn.classList.add('active'); 
         
        // Apply language 
        setLanguage(lang); 
    }); 
}); 
 
function setLanguage(lang) { 
    langButtons.forEach(btn => { 
        if (btn.getAttribute('data-lang') === lang) { 
            btn.classList.add('active'); 
        } else { 
            btn.classList.remove('active'); 
        } 
    }); 
     
    const elements = document.querySelectorAll('[data-ru], [data-uk]'); 
    elements.forEach(el => { 
        if (lang === 'ru' && el.hasAttribute('data-ru')) { 
            el.textContent = el.getAttribute('data-ru'); 
        } else if (lang === 'uk' && el.hasAttribute('data-uk')) { 
            el.textContent = el.getAttribute('data-uk'); 
        } 
    }); 
     
    const inputElements = document.querySelectorAll('[data-placeholder-ru], [data-placeholder-uk]'); 
    inputElements.forEach(el => { 
        if (lang === 'ru' && el.hasAttribute('data-placeholder-ru')) { 
            el.placeholder = el.getAttribute('data-placeholder-ru'); 
        } else if (lang === 'uk' && el.hasAttribute('data-placeholder-uk')) { 
            el.placeholder = el.getAttribute('data-placeholder-uk'); 
        } 
    }); 
} 
 
// Parallax Effect 
const hero = document.getElementById('hero'); 
const heroBg = document.querySelector('.hero-bg'); 
 
if (hero && heroBg) { 
    // Отключаем параллакс на главной странице 
    const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/'; 
     
    if (!isHome) { 
        window.addEventListener('scroll', () => { 
            const scrollY = window.scrollY; 
            heroBg.style.transform = `translateY(${scrollY * 0.5}px)`; 
        }); 
    } else { 
        // На главной просто оставляем картинку на месте 
        heroBg.style.transform = `translateY(0px)`; 
    } 
} 



const headerRows = document.querySelectorAll('.header-row');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    headerRows.forEach(row => {
        const h2 = row.querySelector('h2');
        const direction = row.dataset.direction;
        const speed = 0.2;
        const offset = scrollY * speed;

        if (direction === 'left') {
            h2.style.transform = `translateX(-${offset}px)`;
        } else {
            h2.style.transform = `translateX(${offset}px)`;
        }
    });
});





 // 1. Принудительно делаем функции глобальными
    window.openPmModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('pm-active');
            document.body.style.overflow = 'hidden'; // Блокируем скролл сайта
        } else {
            console.error('Модальное окно с ID "' + id + '" не найдено!');
        }
    };

    window.closePmModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('pm-active');
            document.body.style.overflow = ''; // Возвращаем скролл
        }
    };

    // 2. Дополнительная страховка: вешаем события через JS, если HTML onclick не сработает
    document.addEventListener('DOMContentLoaded', () => {
        
        // Находим все кнопки и модалки
        const buttons = document.querySelectorAll('.pm-btn-details');
        const overlays = document.querySelectorAll('.pm-modal-overlay');
        const closeIcons = document.querySelectorAll('.pm-close-icon');

        // Обработка клика по фону (чтобы закрыть)
        overlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('pm-active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Обработка крестиков
        closeIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                // Находим родительское окно
                const modal = this.closest('.pm-modal-overlay');
                if (modal) {
                    modal.classList.remove('pm-active');
                    document.body.style.overflow = '';
                }
            });
        });
    });
