/* ==========================================================================
   Dr. Rounak Jain's Dental Centre - Interactive Scripts
   WhatsApp Direct Redirect & Booking Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Clinic Details
  const CLINIC_WHATSAPP = '918812969559';
  
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Booking Modal Elements
  const bookingModal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');
  const closeModalBtn = document.getElementById('closeModal');
  const bookingForm = document.getElementById('bookingForm');

  // Open Modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || 'General Consultation';
      const serviceSelect = document.getElementById('bookingService');
      if (serviceSelect) {
        serviceSelect.value = serviceName;
      }
      if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Modal
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

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

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

  // Quick Direct WhatsApp Buttons (Buttons with data-wa-text)
  document.querySelectorAll('.direct-wa-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customText = btn.getAttribute('data-wa-text') || "Hello Dr. Rounak Jain's Dental Centre, I would like to inquire about dental services.";
      const waUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(customText)}`;
      window.open(waUrl, '_blank');
    });
  });

  // Smooth Scroll offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
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
