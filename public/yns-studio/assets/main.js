// Client-side menu and WhatsApp quote preparation. No analytics or backend.
(function () {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const mobile = document.getElementById('mobile-navigation');
  if (menu && mobile) {
    const setOpen = (open) => {
      menu.setAttribute('aria-expanded', String(open));
      mobile.hidden = !open;
      document.body.classList.toggle('menu-open', open);
    };
    menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') !== 'true'));
    mobile.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobile.hidden) { setOpen(false); menu.focus(); }
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 930) setOpen(false); });
  }

  const form = document.getElementById('quote-form');
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const suggested = params.get('service');
    if (suggested) {
      const select = form.querySelector('#service');
      if ([...select.options].some(o => o.value === suggested)) select.value = suggested;
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = document.getElementById('form-status');
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Complétez les champs obligatoires pour continuer.';
        return;
      }
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const service = String(data.get('service') || '').trim();
      const budget = String(data.get('budget') || '').trim();
      const message = String(data.get('message') || '').trim();
      if (!name || !service || !message) {
        status.textContent = 'Merci de renseigner votre nom, votre besoin et sa description.';
        return;
      }
      const body = `Bonjour, je découvre YNS Studio et j'aimerais échanger sur un projet.\n\nNom : ${name}\nPrestation : ${service}\nBudget : ${budget || 'À discuter'}\n\nDescription :\n${message}`;
      const url = 'https://wa.me/33674205368?text=' + encodeURIComponent(body);
      status.textContent = 'WhatsApp va s’ouvrir avec votre message prérempli.';
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) window.location.href = url;
    });
  }
})();
