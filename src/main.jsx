import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { objects, practices, projects, readings } from "./content.js";
import "./style.css";

const sections = { projets: "Projets", competences: "Compétences", apropos: "À propos", contact: "Contact" };
const titles = { ...Object.fromEntries(objects.map(item => [item.id, item.title])), apropos: "À propos", contact: "Contact" };
const secrets = objects.filter(item => item.secret);
const readRoute = () => {
  const key = window.location.hash.slice(1);
  return Object.hasOwn(titles, key) ? key : null;
};

function PanelBody({ page, go }) {
  if (page === "projets") return <>
    <p className="lede">Quatre projets de mon portfolio.</p>
    <ul className="projects">{projects.map((name, i) =>
      <li key={name}><span className={"monogram mark-" + i} aria-hidden="true">{["L&L", "D.", "D8", "M/A"][i]}</span><strong>{name}</strong></li>
    )}</ul>
  </>;
  if (page === "competences") return <>
    <p className="lede">De la première note dans un carnet au contenu prêt à diffuser.</p>
    <div className="choices">{["strategie", "podcast", "creation"].map(id =>
      <button key={id} onClick={() => go(id)}><span>{titles[id]}</span><span aria-hidden="true">↗</span></button>
    )}</div>
  </>;
  if (practices[page]) return <>
    <p className="lede">{practices[page].intro}</p>
    <dl>{practices[page].steps.map(([title, copy]) =>
      <div key={title}><dt>{title}</dt><dd>{copy}</dd></div>
    )}</dl>
    <button className="text-link" onClick={() => go("competences")}>← Toutes les compétences</button>
  </>;
  if (page === "lectures") return <>
    <p className="lede">Les quatre titres que je garde sur mon bureau.</p>
    <ul className="books">{readings.map(([title, category]) =>
      <li key={title}><strong>{title}</strong><span>{category}</span></li>
    )}</ul>
  </>;
  if (page === "cafe") return <><div className="coffee-art" aria-hidden="true">☕</div><p className="lede">Je suis un grand fan de café.</p><p>Vous avez trouvé la pause café du bureau.</p></>;
  if (page === "billet") return <><div className="ticket"><span>Carte d’embarquement</span><strong>Maroc <i aria-hidden="true">✈</i></strong></div><p className="lede">Un billet d’avion se cachait dans le petit coffre.</p></>;
  if (page === "apropos") return <><p className="lede">Moi, c’est Younes Atemani.</p><p>Mon bureau réunit ce que j’aime faire : organiser un projet, préparer un podcast et donner forme à des contenus. Chaque objet raconte une partie de ce travail.</p><button className="primary" onClick={() => go("projets")}>Découvrir mes projets <span aria-hidden="true">↗</span></button></>;
  if (page === "contact") return <><p className="lede">Retrouvez-moi sur GitHub.</p><a className="primary" href="https://github.com/Atemani">Mon profil GitHub <span aria-hidden="true">↗</span></a></>;
  return null;
}

function Panel({ page, go, close }) {
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
      <span className="mono">{object?.secret ? "Secret découvert" : (object?.object || "Le bureau")}</span>
      <button className="close" onClick={close} aria-label="Fermer la fenêtre">×</button>
    </div>
    <div className="panel-content">
      <h2 tabIndex="-1" id="panel-title" ref={heading}>{titles[page]}</h2>
      <PanelBody page={page} go={go} />
    </div>
  </dialog>;
}

function Desk({ go, found }) {
  const viewport = useRef(null);
  useEffect(() => {
    const el = viewport.current;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);
  return <section className="desk" aria-label="Bureau interactif">
    <div className="viewport" ref={viewport} role="region" aria-label="Décor du bureau, défilement horizontal sur mobile" tabIndex="0">
      <div className="scene">
        <img src="/images/bureau.jpg" width="1672" height="941" alt="Un bureau éclairé par une lampe, avec deux écrans, un microphone et des objets à explorer." fetchPriority="high" />
        {objects.map(item => <button key={item.id} onClick={() => go(item.id)}
          aria-label={item.secret ? "Explorer l’objet : " + item.object : item.object + " — " + item.title}
          className={["hotspot", item.label ? "labelled" : "", item.secret ? "secret" : "", found.has(item.id) ? "found" : "", item.x > 89 ? "right" : ""].join(" ")}
          style={{ left: item.x + "%", top: item.y + "%", width: item.w + "%", height: item.h + "%" }}>
          <span className="pin" aria-hidden="true">{item.secret ? (found.has(item.id) ? "✓" : "•") : "+"}</span>
          <span className="tag" aria-hidden="true">{item.secret ? item.object : item.title}</span>
        </button>)}
      </div>
    </div>
    <div className="caption">
      <span><b className="legend-dot"></b> Objet à explorer</span>
      <span aria-live="polite"><b className="legend-dot gold"></b> Secrets découverts <strong>{found.size}/{secrets.length}</strong></span>
    </div>
    <details className="index"><summary>Index des objets<span aria-hidden="true">⌄</span></summary>
      <div className="index-grid">{objects.map(item =>
        <button key={item.id} onClick={() => go(item.id)}><small>{item.object}</small><span>{item.secret && !found.has(item.id) ? "Découvrir le secret" : item.title} ↗</span></button>
      )}</div>
    </details>
  </section>;
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
      <a className="identity" href="./"><span className="brand" aria-hidden="true">ya.</span> Younes Atemani</a>
      <nav aria-label="Navigation principale">{Object.entries(sections).map(([id, name]) =>
        <button className={id === "contact" ? "contact" : ""} key={id} onClick={() => go(id)}>{name}{id === "contact" && <span aria-hidden="true"> ↗</span>}</button>
      )}</nav>
    </div></header>
    <main className="shell" id="principal">
      <div className="intro"><div><p className="kicker"><span></span> Portfolio interactif</p>
        <h1>Le bureau <em>de Younes.</em></h1></div>
        <p className="instruction">Explorez les objets de mon bureau pour découvrir mes projets, mes compétences et quelques secrets.</p>
      </div>
      <p className="pan-hint">Faites glisser le bureau pour l’explorer <span aria-hidden="true">↔</span></p>
      <Desk go={go} found={found} />
    </main>
    {page && <Panel page={page} go={go} close={close} />}
  </>;
}

createRoot(document.getElementById("root")).render(<App />);
