// GSAP-powered animations
window.addEventListener('load', () => {
  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  // Hero text reveal
  const heroTitle = document.querySelector('[data-hero-title]');
  if (heroTitle){
    const words = heroTitle.innerText.split(' ');
    heroTitle.innerHTML = words.map(w => `<span class="word" style="display:inline-block;overflow:hidden"><span style="display:inline-block;transform:translateY(110%)">${w}&nbsp;</span></span>`).join('');
    gsap.to('[data-hero-title] .word > span', { y:0, duration:1, ease:'expo.out', stagger:0.05 });
  }
  gsap.from('[data-hero-sub]', { opacity:0, y:24, duration:1, delay:.4, ease:'power3.out' });
  gsap.from('[data-hero-cta] > *', { opacity:0, y:18, duration:.8, delay:.7, stagger:.1, ease:'power3.out' });
  gsap.from('[data-hero-stat]', { opacity:0, y:18, duration:.8, delay:1, stagger:.08, ease:'power3.out' });

  // Card stagger
  if (window.ScrollTrigger){
    gsap.utils.toArray('[data-stagger]').forEach(group => {
      gsap.from(group.children, {
        opacity:0, y:30, duration:.7, stagger:.08, ease:'power3.out',
        scrollTrigger:{ trigger: group, start:'top 85%' }
      });
    });
    // Parallax
    gsap.utils.toArray('[data-parallax]').forEach(el => {
      gsap.to(el, { y: -60, ease:'none', scrollTrigger:{ trigger: el.parentElement, start:'top bottom', end:'bottom top', scrub: true } });
    });
  }
});
