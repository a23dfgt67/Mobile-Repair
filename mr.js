 
  // Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        faqItems.forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

// Fade-in animation for hero images
document.addEventListener("DOMContentLoaded", () => {
  const heroImages = document.querySelectorAll(".hero-img");

  // Function to show images on scroll
  function showHeroImages() {
    heroImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        img.classList.add("visible");
      }
    });
  }

  // Trigger on page load and scroll
  showHeroImages();
  window.addEventListener("scroll", showHeroImages);
});

document.addEventListener("DOMContentLoaded", () => {
  const bookingImgs = document.querySelectorAll(".booking-img");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.3 });

  bookingImgs.forEach(img => observer.observe(img));
});
// =======================
// ✅ Testimonial Carousel
// =======================
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;

function goToSlide(slideIndex) {
    testimonialTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
    currentSlide = slideIndex;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

setInterval(() => {
    let nextSlide = (currentSlide + 1) % testimonialSlides.length;
    goToSlide(nextSlide);
}, 5000);

// =======================
// ✅ Mobile menu toggle
// =======================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');
const menuIcon = mobileMenuBtn.querySelector('i'); // 👈 icon ko target kiya

mobileMenuBtn.addEventListener('click', () => {
  // menu toggle
  navLinks.classList.toggle('active');
  navCta.classList.toggle('active');

  // icon toggle
  if (menuIcon.classList.contains('fa-bars')) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times'); // cross icon
  } else {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  }

  // optional: add open class for animation (if you’re using it)
  mobileMenuBtn.classList.toggle('open');
});

// =======================
// ✅ Booking form
// =======================
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault(); // stop default form submit

  // get all form values
  const device = document.getElementById('device').value;
  const issue = document.getElementById('issue').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!device || !issue || !date || !time) {
    alert("Please fill all fields before booking!");
    return;
  }

  // ⚡ your WhatsApp number (international format, no + or spaces)
  const phoneNumber = "923001234567"; // ← replace with your real WhatsApp number

  // booking message text
  const message = `📱 *New Repair Booking*%0A
*Device:* ${device}%0A
*Issue:* ${issue}%0A
*Preferred Date:* ${date}%0A
*Preferred Time:* ${time}%0A
--------------------%0A
Please confirm my booking.`;

  // WhatsApp link
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  // open WhatsApp chat
  window.open(whatsappURL, "_blank");
});

// =======================
// ✅ Device mockup motion
// =======================
const deviceMockup = document.querySelector('.device-mockup');
document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    deviceMockup.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

if (deviceMockup) {
  document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    deviceMockup.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  window.addEventListener('mouseout', () => {
    deviceMockup.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
  });
}


// =======================
// ✅ Scroll to booking section
// =======================
document.querySelectorAll('.book-repair-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('#booking-widget').scrollIntoView({ behavior: 'smooth' });
    });
});

// =======================
// ✅ Modal popup logic
// =======================
const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
const modals = document.querySelectorAll('.custom-modal');
const closeBtns = document.querySelectorAll('.close-btn');

learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.modal);
        target.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.custom-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// =======================
// ✅ Gallery Carousel
// =======================
const galleryTrack = document.querySelector('.gallery-track');
const gallerySlides = Array.from(galleryTrack.children);
const nextButton = document.querySelector('.gallery-nav.next');
const prevButton = document.querySelector('.gallery-nav.prev');
let currentGalleryIndex = 0;

// Detect how many slides are visible based on CSS width
function getVisibleSlides() {
  if (window.innerWidth <= 600) return 1; // mobile
  if (window.innerWidth <= 992) return 2; // tablet
  return 3; // desktop
}

function updateGalleryPosition() {
  const visibleSlides = getVisibleSlides();
  const maxIndex = gallerySlides.length - visibleSlides;

  if (currentGalleryIndex < 0) currentGalleryIndex = 0;
  if (currentGalleryIndex > maxIndex) currentGalleryIndex = maxIndex;

  const movePercentage = (100 / visibleSlides) * currentGalleryIndex;
  galleryTrack.style.transform = `translateX(-${movePercentage}%)`;

  // Disable buttons
  prevButton.disabled = currentGalleryIndex === 0;
  nextButton.disabled = currentGalleryIndex === maxIndex;

  prevButton.style.opacity = prevButton.disabled ? "0.4" : "1";
  nextButton.style.opacity = nextButton.disabled ? "0.4" : "1";
  prevButton.style.cursor = prevButton.disabled ? "not-allowed" : "pointer";
  nextButton.style.cursor = nextButton.disabled ? "not-allowed" : "pointer";
}

// Initialize
updateGalleryPosition();
window.addEventListener('resize', updateGalleryPosition);

nextButton.addEventListener('click', () => {
  currentGalleryIndex++;
  updateGalleryPosition();
});

prevButton.addEventListener('click', () => {
  currentGalleryIndex--;
  updateGalleryPosition();
});

document.getElementById("bookRepairBtn").addEventListener("click", function() {
    const bookingSection = document.getElementById("booking-widget");
    if (bookingSection) {
      bookingSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Form refresh hone se rokta hai

  // ✅ Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all required fields before sending your message!");
    return;
  }

  // ✅ WhatsApp number (apna number yahan daalo)
  const phoneNumber = "923001234567"; // ← Replace with your real WhatsApp number

  // ✅ Format message for WhatsApp
  const whatsappMessage = `📩 *New Contact Message*%0A
*Name:* ${name}%0A
*Email:* ${email}%0A
*Phone:* ${phone || "Not provided"}%0A
*Message:* ${message}%0A
--------------------%0A
Please reply to the customer.`;

  // ✅ WhatsApp API link
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  // ✅ Open WhatsApp
  window.open(whatsappURL, "_blank");
});
   