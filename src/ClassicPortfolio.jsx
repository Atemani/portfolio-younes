import React, { useEffect } from "react";
import { caseStudies, practices, skills } from "./content.js";
import "./classic-portfolio.css";

// Une vue autonome qui réutilise les contenus documentés du bureau interactif.
// Les projets académiques seront enrichis après sélection des sources publiables.
const timeline = [
  { year: "2018 — 2020", title: "Les bases techniques", description: "BTS SIO, option SLAM : programmation, logique applicative, frameworks et premières intégrations." },
  { year: "2021 — 2023", title: "Digital & marketing", description: "Bachelor à l’IIM Digital School : conception de projets, marketing digital et réflexion stratégique." },
  { year: "2022 — 2023", title: "Conception produit", description: "Alternance chez Dynam8 Services : UX/UI sur Adobe XD et prototype d’application automobile." },
  { year: "2023", title: "Création & contenu", description: "Création du micro-média MochiAuto et réalisation de supports graphiques, notamment pour des restaurants." },
  { year: "2024 — 2026", title: "Communication & pilotage", description: "Mastère en communication et stratégie digitale, gestion de projets, coordination et expériences en entreprise." },
  { year: "Depuis 2026", title: "Projets & indépendance", description: "Développement de solutions digitales, production de contenus et automatisations assistées par IA." }
];

const lab = [
  { no: "A", title: "Créations graphiques", kind: "Supports réalisés", copy: "Menus conçus pour La Dolce Vita et Pizza & Love, ainsi que d’autres créations graphiques." },
  { no: "B", title: "Campagnes & concepts", kind: "Projets académiques", copy: "Travaux de communication et de marketing imaginés dans le cadre de mes études. Une sélection visuelle sera ajoutée progressivement." },
  { no: "C", title: "Idées & prototypes", kind: "Explorations", copy: "Maquettes et propositions permettant de concrétiser une idée, même lorsqu’elle n’a pas donné lieu à un lancement commercial." }
];

function Dossier({ item, index }) {
  return <details className="cp-dossier" id={"projet-" + item.id}>
    <summary>
      <span className="cp-no">0{index + 1}</span>
      <span className="cp-project-heading">
        <span className="cp-tag">{item.category}</span>
        <strong>{item.name}</strong>
        <span className="cp-project-intro">{item.summary}</span>
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

export default function ClassicPortfolio() {
  useEffect(() => {
    document.title = "Younes Atemani — Projets, parcours & savoir-faire";
    return () => { document.title = "Le bureau de Younes Atemani — Portfolio"; };
  }, []);

  return <div className="classic-portfolio" id="haut">
    <a className="cp-skip" href="#contenu-classique">Aller au contenu</a>
    <header className="cp-header">
      <a className="cp-identity" href="/portfolio" aria-label="Accueil du portfolio à parcourir"><span>YA.</span><small>Younes Atemani</small></a>
      <nav className="cp-nav" aria-label="Navigation de la version à parcourir">
        <a href="#realisations">Réalisations</a>
        <a href="#labo">Labo créatif</a>
        <a href="#parcours">Parcours</a>
        <a href="#savoir-faire">Savoir-faire</a>
      </nav>
      <a className="cp-switch" href="/">EXPLORER <span aria-hidden="true">↗</span></a>
    </header>
    <main className="cp-main" id="contenu-classique">
      <section className="cp-hero" aria-labelledby="cp-title">
        <div className="cp-hero-lines" aria-hidden="true"></div>
        <p className="cp-eyebrow">PORTFOLIO / VERSION À PARCOURIR</p>
        <h1 id="cp-title">DES IDÉES.<span>DU CONCRET.</span></h1>
        <p className="cp-lead">Je donne vie aux idées à travers le digital, la création et la stratégie.</p>
        <div className="cp-hero-footer">
          <a className="cp-action" href="#realisations">DÉCOUVRIR MES PROJETS ↓</a>
          <p>Une autre façon de découvrir mon travail, étape par étape.</p>
        </div>
      </section>

      <section className="cp-section" id="realisations">
        <div className="cp-section-heading"><span className="cp-numeral">01 /</span><div><p className="cp-eyebrow">EXPÉRIENCES ET RÉALISATIONS</p><h2>CE QUE J'AI FAIT.</h2></div></div>
        <p className="cp-section-intro">Des projets professionnels et personnels sur lesquels j'ai réellement travaillé. Chaque dossier raconte le contexte, mes interventions et le résultat.</p>
        <div className="cp-dossiers">{caseStudies.map((item,i)=><Dossier key={item.id} item={item} index={i}/>)}</div>
      </section>

      <section className="cp-section cp-lab" id="labo">
        <div className="cp-section-heading"><span className="cp-numeral">02 /</span><div><p className="cp-eyebrow">IDÉES, ESSAIS ET PROJETS D'ÉCOLE</p><h2>LE LABO CRÉATIF.</h2></div></div>
        <p className="cp-section-intro">Tous les projets ne sont pas des commandes clients. Certains servent à imaginer, expérimenter ou apprendre : ils ont aussi leur place ici, avec leur véritable contexte.</p>
        <div className="cp-lab-grid">{lab.map(item=><article key={item.no} className="cp-lab-card">
          <span className="cp-lab-no">{item.no} / CONCEPT</span>
          <p className="cp-tag">{item.kind}</p>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>)}</div>
      </section>

      <section className="cp-section" id="parcours">
        <div className="cp-section-heading"><span className="cp-numeral">03 /</span><div><p className="cp-eyebrow">D'OÙ JE VIENS</p><h2>MON PARCOURS.</h2></div></div>
        <p className="cp-section-intro">Du développement informatique à la communication, en passant par la stratégie et la création : un parcours qui explique ma façon de relier les disciplines.</p>
        <ol className="cp-timeline">{timeline.map((step,i)=><li key={i}><span className="cp-time">{step.year}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
      </section>

      <section className="cp-section" id="savoir-faire">
        <div className="cp-section-heading"><span className="cp-numeral">04 /</span><div><p className="cp-eyebrow">DES COMPÉTENCES À METTRE AU SERVICE D'UN PROJET</p><h2>CE QUE JE PEUX FAIRE.</h2></div></div>
        <p className="cp-section-intro">Des compétences complémentaires pour concevoir, produire, coordonner et faire avancer des projets digitaux.</p>
        <div className="cp-skills">{skills.map(([id,name],i)=><details key={id}>
          <summary><span className="cp-no">0{i+1}</span><strong>{name}</strong><span aria-hidden="true">+</span></summary>
          <div className="cp-skill-body"><p>{practices[id]?.intro}</p><ul>{practices[id]?.steps.map(([title,copy])=><li key={title}><b>{title}</b><span>{copy}</span></li>)}</ul></div>
        </details>)}</div>
      </section>

      <section className="cp-contact" id="contact">
        <p className="cp-eyebrow">05 / ET MAINTENANT ?</p>
        <h2>ON EN PARLE ?</h2>
        <p>Une mission, une collaboration ou un projet à imaginer ? Je suis ouvert aux échanges autour du digital, de la création et de la stratégie.</p>
        <a className="cp-action" href="https://github.com/Atemani" target="_blank" rel="noopener noreferrer">RETROUVER MON PROFIL ↗</a>
      </section>
    </main>
    <footer className="cp-footer"><span>YOUNES ATEMANI / PORTFOLIO</span><a href="/">EXPLORER LE BUREAU ↗</a><a href="#haut">REMONTER ↑</a></footer>
  </div>;
}
