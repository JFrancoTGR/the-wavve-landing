// form.js

import { currentLanguage } from '../js/modules/i18n.js';
import { translations } from '../js/modules/translations.js';

document.addEventListener('DOMContentLoaded', function () {
  const formSection = document.querySelector('.contact-form');

  if (!formSection) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
        script.async = true;
        document.head.appendChild(script);
        observer.disconnect();
      }
    });
  }, {
    rootMargin: '80px'
  });

  observer.observe(formSection);

  const submitButton = document.querySelector('.submit-form');

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

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const contact_method = document.querySelector(
      'input[name="contact"]:checked'
    );

    if (!name || !email || !phone) {
      //   console.log(translations[currentLanguage]);
      //   console.log(translations[currentLanguage].swal);
      Swal.fire({
        icon: 'warning',
        title: translations[currentLanguage].swal.warningTitle,
        text: translations[currentLanguage].swal.missingFields,
      });
      return;
    }

    if (!contact_method) {
      //   console.log(translations[currentLanguage]);
      //   console.log(translations[currentLanguage].swal);
      Swal.fire({
        icon: 'warning',
        title: translations[currentLanguage].swal.errorTitle,
        text: translations[currentLanguage].swal.missingContact,
      });
      return;
    }

    fetch('/../sender/send_registrations.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        contact_method: contact_method.value,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign,
        utm_content: utm_content,
        utm_adset: utm_adset,
        utm_adname: utm_adname,
        utm_term: utm_term,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          //   console.log(translations[currentLanguage]);
          //   console.log(translations[currentLanguage].swal);
          Swal.fire({
            icon: 'success',
            title: translations[currentLanguage].swal.successTitle,
            text: translations[currentLanguage].swal.successText,
          });
          document.querySelector('.contact-form').reset();
        } else {
          //   console.log(translations[currentLanguage]);
          //   console.log(translations[currentLanguage].swal);
          Swal.fire({
            icon: 'error',
            title: translations[currentLanguage].swal.errorTitle,
            text: translations[currentLanguage].swal.sendingError,
          });
        }
      })
      .catch((error) => {
        // console.error(error);
        // console.log(translations[currentLanguage]);
        // console.log(translations[currentLanguage].swal);
        Swal.fire({
          icon: 'error',
          title: translations[currentLanguage].swal.errorTitle,
          text: translations[currentLanguage].swal.sendingError,
        });
      });
  });
});
