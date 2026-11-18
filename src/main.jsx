import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { objects, practices, projects, readings, skills } from "./content.js";
import "@fontsource/montserrat/latin-400.css";
import "@fontsource/montserrat/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/barlow-condensed/latin-800.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./style.css";

const sections = { projets: "Projets", competences: "Compétences", apropos: "À propos", contact: "Contact" };
const titles = { ...Object.fromEntries(skills), index: "Les objets du bureau", ...Object.fromEntries(objects.map(item => [item.id, item.title])), apropos: "À propos", contact: "Contact" };
const dossiers = {
  projets: "01", competences: "02", strategie: "03", gestion: "04",
  web: "05", creation: "06", automatisation: "07", podcast: "08",
  inspirations: "09", lectures: "10", cafe: "11", apropos: "12", contact: "13"
};
const secrets = objects.filter(item => item.secret);
const readRoute = () => {
  const key = window.location.hash.slice(1);
  return Object.hasOwn(titles, key) ? key : null;
};

function PanelBody({ page, go, found }) {
  if (page === "index") return <div className="directory">{objects.map(item =>
    <button key={item.id} onClick={() => go(item.id)}>
      <span className="entry-number" aria-hidden="true">{dossiers[item.id]}</span>
      <span>{item.object}<small>{item.secret && !found.has(item.id) ? "Objet secret" : item.title}</small></span>
     
    </button>
  )}</div>;
  if (page === "projets") return <>
    <p className="lede">Quatre projets de mon portfolio.</p>
    <ul className="projects">{projects.map((name, i) =>
      <li key={name}><span className={"monogram mark-" + i} aria-hidden="true">{["L&L", "D.", "D8", "M/A"][i]}</span><strong>{name}</strong></li>
    )}</ul>
  </>;
  if (page === "competences") return <>
    <p className="lede">Du cadrage d’une idée à sa mise en ligne.</p>
    <div className="choices">{skills.map(([id, label]) =>
      <button key={id} onClick={() => go(id)}><span className="entry-number" aria-hidden="true">{dossiers[id]}</span><span>{label}</span></button>
    )}</div>
  </>;
  if (practices[page]) return <>
    <p className="lede">{practices[page].intro}</p>
    <dl>{practices[page].steps.map(([title, copy]) =>
      <div key={title}><dt>{title}</dt><dd>{copy}</dd></div>
    )}</dl>
    {page === "creation" && <button className="text-link" onClick={() => go("podcast")}>Production de podcasts</button>}
    <button className="text-link" onClick={() => go("competences")}>Toutes les compétences</button>
  </>;
  if (page === "inspirations") return <>
    <p className="lede">Sur mon bureau, les mangas et les romans côtoient des livres de stratégie et de communication.</p>
    <dl><div><dt>Raconter</dt><dd>Comment un personnage, un décor ou une image donnent envie de connaître la suite.</dd></div>
    <div><dt>Aller à l’essentiel</dt><dd>Comment choisir un angle et dire une idée en peu de mots.</dd></div></dl>
    <button className="primary" onClick={() => go("lectures")}>Parcourir ma pile de livres</button>
  </>;
  if (page === "lectures") return <>
    <p className="lede">Les quatre titres que je garde sur mon bureau.</p>
    <ul className="books">{readings.map(([title, category]) =>
      <li key={title}><strong>{title}</strong><span>{category}</span></li>
    )}</ul>
  </>;
  if (page === "cafe") return <><div className="coffee-detail" aria-hidden="true"></div><p className="lede">Je suis un grand fan de café.</p></>;
  if (page === "apropos") return <><p className="lede">Moi, c’est Younes Atemani.</p><p>Mon bureau réunit ce que j’aime faire : organiser un projet, préparer un podcast et donner forme à des contenus. Chaque objet raconte une partie de ce travail.</p><button className="primary" onClick={() => go("projets")}>Découvrir mes projets</button></>;
  if (page === "contact") return <><p className="lede">Retrouvez-moi sur GitHub.</p><a className="primary" href="https://github.com/Atemani">Mon profil GitHub</a></>;
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
  return <dialog ref={dialog} aria-labelledby="panel-title" onCancel={event => { event.preventDefault(); close(); }}
    onClick={event => { if (event.target === dialog.current) {
      const bounds = dialog.current.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
    } }}>
    <div className="panel-bar">
      <span className="mono">{page === "index" ? "Sommaire" : "Dossier " + dossiers[page]}</span>
      <span className="panel-origin">{object?.secret ? "Secret découvert" : (object?.object || "Portfolio")}</span>
      <button className="close" onClick={close} aria-label="Fermer la fenêtre"><span className="close-label">Fermer</span><span aria-hidden="true">×</span></button>
    </div>
    <div className="panel-content">
      <h2 tabIndex="-1" id="panel-title" ref={heading}>{titles[page]}</h2>
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
    let center = 0.5;
    const remember = () => { center = (el.scrollLeft + el.clientWidth / 2) / el.scrollWidth; };
    const position = () => { el.scrollLeft = center * el.scrollWidth - el.clientWidth / 2; };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(el);
    observer.observe(scene.current);
    el.addEventListener("scroll", remember, { passive: true });
    return () => { observer.disconnect(); el.removeEventListener("scroll", remember); };
  }, []);
  return <>
    <section className="viewport" ref={viewport} aria-label="Bureau interactif, défilement horizontal si nécessaire" tabIndex="0">
      <div className="scene" ref={scene}>
        <img src="/images/atelier.webp" width="1671" height="941" alt="Bureau éclairé par une lampe ambrée. À gauche, un micro et un portable. Au centre, un écran et une tasse. À droite, des livres, un carnet et un casque." fetchPriority="high" />
        {objects.map(item => <button key={item.id} data-object={item.id} onClick={() => go(item.id)}
          aria-label={item.secret ? "Explorer : " + item.object : item.object + " — " + item.title}
          className={["hotspot", item.secret ? "secret" : "", found.has(item.id) ? "found" : "", item.x > 88 ? "right" : ""].join(" ")}
          style={{ left: item.x + "%", top: item.y + "%", width: item.w + "%", height: item.h + "%" }}>
          {!item.secret && <span className="tag" aria-hidden="true"><small>{dossiers[item.id]}</small>{item.label}</span>}
        </button>)}
      </div>
    </section>
    <span className="swipe-hint" aria-hidden="true">Faites glisser le bureau</span>
    <div className="editorial">
      <div className="intro">
        <h1>DES IDÉES. <span>DU CONCRET.</span></h1>
        <p>Stratégie, communication, création digitale et automatisation.</p>
      </div>
      <div className="explore">
        <p className="explore-hint">Les objets racontent le parcours.</p>
        <button className="index-button" onClick={() => go("index")}>Explorer les objets</button>
        <span className="count" aria-live="polite"><i aria-hidden="true"></i> Secrets découverts <b>{found.size} / {secrets.length}</b></span>
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
      <nav aria-label="Navigation principale">{Object.entries(sections).map(([id, name]) =>
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
