import React, { useEffect, useRef } from "react";
import { caseStudies, practices, skills } from "./content.js";
import { toolGroups } from "./tool-stack.js";
import { whatsappContact } from "./contact.js";
import "./classic-portfolio.css";
import ProjectLogosMarquee from "./ProjectLogosMarquee.jsx";

// Version à parcourir : une expérience éditoriale indépendante du bureau.
const timeline = [
  { year: "2018 — 2020", title: "Les bases techniques", description: "BTS SIO, option SLAM : programmation, logique applicative, frameworks et premières intégrations." },
  { year: "2021 — 2023", title: "Digital & marketing", description: "Bachelor à l’IIM Digital School : conception de projets, marketing digital et réflexion stratégique." },
  { year: "2022 — 2023", title: "Conception produit", description: "Alternance chez Dynam8 Services : UX/UI sur Adobe XD et prototype d’application automobile." },
  { year: "2023", title: "Création & contenu", description: "Création du micro-média MochiAuto et réalisation de supports graphiques, notamment pour des restaurants." },
  { year: "2024 — 2026", title: "Communication & pilotage", description: "Mastère en communication et stratégie digitale, gestion de projets, coordination et expériences en entreprise." },
  { year: "Depuis 2026", title: "Projets & indépendance", description: "Développement de solutions digitales, production de contenus et automatisations assistées par IA." }
];

const lab = [
  { no: "01", title: "Créations graphiques", kind: "Supports réalisés", copy: "Menus conçus pour La Dolce Vita et Pizza & Love, ainsi que d’autres créations graphiques." },
  { no: "02", title: "Campagnes & concepts", kind: "Projets académiques", copy: "Travaux de communication et de marketing imaginés dans le cadre de mes études. Une sélection visuelle sera ajoutée progressivement." },
  { no: "03", title: "Idées & prototypes", kind: "Explorations", copy: "Maquettes et propositions permettant de concrétiser une idée, même lorsqu’elle n’a pas donné lieu à un lancement commercial." }
];

function Dossier({ item, index }) {
  return <details className="cp-dossier" id={"projet-" + item.id}>
    <summary>
      <span className="cp-no">0{index + 1}</span>
      <span className="cp-project-heading">
        <strong>{item.name}</strong>
        <span className="cp-project-intro">{item.summary}</span>
        <span className="cp-project-category">{item.category}</span>
      </span>
      <span className="cp-open" aria-hidden="true">↗</span>
    </summary>
    <div className="cp-project-detail">
      <span className="cp-meta">{item.period}</span>
      {item.metrics && <div className="cp-kpis">{item.metrics.map(([value,label])=><div key={label}><b>{value}</b><span>{label}</span></div>)}</div>}
      <div className="cp-detail-section"><h4>Le contexte</h4><p>{item.context}</p></div>
      <div className="cp-detail-section"><h4>Mon rôle</h4><p>{item.role}</p></div>
      <div className="cp-detail-section"><h4>Ce que j'ai réalisé</h4>
        <ul>{item.actions.map(([name,description])=><li key={name}><strong>{name}</strong><p>{description}</p></li>)}</ul>
      </div>
      <div className="cp-detail-section"><h4>Le résultat</h4><p>{item.result}</p></div>
      {item.url && <a className="cp-outbound" href={item.url} target="_blank" rel="noopener noreferrer">Voir le site du projet ↗</a>}
    </div>
  </details>;
}

function ToolMarquee({ group, index }) {
  return <section className="cp-tool-group" aria-labelledby={"cp-tool-" + group.id}>
    <div className="cp-tool-heading">
      <h3 id={"cp-tool-" + group.id}>{group.title}</h3>
      <span>{String(group.tools.length).padStart(2, "0")} OUTILS</span>
    </div>
    <div className={"cp-marquee-window " + (index % 2 ? "reverse" : "")} tabIndex="0" aria-label={"Outils : " + group.title}>
      <div className="cp-marquee-track">
        {[0,1].map(duplicate => <div className="cp-marquee-sequence" key={duplicate} aria-hidden={duplicate === 1 ? "true" : undefined}>
          {group.tools.map(tool => <div className="cp-tool-item" key={tool.name}>
            <img src={"/brand-logos/" + tool.icon + ".svg"} alt={duplicate === 0 ? "Logo " + tool.name : ""} width="72" height="72" loading="lazy" decoding="async" />
            <span>{tool.name}</span>
          </div>)}
        </div>)}
      </div>
    </div>
  </section>;
}

export default function ClassicPortfolio() {
  const mobileMenu = useRef(null);
  useEffect(() => {
    const dismiss = event => {
      const menu = mobileMenu.current;
      if (menu?.open && !menu.contains(event.target)) menu.open = false;
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  useEffect(() => {
    document.title = "Younes Atemani — Projets, parcours & savoir-faire";
    // Les ancres directes restent utilisables même après le rendu React.
    const target = decodeURIComponent(window.location.hash.slice(1));
    if (target) requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView());
    return () => { document.title = "Le bureau de Younes Atemani — Portfolio"; };
  }, []);

  return <div className="classic-portfolio" id="haut">
    <a className="cp-skip" href="#contenu-classique">Aller au contenu</a>
    <header className="cp-header">
      <a className="cp-identity" href="/portfolio" aria-label="Accueil de la version à parcourir"><span>YA.</span><small>Younes Atemani</small></a>
      <nav className="cp-nav" aria-label="Navigation de la version à parcourir">
        <a href="#realisations">Projets</a>
        <a href="#labo">Labo</a>
        <a href="#parcours">Parcours</a>
        <a href="#savoir-faire">Savoir-faire</a>
        <a href="#outils">Outils</a>
      </nav>
      <a className="cp-switch" href="/">EXPLORER <span aria-hidden="true">↗</span></a>
      <details className="cp-mobile-menu" ref={mobileMenu} onKeyDown={event => {
        if (event.key === "Escape") {
          event.preventDefault();
          mobileMenu.current.open = false;
          mobileMenu.current.querySelector("summary").focus();
        }
      }}>
        <summary>Menu</summary>
        <nav className="cp-mobile-nav" aria-label="Navigation mobile de la version à parcourir" onClick={event => {
          if (event.target.closest("a")) mobileMenu.current.open = false;
        }}>
          <a href="#realisations">Projets</a>
          <a href="#labo">Labo</a>
          <a href="#parcours">Parcours</a>
          <a href="#savoir-faire">Savoir-faire</a>
          <a href="#outils">Outils</a>
          <a href="#contact">Contact</a>
        </nav>
      </details>
    </header>
    <main className="cp-main" id="contenu-classique">
      <section className="cp-hero" aria-labelledby="cp-title">
        <div className="cp-hero-top"><span>PORTFOLIO / 2026</span><span>STRATÉGIE · DIGITAL · CRÉATION</span></div>
        <h1 id="cp-title"><span>J'AIME</span><span>CRÉER.</span></h1>
        <div className="cp-hero-stripe"><span>ENCORE PLUS</span> <em>APPRENDRE.</em></div>
        <div className="cp-hero-bottom">
          <p>Je donne vie aux idées à travers le digital, la création et la stratégie.</p>
          <a href="#realisations">VOIR MES PROJETS <span aria-hidden="true">↓</span></a>
        </div>
        <span className="cp-hero-stamp" aria-hidden="true">Y.A / <b>2026</b></span>
      </section>

      <ProjectLogosMarquee />

      <section className="cp-work cp-block" id="realisations" aria-labelledby="cp-work-title">
        <div className="cp-work-layout">
          <div className="cp-side-label"><span>01 — EXPÉRIENCES</span><p>Ce que j'ai construit, coordonné et produit.</p></div>
          <div className="cp-work-main">
            <h2 id="cp-work-title"><span>CE QUE</span> J'AI <i>FAIT.</i></h2>
            <p className="cp-work-intro">Quatre projets, quatre terrains d'expérimentation. Ouvre un dossier pour découvrir mon rôle, mes actions et ce qui en est sorti.</p>
            <div className="cp-dossiers">{caseStudies.map((item, i) => <Dossier item={item} index={i} key={item.id}/>)}</div>
          </div>
        </div>
      </section>

      <section className="cp-lab cp-block" id="labo" aria-labelledby="cp-lab-title">
        <span className="cp-section-index">02 / EN DEHORS DES CASES</span>
        <h2 id="cp-lab-title">CE QUE J'AI<br/><em>IMAGINÉ.</em></h2>
        <p className="cp-lab-intro">Tout ne finit pas par devenir un produit ou une mission client. Les projets d'école, les essais et les idées méritent aussi leur place.</p>
        <div className="cp-lab-list">{lab.map(item => <article key={item.no} className="cp-lab-item">
          <span className="cp-lab-no">{item.no}</span>
          <div><span className="cp-lab-kind">{item.kind}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
          <span className="cp-lab-cross" aria-hidden="true">✳</span>
        </article>)}</div>
      </section>

      <section className="cp-journey cp-block" id="parcours" aria-labelledby="cp-journey-title">
        <div className="cp-journey-lead"><span>03 / DEPUIS 2018</span><h2 id="cp-journey-title">UN PARCOURS<br/>PAS VRAIMENT<br/><em>LINÉAIRE.</em></h2></div>
        <ol className="cp-timeline">{timeline.map((step,i) => <li key={i}>
          <span className="cp-time">{step.year}</span>
          <div><h3>{step.title}</h3><p>{step.description}</p></div>
        </li>)}</ol>
      </section>

      <section className="cp-skills-section cp-block" id="savoir-faire" aria-labelledby="cp-skills-title">
        <div className="cp-skills-heading"><span>04 / PRESTATIONS ET SAVOIR-FAIRE</span><h2 id="cp-skills-title">JE PEUX<br/><em>FAIRE QUOI ?</em></h2>
          <p>Des compétences qui se croisent pour faire avancer les projets. Choisis un domaine pour voir plus précisément ce que je peux réaliser.</p></div>
        <div className="cp-skills">{skills.map(([id,name],i) => <details key={id}>
          <summary><span className="cp-no">0{i+1}</span><strong>{name}</strong><span className="cp-skill-plus" aria-hidden="true">+</span></summary>
          <div className="cp-skill-body"><p>{practices[id]?.intro}</p><ul>{practices[id]?.steps.map(([title,copy]) => <li key={title}><b>{title}</b><span>{copy}</span></li>)}</ul></div>
        </details>)}</div>
      </section>

      <section className="cp-tools cp-block" id="outils" aria-labelledby="cp-tools-title">
        <div className="cp-tools-titleline"><span>05 / MON ÉCOSYSTÈME</span><h2 id="cp-tools-title">LES OUTILS<br/>QUE J'UTILISE<span>.</span></h2></div>
        <p className="cp-tools-intro">Des outils différents selon les projets. Voici ceux qui accompagnent mon travail, de la création à la production et à l'automatisation.</p>
        <div className="cp-tool-groups">{toolGroups.map((group, index) => <ToolMarquee group={group} index={index} key={group.id}/>)}</div>
        <p className="cp-tool-footnote">28 outils regroupés en quatre univers. Les logos sont présentés ici pour illustrer mon environnement de travail, sans revendication de certification par ces marques.</p>
      </section>

      <section className="cp-contact cp-block" id="contact">
        <span>06 / LA SUITE S'ÉCRIT ENSEMBLE</span>
        <h2>ON EN<br/><em>PARLE ?</em></h2>
        <div className="cp-contact-bottom"><p>Une mission, une collaboration ou une idée à construire ? Je suis ouvert aux échanges autour du digital, de la création et de la stratégie. Contact direct : {whatsappContact.display}.</p>
          <a href={whatsappContact.url} target="_blank" rel="noopener noreferrer" aria-label={"M’écrire sur WhatsApp au " + whatsappContact.display}>M’ÉCRIRE SUR WHATSAPP <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
    <footer className="cp-footer"><span>YOUNES ATEMANI © 2026</span><a href="/">EXPLORER LE BUREAU ↗</a><a href="#haut">REMONTER ↑</a></footer>
  </div>;
}