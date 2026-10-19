/**
 * POSHAKH - 3D Motion, Cylinder Scroll, Tilt & Editorial Interactivity
 */

const PoshakhEffects = {
  init() {
    this.init3DTilt();
    this.initCylindricalScroll();
    this.initParallax();
  },

  /**
   * 3D Card Tilt towards mouse (Vanilla 3D physics without external dependencies)
   */
  init3DTilt() {
    const tiltCards = document.querySelectorAll('.card-tilt-3d, .product-card, .insta-post-card');
    
    tiltCards.forEach(card => {
      // Check for prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  },

  /**
   * Curved 3D Cylinder Row scroll effect (Cards rotate slightly based on their horizontal offset)
   */
  initCylindricalScroll() {
    const curvedRows = document.querySelectorAll('.curved-row');
    
    curvedRows.forEach(row => {
      const updateCurvature = () => {
        const cards = row.children;
        const rowRect = row.getBoundingClientRect();
        const rowCenter = rowRect.left + rowRect.width / 2;

        for (let card of cards) {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const offset = (cardCenter - rowCenter) / (rowRect.width / 2);
          
          // Clamp offset between -1 and 1
          const clamped = Math.max(-1.2, Math.min(1.2, offset));
          const rotateY = clamped * -18; // Bend like a cylinder
          const translateZ = Math.abs(clamped) * -40; // Curve backward at the edges

          card.style.transform = `perspective(1200px) rotateY(${rotateY.toFixed(1)}deg) translateZ(${translateZ.toFixed(1)}px)`;
        }
      };

      row.addEventListener('scroll', updateCurvature, { passive: true });
      window.addEventListener('resize', updateCurvature);
      setTimeout(updateCurvature, 200);
    });
  },

  /**
   * Hero parallax movement
   */
  initParallax() {
    const heroBg = document.querySelector('.hero-parallax-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos < window.innerHeight) {
        heroBg.style.transform = `translate3d(0, ${scrollPos * 0.35}px, 0) scale(${1 + scrollPos * 0.0003})`;
      }
    }, { passive: true });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PoshakhEffects.init();
});

window.PoshakhEffects = PoshakhEffects;
