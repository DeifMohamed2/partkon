/**
 * PartKon Website Themes
 * Theme Selection & Customization Wizard
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ===== State Management =====
  const state = {
    selectedTheme: null,
    currentStep: 1,
    totalSteps: 5,
    completedSteps: [],
    config: {
      branding: {
        logo: null,
        brandName: '',
        tagline: '',
        email: '',
        phone: ''
      },
      colors: {
        preset: 'default',
        primary: '#6366F1',
        secondary: '#3B82F6',
        accent: '#F59E0B',
        darkMode: false
      },
      content: {
        heroHeadline: 'Find Quality Auto Parts',
        heroSubheadline: 'Discover premium OEM and aftermarket parts from trusted suppliers worldwide.',
        heroButtonText: 'Start Searching',
        heroImage: null
      },
      sections: [
        { id: 'header', name: 'Header', enabled: true, locked: true },
        { id: 'hero', name: 'Hero Banner', enabled: true, locked: false },
        { id: 'search', name: 'Search Box', enabled: true, locked: false },
        { id: 'features', name: 'Features', enabled: true, locked: false },
        { id: 'categories', name: 'Categories', enabled: true, locked: false },
        { id: 'products', name: 'Products', enabled: true, locked: false },
        { id: 'stats', name: 'Statistics', enabled: true, locked: false },
        { id: 'testimonials', name: 'Testimonials', enabled: true, locked: false },
        { id: 'cta', name: 'Call to Action', enabled: true, locked: false },
        { id: 'footer', name: 'Footer', enabled: true, locked: true }
      ],
      pages: [
        { id: 'home', name: 'Home', url: '/', enabled: true, locked: true },
        { id: 'search', name: 'Search Results', url: '/search', enabled: true, locked: false },
        { id: 'product', name: 'Product Details', url: '/product/:id', enabled: true, locked: false },
        { id: 'cart', name: 'Shopping Cart', url: '/cart', enabled: true, locked: false },
        { id: 'checkout', name: 'Checkout', url: '/checkout', enabled: true, locked: false },
        { id: 'about', name: 'About Us', url: '/about', enabled: true, locked: false },
        { id: 'contact', name: 'Contact', url: '/contact', enabled: true, locked: false },
        { id: 'account', name: 'My Account', url: '/account', enabled: true, locked: false }
      ],
      navigation: ['Home', 'Search', 'About', 'Contact']
    }
  };

  // ===== Theme Data =====
  const themes = {
    'auto-parts-pro': {
      name: 'Auto Parts Pro',
      description: 'Professional automotive parts marketplace with advanced search and filtering.',
      image: '/images/6ecb825d-f48a-47aa-85e6-a2eb1535f7f5.avif',
      category: 'automotive',
      pages: 7,
      sections: 24
    },
    'parts-finder': {
      name: 'Parts Finder',
      description: 'Clean and modern parts catalog with VIN lookup and compatibility checker.',
      image: '/images/template-social-media-with-coffee_23-2148469144.avif',
      category: 'automotive',
      pages: 8,
      sections: 28
    },
    'auto-garage': {
      name: 'Auto Garage',
      description: 'Bold and dynamic theme for auto repair shops and service centers.',
      image: '/images/6ecb825d-f48a-47aa-85e6-a2eb1535f7f5.avif',
      category: 'automotive',
      pages: 6,
      sections: 20
    },
    'shop-elite': {
      name: 'Shop Elite',
      description: 'Premium e-commerce theme with stunning product displays and smooth checkout.',
      image: '/images/template-social-media-with-coffee_23-2148469144.avif',
      category: 'ecommerce',
      pages: 10,
      sections: 32
    },
    'market-pro': {
      name: 'Market Pro',
      description: 'Multi-vendor marketplace theme with seller dashboards and product filters.',
      image: '/images/6ecb825d-f48a-47aa-85e6-a2eb1535f7f5.avif',
      category: 'ecommerce',
      pages: 12,
      sections: 36
    },
    'boutique': {
      name: 'Boutique',
      description: 'Elegant fashion and lifestyle theme with lookbook galleries and collections.',
      image: '/images/template-social-media-with-coffee_23-2148469144.avif',
      category: 'ecommerce',
      pages: 8,
      sections: 26
    },
    'saas-launch': {
      name: 'SaaS Launch',
      description: 'Modern SaaS landing page with feature showcases and pricing tables.',
      image: '/images/6ecb825d-f48a-47aa-85e6-a2eb1535f7f5.avif',
      category: 'saas',
      pages: 6,
      sections: 22
    },
    'app-studio': {
      name: 'App Studio',
      description: 'Creative app showcase with animated demos and download sections.',
      image: '/images/template-social-media-with-coffee_23-2148469144.avif',
      category: 'saas',
      pages: 5,
      sections: 18
    },
    'dashboard-pro': {
      name: 'Dashboard Pro',
      description: 'Analytics dashboard theme with charts, reports, and data visualization.',
      image: '/images/6ecb825d-f48a-47aa-85e6-a2eb1535f7f5.avif',
      category: 'saas',
      pages: 8,
      sections: 30
    },
    'corporate-edge': {
      name: 'Corporate Edge',
      description: 'Professional corporate theme with team profiles and service showcases.',
      image: '/images/template-social-media-with-coffee_23-2148469144.avif',
      category: 'corporate',
      pages: 9,
      sections: 28
    },
    'business-hub': {
      name: 'Business Hub',
      description: 'Versatile business theme with client testimonials and portfolio sections.',
      image: '/images/6ecb825d-f48a-47aa-85e6-a2eb1535f7f5.avif',
      category: 'corporate',
      pages: 7,
      sections: 24
    },
    'consulting-pro': {
      name: 'Consulting Pro',
      description: 'Consulting firm theme with expertise areas and appointment booking.',
      image: '/images/template-social-media-with-coffee_23-2148469144.avif',
      category: 'corporate',
      pages: 8,
      sections: 26
    },
    'creative-folio': {
      name: 'Creative Folio',
      description: 'Stunning portfolio theme with project galleries and case study layouts.',
      image: '/images/6ecb825d-f48a-47aa-85e6-a2eb1535f7f5.avif',
      category: 'portfolio',
      pages: 6,
      sections: 20
    },
    'studio-x': {
      name: 'Studio X',
      description: 'Minimal design studio theme with work showcases and client list.',
      image: '/images/template-social-media-with-coffee_23-2148469144.avif',
      category: 'portfolio',
      pages: 5,
      sections: 16
    },
    'photo-pro': {
      name: 'Photo Pro',
      description: 'Photography portfolio with fullscreen galleries and booking system.',
      image: '/images/6ecb825d-f48a-47aa-85e6-a2eb1535f7f5.avif',
      category: 'portfolio',
      pages: 7,
      sections: 22
    }
  };

  // ===== Color Presets =====
  const colorPresets = {
    default: { primary: '#6366F1', secondary: '#3B82F6', accent: '#F59E0B' },
    ocean: { primary: '#0EA5E9', secondary: '#06B6D4', accent: '#10B981' },
    forest: { primary: '#10B981', secondary: '#059669', accent: '#F59E0B' },
    sunset: { primary: '#F59E0B', secondary: '#EF4444', accent: '#EC4899' },
    royal: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#EC4899' },
    rose: { primary: '#EC4899', secondary: '#DB2777', accent: '#F59E0B' }
  };

  // ===== DOM Elements =====
  const themeSelectionView = document.getElementById('themeSelectionView');
  const themeWizardView = document.getElementById('themeWizardView');
  const themesGrid = document.getElementById('themesGrid');
  const previewModal = document.getElementById('previewModal');

  // ===== Initialize =====
  function init() {
    setupEventListeners();
    setupSortable();
  }

  // ===== Event Listeners =====
  function setupEventListeners() {
    // Category filter
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterThemes(btn.dataset.category);
      });
    });

    // Theme search
    const themeSearch = document.getElementById('themeSearch');
    if (themeSearch) {
      themeSearch.addEventListener('input', (e) => {
        searchThemes(e.target.value);
      });
    }

    // Theme card actions
    themesGrid.addEventListener('click', (e) => {
      const previewBtn = e.target.closest('[data-action="preview"]');
      const selectBtn = e.target.closest('[data-action="select"]');
      const themeCard = e.target.closest('.theme-card');
      
      if (previewBtn && themeCard) {
        openPreviewModal(themeCard.dataset.theme);
      } else if (selectBtn && themeCard) {
        selectTheme(themeCard.dataset.theme);
      }
    });

    // Preview modal
    document.getElementById('closePreviewModal').addEventListener('click', closePreviewModal);
    document.getElementById('closeModalBtn').addEventListener('click', closePreviewModal);
    document.getElementById('selectFromModalBtn').addEventListener('click', () => {
      closePreviewModal();
      if (state.selectedTheme) {
        selectTheme(state.selectedTheme);
      }
    });

    // Wizard back button
    document.getElementById('wizardBackBtn').addEventListener('click', () => {
      showThemeSelection();
    });

    // Wizard tabs
    document.querySelectorAll('.wizard-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const step = getStepFromTab(tab.dataset.tab);
        if (step <= state.currentStep || state.completedSteps.includes(step - 1)) {
          goToStep(step);
        }
      });
    });

    // Wizard navigation
    document.getElementById('prevStepBtn').addEventListener('click', () => {
      if (state.currentStep > 1) {
        goToStep(state.currentStep - 1);
      }
    });

    document.getElementById('nextStepBtn').addEventListener('click', () => {
      if (state.currentStep < state.totalSteps) {
        markStepCompleted(state.currentStep);
        goToStep(state.currentStep + 1);
      }
    });

    // Branding inputs
    setupBrandingListeners();

    // Color listeners
    setupColorListeners();

    // Content listeners
    setupContentListeners();

    // Device toggle in preview
    document.querySelectorAll('.device-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const parent = e.target.closest('.preview-device-toggle, .modal-device-toggle');
        parent.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const device = btn.dataset.device;
        const wrapper = parent.closest('.preview-container, .preview-modal-content')
          .querySelector('.preview-frame-wrapper, .preview-modal-body');
        
        if (wrapper) {
          wrapper.classList.remove('tablet', 'mobile');
          if (device !== 'desktop') {
            wrapper.classList.add(device);
          }
        }
      });
    });

    // Publish button
    document.getElementById('publishWebsiteBtn').addEventListener('click', publishWebsite);
    
    // Preview website button
    document.getElementById('previewWebsiteBtn').addEventListener('click', () => {
      openFullPreview();
    });

    // Navigation items
    document.getElementById('addNavBtn').addEventListener('click', addNavItem);
  }

  // ===== Branding Listeners =====
  function setupBrandingListeners() {
    const logoUploadArea = document.getElementById('logoUploadArea');
    const logoInput = document.getElementById('logoInput');
    const logoPreview = document.getElementById('logoPreview');

    if (logoUploadArea && logoInput) {
      logoUploadArea.addEventListener('click', () => logoInput.click());
      logoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            state.config.branding.logo = event.target.result;
            logoPreview.innerHTML = `<img src="${event.target.result}" alt="Logo">`;
            updatePreview();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    const brandName = document.getElementById('brandName');
    if (brandName) {
      brandName.addEventListener('input', (e) => {
        state.config.branding.brandName = e.target.value;
        updatePreview();
      });
    }

    const brandTagline = document.getElementById('brandTagline');
    if (brandTagline) {
      brandTagline.addEventListener('input', (e) => {
        state.config.branding.tagline = e.target.value;
        updatePreview();
      });
    }

    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail) {
      contactEmail.addEventListener('input', (e) => {
        state.config.branding.email = e.target.value;
      });
    }

    const contactPhone = document.getElementById('contactPhone');
    if (contactPhone) {
      contactPhone.addEventListener('input', (e) => {
        state.config.branding.phone = e.target.value;
      });
    }
  }

  // ===== Color Listeners =====
  function setupColorListeners() {
    // Color presets
    document.querySelectorAll('.color-preset').forEach(preset => {
      preset.addEventListener('click', () => {
        document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('active'));
        preset.classList.add('active');
        
        const presetName = preset.dataset.preset;
        state.config.colors.preset = presetName;
        
        const colors = colorPresets[presetName];
        state.config.colors.primary = colors.primary;
        state.config.colors.secondary = colors.secondary;
        state.config.colors.accent = colors.accent;
        
        // Update color inputs
        document.getElementById('primaryColor').value = colors.primary;
        document.getElementById('primaryColorText').value = colors.primary;
        document.getElementById('secondaryColor').value = colors.secondary;
        document.getElementById('secondaryColorText').value = colors.secondary;
        document.getElementById('accentColor').value = colors.accent;
        document.getElementById('accentColorText').value = colors.accent;
        
        updatePreview();
      });
    });

    // Color pickers
    ['primary', 'secondary', 'accent'].forEach(color => {
      const picker = document.getElementById(`${color}Color`);
      const text = document.getElementById(`${color}ColorText`);
      
      if (picker) {
        picker.addEventListener('input', (e) => {
          state.config.colors[color] = e.target.value;
          if (text) text.value = e.target.value;
          updatePreview();
        });
      }
      
      if (text) {
        text.addEventListener('input', (e) => {
          const value = e.target.value;
          if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            state.config.colors[color] = value;
            if (picker) picker.value = value;
            updatePreview();
          }
        });
      }
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('change', (e) => {
        state.config.colors.darkMode = e.target.checked;
        updatePreview();
      });
    }
  }

  // ===== Content Listeners =====
  function setupContentListeners() {
    const heroHeadline = document.getElementById('heroHeadline');
    if (heroHeadline) {
      heroHeadline.addEventListener('input', (e) => {
        state.config.content.heroHeadline = e.target.value;
        updatePreview();
      });
    }

    const heroSubheadline = document.getElementById('heroSubheadline');
    if (heroSubheadline) {
      heroSubheadline.addEventListener('input', (e) => {
        state.config.content.heroSubheadline = e.target.value;
        updatePreview();
      });
    }

    const heroButtonText = document.getElementById('heroButtonText');
    if (heroButtonText) {
      heroButtonText.addEventListener('input', (e) => {
        state.config.content.heroButtonText = e.target.value;
        updatePreview();
      });
    }

    // Hero image upload
    const heroImageUpload = document.getElementById('heroImageUpload');
    const heroImageInput = document.getElementById('heroImageInput');
    
    if (heroImageUpload && heroImageInput) {
      heroImageUpload.addEventListener('click', () => heroImageInput.click());
      heroImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            state.config.content.heroImage = event.target.result;
            document.getElementById('heroImagePreview').src = event.target.result;
            updatePreview();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Section toggles
    document.querySelectorAll('.section-item .section-toggle input').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const sectionId = e.target.closest('.section-item').dataset.section;
        const section = state.config.sections.find(s => s.id === sectionId);
        if (section && !section.locked) {
          section.enabled = e.target.checked;
          updatePreview();
        }
      });
    });

    // Page toggles
    document.querySelectorAll('.page-item .page-toggle input').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const pageId = e.target.closest('.page-item').dataset.page;
        const page = state.config.pages.find(p => p.id === pageId);
        if (page && !page.locked) {
          page.enabled = e.target.checked;
        }
      });
    });
  }

  // ===== Setup Sortable =====
  function setupSortable() {
    const sectionsList = document.getElementById('sectionsList');
    if (sectionsList && typeof Sortable !== 'undefined') {
      new Sortable(sectionsList, {
        handle: '.section-drag',
        animation: 150,
        ghostClass: 'dragging',
        onEnd: (evt) => {
          const sections = state.config.sections;
          const [movedSection] = sections.splice(evt.oldIndex, 1);
          sections.splice(evt.newIndex, 0, movedSection);
          updatePreview();
        }
      });
    }

    const navItemsList = document.getElementById('navItemsList');
    if (navItemsList && typeof Sortable !== 'undefined') {
      new Sortable(navItemsList, {
        handle: '.nav-drag',
        animation: 150,
        ghostClass: 'dragging'
      });
    }
  }

  // ===== Filter Themes =====
  function filterThemes(category) {
    document.querySelectorAll('.theme-card').forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ===== Search Themes =====
  function searchThemes(query) {
    const lowerQuery = query.toLowerCase();
    document.querySelectorAll('.theme-card').forEach(card => {
      const name = card.querySelector('.theme-name').textContent.toLowerCase();
      const desc = card.querySelector('.theme-description').textContent.toLowerCase();
      if (name.includes(lowerQuery) || desc.includes(lowerQuery)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ===== Preview Modal =====
  function openPreviewModal(themeId) {
    const theme = themes[themeId];
    if (!theme) return;

    state.selectedTheme = themeId;
    document.getElementById('previewModalTitle').textContent = theme.name + ' Preview';
    
    // Generate preview HTML
    const previewFrame = document.getElementById('previewModalFrame');
    previewFrame.srcdoc = generateThemePreview(themeId);
    
    previewModal.classList.add('active');
    lucide.createIcons();
  }

  function closePreviewModal() {
    previewModal.classList.remove('active');
  }

  // ===== Select Theme =====
  function selectTheme(themeId) {
    const theme = themes[themeId];
    if (!theme) return;

    state.selectedTheme = themeId;
    state.currentStep = 1;
    state.completedSteps = [];

    // Update wizard header
    document.getElementById('wizardThemeImage').src = theme.image;
    document.getElementById('wizardThemeName').textContent = theme.name;
    document.getElementById('wizardThemeDesc').textContent = theme.description;

    // Show wizard view
    themeSelectionView.classList.add('hidden');
    themeWizardView.classList.remove('hidden');

    // Reset wizard state
    updateWizardUI();
    updatePreview();
    lucide.createIcons();
  }

  // ===== Show Theme Selection =====
  function showThemeSelection() {
    themeWizardView.classList.add('hidden');
    themeSelectionView.classList.remove('hidden');
    lucide.createIcons();
  }

  // ===== Wizard Navigation =====
  function goToStep(step) {
    state.currentStep = step;
    updateWizardUI();
    updatePreview();
  }

  function markStepCompleted(step) {
    if (!state.completedSteps.includes(step)) {
      state.completedSteps.push(step);
    }
    updateWizardUI();
  }

  function getStepFromTab(tabName) {
    const tabs = ['branding', 'colors', 'content', 'sections', 'pages'];
    return tabs.indexOf(tabName) + 1;
  }

  function getTabFromStep(step) {
    const tabs = ['branding', 'colors', 'content', 'sections', 'pages'];
    return tabs[step - 1];
  }

  function updateWizardUI() {
    // Update tabs
    document.querySelectorAll('.wizard-tab').forEach(tab => {
      const tabStep = getStepFromTab(tab.dataset.tab);
      tab.classList.remove('active', 'completed');
      
      if (tabStep === state.currentStep) {
        tab.classList.add('active');
      } else if (state.completedSteps.includes(tabStep)) {
        tab.classList.add('completed');
      }
    });

    // Update panels
    document.querySelectorAll('.wizard-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    const currentTabName = getTabFromStep(state.currentStep);
    const currentPanel = document.getElementById(`${currentTabName}Panel`);
    if (currentPanel) {
      currentPanel.classList.add('active');
    }

    // Update progress
    const progress = (state.currentStep / state.totalSteps) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('currentStep').textContent = state.currentStep;

    // Update nav buttons
    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    
    prevBtn.disabled = state.currentStep === 1;
    
    if (state.currentStep === state.totalSteps) {
      nextBtn.innerHTML = '<i data-lucide="check"></i> Finish';
    } else {
      nextBtn.innerHTML = 'Next <i data-lucide="arrow-right"></i>';
    }

    lucide.createIcons();
  }

  // ===== Update Preview =====
  function updatePreview() {
    const frames = document.querySelectorAll('[id^="livePreviewFrame"]');
    frames.forEach(frame => {
      frame.srcdoc = generateThemePreview(state.selectedTheme);
    });
  }

  // ===== Generate Theme Preview =====
  function generateThemePreview(themeId) {
    const config = state.config;
    const brandName = config.branding.brandName || 'PartsForm';
    const tagline = config.branding.tagline || 'Your trusted partner for automotive parts';
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', sans-serif; 
            color: #1e293b; 
            line-height: 1.6;
            ${config.colors.darkMode ? 'background: #0f172a; color: #f1f5f9;' : ''}
          }
          
          /* Header */
          .header {
            background: ${config.colors.darkMode ? '#1e293b' : '#0f172a'};
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
          }
          .logo-icon {
            width: 36px;
            height: 36px;
            background: ${config.colors.primary};
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-text {
            font-size: 1.25rem;
            font-weight: 800;
          }
          .nav {
            display: flex;
            gap: 24px;
          }
          .nav a {
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            font-size: 0.9rem;
          }
          .header-btn {
            background: ${config.colors.primary};
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
          }
          
          /* Hero */
          .hero {
            background: linear-gradient(135deg, ${config.colors.primary}20, ${config.colors.secondary}10);
            padding: 80px 24px;
            text-align: center;
            position: relative;
          }
          .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url('${config.content.heroImage || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=800&fit=crop'}') center/cover;
            opacity: 0.1;
          }
          .hero-content {
            position: relative;
            z-index: 1;
            max-width: 800px;
            margin: 0 auto;
          }
          .hero h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 16px;
            color: ${config.colors.darkMode ? '#f1f5f9' : '#1e293b'};
          }
          .hero p {
            font-size: 1.1rem;
            color: ${config.colors.darkMode ? '#94a3b8' : '#64748b'};
            margin-bottom: 32px;
          }
          .hero-btn {
            background: ${config.colors.primary};
            color: white;
            border: none;
            padding: 14px 32px;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
          }
          
          /* Features */
          .features {
            padding: 60px 24px;
            background: ${config.colors.darkMode ? '#1e293b' : '#f8fafc'};
          }
          .features-grid {
            max-width: 1000px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .feature-card {
            background: ${config.colors.darkMode ? '#0f172a' : 'white'};
            padding: 24px;
            border-radius: 16px;
            text-align: center;
            border: 1px solid ${config.colors.darkMode ? '#334155' : '#e2e8f0'};
          }
          .feature-icon {
            width: 48px;
            height: 48px;
            background: ${config.colors.primary}20;
            border-radius: 12px;
            margin: 0 auto 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${config.colors.primary};
          }
          .feature-card h3 {
            font-size: 1rem;
            margin-bottom: 8px;
            color: ${config.colors.darkMode ? '#f1f5f9' : '#1e293b'};
          }
          .feature-card p {
            font-size: 0.85rem;
            color: ${config.colors.darkMode ? '#94a3b8' : '#64748b'};
          }
          
          /* Stats */
          .stats {
            background: linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary});
            padding: 60px 24px;
            color: white;
          }
          .stats-grid {
            max-width: 1000px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
            text-align: center;
          }
          .stat-value {
            font-size: 2.5rem;
            font-weight: 800;
            display: block;
          }
          .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
          }
          
          /* Footer */
          .footer {
            background: ${config.colors.darkMode ? '#0f172a' : '#1e293b'};
            color: white;
            padding: 48px 24px 24px;
            text-align: center;
          }
          .footer-logo {
            font-size: 1.25rem;
            font-weight: 800;
            margin-bottom: 8px;
          }
          .footer-tagline {
            color: rgba(255,255,255,0.6);
            font-size: 0.9rem;
            margin-bottom: 24px;
          }
          .footer-copy {
            font-size: 0.8rem;
            color: rgba(255,255,255,0.5);
            padding-top: 24px;
            border-top: 1px solid rgba(255,255,255,0.1);
          }
        </style>
      </head>
      <body>
        ${config.sections.find(s => s.id === 'header')?.enabled !== false ? `
        <header class="header">
          <div class="logo">
            <div class="logo-icon">
              ${config.branding.logo ? `<img src="${config.branding.logo}" alt="Logo" style="width: 24px; height: 24px; object-fit: contain;">` : `
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"></path>
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"></path>
                <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6"></path>
              </svg>`}
            </div>
            <span class="logo-text">${brandName}</span>
          </div>
          <nav class="nav">
            ${config.navigation.map(item => `<a href="#">${item}</a>`).join('')}
          </nav>
          <button class="header-btn">Quick Search</button>
        </header>
        ` : ''}
        
        ${config.sections.find(s => s.id === 'hero')?.enabled !== false ? `
        <section class="hero">
          <div class="hero-content">
            <h1>${config.content.heroHeadline}</h1>
            <p>${config.content.heroSubheadline}</p>
            <button class="hero-btn">${config.content.heroButtonText}</button>
          </div>
        </section>
        ` : ''}
        
        ${config.sections.find(s => s.id === 'features')?.enabled !== false ? `
        <section class="features">
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Find parts instantly with AI-powered search</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">✓</div>
              <h3>Verified Quality</h3>
              <p>All parts are quality-checked and certified</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>Fast Delivery</h3>
              <p>Get parts delivered within 24-48 hours</p>
            </div>
          </div>
        </section>
        ` : ''}
        
        ${config.sections.find(s => s.id === 'stats')?.enabled !== false ? `
        <section class="stats">
          <div class="stats-grid">
            <div>
              <span class="stat-value">500+</span>
              <span class="stat-label">Global Suppliers</span>
            </div>
            <div>
              <span class="stat-value">2M+</span>
              <span class="stat-label">Parts Available</span>
            </div>
            <div>
              <span class="stat-value">50K+</span>
              <span class="stat-label">Happy Customers</span>
            </div>
            <div>
              <span class="stat-value">99.9%</span>
              <span class="stat-label">Satisfaction</span>
            </div>
          </div>
        </section>
        ` : ''}
        
        ${config.sections.find(s => s.id === 'footer')?.enabled !== false ? `
        <footer class="footer">
          <div class="footer-logo">${brandName}</div>
          <p class="footer-tagline">${tagline}</p>
          <p class="footer-copy">© 2026 ${brandName}. All rights reserved.</p>
        </footer>
        ` : ''}
      </body>
      </html>
    `;
  }

  // ===== Add Navigation Item =====
  function addNavItem() {
    const navList = document.getElementById('navItemsList');
    const newItem = document.createElement('div');
    newItem.className = 'nav-item';
    newItem.innerHTML = `
      <div class="nav-drag"><i data-lucide="grip-vertical"></i></div>
      <input type="text" class="nav-input" value="New Link">
      <button class="nav-delete"><i data-lucide="x"></i></button>
    `;
    navList.appendChild(newItem);
    
    newItem.querySelector('.nav-delete').addEventListener('click', () => {
      newItem.remove();
    });
    
    state.config.navigation.push('New Link');
    lucide.createIcons();
  }

  // ===== Open Full Preview =====
  function openFullPreview() {
    const previewHTML = generateThemePreview(state.selectedTheme);
    const blob = new Blob([previewHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  // ===== Publish Website =====
  function publishWebsite() {
    // Show success message
    alert(`🎉 Your website "${state.config.branding.brandName || 'PartsForm'}" has been published successfully!\n\nYou can view it at: https://${(state.config.branding.brandName || 'partsform').toLowerCase().replace(/\s+/g, '-')}.partkon.com`);
  }

  // ===== Initialize =====
  init();
});
