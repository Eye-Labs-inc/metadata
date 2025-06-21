// Populate the select dropdown with options 1-333
const select = document.getElementById('tokenSelect');
for (let i = 1; i <= 333; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  select.appendChild(option);
}

function showLoader() {
  document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

function updateAltLabel() {
  const imgs = [
    document.getElementById('image1'),
    document.getElementById('image2'),
    document.getElementById('image3')
  ];
  let alt = '';
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].style.display !== 'none') {
      if (i === 2) {
        alt = '2nd Evolution: ' + imgs[i].alt;
      } else {
        alt = '1st Evolution: ' + imgs[i].alt;
      }
      break;
    }
  }
  document.getElementById('imageAltLabel').textContent = alt;
}

function updateImages() {
  const n = select.value;
  const img1 = document.getElementById('image1');
  const img2 = document.getElementById('image2');
  const img3 = document.getElementById('image3');
  showLoader();
  let loaded = 0;
  function checkHide() {
    loaded++;
    if (loaded === 3) {
      hideLoader();
      updateAltLabel();
    }
  }
  img1.onload = checkHide;
  img2.onload = checkHide;
  img3.onload = checkHide;
  img1.onerror = checkHide;
  img2.onerror = checkHide;
  img3.onerror = checkHide;
  img1.src = `https://eyeverse.s3.amazonaws.com/blood-of-ape/1/${n}.png`;
  img2.src = `https://eyeverse.s3.amazonaws.com/blood-of-ape/2/${n}.png`;
  img3.src = `https://eyeverse.s3.amazonaws.com/blood-of-ape/3/${n}.png`;

  img1.style.display = 'block';
  img2.style.display = 'none';
  img3.style.display = 'none';
  updateAltLabel();
}

function toggleImage() {
  const imgs = [
    document.getElementById('image1'),
    document.getElementById('image2'),
    document.getElementById('image3')
  ];
  const current = imgs.findIndex(img => img.style.display !== 'none');
  const next = (current + 1) % imgs.length;
  imgs.forEach((img, i) => {
    img.style.display = (i === next) ? 'block' : 'none';
  });
  updateAltLabel();
}

// Call updateAltLabel on page load to set the initial alt label
window.addEventListener('DOMContentLoaded', function() {
  updateAltLabel();
});
