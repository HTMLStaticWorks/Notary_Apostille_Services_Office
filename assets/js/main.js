/**
 * main.js - LegalSeal UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initDrawer();
  initFormValidation();
  initTypewriterFallback();
  initCounterAnimation();
  initActiveNavHighlight();
});

/* --- THEME TOGGLE --- */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Check local storage or prefers-color-scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update icons if using Lucide
  const themeIcons = document.querySelectorAll('.theme-icon');
  themeIcons.forEach(icon => {
    if (theme === 'dark') {
      icon.innerHTML = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>'; // Sun icon
    } else {
      icon.innerHTML = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>'; // Moon icon
    }
  });
}

/* --- RTL TOGGLE --- */
function initRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  // Optional: save RTL preference
  const savedRTL = localStorage.getItem('dir');
  if (savedRTL === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  });
}

/* --- MOBILE DRAWER --- */
function initDrawer() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');

  if (!hamburger || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

/* --- FORM VALIDATION --- */
function initFormValidation() {
  const forms = document.querySelectorAll('form.needs-validation');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        if (input.hasAttribute('required')) {
          if (!validateInput(input)) {
            isValid = false;
          }
        }
      });
      
      // Special logic for confirm password
      const password = form.querySelector('input[name="password"]');
      const confirmPassword = form.querySelector('input[name="confirm_password"]');
      if (password && confirmPassword) {
        if (password.value !== confirmPassword.value) {
          showError(confirmPassword, 'Passwords do not match');
          isValid = false;
        }
      }

      // Checkbox validation
      const terms = form.querySelector('input[name="terms"]');
      if (terms && !terms.checked) {
        showError(terms, 'You must accept the terms and conditions');
        isValid = false;
      }
      
      if (isValid) {
        // Handle success inline
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Success!';
        submitBtn.style.backgroundColor = 'var(--color-success)';
        submitBtn.style.color = '#fff';
        
        setTimeout(() => {
          form.reset();
          inputs.forEach(inp => {
            inp.classList.remove('is-valid');
          });
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
        }, 3000);
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid') || input.value.trim() !== '') {
          validateInput(input);
        }
      });
    });
  });
}

function validateInput(input) {
  const value = input.value.trim();
  let isValid = true;
  let errorMessage = 'This field is required';

  if (value === '') {
    isValid = false;
  } else if (input.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  } else if (input.type === 'password' && value.length < 8) {
    isValid = false;
    errorMessage = 'Password must be at least 8 characters';
  }

  if (isValid) {
    showSuccess(input);
    return true;
  } else {
    showError(input, errorMessage);
    return false;
  }
}

function showError(input, message) {
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  
  // Find or create error message element
  let errorEl = input.nextElementSibling;
  if (!errorEl || !errorEl.classList.contains('form-error')) {
    errorEl = document.createElement('div');
    errorEl.classList.add('form-error');
    input.parentNode.insertBefore(errorEl, input.nextSibling);
  }
  errorEl.textContent = message;
}

function showSuccess(input) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  
  const errorEl = input.nextElementSibling;
  if (errorEl && errorEl.classList.contains('form-error')) {
    errorEl.style.display = 'none';
  }
}

/* --- DOCUMENT FILTER (documents.html) --- */
window.filterDocs = function(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.doc-card');
  
  buttons.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-outline');
    } else {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline');
    }
  });

  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* --- FALLBACK TYPEWRITER --- */
function initTypewriterFallback() {
  const tw = document.querySelector('.typewriter-text');
  if (!tw) return;
  
  const text = tw.textContent.trim();
  tw.textContent = '';
  
  let i = 0;
  function type() {
    if (i < text.length) {
      tw.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50); // Speed of typing in ms
    } else {
      // Optional: hide cursor after typing is done
      setTimeout(() => {
        tw.style.borderRightColor = 'transparent';
        tw.style.animation = 'none';
      }, 1500);
    }
  }
  
  // Start typing animation with a small delay
  setTimeout(type, 300);
}

/* --- STATS COUNTER ANIMATION --- */
function initCounterAnimation() {
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);
  
  stats.forEach(stat => observer.observe(stat));
  
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000; // 2 seconds animation duration
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * target);
      
      el.textContent = currentValue + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target + suffix;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
}

/* --- ACTIVE NAV HIGHLIGHTING --- */
function initActiveNavHighlight() {
  let currentPath = window.location.pathname.split('/').pop();
  if (!currentPath || currentPath === '/') {
    currentPath = 'index.html';
  }
  
  if (currentPath === 'blog-single.html') {
    currentPath = 'blog.html';
  }
  
  const navLinks = document.querySelectorAll('.nav-links .nav-link, .drawer-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

