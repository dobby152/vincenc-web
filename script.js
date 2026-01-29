// ============================================
// VINCENEC — Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animate = () => {
            // Cursor follows instantly
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            // Follower has delay
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            
            requestAnimationFrame(animate);
        };
        animate();
        
        // Scale on hover
        document.querySelectorAll('a, button, .service-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(3)';
                follower.style.transform = 'scale(1.5)';
                follower.style.opacity = '0.3';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                follower.style.transform = 'scale(1)';
                follower.style.opacity = '0.5';
            });
        });
    }
    
    // Smooth reveal on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate sections
    document.querySelectorAll('.intro-title, .service-item, .process-step, .contact-link').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Stagger service items
    document.querySelectorAll('.service-item').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    // Stagger process steps
    document.querySelectorAll('.process-step').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    // Stagger contact links
    document.querySelectorAll('.contact-link').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
    });
    
    // Number counter animation
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const text = entry.target.textContent;
                const num = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');
                
                if (!isNaN(num)) {
                    let current = 0;
                    const duration = 1500;
                    const step = num / (duration / 16);
                    
                    const update = () => {
                        current += step;
                        if (current < num) {
                            entry.target.textContent = Math.floor(current) + suffix;
                            requestAnimationFrame(update);
                        } else {
                            entry.target.textContent = num + suffix;
                        }
                    };
                    update();
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // Header background on scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.mixBlendMode = 'normal';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.mixBlendMode = 'difference';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
