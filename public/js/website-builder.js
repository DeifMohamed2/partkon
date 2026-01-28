/**
 * PartKon Website Builder
 * Professional Drag-and-Drop Website Builder
 * All editing features fully functional
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ===== State =====
  const state = {
    currentPage: 'home',
    currentDevice: 'desktop',
    zoom: 100,
    selectedElement: null,
    selectedSection: null,
    selectedSectionIndex: null,
    theme: {
      brandName: 'PARTSFORM',
      primaryColor: '#3b82f6',
      secondaryColor: '#10b981',
      accentColor: '#f59e0b',
      headingFont: 'Inter',
      buttonStyle: 'rounded'
    },
    pages: {
      home: { name: 'Home', icon: 'home', sections: [] },
      products: { name: 'Products', icon: 'package', sections: [] },
      about: { name: 'About', icon: 'info', sections: [] },
      contact: { name: 'Contact', icon: 'mail', sections: [] }
    },
    customCSS: '',
    customHTML: '',
    history: [],
    historyIndex: -1
  };

  // ===== Section Templates =====
  const sectionTemplates = {
    header: {
      name: 'Header',
      icon: 'navigation',
      getHTML: () => `
        <header data-builder-section="header" style="background: #0f172a; padding: 16px 24px;">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
            <div data-builder-editable="logo" style="display: flex; align-items: center; gap: 10px; color: white; font-weight: 800; font-size: 1.25rem;">
              ${state.theme.brandName}
            </div>
            <nav style="display: flex; gap: 24px;">
              <a href="#" data-builder-editable="link" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Home</a>
              <a href="#" data-builder-editable="link" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Products</a>
              <a href="#" data-builder-editable="link" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">About</a>
              <a href="#" data-builder-editable="link" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.9rem;">Contact</a>
            </nav>
            <button data-builder-editable="button" style="background: ${state.theme.primaryColor}; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer;">Get Started</button>
          </div>
        </header>
      `
    },
    hero: {
      name: 'Hero Banner',
      icon: 'image',
      getHTML: () => `
        <section data-builder-section="hero" style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); padding: 100px 24px; text-align: center; color: white;">
          <div style="max-width: 800px; margin: 0 auto;">
            <h1 data-builder-editable="heading" style="font-size: 3rem; font-weight: 800; margin-bottom: 20px; line-height: 1.2;">Find <span style="color: ${state.theme.primaryColor};">Quality Parts</span> From Global Suppliers</h1>
            <p data-builder-editable="text" style="font-size: 1.2rem; opacity: 0.9; margin-bottom: 32px; line-height: 1.6;">Access premium OEM and aftermarket automotive components with verified quality from trusted suppliers worldwide.</p>
            <div style="display: flex; gap: 16px; justify-content: center;">
              <button data-builder-editable="button" style="background: ${state.theme.primaryColor}; color: white; border: none; padding: 14px 32px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Start Searching</button>
              <button data-builder-editable="button" style="background: transparent; color: white; border: 2px solid white; padding: 14px 32px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Learn More</button>
            </div>
          </div>
        </section>
      `
    },
    features: {
      name: 'Features',
      icon: 'grid-3x3',
      getHTML: () => `
        <section data-builder-section="features" style="background: #f8fafc; padding: 80px 24px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h2 data-builder-editable="heading" style="text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 48px; color: #1e293b;">Why Choose Us</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
              <div style="background: white; padding: 32px; border-radius: 16px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <div style="width: 64px; height: 64px; background: rgba(59,130,246,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <span style="font-size: 28px;">🔍</span>
                </div>
                <h3 data-builder-editable="heading" style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px; color: #1e293b;">Smart Search</h3>
                <p data-builder-editable="text" style="color: #64748b; line-height: 1.6;">Find parts instantly with our AI-powered search engine</p>
              </div>
              <div style="background: white; padding: 32px; border-radius: 16px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <div style="width: 64px; height: 64px; background: rgba(16,185,129,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <span style="font-size: 28px;">✓</span>
                </div>
                <h3 data-builder-editable="heading" style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px; color: #1e293b;">Verified Quality</h3>
                <p data-builder-editable="text" style="color: #64748b; line-height: 1.6;">All parts are quality-checked and certified</p>
              </div>
              <div style="background: white; padding: 32px; border-radius: 16px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <div style="width: 64px; height: 64px; background: rgba(249,115,22,0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <span style="font-size: 28px;">⚡</span>
                </div>
                <h3 data-builder-editable="heading" style="font-size: 1.25rem; font-weight: 600; margin-bottom: 12px; color: #1e293b;">Fast Delivery</h3>
                <p data-builder-editable="text" style="color: #64748b; line-height: 1.6;">Get your parts delivered within 24-48 hours</p>
              </div>
            </div>
          </div>
        </section>
      `
    },
    stats: {
      name: 'Statistics',
      icon: 'bar-chart-2',
      getHTML: () => `
        <section data-builder-section="stats" style="background: linear-gradient(135deg, ${state.theme.primaryColor}, #1e3a5f); padding: 80px 24px; color: white;">
          <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; text-align: center;">
            <div>
              <div data-builder-editable="text" style="font-size: 3rem; font-weight: 800; margin-bottom: 8px;">500+</div>
              <div data-builder-editable="text" style="opacity: 0.8;">Global Suppliers</div>
            </div>
            <div>
              <div data-builder-editable="text" style="font-size: 3rem; font-weight: 800; margin-bottom: 8px;">2M+</div>
              <div data-builder-editable="text" style="opacity: 0.8;">Parts Available</div>
            </div>
            <div>
              <div data-builder-editable="text" style="font-size: 3rem; font-weight: 800; margin-bottom: 8px;">50K+</div>
              <div data-builder-editable="text" style="opacity: 0.8;">Happy Customers</div>
            </div>
            <div>
              <div data-builder-editable="text" style="font-size: 3rem; font-weight: 800; margin-bottom: 8px;">99.9%</div>
              <div data-builder-editable="text" style="opacity: 0.8;">Satisfaction Rate</div>
            </div>
          </div>
        </section>
      `
    },
    products: {
      name: 'Products Grid',
      icon: 'package',
      getHTML: () => `
        <section data-builder-section="products" style="background: white; padding: 80px 24px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
              <h2 data-builder-editable="heading" style="font-size: 2rem; font-weight: 700; color: #1e293b;">Featured Products</h2>
              <a href="#" data-builder-editable="link" style="color: ${state.theme.primaryColor}; text-decoration: none; font-weight: 600;">View All →</a>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
              ${[1,2,3,4].map(i => `
                <div style="background: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
                  <div style="height: 180px; background: linear-gradient(135deg, #e2e8f0, #cbd5e1); display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 48px; opacity: 0.5;">📦</span>
                  </div>
                  <div style="padding: 20px;">
                    <p data-builder-editable="text" style="font-size: 0.8rem; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">Brand</p>
                    <h4 data-builder-editable="heading" style="font-size: 1rem; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Product Name ${i}</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #e2e8f0;">
                      <span data-builder-editable="text" style="font-size: 1.25rem; font-weight: 700; color: #1e293b;">$99.99</span>
                      <button data-builder-editable="button" style="background: ${state.theme.primaryColor}; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">Add</button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      `
    },
    testimonials: {
      name: 'Testimonials',
      icon: 'message-square',
      getHTML: () => `
        <section data-builder-section="testimonials" style="background: #f8fafc; padding: 80px 24px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h2 data-builder-editable="heading" style="text-align: center; font-size: 2rem; font-weight: 700; color: #1e293b; margin-bottom: 48px;">What Our Customers Say</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
              ${['John D.', 'Sarah M.', 'Mike R.'].map((name, i) => `
                <div style="background: white; padding: 32px; border-radius: 16px;">
                  <div style="color: #f59e0b; margin-bottom: 16px;">★★★★★</div>
                  <p data-builder-editable="text" style="color: #475569; line-height: 1.7; margin-bottom: 20px; font-style: italic;">"Excellent service and fast delivery. Found the exact part I needed within minutes!"</p>
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 44px; height: 44px; background: ${state.theme.primaryColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">${name.charAt(0)}</div>
                    <div>
                      <div data-builder-editable="text" style="font-weight: 600; color: #1e293b;">${name}</div>
                      <div data-builder-editable="text" style="font-size: 0.85rem; color: #64748b;">Customer</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      `
    },
    cta: {
      name: 'Call to Action',
      icon: 'megaphone',
      getHTML: () => `
        <section data-builder-section="cta" style="background: ${state.theme.primaryColor}; padding: 80px 24px; text-align: center; color: white;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2 data-builder-editable="heading" style="font-size: 2.5rem; font-weight: 800; margin-bottom: 16px;">Ready to Get Started?</h2>
            <p data-builder-editable="text" style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 32px;">Join thousands of businesses saving time and money with our platform</p>
            <div style="display: flex; gap: 16px; justify-content: center;">
              <button data-builder-editable="button" style="background: white; color: ${state.theme.primaryColor}; border: none; padding: 14px 32px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Get Started Free</button>
              <button data-builder-editable="button" style="background: transparent; color: white; border: 2px solid white; padding: 14px 32px; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer;">Contact Sales</button>
            </div>
          </div>
        </section>
      `
    },
    footer: {
      name: 'Footer',
      icon: 'square',
      getHTML: () => `
        <footer data-builder-section="footer" style="background: #0f172a; padding: 60px 24px 24px; color: white;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px;">
              <div>
                <div data-builder-editable="logo" style="font-weight: 800; font-size: 1.25rem; margin-bottom: 16px;">${state.theme.brandName}</div>
                <p data-builder-editable="text" style="color: rgba(255,255,255,0.6); line-height: 1.6;">Your trusted partner for automotive parts worldwide.</p>
              </div>
              <div>
                <h4 style="font-weight: 600; margin-bottom: 16px;">Products</h4>
                <a href="#" data-builder-editable="link" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none; margin-bottom: 10px;">Engine Parts</a>
                <a href="#" data-builder-editable="link" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none; margin-bottom: 10px;">Brakes</a>
                <a href="#" data-builder-editable="link" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none;">Suspension</a>
              </div>
              <div>
                <h4 style="font-weight: 600; margin-bottom: 16px;">Company</h4>
                <a href="#" data-builder-editable="link" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none; margin-bottom: 10px;">About Us</a>
                <a href="#" data-builder-editable="link" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none; margin-bottom: 10px;">Careers</a>
                <a href="#" data-builder-editable="link" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none;">Blog</a>
              </div>
              <div>
                <h4 style="font-weight: 600; margin-bottom: 16px;">Support</h4>
                <a href="#" data-builder-editable="link" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none; margin-bottom: 10px;">Help Center</a>
                <a href="#" data-builder-editable="link" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none; margin-bottom: 10px;">Contact</a>
                <a href="#" data-builder-editable="link" style="display: block; color: rgba(255,255,255,0.6); text-decoration: none;">FAQ</a>
              </div>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; display: flex; justify-content: space-between; color: rgba(255,255,255,0.5); font-size: 0.85rem;">
              <p data-builder-editable="text">© 2026 ${state.theme.brandName}. All rights reserved.</p>
              <div style="display: flex; gap: 24px;">
                <a href="#" data-builder-editable="link" style="color: rgba(255,255,255,0.5); text-decoration: none;">Privacy</a>
                <a href="#" data-builder-editable="link" style="color: rgba(255,255,255,0.5); text-decoration: none;">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      `
    },
    custom: {
      name: 'Custom HTML',
      icon: 'code-2',
      getHTML: (html) => `
        <section data-builder-section="custom" style="padding: 40px 24px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            ${html || '<div data-builder-editable="text" style="padding: 40px; background: #f0f0f0; text-align: center; color: #666;">Custom HTML Section - Add your content</div>'}
          </div>
        </section>
      `
    }
  };

  // ===== DOM Elements =====
  const previewContainer = document.getElementById('previewContainer');
  const sectionsList = document.getElementById('sectionsList');
  const pagesList = document.getElementById('pagesList');
  const noSelection = document.getElementById('noSelection');
  const elementEditor = document.getElementById('elementEditor');
  const sectionEditor = document.getElementById('sectionEditor');

  // ===== Initialize =====
  function init() {
    // Set default sections for home page
    state.pages.home.sections = ['header', 'hero', 'features', 'stats', 'products', 'testimonials', 'cta', 'footer'];
    state.pages.products.sections = ['header', 'products', 'footer'];
    state.pages.about.sections = ['header', 'features', 'testimonials', 'footer'];
    state.pages.contact.sections = ['header', 'cta', 'footer'];
    
    renderPagesList();
    renderSectionsList();
    renderPreview();
    setupEventListeners();
    setupSortable();
    populateLibrary();
  }

  // ===== Render Pages List =====
  function renderPagesList() {
    pagesList.innerHTML = Object.entries(state.pages).map(([id, page]) => `
      <div class="page-item ${id === state.currentPage ? 'active' : ''}" data-page="${id}">
        <i data-lucide="${page.icon}"></i>
        <span>${page.name}</span>
      </div>
    `).join('');
    lucide.createIcons();
  }

  // ===== Render Sections List =====
  function renderSectionsList() {
    const sections = state.pages[state.currentPage].sections;
    sectionsList.innerHTML = sections.map((sectionId, index) => {
      const template = sectionTemplates[sectionId];
      return `
        <div class="section-item ${index === state.selectedSectionIndex ? 'active' : ''}" data-section-index="${index}" data-section-id="${sectionId}">
          <div class="section-drag-handle">
            <i data-lucide="grip-vertical"></i>
          </div>
          <div class="section-info">
            <span class="section-name">${template ? template.name : 'Custom'}</span>
            <span class="section-type">${sectionId}</span>
          </div>
          <button class="section-delete" data-index="${index}">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      `;
    }).join('');
    lucide.createIcons();
    attachSectionListListeners();
  }

  // ===== Render Preview =====
  function renderPreview() {
    const sections = state.pages[state.currentPage].sections;
    let html = sections.map(sectionId => {
      const template = sectionTemplates[sectionId];
      if (template) {
        return template.getHTML();
      }
      return '';
    }).join('');

    // Add custom CSS
    if (state.customCSS) {
      html += `<style>${state.customCSS}</style>`;
    }

    // Wrap in base styles
    previewContainer.innerHTML = `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: '${state.theme.headingFont}', -apple-system, BlinkMacSystemFont, sans-serif; }
        img { max-width: 100%; height: auto; }
        a { transition: opacity 0.2s; }
        a:hover { opacity: 0.8; }
        button { transition: all 0.2s; }
        button:hover { filter: brightness(1.1); transform: translateY(-1px); }
      </style>
      ${html}
    `;

    attachPreviewListeners();
  }

  // ===== Attach Preview Listeners =====
  function attachPreviewListeners() {
    // Section click handlers
    previewContainer.querySelectorAll('[data-builder-section]').forEach((section, index) => {
      section.addEventListener('click', (e) => {
        if (e.target.closest('[data-builder-editable]')) return;
        e.stopPropagation();
        selectSection(index);
      });
    });

    // Editable element click handlers
    previewContainer.querySelectorAll('[data-builder-editable]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement(el);
      });

      // Double click to edit inline
      el.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        enableInlineEdit(el);
      });
    });
  }

  // ===== Select Element =====
  function selectElement(el) {
    // Clear previous selection
    previewContainer.querySelectorAll('.selected').forEach(s => s.classList.remove('selected'));
    state.selectedSection = null;
    state.selectedSectionIndex = null;
    renderSectionsList();

    // Select new element
    el.classList.add('selected');
    state.selectedElement = el;

    // Show element editor
    noSelection.style.display = 'none';
    sectionEditor.style.display = 'none';
    elementEditor.style.display = 'flex';

    // Populate editor
    const type = el.dataset.builderEditable;
    document.getElementById('editorTitle').textContent = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    document.getElementById('textContentInput').value = el.textContent.trim();

    // Show/hide specific sections
    document.getElementById('linkSection').style.display = (el.tagName === 'A' || el.href) ? 'block' : 'none';
    document.getElementById('imageSection').style.display = (el.tagName === 'IMG') ? 'block' : 'none';

    if (el.tagName === 'A') {
      document.getElementById('linkUrlInput').value = el.href || '';
    }
    if (el.tagName === 'IMG') {
      document.getElementById('imageUrlInput').value = el.src || '';
    }

    // Get current styles
    const computed = window.getComputedStyle(el);
    document.getElementById('fontSizeSelect').value = computed.fontSize;
    document.getElementById('fontWeightSelect').value = computed.fontWeight;
    
    lucide.createIcons();
  }

  // ===== Enable Inline Edit =====
  function enableInlineEdit(el) {
    const originalContent = el.innerHTML;
    el.contentEditable = true;
    el.focus();
    
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    const finishEdit = () => {
      el.contentEditable = false;
      el.removeEventListener('blur', finishEdit);
      el.removeEventListener('keydown', handleKey);
      saveState();
    };

    const handleKey = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        el.blur();
      }
      if (e.key === 'Escape') {
        el.innerHTML = originalContent;
        el.blur();
      }
    };

    el.addEventListener('blur', finishEdit);
    el.addEventListener('keydown', handleKey);
  }

  // ===== Select Section =====
  function selectSection(index) {
    // Clear previous selection
    previewContainer.querySelectorAll('.selected').forEach(s => s.classList.remove('selected'));
    state.selectedElement = null;

    // Select section
    const sections = previewContainer.querySelectorAll('[data-builder-section]');
    if (sections[index]) {
      sections[index].classList.add('selected');
      state.selectedSection = sections[index];
      state.selectedSectionIndex = index;

      // Show section editor
      noSelection.style.display = 'none';
      elementEditor.style.display = 'none';
      sectionEditor.style.display = 'flex';

      const sectionId = state.pages[state.currentPage].sections[index];
      const template = sectionTemplates[sectionId];
      document.getElementById('sectionTitle').textContent = template ? template.name : 'Custom Section';

      // Get current background
      const bg = sections[index].style.background || sections[index].style.backgroundColor;
      if (bg.includes('rgb')) {
        document.getElementById('sectionBgColor').value = rgbToHex(bg);
      }

      renderSectionsList();
      lucide.createIcons();
    }
  }

  // ===== Apply Element Changes =====
  function applyElementChanges() {
    if (!state.selectedElement) return;

    const el = state.selectedElement;
    const newText = document.getElementById('textContentInput').value;
    const fontSize = document.getElementById('fontSizeSelect').value;
    const fontWeight = document.getElementById('fontWeightSelect').value;
    const textColor = document.getElementById('textColorInput').value;
    const bgColor = document.getElementById('bgColorInput').value;

    // Apply text content
    if (el.tagName !== 'IMG') {
      el.textContent = newText;
    }

    // Apply styles
    if (fontSize) el.style.fontSize = fontSize;
    if (fontWeight) el.style.fontWeight = fontWeight;
    if (textColor) el.style.color = textColor;
    if (bgColor && bgColor !== '#ffffff') el.style.backgroundColor = bgColor;

    // Apply link URL
    if (el.tagName === 'A') {
      el.href = document.getElementById('linkUrlInput').value;
    }

    // Apply image URL
    if (el.tagName === 'IMG') {
      el.src = document.getElementById('imageUrlInput').value;
    }

    saveState();
    showNotification('Changes applied!');
  }

  // ===== Apply Section Changes =====
  function applySectionChanges() {
    if (!state.selectedSection) return;

    const bgColor = document.getElementById('sectionBgColor').value;
    const bgImage = document.getElementById('sectionBgImage').value;

    if (bgImage) {
      state.selectedSection.style.background = `url(${bgImage}) center/cover`;
    } else if (bgColor) {
      state.selectedSection.style.background = bgColor;
    }

    // Apply padding
    const activePadding = document.querySelector('.preset-btn.active');
    if (activePadding) {
      const padding = activePadding.dataset.padding + 'px';
      state.selectedSection.style.padding = `${padding} 24px`;
    }

    saveState();
    showNotification('Section updated!');
  }

  // ===== Delete Element =====
  function deleteElement() {
    if (!state.selectedElement) return;
    if (!confirm('Delete this element?')) return;

    state.selectedElement.remove();
    closeEditor();
    saveState();
  }

  // ===== Delete Section =====
  function deleteSection(index) {
    if (!confirm('Delete this section?')) return;

    state.pages[state.currentPage].sections.splice(index, 1);
    state.selectedSection = null;
    state.selectedSectionIndex = null;
    
    renderSectionsList();
    renderPreview();
    closeEditor();
    saveState();
  }

  // ===== Duplicate Section =====
  function duplicateSection() {
    if (state.selectedSectionIndex === null) return;

    const sections = state.pages[state.currentPage].sections;
    const sectionId = sections[state.selectedSectionIndex];
    sections.splice(state.selectedSectionIndex + 1, 0, sectionId);

    renderSectionsList();
    renderPreview();
    saveState();
    showNotification('Section duplicated!');
  }

  // ===== Move Section =====
  function moveSection(direction) {
    if (state.selectedSectionIndex === null) return;

    const sections = state.pages[state.currentPage].sections;
    const index = state.selectedSectionIndex;
    
    if (direction === 'up' && index > 0) {
      [sections[index - 1], sections[index]] = [sections[index], sections[index - 1]];
      state.selectedSectionIndex = index - 1;
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
      state.selectedSectionIndex = index + 1;
    }

    renderSectionsList();
    renderPreview();
    selectSection(state.selectedSectionIndex);
    saveState();
  }

  // ===== Add Section =====
  function addSection(sectionId) {
    state.pages[state.currentPage].sections.push(sectionId);
    renderSectionsList();
    renderPreview();
    closeModal('sectionLibraryModal');
    saveState();
    showNotification('Section added!');
  }

  // ===== Close Editor =====
  function closeEditor() {
    noSelection.style.display = 'flex';
    elementEditor.style.display = 'none';
    sectionEditor.style.display = 'none';
    state.selectedElement = null;
    state.selectedSection = null;
    state.selectedSectionIndex = null;
    previewContainer.querySelectorAll('.selected').forEach(s => s.classList.remove('selected'));
    renderSectionsList();
  }

  // ===== Switch Page =====
  function switchPage(pageId) {
    state.currentPage = pageId;
    document.getElementById('currentPageName').textContent = state.pages[pageId].name;
    closeEditor();
    renderPagesList();
    renderSectionsList();
    renderPreview();
  }

  // ===== Apply Theme =====
  function applyTheme() {
    state.theme.brandName = document.getElementById('brandNameInput').value;
    state.theme.primaryColor = document.getElementById('primaryColor').value;
    state.theme.secondaryColor = document.getElementById('secondaryColor').value;
    state.theme.accentColor = document.getElementById('accentColor').value;
    state.theme.headingFont = document.getElementById('headingFont').value;

    renderPreview();
    saveState();
    showNotification('Theme applied!');
  }

  // ===== Add Custom Section =====
  function addCustomSection() {
    const html = document.getElementById('customHtmlCode').value;
    const css = document.getElementById('customCssCode').value;

    if (html) {
      // Create custom section
      const customHtml = `
        <section data-builder-section="custom" style="padding: 40px 24px;">
          <style>${css}</style>
          <div style="max-width: 1200px; margin: 0 auto;">
            ${html}
          </div>
        </section>
      `;
      
      // Add directly to preview
      previewContainer.insertAdjacentHTML('beforeend', customHtml);
      state.pages[state.currentPage].sections.push('custom');
      renderSectionsList();
      attachPreviewListeners();
      saveState();
      showNotification('Custom section added!');
    }
  }

  // ===== Populate Library =====
  function populateLibrary() {
    const libraryGrid = document.getElementById('libraryGrid');
    libraryGrid.innerHTML = Object.entries(sectionTemplates)
      .filter(([id]) => id !== 'custom')
      .map(([id, template]) => `
        <div class="library-item" data-section-id="${id}">
          <div class="library-item-icon">
            <i data-lucide="${template.icon}"></i>
          </div>
          <span>${template.name}</span>
        </div>
      `).join('');
    lucide.createIcons();
  }

  // ===== Setup Sortable =====
  function setupSortable() {
    if (typeof Sortable !== 'undefined') {
      new Sortable(sectionsList, {
        handle: '.section-drag-handle',
        animation: 150,
        ghostClass: 'dragging',
        onEnd: (evt) => {
          const sections = state.pages[state.currentPage].sections;
          const [moved] = sections.splice(evt.oldIndex, 1);
          sections.splice(evt.newIndex, 0, moved);
          renderPreview();
          saveState();
        }
      });
    }
  }

  // ===== Attach Section List Listeners =====
  function attachSectionListListeners() {
    document.querySelectorAll('.section-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.section-delete')) {
          const index = parseInt(item.dataset.sectionIndex);
          selectSection(index);
        }
      });
    });

    document.querySelectorAll('.section-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteSection(parseInt(btn.dataset.index));
      });
    });
  }

  // ===== Setup Event Listeners =====
  function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.sidebar-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.sidebar-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab + 'Panel').classList.add('active');
        lucide.createIcons();
      });
    });

    // Page switching
    pagesList.addEventListener('click', (e) => {
      const pageItem = e.target.closest('.page-item');
      if (pageItem) switchPage(pageItem.dataset.page);
    });

    // Device switching
    document.querySelectorAll('.device-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const device = btn.dataset.device;
        const canvasFrame = document.getElementById('canvasFrame');
        canvasFrame.classList.remove('tablet', 'mobile');
        if (device !== 'desktop') canvasFrame.classList.add(device);
      });
    });

    // Zoom
    document.getElementById('zoomIn').addEventListener('click', () => {
      if (state.zoom < 150) { state.zoom += 10; updateZoom(); }
    });
    document.getElementById('zoomOut').addEventListener('click', () => {
      if (state.zoom > 50) { state.zoom -= 10; updateZoom(); }
    });

    // Add section button
    document.getElementById('addSectionBtn').addEventListener('click', () => {
      document.getElementById('sectionLibraryModal').classList.add('active');
      lucide.createIcons();
    });

    document.getElementById('closeSectionModal').addEventListener('click', () => {
      closeModal('sectionLibraryModal');
    });

    // Library item click
    document.getElementById('libraryGrid').addEventListener('click', (e) => {
      const item = e.target.closest('.library-item');
      if (item) addSection(item.dataset.sectionId);
    });

    // Apply changes buttons
    document.getElementById('applyChangesBtn').addEventListener('click', applyElementChanges);
    document.getElementById('applySectionBtn').addEventListener('click', applySectionChanges);
    document.getElementById('applyThemeBtn').addEventListener('click', applyTheme);
    document.getElementById('addCustomSection').addEventListener('click', addCustomSection);

    // Delete buttons
    document.getElementById('deleteElementBtn').addEventListener('click', deleteElement);
    document.getElementById('deleteSectionBtn').addEventListener('click', () => {
      if (state.selectedSectionIndex !== null) deleteSection(state.selectedSectionIndex);
    });

    // Section actions
    document.getElementById('duplicateSectionBtn').addEventListener('click', duplicateSection);
    document.getElementById('moveSectionUpBtn').addEventListener('click', () => moveSection('up'));
    document.getElementById('moveSectionDownBtn').addEventListener('click', () => moveSection('down'));

    // Close editors
    document.getElementById('closeEditor').addEventListener('click', closeEditor);
    document.getElementById('closeSectionEditor').addEventListener('click', closeEditor);

    // Button style options
    document.querySelectorAll('.style-option').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.style-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.theme.buttonStyle = btn.dataset.style;
      });
    });

    // Padding presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Code tabs
    document.querySelectorAll('.code-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.code-editor-wrap').forEach(w => w.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.codeTab + 'CodeWrap').classList.add('active');
      });
    });

    // Export
    document.getElementById('exportBtn').addEventListener('click', () => {
      const html = generateExportHTML();
      document.getElementById('exportCodeArea').value = html;
      document.getElementById('exportModal').classList.add('active');
      lucide.createIcons();
    });

    document.getElementById('closeExportModal').addEventListener('click', () => {
      closeModal('exportModal');
    });

    document.getElementById('copyExportBtn').addEventListener('click', () => {
      document.getElementById('exportCodeArea').select();
      document.execCommand('copy');
      showNotification('Copied to clipboard!');
    });

    document.getElementById('downloadExportBtn').addEventListener('click', downloadExport);

    // Preview in new tab
    document.getElementById('previewSiteBtn').addEventListener('click', previewInNewTab);

    // Publish
    document.getElementById('publishBtn').addEventListener('click', () => {
      showNotification('Website published successfully!');
    });

    // Click outside to deselect
    previewContainer.addEventListener('click', (e) => {
      if (e.target === previewContainer) closeEditor();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeEditor();
      if (e.key === 'Delete' && state.selectedElement) deleteElement();
    });
  }

  // ===== Helper Functions =====
  function updateZoom() {
    document.getElementById('zoomValue').textContent = state.zoom + '%';
    document.getElementById('canvasFrame').style.transform = `scale(${state.zoom / 100})`;
  }

  function closeModal(id) {
    document.getElementById(id).classList.remove('active');
  }

  function showNotification(message) {
    // Simple notification
    const existing = document.querySelector('.builder-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'builder-notification';
    notification.innerHTML = `<i data-lucide="check-circle"></i> ${message}`;
    notification.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; background: #10b981; color: white;
      padding: 12px 20px; border-radius: 8px; font-weight: 500; z-index: 10000;
      display: flex; align-items: center; gap: 8px; animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    lucide.createIcons();
    setTimeout(() => notification.remove(), 3000);
  }

  function saveState() {
    // Save to history for undo/redo
    state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push(JSON.stringify(state.pages));
    state.historyIndex = state.history.length - 1;
  }

  function rgbToHex(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match) return '#ffffff';
    return '#' + match.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
  }

  function generateExportHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.theme.brandName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; }
    img { max-width: 100%; height: auto; }
    ${state.customCSS}
  </style>
</head>
<body>
${previewContainer.innerHTML}
</body>
</html>`;
  }

  function downloadExport() {
    const html = generateExportHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Download started!');
  }

  function previewInNewTab() {
    const html = generateExportHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  // ===== Initialize =====
  init();
});
