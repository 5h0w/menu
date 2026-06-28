// Menu logic for "El Quijote"
// Basic interactives and transitions

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Highlight certain items on scroll or just mouse over interaction
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'rgba(232, 133, 74, 0.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = '';
        });
    });

    // Scroll reveal animation logic (simple version)
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.menu-section').forEach(section => {
        section.style.opacity = '0';
        sectionObserver.observe(section);
    });
});
