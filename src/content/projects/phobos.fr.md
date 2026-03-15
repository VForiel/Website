---
title: "PHOBos - Contrôle du banc optique"
description: "Système Python complet pour le pilotage et l'automatisation du banc de test kernel-nulling en photonique intégrée"
start-date: 2024-03-01
tags: ["Informatique", "Instrumentation", "Physique", "Open Source"]
image: "/images/projects/PHOBos.png"
url: "https://phob.readthedocs.io/"
featured: true
locale: fr
---

PHOBos (**PH**otonics **B**ench **O**perating **S**ystem) est un logiciel Python développé dans le cadre de ma thèse pour piloter l'ensemble des équipements du banc de test d'interférométrie kernel-nulling du laboratoire Lagrange (Observatoire de la Côte d'Azur).

## Contexte

Le banc optique PHOTONICS est un instrument de laboratoire qui reproduit à petite échelle le fonctionnement d'un interféromètre stellaire. Il permet de tester et valider expérimentalement les techniques de kernel-nulling sur des composants photoniques intégrés, avant leur déploiement sur un véritable télescope.

## Équipements pilotés

PHOBos fournit une interface Python unifiée pour contrôler :

- **Miroir déformable (BMC)** — Contrôle du front d'onde et simulation de turbulence atmosphérique
- **Caméra C-RED3** — Acquisition haute cadence des données interférométriques
- **Roue à filtres (Thorlabs)** — Sélection spectrale automatisée
- **Masque pupillaire** — Configuration de l'array de télescopes
- **Puce photonique** — Pilotage des thermo-déphaseurs (TOPs) pour le kernel-nulling ajustable
- **Moteurs (Newport/Zaber)** — Positionnement mécanique de précision

## Architecture

Le logiciel adopte une architecture modulaire avec abstraction matérielle, permettant un **mode sandbox** qui simule automatiquement les composants absents via des interfaces mock. Cela rend le développement et les tests possibles sans accès au matériel du laboratoire.

## Technologies

Python, NumPy, PySerial, Sphinx, BMC SDK

## Impact

PHOBos est l'outil expérimental central de ma thèse, permettant l'acquisition des données de caractérisation des puces photoniques et la validation expérimentale du kernel-nulling ajustable.
