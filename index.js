// index.js

document.addEventListener("DOMContentLoaded", () => {
    // Initialiser l'état (Afficher l'accueil au chargement)
    router('home');
});

function router(pageId) {
    // 1. Cacher toutes les sections ayant la classe .page
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('fade-in'); 
    });

    // 2. Afficher la section spécifique
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        // On force un reflow rapide pour relancer l'animation (hack CSS simple)
        void targetPage.offsetWidth; 
        targetPage.classList.add('fade-in');
        
        // Scroll en haut lors du changement de page
        document.getElementById('main-content').scrollTop = 0;
    } else {
        console.error(`Page non trouvée : page-${pageId}`);
    }

    // 3. Mise à jour de l'apparence des boutons de menu
    updateActiveMenuButton(pageId);
}

function updateActiveMenuButton(activeId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        // On vérifie si l'attribut onclick du bouton contient l'ID actif
        const onClickAttr = btn.getAttribute('onclick');
        const isActive = onClickAttr && onClickAttr.includes(`'${activeId}'`);
        
        if (isActive) {
            // Style Actif
            btn.classList.add('bg-blue-50', 'text-blue-700', 'font-bold');
            btn.classList.remove('text-slate-600', 'hover:bg-slate-50');
        } else {
            // Style Inactif
            btn.classList.remove('bg-blue-50', 'text-blue-700', 'font-bold');
            btn.classList.add('text-slate-600', 'hover:bg-slate-50');
        }
    });
}

// Gestion du menu Mobile
function toggleMobile() {
    const mobileMenu = document.getElementById('mobile-menu');
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

// Écouteur pour le bouton hamburger
document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobile);