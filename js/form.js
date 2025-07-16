// form.js

import { currentLanguage } from '../js/modules/i18n.js';
import { translations } from '../js/modules/translations.js';

document.addEventListener('DOMContentLoaded', function () {
  const formSection = document.querySelector('.contact-form');
  if (!formSection) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
          script.async = true;
          document.head.appendChild(script);
          observer.disconnect();
        }
      });
    },
    { rootMargin: '80px' }
  );

  observer.observe(formSection);

  const submitButton = document.querySelector('.submit-form');
  let isSending = false;

  // 👇 Traducción del texto del botón
  const originalButtonHTML = translations[currentLanguage]['form.send.button'];

  // Aplicamos texto traducido por defecto
  submitButton.innerHTML = originalButtonHTML;

  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get('utm_source') || '';
  const utm_medium = params.get('utm_medium') || '';
  const utm_campaign = params.get('utm_campaign') || '';
  const utm_content = params.get('utm_content') || '';
  const utm_adset = params.get('utm_adset') || '';
  const utm_adname = params.get('utm_adname') || '';
  const utm_term = params.get('utm_term') || '';

  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (isSending) return;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const contact_method = document.querySelector(
      'input[name="contact"]:checked'
    );

    if (!name || !email || !phone) {
      Swal.fire({
        icon: 'warning',
        title: translations[currentLanguage].swal.warningTitle,
        text: translations[currentLanguage].swal.missingFields,
      });
      return;
    }

    if (!contact_method) {
      Swal.fire({
        icon: 'warning',
        title: translations[currentLanguage].swal.errorTitle,
        text: translations[currentLanguage].swal.missingContact,
      });
      return;
    }

    // 🔄 Iniciar envío
    isSending = true;
    submitButton.setAttribute('disabled', 'true');
    submitButton.innerHTML = `<span class="spinner" aria-hidden="true"></span> ${translations[currentLanguage]['form.sending.button']}`;

    fetch('/../sender/send_registrations.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        contact_method: contact_method.value,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_adset,
        utm_adname,
        utm_term,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: translations[currentLanguage].swal.successTitle,
            text: translations[currentLanguage].swal.successText,
          });
          document.querySelector('.contact-form').reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: translations[currentLanguage].swal.errorTitle,
            text: translations[currentLanguage].swal.sendingError,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: translations[currentLanguage].swal.errorTitle,
          text: translations[currentLanguage].swal.sendingError,
        });
      })
      .finally(() => {
        isSending = false;
        submitButton.removeAttribute('disabled');
        submitButton.innerHTML = originalButtonHTML;
      });
  });
});
