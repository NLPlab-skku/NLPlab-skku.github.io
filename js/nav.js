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
          <button class="nav-icon-btn" aria-label="Search" onclick="alert('검색 기능은 준비 중입니다.')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
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
