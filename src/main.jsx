import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { caseStudies, deskImage, objects, personalNotes, practices, readings, skills } from "./content.js";
import "@fontsource/montserrat/latin-400.css";
import "@fontsource/montserrat/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./style.css";

const sections = { projets: "Projets", competences: "Compétences", apropos: "À propos", contact: "Contact" };
const titles = { ...Object.fromEntries(skills), ...Object.fromEntries(caseStudies.map(item => [item.id, item.name])), index: "Explorer les objets", menu: "Navigation", lectures: "Mes lectures préférées", ...Object.fromEntries(objects.map(item => [item.id, item.title])), apropos: "À propos", contact: "Contact" };
const dossiers = {
  projets: "01", competences: "02", linlock: "01.1", dieuzy: "01.2", dynam8: "01.3", mochiauto: "01.4", strategie: "03", gestion: "04",
  web: "05", creation: "06", automatisation: "07", podcast: "08",
  inspirations: "09", lectures: "10", cafe: "11", apropos: "12", contact: "13", youtube: "14", ragnarok: "15", maroc: "16", basket: "17"
};
const secrets = objects.filter(item => item.type === "secret");
const professionalObjects = objects.filter(item => item.type === "professional");
const readRoute = () => {
  const key = window.location.hash.slice(1);
  return Object.hasOwn(titles, key) ? key : null;
};

function PanelBody({ page, go, found }) {
  if (page === "menu") return <nav className="mobile-directory" aria-label="Navigation mobile">
    {Object.entries(sections).map(([id, name]) => <button key={id} onClick={() => go(id)}>{name}</button>)}
    <button onClick={() => go("index")}>Explorer les objets</button>
  </nav>;
  if (page === "index") return <div className="directory">{professionalObjects.map(item =>
    <button key={item.id} onClick={() => go(item.action)}>
      <span className="entry-number" aria-hidden="true">{dossiers[item.action]}</span>
      <span>{item.label}<small>{item.object}</small></span>
    </button>
  )}</div>;
  if (personalNotes[page]) return <div className={"personal-note note-" + page}>
    {page === "maroc" && <span className="postcard-mark" aria-hidden="true"></span>}
    <p>{personalNotes[page]}</p>
  </div>;
  if (page === "projets") return <>
    <p className="lede">Quatre expériences concrètes, quatre manières de concevoir et de faire avancer un projet. Choisis un dossier pour découvrir mon rôle et les réalisations.</p>
    <div className="project-directory">{caseStudies.map((item, i) =>
      <button key={item.id} className="project-entry" onClick={() => go(item.id)}>
        <span className={"monogram mark-" + i} aria-hidden="true">{["L&L", "D.", "D8", "M/A"][i]}</span>
        <span className="project-entry-text"><strong>{item.name}</strong><small>{item.category}</small><span>{item.summary}</span></span>
        <span className="project-arrow" aria-hidden="true">↗</span>
      </button>
    )}</div>
  </>;
  const caseStudy = caseStudies.find(item => item.id === page);
  if (caseStudy) return <article className="case-study">
    <p className="case-eyebrow">{caseStudy.category} <span> / {caseStudy.period}</span></p>
    <p className="lede">{caseStudy.summary}</p>
    {caseStudy.metrics && <div className="case-metrics">{caseStudy.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><small>{label}</small></div>)}</div>}
    <section className="case-section"><h3>Le contexte</h3><p>{caseStudy.context}</p></section>
    <section className="case-section"><h3>Mon rôle</h3><p>{caseStudy.role}</p></section>
    <section className="case-section"><h3>Ce que j'ai réalisé</h3>
      <dl>{caseStudy.actions.map(([title, copy]) => <div key={title}><dt>{title}</dt><dd>{copy}</dd></div>)}</dl>
    </section>
    <section className="case-section"><h3>Le résultat</h3><p>{caseStudy.result}</p></section>
    {caseStudy.url && <a className="primary" href={caseStudy.url} target="_blank" rel="noopener noreferrer">Voir le site du projet ↗</a>}
    <button className="text-link" onClick={() => go("projets")}>← Tous les projets</button>
  </article>;
  if (page === "competences") return <>
    <p className="lede">Stratégie, création, développement digital et production : voici les domaines dans lesquels je peux accompagner un projet, de l’idée au concret.</p>
    <div className="choices">{skills.map(([id, label]) =>
      <button key={id} onClick={() => go(id)}><span className="entry-number" aria-hidden="true">{dossiers[id]}</span><span>{label}</span></button>
    )}</div>
  </>;
  if (practices[page]) return <>
    <p className="lede">{practices[page].intro}</p>
    <dl>{practices[page].steps.map(([title, copy]) =>
      <div key={title}><dt>{title}</dt><dd>{copy}</dd></div>
    )}</dl>
    {practices[page].proof && <p className="practice-proof">{practices[page].proof}</p>}
    {page === "creation" && <button className="text-link" onClick={() => go("podcast")}>Découvrir mon expérience podcast ↗</button>}
    {["strategie","gestion","web","creation","automatisation"].includes(page) && <button className="text-link" onClick={() => go("projets")}>Voir mes réalisations ↗</button>}
    <button className="text-link" onClick={() => go("competences")}>← Toutes les compétences</button>
  </>;
  if (page === "inspirations") return <>
    <p className="lede">Romans, stratégie, communication et manga : les quatre livres présents sur mon bureau.</p>
    <ul className="books">{readings.map(([title, category]) =>
      <li key={title}><strong>{title}</strong><span>{category}</span></li>
    )}</ul>
  </>;
  if (page === "lectures") return <>
    <p className="lede">Les quatre titres que je garde sur mon bureau.</p>
    <ul className="books">{readings.map(([title, category]) =>
      <li key={title}><strong>{title}</strong><span>{category}</span></li>
    )}</ul>
  </>;
  if (page === "apropos") return <>
    <p className="lede">Moi, c'est Younes. J'aime autant imaginer une idée que la voir prendre forme.</p>
    <p>Mon parcours a commencé dans l'informatique avec un BTS SIO SLAM, puis s'est poursuivi dans la gestion de projet digital et la communication stratégique. Cette trajectoire me permet aujourd'hui de relier des univers souvent séparés : stratégie, création, web, contenus et automatisation.</p>
    <p>J'ai participé à des projets très différents : communication d'une entreprise industrielle, déploiement d'un service de casiers connectés, conception d'un prototype d'application et création d'un micro-média automobile.</p>
    <p>Ce qui m'anime ? Comprendre comment les choses fonctionnent, trouver des solutions concrètes et apprendre en construisant. Je suis également passionné par YouTube, les médias et les nouvelles façons de créer du contenu.</p>
    <button className="primary" onClick={() => go("projets")}>Découvrir mes réalisations ↗</button>
    <button className="text-link" onClick={() => go("contact")}>Me contacter ↗</button>
  </>;
  if (page === "contact") return <>
    <p className="lede">Une mission, un projet ou simplement une idée à discuter ? Parlons-en.</p>
    <p>Je peux intervenir sur la communication, la création web, le contenu, la coordination digitale et l'optimisation de processus. Le plus simple est de m'expliquer ton besoin et de voir ensemble comment avancer.</p>
    <a className="primary" href="https://github.com/Atemani" target="_blank" rel="noopener noreferrer">Me retrouver sur GitHub ↗</a>
    <p className="contact-note">Un lien direct de contact professionnel pourra être ajouté ici dès qu'une adresse ou un profil public sera confirmé.</p>
  </>;
  return null;
}

function Panel({ page, go, close, found }) {
  const dialog = useRef(null);
  const heading = useRef(null);
  useEffect(() => {
    const el = dialog.current;
    const opener = document.activeElement;
    el.showModal();
    document.body.classList.add("modal-open");
    return () => {
      el.close();
      document.body.classList.remove("modal-open");
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    heading.current.focus({ preventScroll: true });
    dialog.current.scrollTop = 0;
  }, [page]);
  const object = objects.find(item => item.id === page);
  return <dialog ref={dialog} id="portfolio-panel" className={personalNotes[page] ? "secret-panel" : ""} aria-labelledby="panel-title" onCancel={event => { event.preventDefault(); close(); }}
    onClick={event => { if (event.target === dialog.current) {
      const bounds = dialog.current.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
    } }}>
    <div className="panel-bar">
      <span className="mono">{page === "index" || page === "menu" ? "Sommaire" : personalNotes[page] ? "Secret découvert" : "Dossier " + dossiers[page]}</span>
      <span className="panel-origin">{object?.object || "Portfolio"}</span>
      <button className="close" onClick={close} aria-label="Fermer la fenêtre"><span className="close-label">Fermer</span><span aria-hidden="true">×</span></button>
    </div>
    <div className="panel-content">
      <h2 className={personalNotes[page] ? "sr-only" : ""} tabIndex="-1" id="panel-title" ref={heading}>{titles[page]}</h2>
      <PanelBody page={page} go={go} found={found} />
    </div>
  </dialog>;
}

function Desk({ go, found }) {
  const viewport = useRef(null);
  const scene = useRef(null);
  useEffect(() => {
    const el = viewport.current;
    // Preserve the area being explored when the viewport changes orientation.
    const compact = window.matchMedia("(max-width: 760px), (max-aspect-ratio: 6/5), (max-width: 1000px) and (max-height: 500px)").matches;
    let center = compact ? deskImage.initialX : 0.5;
    let lastSceneWidth = 0;
    let lastViewportWidth = 0;
    let positioning = false;
    let releaseFrame = 0;
    const position = () => {
      lastSceneWidth = scene.current.clientWidth;
      lastViewportWidth = el.clientWidth;
      positioning = true;
      el.scrollLeft = center * lastSceneWidth - lastViewportWidth / 2;
      cancelAnimationFrame(releaseFrame);
      releaseFrame = requestAnimationFrame(() => { positioning = false; });
    };
    const remember = () => {
      // A resize may clamp scrollLeft before ResizeObserver fires. Ignore that
      // intermediate offset so rotating the phone preserves the explored area.
      if (positioning || el.clientWidth !== lastViewportWidth || scene.current.clientWidth !== lastSceneWidth) return;
      center = (el.scrollLeft + lastViewportWidth / 2) / lastSceneWidth;
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(el);
    observer.observe(scene.current);
    el.addEventListener("scroll", remember, { passive: true });
    return () => { cancelAnimationFrame(releaseFrame); observer.disconnect(); el.removeEventListener("scroll", remember); };
  }, []);
  function placeLabel(event) {
    const button = event.currentTarget;
    const label = button.querySelector(".tag");
    const frame = viewport.current.getBoundingClientRect();
    const target = button.getBoundingClientRect();
    const half = label.offsetWidth / 2 + 8;
    const center = Math.max(frame.left + half, Math.min(target.left + target.width / 2, frame.right - half));
    button.style.setProperty("--label-x", (center - target.left) + "px");
  }
  function focusObject(event) {
    if (event.currentTarget.matches(":focus-visible")) event.currentTarget.scrollIntoView({ block: "nearest", inline: "center", behavior: "instant" });
    placeLabel(event);
  }
  return <>
    <section className="viewport" ref={viewport} aria-label="Bureau panoramique, utilisez les flèches gauche et droite ou glissez pour explorer" tabIndex="0">
      <div className="scene" ref={scene} style={{ aspectRatio: deskImage.width + " / " + deskImage.height }}>
        <img src={deskImage.src} width={deskImage.width} height={deskImage.height} alt="Bureau chaleureux : micro et ordinateur portable à gauche, grand écran et café au centre ; carnet, livres, jeu PS5, ballon, carte de contact et casque à droite. Une feuille YouTube et une carte postale du Maroc sont accrochées au mur." fetchPriority="high" decoding="async" />
        {objects.map(item => <button key={item.id} data-object={item.id} data-type={item.type} onClick={() => go(item.action)} onPointerEnter={placeLabel} onFocus={focusObject}
          aria-label={item.type === "secret" ? "Explorer : " + item.object : item.object + " — " + item.title}
          className={["hotspot", item.type === "secret" ? "secret" : "", found.has(item.id) ? "found" : ""].join(" ")}
          style={{ left: item.x + "%", top: item.y + "%" }}>
          <span className="marker" aria-hidden="true"></span>
          <span className="tag" aria-hidden="true">{item.label}</span>
        </button>)}
      </div>
    </section>
    <span className="swipe-hint" aria-hidden="true">Glisse pour explorer le bureau</span>
    <div className="editorial">
      <div className="intro">
        <h1>DES IDÉES. <span>DU CONCRET.</span></h1>
        <p>Stratégie, communication, création digitale et automatisation.</p>
      </div>
      <div className="explore">
        <p className="explore-hint">Les objets racontent le parcours.</p>
        <button className="index-button" onClick={() => go("index")}>Explorer les objets</button>
        <span className="count" aria-live="polite">Secrets découverts <b>{found.size} / {secrets.length}</b></span>
        <ul className="interaction-legend" aria-label="Légende des points interactifs">
          <li><i className="legend-dot" aria-hidden="true"></i>Sections à explorer</li>
          <li><i className="legend-dot secret-dot" aria-hidden="true"></i>Secrets à découvrir</li>
        </ul>
      </div>
    </div>
  </>;
}

function App() {
  const [page, setPage] = useState(readRoute);
  const [found, setFound] = useState(() => new Set());
  useEffect(() => {
    const sync = () => setPage(readRoute());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => { window.removeEventListener("popstate", sync); window.removeEventListener("hashchange", sync); };
  }, []);
  useEffect(() => {
    if (secrets.some(item => item.id === page)) setFound(prev => prev.has(page) ? prev : new Set([...prev, page]));
  }, [page]);
  function go(key) {
    if (key === page) return;
    if (page) window.history.replaceState(window.history.state, "", "#" + key);
    else window.history.pushState({ portfolioPanel: true }, "", "#" + key);
    setPage(key);
  }
  function close() {
    if (window.history.state?.portfolioPanel) window.history.back();
    else {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      setPage(null);
    }
  }
  return <>
    <a href="#principal" className="skip">Aller au bureau</a>
    <header><div className="shell header-inner">
      <a className="identity" href="./"><span className="signature" aria-hidden="true">YA</span> Younes Atemani</a>
      <button className="menu-toggle" aria-haspopup="dialog" aria-controls={page === "menu" ? "portfolio-panel" : undefined} aria-expanded={page === "menu"} onClick={() => go("menu")}>Menu<span className="menu-lines" aria-hidden="true"></span></button>
      <nav className="desktop-nav" aria-label="Navigation principale">{Object.entries(sections).map(([id, name]) =>
        <button className={id === "contact" ? "contact" : ""} key={id} onClick={() => go(id)}>{name}</button>
      )}</nav>
    </div></header>
    <main id="principal" tabIndex="-1">
      <Desk go={go} found={found} />
    </main>
    {page && <Panel page={page} go={go} close={close} found={found} />}
  </>;
}

createRoot(document.getElementById("root")).render(<App />);
