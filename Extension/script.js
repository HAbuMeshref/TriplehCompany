document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form submission handler
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Your message has been sent successfully! We will contact you soon.');
      this.reset();
    });
  } else {
    console.warn('No form element found on the page.');
  }

  // Fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .about-text, .about-image, .stat-item, .contact-info, .contact-form').forEach(el => {
    observer.observe(el);
  });

  // Popup image handlers
  window.openPopup = function (el) {
    const imgSrc = el.querySelector("img").src;
    document.getElementById("popup-img").src = imgSrc;
    document.getElementById("image-popup").style.display = "flex";
  };

  window.closePopup = function () {
    document.getElementById("image-popup").style.display = "none";
  };

  // Toggle functions
  window.toggleMap = function () {
    const map = document.getElementById("map-container");
    if (map.style.display === "none" || map.style.display === "") {
      map.style.display = "block";
      map.scrollIntoView({ behavior: "smooth" });
    } else {
      map.style.display = "none";
    }
  };

  window.toggleContactInfo = function () {
    const content = document.getElementById("collapsible-contact");
    const arrow = document.querySelector(".arrow");

    content.classList.toggle("show");
    arrow.classList.toggle("rotate");
  };

  window.toggleMapDropdown = function () {
    const mapWrapper = document.getElementById('map-wrapper');
    mapWrapper.classList.toggle('show');
  };

  // Default language
  let currentLang = 'en';

  // Update texts based on current language
  function updateTexts() {
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (window.translations[currentLang] && window.translations[currentLang][key]) {
        el.textContent = window.translations[currentLang][key];
      } else {
        console.warn(`Missing translation key: ${key}`);
      }
    });

    if (window.translations[currentLang] && window.translations[currentLang].pageTitle) {
      document.title = window.translations[currentLang].pageTitle;
    }

    document.documentElement.lang = currentLang;
    document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
  }

  // Language toggle button
 const langBtn = document.getElementById('lang-toggle-btn');

if (langBtn) {
  langBtn.textContent = currentLang === 'ar' ? 'English' : 'عربي';
  langBtn.addEventListener('click', () => {
    currentLang = (currentLang === 'en') ? 'ar' : 'en';
    updateTexts();
    langBtn.textContent = currentLang === 'ar' ? 'English' : 'عربي';
  });
} else {
  console.warn('Language toggle button not found.');
}
  // Initialize texts on page load
  updateTexts();
});


  function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
      const targetStr = stat.textContent.trim();
      let targetNum;


      if (targetStr.endsWith('+') || targetStr.endsWith('%')) {
        targetNum = parseInt(targetStr.slice(0, -1));
      } else {
        targetNum = parseInt(targetStr);
      }

      let suffix = '';
      if (targetStr.endsWith('+')) suffix = '+';
      if (targetStr.endsWith('%')) suffix = '%';

      let count = 0;
      const increment = targetNum / 100;  

      const interval = setInterval(() => {
        count += increment;
        if (count >= targetNum) {
          stat.textContent = targetNum + suffix;
          clearInterval(interval);
        } else {
          stat.textContent = Math.floor(count) + suffix;
        }
      }, 20);  
    });
  }


  window.addEventListener('load', animateStats);


  