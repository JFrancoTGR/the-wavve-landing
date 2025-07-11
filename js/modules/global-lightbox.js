export function setupGlobalLightboxes() {
  // Experiences
  const experiencesLightbox = GLightbox({
    selector: '[data-glightbox="gallery-experiences"]',
  });

  // Residences
  const residencesLightbox = GLightbox({
    selector: '[data-glightbox="gallery-residences"]',
  });

  // Views
  const viewsLightbox = GLightbox({
    selector: '[data-glightbox="gallery-views"]',
  });

  //Privacy
  const privacyLightbox = GLightbox({
    selector: 'a[href="#privacy-content"]',
  })
  //Terms
  const termsLightbox = GLightbox({
    selector: 'a[href="#terms-content"]',
  });
}
