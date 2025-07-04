// modules/video-modal.js

export function setupVideoModal() {
  const openModal = document.getElementById('openVideoModal');
  const closeBtn = document.getElementById('closeVideoModal');
  const modal = document.getElementById('videoModal');
  const player = document.getElementById('videoPlayer');

  if (!openModal || !closeBtn || !modal || !player) return;

  openModal.addEventListener('click', () => {
    modal.classList.remove('hidden');
    // player.play(); // opcional
  });

  closeBtn.addEventListener('click', closeVideoModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeVideoModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });

  function closeVideoModal() {
    modal.classList.add('hidden');
    player.pause();
    player.currentTime = 0;
  }
}
