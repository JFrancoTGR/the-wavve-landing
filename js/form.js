// form.js

import { currentLanguage } from '../js/modules/i18n.js';
import { translations } from '../js/modules/translations.js';

let submitButton;
let isSending = false;
let originalButtonHTML = '';
let utm_source = '',
  utm_medium = '',
  utm_campaign = '',
  utm_content = '',
  utm_adset = '',
  utm_adname = '',
  utm_term = '';

let recaptchaWidgetId;

window.onRecaptchaLoad = function() {
  recaptchaWidgetId = grecaptcha.render('recaptcha-container', {
    sitekey: 'API_KEY',
    size: 'invisible',
    callback: onSubmit,
  });
};

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

  submitButton = document.querySelector('.submit-form');
  originalButtonHTML = translations[currentLanguage]['form.send.button'];
  submitButton.innerHTML = originalButtonHTML;

  const params = new URLSearchParams(window.location.search);
  utm_source = params.get('utm_source') || '';
  utm_medium = params.get('utm_medium') || '';
  utm_campaign = params.get('utm_campaign') || '';
  utm_content = params.get('utm_content') || '';
  utm_adset = params.get('utm_adset') || '';
  utm_adname = params.get('utm_adname') || '';
  utm_term = params.get('utm_term') || '';

  submitButtonButton.addEventListener('click', function(e){
    e.preventDefault();
  if (isSending) return;
  grecaptcha.execute(recaptchaWidgetId);
  });
});

window.onSubmit = function (token) {
  if (isSending) return;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const contact_method = document.querySelector(
    'input[name="contact"]:checked'
  );

  if (!name || !email || !phone || !contact_method) {
    Swal.fire({
      icon: 'warning',
      title: translations[currentLanguage].swal.warningTitle,
      text: translations[currentLanguage].swal.missingFields,
    });
    submitButton.removeAttribute('disabled');
    submitButton.innerHTML = originalButtonHTML;
    return;
  }

  isSending = true;
  submitButton.setAttribute('disabled', 'true');
  submitButton.innerHTML = `<span class="spinner" aria-hidden="true"></span> ${translations[currentLanguage]['form.sending.button']}`;

  fetch('/../sender/send_registrations.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
      'g-recaptcha-response': token, 
    }),
  })
    .then((res) => res.json())
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
};
