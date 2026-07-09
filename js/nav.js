(function () {
  const NAV = [
    {
      label: 'About Us',
      children: [
        { label: 'Introduction', href: '/AboutUs/Introduction/' },
        { label: 'Photos',       href: '/AboutUs/Photos/' },
        { label: 'Contact Us',   href: '/AboutUs/ContactUs/' },
      ]
    },
    {
      label: 'Research',
      children: [
        { label: 'Fields',   href: '/Research/Fields/' },
        { label: 'Projects', href: '/Research/Projects/' },
        { label: 'Patents',  href: '/Research/Patents/' },
      ]
    },
    { label: 'Publications', href: '/Publications/' },
    { label: 'Members',      href: '/Members/' },
    {
      label: 'Demos',
      children: [
        { label: 'NLP',           href: '/Demos/Natural_Language_Processing.html' },
        { label: 'IR',            href: '/Demos/Information_Retrieval.html' },
        { label: 'Text Mining',   href: '/Demos/Text_mining.html' },
        { label: 'Generative AI', href: '/Demos/Gen_Ai.html' },
      ]
    },
    { label: 'Boards', href: '/Boards/' },
  ];

  const path = location.pathname;
  let activeLabel = '';
  if (path.includes('/AboutUs/')) activeLabel = 'About Us';
  else if (path.includes('/Research/')) activeLabel = 'Research';
  else if (path.includes('/Publications')) activeLabel = 'Publications';
  else if (path.includes('/Members')) activeLabel = 'Members';
  else if (path.includes('/Demos/')) activeLabel = 'Demos';
  else if (path.includes('/Boards')) activeLabel = 'Boards';

  function buildItem(item) {
    const hasChildren = item.children && item.children.length;
    const isActive = item.label === activeLabel;

    const dropdownHTML = hasChildren
      ? `<div class="dropdown">${item.children.map(c =>
          `<a href="${c.href}">${c.label}</a>`).join('')}</div>`
      : '';

    const caretHTML = hasChildren ? `<span class="caret">▾</span>` : '';
    const href = hasChildren ? '#' : item.href;
    const onclick = hasChildren ? ' onclick="return false"' : '';

    return `<li class="nav-item${isActive ? ' active' : ''}">
      <a href="${href}"${onclick}>${item.label}${caretHTML}</a>
      ${dropdownHTML}
    </li>`;
  }

  function buildMobileItem(item) {
    const hasChildren = item.children && item.children.length;
    const isActive = item.label === activeLabel;

    if (hasChildren) {
      const childLinks = item.children.map(c =>
        `<a class="mobile-sub-link" href="${c.href}">${c.label}</a>`
      ).join('');
      return `
        <div class="mobile-nav-group${isActive ? ' active' : ''}">
          <button class="mobile-nav-toggle" onclick="this.parentElement.classList.toggle('open')">
            ${item.label}<span class="mobile-caret">▾</span>
          </button>
          <div class="mobile-sub-menu">${childLinks}</div>
        </div>`;
    }
    return `<a class="mobile-nav-link${isActive ? ' active' : ''}" href="${item.href}">${item.label}</a>`;
  }

  const html = `
    <nav class="navbar" id="main-navbar">
      <div class="nav-inner">
        <button class="nav-hamburger" id="nav-hamburger" aria-label="메뉴 열기">
          <span></span><span></span><span></span>
        </button>
        <a class="nav-brand" href="/"><span class="brand-n">N</span><span class="brand-l">L</span><span class="brand-p">P</span>LAB</a>
        <ul class="nav-menu">
          ${NAV.map(buildItem).join('')}
        </ul>
        <div class="nav-actions">
          <a class="btn-contact" href="https://docs.google.com/forms/d/e/1FAIpQLScuPJTLfKKVgjACoPYXgIy4V9uczZxrvE9Yd5sem34n0tVW6g/viewform">Contact Us</a>
          <a class="nav-icon-btn" id="nav-github-link" aria-label="GitHub" href="https://github.com/NLPlab-skku" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
    <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>
    <div class="mobile-menu" id="mobile-menu">
      <div class="mobile-menu-header">
        <a class="mobile-menu-brand" href="/"><span class="brand-n">N</span><span class="brand-l">L</span><span class="brand-p">P</span>LAB</a>
        <button class="mobile-menu-close" id="mobile-menu-close" aria-label="메뉴 닫기">✕</button>
      </div>
      <div class="mobile-menu-body">
        ${NAV.map(buildMobileItem).join('')}
      </div>
      <div class="mobile-menu-footer">
        <a class="mobile-contact-btn" href="/AboutUs/ContactUs/">Contact Us</a>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('afterbegin', html);

  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const closeBtn = document.getElementById('mobile-menu-close');

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
})();
