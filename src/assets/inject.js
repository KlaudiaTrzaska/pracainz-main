(function() {
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.pointerEvents = 'none';
  overlay.style.background = 'rgba(0, 0, 0, 0.1)'; // Add a semi-transparent overlay
  document.body.appendChild(overlay);

  const image = document.querySelector('img'); // Change the selector if needed
  let i = 0;

  image.addEventListener('click', event => {
    const rect = image.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const percentFromTop = ((clickY / rect.height) * 100).toFixed(2);
    const percentFromLeft = ((clickX / rect.width) * 100).toFixed(2);
    console.log(`<div class="red-circle" style="top: ${percentFromTop}%; left: ${percentFromLeft}%;" id="${i++}"></div>`);
  });
})();