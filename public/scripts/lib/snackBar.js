// snackbar.js

class Snackbar {
  #container = null;
  #currentTimeout = null;
  #stylesInjected = false;

  constructor(options = {}) {
    this.options = {
      duration: options.duration || 3200,
      position: options.position || 'bottom-center', // bottom-center, top-center, bottom-left, etc.
      maxWidth: options.maxWidth || '90vw',
      ...options
    };

    this.#init();
  }

  #init() {
    if (!this.#stylesInjected) {
      this.#injectStyles();
      this.#stylesInjected = true;
    }
    this.#createContainer();
  }

  #injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .gs-snackbar-container {
        position: fixed;
        z-index: 9999;
        pointer-events: none;
      }

      .gs-snackbar {
        min-width: 280px;
        max-width: ${this.options.maxWidth};
        padding: 14px 20px;
        border-radius: 8px;
        color: white;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 15px;
        font-weight: 500;
        box-shadow: 0 5px 25px rgba(0,0,0,0.28);
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: 0;
        transform: translateY(40px) scale(0.96);
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .gs-snackbar.show {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      .gs-snackbar.success { background: #2e7d32; }
      .gs-snackbar.error   { background: #c62828; }
      .gs-snackbar.info    { background: #1565c0; }
      .gs-snackbar.warning { background: #e65100; }

      .gs-snackbar-close {
        background: none;
        border: none;
        color: white;
        font-size: 22px;
        cursor: pointer;
        margin-left: 16px;
        padding: 0 8px;
        line-height: 1;
        opacity: 0.9;
      }

      .gs-snackbar-close:hover {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  #createContainer() {
    if (this.#container) return;

    this.#container = document.createElement('div');
    this.#container.className = 'gs-snackbar-container';

    // Position set karna
    const pos = this.options.position;
    if (pos.includes('top'))    this.#container.style.top    = '24px';
    else                        this.#container.style.bottom = '24px';

    if (pos.includes('left'))   this.#container.style.left   = '24px';
    else if (pos.includes('right')) this.#container.style.right = '24px';
    else                        this.#container.style.left   = '50%';
    
    if (pos.includes('center') || !pos.includes('left') && !pos.includes('right')) {
      this.#container.style.transform = 'translateX(-50%)';
    }

    document.body.appendChild(this.#container);
  }

  #createElement(message, type = 'success') {
    const el = document.createElement('div');
    el.className = `gs-snackbar ${type}`;
    el.innerHTML = `
      <span>${message}</span>
      <button class="gs-snackbar-close" aria-label="Close">×</button>
    `;

    const closeBtn = el.querySelector('.gs-snackbar-close');
    closeBtn.onclick = () => this.#hide(el);

    el.onclick = (e) => {
      if (e.target !== closeBtn) this.#hide(el);
    };

    return el;
  }

  #showElement(el) {
    this.#container.appendChild(el);
    // Force reflow for animation
    el.offsetHeight;
    el.classList.add('show');
  }

  #hide(el) {
    el.classList.remove('show');
    setTimeout(() => {
      if (el.parentNode) el.remove();
    }, 450);
  }

  // ────────────────────────────────────────────────
  // Public Methods
  // ────────────────────────────────────────────────

  show(message, duration = this.options.duration) {
    this.#clearCurrent();

    const el = this.#createElement(message, 'success');
    this.#showElement(el);

    this.#currentTimeout = setTimeout(() => this.#hide(el), duration);
  }

  success(message, duration) {
    this.show(message, duration);
  }

  error(message, duration = this.options.duration) {
    this.#clearCurrent();
    const el = this.#createElement(message, 'error');
    this.#showElement(el);
    this.#currentTimeout = setTimeout(() => this.#hide(el), duration);
  }

  info(message, duration = this.options.duration) {
    this.#clearCurrent();
    const el = this.#createElement(message, 'info');
    this.#showElement(el);
    this.#currentTimeout = setTimeout(() => this.#hide(el), duration);
  }

  warning(message, duration = this.options.duration) {
    this.#clearCurrent();
    const el = this.#createElement(message, 'warning');
    this.#showElement(el);
    this.#currentTimeout = setTimeout(() => this.#hide(el), duration);
  }

  #clearCurrent() {
    if (this.#currentTimeout) {
      clearTimeout(this.#currentTimeout);
      this.#currentTimeout = null;
    }
    // Remove existing snackbar if any
    const existing = this.#container.querySelector('.gs-snackbar');
    if (existing) this.#hide(existing);
  }

  // Manually hide current snackbar
  hide() {
    this.#clearCurrent();
  }
}

// Global instance banane ka tareeka (recommended)
// const Snackbar = new Snackbar({
//   duration: 3500,
//   position: 'bottom-center'   // ya 'top-center', 'bottom-left', etc.
// });

// Ya agar multiple snackbars chahiye different positions ke liye:
// const topSnackbar = new Snackbar({ position: 'top-center', duration: 4000 });

export default Snackbar;  // agar module use kar rahe ho to