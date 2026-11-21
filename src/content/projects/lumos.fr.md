---
title: "LUMOS - Simulateur optique modulaire"
description: "Simulateur optique de bout en bout, de la scène jusqu'aux données détectées, avec une interface web et le pilotage de vrais instruments"
start-date: 2026-10-16
tags: ["Simulation", "Software", "Physique", "Astro", "Personnel", "Instrumentation"]
image: "/images/projects/LUMOS.webp"
url: "https://lumos.vincent.foriel.pro"
featured: false
locale: fr
---

LUMOS (*Lumos is a Universal and Modular Optical Simulator & Operating System*) est un simulateur optique que je développe à côté de ma thèse. Il simule la lumière de bout en bout, depuis une scène (astronomique, terrestre ou de laboratoire) jusqu'aux données détectées, en passant par n'importe quel système optique. Le même modèle d'objets sert aussi à piloter du vrai matériel sur un banc, si bien qu'on peut comparer directement une mesure à sa simulation.

## Fonctionnalités

- Construction d'un système optique en reliant des blocs (sources, télescopes, atmosphère, fibres, puces photoniques, coronographes, détecteurs...) dans une interface web
- Préréglages prêts à l'emploi : optique adaptative, nuller de Bracewell, kernel-nuller, coronographe vortex, disque de débris
- Études paramétriques et tirages Monte-Carlo, avec archivage des résultats
- Pilotage d'instruments réels et chaînes de traitement des données
- Utilisable depuis Python (`pip install lumos-maxima`), depuis le navigateur, ou par un assistant via un serveur MCP

## Technologies

Python, NumPy, JAX, Astropy, React, MCP

## État

LUMOS est encore en développement (pré-alpha), mais une instance publique est en ligne pour l'essayer directement dans le navigateur. Il prend la suite de mes premiers outils de simulation optique.
