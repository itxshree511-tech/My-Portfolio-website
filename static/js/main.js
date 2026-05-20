(function () {
  // Keep content visible even if animation libraries fail to load.
  document.querySelectorAll('[data-aos]').forEach((el) => {
    el.classList.add('aos-animate');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  if (window.AOS) {
    AOS.init({ duration: 900, once: true, offset: 70 });
  }

  const role = document.getElementById('typedRole');
  if (role && window.Typed) {
    new Typed('#typedRole', {
      strings: ['Django Engineer', 'Full Stack Developer', 'UI Experience Builder'],
      typeSpeed: 48,
      backSpeed: 26,
      backDelay: 1300,
      loop: true,
    });
  }

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }

  const progressBars = document.querySelectorAll('.progress');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('inview');
    });
  }, { threshold: 0.3 });
  progressBars.forEach((bar) => progressObserver.observe(bar));

  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt-card, .project-card, .service-card'), {
      max: 9,
      speed: 450,
      glare: true,
      'max-glare': 0.2,
    });
  }

  const swiperTestimonials = document.querySelector('.testimonialSwiper');
  if (swiperTestimonials && window.Swiper) {
    new Swiper('.testimonialSwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: { delay: 2800 },
      breakpoints: { 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } },
    });
  }

  const projectSwiper = document.querySelector('.projectSwiper');
  if (projectSwiper && window.Swiper) {
    new Swiper('.projectSwiper', {
      slidesPerView: 1,
      spaceBetween: 12,
      autoplay: { delay: 2200 },
    });
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.project-card, .service-card, .skill-card').forEach((el) => {
      gsap.from(el, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
  }

  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  const glow = document.getElementById('mouseGlow');
  window.addEventListener('mousemove', (e) => {
    if (!glow) return;
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    if (window.gsap && window.ScrollTrigger) {
      gsap.to(counter, {
        textContent: target,
        duration: 1.6,
        ease: 'power1.out',
        snap: { textContent: 1 },
        scrollTrigger: { trigger: counter, start: 'top 90%' },
      });
    } else {
      counter.textContent = String(target);
    }
  });

  const canvas = document.getElementById('bg3d');
  if (canvas && window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambient);

    const point = new THREE.PointLight(0xff4fd8, 1.2, 50);
    point.position.set(3, 3, 4);
    scene.add(point);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.2, metalness: 0.6, transparent: true, opacity: 0.35 });

    const objs = [];
    for (let i = 0; i < 6; i++) {
      const mesh = new THREE.Mesh(geometry, material.clone());
      mesh.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 4);
      mesh.scale.setScalar(Math.random() * 0.6 + 0.25);
      scene.add(mesh);
      objs.push(mesh);
    }

    function animate() {
      requestAnimationFrame(animate);
      objs.forEach((obj, idx) => {
        obj.rotation.x += 0.002 + idx * 0.0003;
        obj.rotation.y += 0.003 + idx * 0.0002;
        obj.position.y += Math.sin(Date.now() * 0.0004 + idx) * 0.0018;
      });
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
})();
