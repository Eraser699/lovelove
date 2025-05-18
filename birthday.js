  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const images = document.querySelectorAll('.album img');

  images.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  document.querySelectorAll('.album img').forEach(img => {
  img.addEventListener('click', () => {
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox').style.display = 'flex';
  });
});

document.getElementById('lightbox').addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
});

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  const string = document.createElement('div');
  string.classList.add('string');
  balloon.appendChild(string);

  // Random left position within the window width
  const maxLeft = window.innerWidth - 40;
  balloon.style.left = `${Math.random() * maxLeft}px`;

  // Optional: random animation duration between 6–10s
  balloon.style.animationDuration = `${6 + Math.random() * 4}s`;

  // Append to container
  document.getElementById('balloon-container').appendChild(balloon);

  // Cleanup after animation
  setTimeout(() => {
    balloon.remove();
  }, 11000);
}

// Create a new balloon every 700ms
setInterval(createBalloon, 700);


 const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';

  let fireworks = [];

  class Particle {
    constructor(x, y, color) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 5 + 2;
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.color = color;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.05; // gravity
      this.alpha -= 0.015;
    }

    draw(ctx) {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  class Firework {
    constructor() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      const colors = ['#ff6ec7', '#ffd700', '#00e5ff', '#f44336', '#e91e63', '#a64ac9'];
      this.particles = Array.from({ length: 40 }, () => new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }

    update() {
      this.particles.forEach(p => p.update());
      this.particles = this.particles.filter(p => p.alpha > 0);
    }

    draw(ctx) {
      this.particles.forEach(p => p.draw(ctx));
    }

    isDone() {
      return this.particles.length === 0;
    }
  }

  function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(f => {
      f.update();
      f.draw(ctx);
    });
    fireworks = fireworks.filter(f => !f.isDone());
    requestAnimationFrame(animateFireworks);
  }

  function launchFireworks() {
    fireworks.push(new Firework());
  }

  setInterval(launchFireworks, 700);
  animateFireworks();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });