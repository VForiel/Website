---
title: "Thèse — Kernel-Nulling Ajustable pour l'Imagerie d'Exoplanètes"
description: "Recherche doctorale sur le développement théorique et expérimental du kernel-nulling ajustable pour la détection directe d'exoplanètes par interférométrie photonique"
start-date: 2023-11-01
tags: ["Recherche", "Physique", "Astro", "Instrumentation", "Académique"]
image: "/images/projects/IA_PhD-Thesis.png"
featured: true
locale: fr
---

Ma thèse de doctorat, menée au laboratoire Lagrange (Observatoire de la Côte d'Azur) sous la direction de Frantz Martinache et David Mary, porte sur le développement du **Kernel-Nulling Ajustable** (*Tunable Kernel Nulling*), une technique interférométrique robuste pour la détection directe d'exoplanètes.

## Problématique

Pour détecter directement une exoplanète, il faut distinguer sa faible lumière de celle, éblouissante, de son étoile hôte — un défi comparable à repérer une luciole devant un phare, à des kilomètres de distance. Les rapports de contraste atteignent 10⁻⁶ à 10⁻¹⁰, rendant les techniques classiques insuffisantes face aux perturbations instrumentales et atmosphériques.

## Approche : le Kernel-Nulling

Le kernel-nulling, proposé par Martinache & Ireland (2018), exploite les propriétés de clôture de phase appliquées à l'interférométrie annulante. En formant des combinaisons linéaires des intensités de sortie d'un recombineur, on obtient des observables **robustes aux erreurs de phase au second ordre** — un gain majeur par rapport au nulling classique, limité au premier ordre.

Ma contribution étend ce concept en le rendant **ajustable** : grâce à des thermo-déphaseurs intégrés sur des puces photoniques, la matrice de transfert du recombineur peut être optimisée en temps réel pour s'adapter aux conditions d'observation, calibrer les erreurs de fabrication, et maximiser la sensibilité.

## Piliers de la thèse

### Théorie & Simulation — PHISE
Développement de [PHISE](https://phise.readthedocs.io/) (PHotonic Interferometric Simulation for Exoplanets), un framework Python de simulation end-to-end des instruments interférométriques photoniques. PHISE modélise la chaîne complète depuis la scène astrophysique (étoiles, exoplanètes) jusqu'au signal détecté, en passant par la propagation cohérente à travers les composants photoniques (MMI, déphaseurs, coupleurs).

### Expérimentation — PHOBos
Développement de [PHOBos](https://phob.readthedocs.io/) (Photonics Bench Operating System), le logiciel de contrôle du banc optique PHOTONICS. Ce banc reproduit à l'échelle du laboratoire un interféromètre stellaire complet, permettant la caractérisation de puces photoniques et la validation expérimentale des prédictions théoriques.

### Résultats scientifiques
- Caractérisation de la matrice de transfert de recombineurs MMI 4×4
- Démonstration expérimentale du kernel-nulling sur le banc
- Analyse statistique de la stabilité du null et des performances de détection
- Études de calibration des thermo-déphaseurs

## Publications

- **Caractérisation d'un MMI 4×4** — Article en cours de rédaction pour Astronomy & Astrophysics
- **Calibration de 14 TOPs** — Article en cours de rédaction
- **Statistiques de test pour le kernel-nulling** — Article en collaboration

## Technologies

Python, LaTeX, NumPy, SciPy, Numba, Astropy, Matplotlib
