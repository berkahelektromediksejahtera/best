document.addEventListener('DOMContentLoaded', function () {

  // =====================================
  // NOMOR WHATSAPP BEST
  // GANTI DENGAN NOMOR WHATSAPP PERUSAHAAN
  // Format: 628xxxxxxxxxx
  // =====================================
  const BEST_WHATSAPP = '6285210777109';

  // =====================================
// EMAIL RESMI BEST
// =====================================
const emailCompany = document.getElementById('emailCompany');

if (emailCompany) {
  emailCompany.addEventListener('click', function (event) {
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      event.preventDefault();

      const email = 'berkahelektromediksejahtera@gmail.com';

      window.location.href =
        'intent://compose?to=' + encodeURIComponent(email) +
        '#Intent;' +
        'scheme=mailto;' +
        'package=com.google.android.gm;' +
        'action=android.intent.action.SENDTO;' +
        'end';
    }
  });
}


  // =====================================
  // MENU MOBILE
  // =====================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function closeMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove('open');
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');

      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }


  // =====================================
  // NAVBAR SAAT SCROLL
  // =====================================
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;

    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();


  // =====================================
  // TAHUN FOOTER OTOMATIS
  // =====================================
  const currentYear = document.getElementById('currentYear');

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // =====================================
  // ANIMASI REVEAL
  // =====================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add('visible');
    });
  }


// =====================================
// NAVIGASI HALAMAN + ACTIVE MENU
// =====================================
const allNavigationLinks = document.querySelectorAll(
  '.nav-menu .nav-link'
);

const allPageLinks = document.querySelectorAll(
  'a[href^="#"]'
);

const sections = document.querySelectorAll(
  '#beranda, #layanan, #tentang, #proses, #kontak'
);

// Mengubah menu navbar aktif
function setActiveNavigation(sectionId) {
  allNavigationLinks.forEach(function(link) {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === '#' + sectionId
    );
  });
}

// Fungsi perpindahan ke bagian halaman
allPageLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    const targetId = this.getAttribute('href');

    if (!targetId || targetId === '#') return;

    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    event.preventDefault();

    const sectionId = targetId.substring(1);

    // Perbarui garis kuning hanya untuk menu navbar
    if (sections.length && Array.from(sections).some(function(section) {
    return section.id === sectionId;
    })) {
    setActiveNavigation(sectionId);
    }

    const navbarHeight = navbar ? navbar.offsetHeight : 82;

    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    history.replaceState(null, '', targetId);

    closeMenu();
  });
});

// Aktifkan menu berdasarkan posisi scroll
function updateActiveNavigationOnScroll() {
  const navbarHeight = navbar ? navbar.offsetHeight : 82;
  let currentSection = 'beranda';

  sections.forEach(function(section) {
    if (section.getBoundingClientRect().top <= navbarHeight + 120) {
      currentSection = section.id;
    }
  });

  setActiveNavigation(currentSection);
}

window.addEventListener('scroll', updateActiveNavigationOnScroll);
updateActiveNavigationOnScroll();


  // =====================================
  // FORM KONSULTASI WHATSAPP
  // =====================================
  const consultationForm = document.getElementById('consultationForm');

  if (consultationForm) {
    consultationForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const customerName =
        document.getElementById('customerName').value.trim();

      const companyName =
        document.getElementById('companyName').value.trim();

      const customerPhone =
        document.getElementById('customerPhone').value.trim();

      const serviceType =
        document.getElementById('serviceType').value;

      const message =
        document.getElementById('message').value.trim();

      const submitButton =
        document.getElementById('submitButton');


      // Validasi nomor WhatsApp BEST
      if (
        !BEST_WHATSAPP ||
        BEST_WHATSAPP === '628xxxxxxxxxx'
      ) {
        alert(
          'Nomor WhatsApp BEST belum diatur. Silakan periksa nomor WhatsApp perusahaan pada file script.js.'
        );
        return;
      }


      // Validasi data formulir
      if (
        !customerName ||
        !customerPhone ||
        !serviceType ||
        !message
      ) {
        alert('Mohon lengkapi seluruh kolom yang wajib diisi.');
        return;
      }


      // Susun pesan WhatsApp
      const whatsappMessage =
        'Halo PT Berkah Elektromedik Sejahtera (BEST), saya ingin melakukan konsultasi layanan.\n\n' +
        '*Data Konsultasi*\n' +
        'Nama: ' + customerName + '\n' +
        'Instansi/Perusahaan: ' + (companyName || '-') + '\n' +
        'Nomor WhatsApp: ' + customerPhone + '\n' +
        'Layanan: ' + serviceType + '\n\n' +
        '*Pesan / Keterangan:*\n' +
        message +
        '\n\nTerima kasih.';


      const whatsappURL =
        'https://wa.me/' +
        BEST_WHATSAPP +
        '?text=' +
        encodeURIComponent(whatsappMessage);


      // Ubah tombol sementara
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = 'Membuka WhatsApp...';
      }


      // Buka WhatsApp
      const whatsappWindow = window.open(
        whatsappURL,
        '_blank',
        'noopener,noreferrer'
      );

      if (whatsappWindow) {
        whatsappWindow.opener = null;
      }

      // Pulihkan tombol
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML =
          'Kirim Konsultasi via WhatsApp <span>→</span>';
      }
    });
  }
  
});