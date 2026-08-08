/* ==========================================================================
   Dr. Rounak Jain's Dental Centre - Interactive Scripts
   WhatsApp Direct Redirect & Mobile Optimized Booking Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Clinic Details
  const CLINIC_WHATSAPP = '918812969559';
  
  // Mobile Nav Toggle & Backdrop
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  function openMobileNav() {
    if (navLinks) navLinks.classList.add('active');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (mobileToggle) {
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      }
    }
  }

  function closeMobileNav() {
    if (navLinks) navLinks.classList.remove('active');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (mobileToggle) {
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    }
  }

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinks.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileNav);
    }

    // Close mobile nav when clicking a navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // Booking Modal Elements
  const bookingModal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModal');
  const bookingForm = document.getElementById('bookingForm');

  // Delegated Event Listener for Booking Modal Openers
  document.addEventListener('click', (e) => {
    const modalTrigger = e.target.closest('.open-booking-modal');
    if (modalTrigger) {
      e.preventDefault();
      closeMobileNav(); // Close mobile nav if open
      
      const serviceName = modalTrigger.getAttribute('data-service') || 'General Dental Consultation';
      const serviceSelect = document.getElementById('bookingService');
      if (serviceSelect) {
        serviceSelect.value = serviceName;
      }
      if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  // Close Modal Function
  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });
  }

  // Close active components on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileNav();
    }
  });

  // Handle WhatsApp Appointment Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patientName').value.trim();
      const phone = document.getElementById('patientPhone').value.trim();
      const date = document.getElementById('preferredDate').value;
      const time = document.getElementById('preferredTime').value;
      const service = document.getElementById('bookingService').value;
      const notes = document.getElementById('patientNotes').value.trim();

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      // Format WhatsApp Message
      let message = `🏥 *APPOINTMENT REQUEST - Dr. Rounak Jain's Dental Centre*\n\n`;
      message += `👤 *Patient Name:* ${name}\n`;
      message += `📞 *Phone Number:* ${phone}\n`;
      message += `🦷 *Treatment Required:* ${service}\n`;
      if (date) message += `📅 *Preferred Date:* ${date}\n`;
      if (time) message += `⏰ *Preferred Time:* ${time}\n`;
      if (notes) message += `📝 *Additional Notes:* ${notes}\n`;
      message += `\n_Sent via Clinic Website_`;

      const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // Reset form and close modal
      bookingForm.reset();
      closeModal();
    });
  }

  // Quick Direct WhatsApp Buttons (Delegated Event for all buttons)
  document.addEventListener('click', (e) => {
    const waTrigger = e.target.closest('.direct-wa-btn');
    if (waTrigger) {
      e.preventDefault();
      const customText = waTrigger.getAttribute('data-wa-text') || "Hello Dr. Rounak Jain's Dental Centre, I would like to inquire about dental services.";
      const waUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(customText)}`;
      window.open(waUrl, '_blank');
    }
  });

  // Smooth Scroll offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

