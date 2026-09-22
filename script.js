const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');

navLinks.forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const openModalButtons = document.querySelectorAll('[data-modal]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal(modal) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.modal));
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', () => closeModal(button.closest('.project-modal')));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.project-modal.open').forEach(closeModal);
  }
});

const lightbox = document.getElementById("lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");

  document.querySelectorAll(".image-placeholder img").forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });
}

window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#', '');

  if (hash) {
    openModal(hash);
  }
});
