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
            <svg width="25" height="25" viewBox="0 0 240 240" fill="currentColor">
              <g transform="translate(0,240) scale(0.1,-0.1)">
                <path d="M970 2301 c-305 -68 -555 -237 -727 -493 -301 -451 -241 -1056 143 -1442 115 -116 290 -228 422 -271 49 -16 55 -16 77 -1 24 16 25 20 25 135 l0 118 -88 -5 c-103 -5 -183 13 -231 54 -17 14 -50 62 -73 106 -38 74 -66 108 -144 177 -26 23 -27 24 -9 37 43 32 130 1 185 -65 96 -117 133 -148 188 -160 49 -10 94 -6 162 14 9 3 21 24 27 48 6 23 22 58 35 77 l24 35 -81 16 c-170 35 -275 96 -344 200 -64 96 -85 179 -86 334 0 146 16 206 79 288 28 36 31 47 23 68 -15 36 -11 188 5 234 13 34 20 40 47 43 45 5 129 -24 214 -72 l73 -42 64 15 c91 21 364 20 446 0 l62 -16 58 35 c77 46 175 82 224 82 39 0 39 -1 55 -52 17 -59 20 -166 5 -217 -8 -30 -6 -39 16 -68 109 -144 121 -383 29 -579 -62 -129 -193 -219 -369 -252 l-84 -16 31 -55 32 -56 3 -223 4 -223 25 -16 c23 -15 28 -15 76 2 80 27 217 101 292 158 446 334 590 933 343 1431 -145 293 -419 518 -733 602 -137 36 -395 44 -525 15z"/>
              </g>
            </svg>
          </a>
          <a class="nav-icon-btn" id="nav-linkedin-link" aria-label="LinkedIn" href="https://www.linkedin.com/company/skku-nlplab/posts/?feedView=all" target="_blank" rel="noopener">
            <img src="/assets/img/외부%20사이트%20로고/linkedin_mono.png" alt="" width="25" height="25" />
          </a>
          <a class="nav-icon-btn" id="nav-youtube-link" aria-label="Youtube" href="https://www.youtube.com/@skku_nlplab_official" target="_blank" rel="noopener">
            <img src="/assets/img/외부%20사이트%20로고/youtube_mono.png" alt="" width="25" height="25" />
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
