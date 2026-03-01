// ── Site data — edit this to update your site ──────────────────────────────
const data = {
  name: 'Coleen',
  initials: 'C',
  tagline: 'Nurse · Caregiver · Lifelong learner',
  bio: "Hi, I'm Coleen, a nurse passionate about patient care and making a difference every day. Outside of work I enjoy reading, staying active, and learning new things.",
  social: [
    { label: 'GitHub',   href: 'https://github.com/jarlee123-crypto' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter',  href: 'https://twitter.com' },
    { label: 'Email',    href: 'mailto:hello@example.com' },
  ],
  projects: [
    { title: 'Project Alpha',        desc: 'A fast, minimal tool for managing local dev environments.',        tag: 'Open Source', href: '#' },
    { title: 'Notepad Zero',         desc: 'Distraction-free writing app built with plain web technologies.',  tag: 'App',         href: '#' },
    { title: 'CLI Toolkit',          desc: 'A collection of shell utilities I use daily, packaged neatly.',    tag: 'CLI',         href: '#' },
    { title: 'Design System Starter',desc: 'Zero-dependency component primitives for rapid UI prototyping.',  tag: 'Library',     href: '#' },
  ],
  footer: `© ${new Date().getFullYear()} Coleen · Built with HTML & CSS`,
};

// ── Helpers ─────────────────────────────────────────────────────────────────
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const child of children.flat()) {
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
};

const svg = (cls, path) => {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('class', cls);
  s.setAttribute('width', '16');
  s.setAttribute('height', '16');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('fill', 'none');
  s.setAttribute('stroke', 'currentColor');
  s.setAttribute('stroke-width', '2');
  s.setAttribute('stroke-linecap', 'round');
  s.setAttribute('stroke-linejoin', 'round');
  s.innerHTML = path;
  return s;
};

// ── Dark mode toggle ─────────────────────────────────────────────────────────
const buildToggle = () => {
  const btn = el('button', { class: 'theme-toggle', 'aria-label': 'Toggle dark mode' });
  btn.append(
    svg('icon-sun',  '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'),
    svg('icon-moon', '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),
  );
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  btn.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
    localStorage.setItem('theme', dark ? 'light' : 'dark');
  });
  return btn;
};

// ── Hero ─────────────────────────────────────────────────────────────────────
const buildHero = ({ name, initials, tagline, social }) =>
  el('div', { class: 'hero' },
    el('div', { class: 'avatar' }, initials),
    el('div', { class: 'hero-text' },
      el('h1', {}, name),
      el('p',  { class: 'tagline' }, tagline),
      el('div', { class: 'social-links' },
        ...social.map(({ label, href }) =>
          el('a', { href, ...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}) }, label)
        )
      )
    )
  );

// ── Bio ───────────────────────────────────────────────────────────────────────
const buildBio = ({ bio }) =>
  el('section', { class: 'bio' },
    el('h2', {}, 'About'),
    el('p',  {}, bio),
  );

// ── Projects ──────────────────────────────────────────────────────────────────
const buildProjects = ({ projects }) =>
  el('section', {},
    el('h2', {}, 'Projects'),
    el('div', { class: 'projects-grid' },
      ...projects.map(({ title, desc, tag, href }) =>
        el('a', { class: 'project-card', href, target: '_blank', rel: 'noopener' },
          el('div', { class: 'proj-info' },
            el('h3', {}, title),
            el('p',  {}, desc),
          ),
          el('span', { class: 'proj-tag' }, tag),
        )
      )
    )
  );

// ── Contact form ──────────────────────────────────────────────────────────────
const buildContact = () => {
  const successMsg = el('span', { class: 'form-success' },
    (() => {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.setAttribute('width', '16'); s.setAttribute('height', '16');
      s.setAttribute('viewBox', '0 0 16 16'); s.setAttribute('fill', 'none');
      s.innerHTML = '<circle cx="8" cy="8" r="7.5" stroke="#16a34a"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';
      return s;
    })(),
    'Message sent!'
  );

  const field = (id, label, type = 'input') => {
    const input = el(type === 'input'
      ? 'input' : 'textarea',
      { id, name: id, ...(type === 'input' ? { type: id === 'email' ? 'email' : 'text' } : {}),
        placeholder: id === 'name' ? 'Your name' : id === 'email' ? 'you@example.com' : "What's on your mind?" }
    );
    return el('div', { class: 'form-group' },
      el('label', { for: id }, label),
      input,
    );
  };

  const form = el('form', { class: 'contact-form', novalidate: '' },
    el('div', { class: 'form-row' }, field('name', 'Name'), field('email', 'Email')),
    field('message', 'Message', 'textarea'),
    el('div', { class: 'form-actions' },
      el('button', { class: 'submit-btn', type: 'submit' }, 'Send message'),
      successMsg,
    )
  );

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    if (!name || !email || !message) return;
    // Replace with real submission: fetch('/api/contact', { method:'POST', body: JSON.stringify({name,email,message}) })
    successMsg.classList.add('visible');
    form.reset();
    setTimeout(() => successMsg.classList.remove('visible'), 4000);
  });

  return el('section', {}, el('h2', {}, 'Contact'), form);
};

// ── App entry ─────────────────────────────────────────────────────────────────
const render = () => {
  document.title = data.name;

  const app = document.getElementById('app');
  app.append(
    buildToggle(),
    el('main', {},
      buildHero(data),
      el('hr', {}),
      buildBio(data),
      buildProjects(data),
      buildContact(),
      el('footer', {}, data.footer),
    )
  );
};

render();
