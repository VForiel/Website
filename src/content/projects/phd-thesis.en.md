---
title: "PhD — Tunable Kernel-Nulling for Exoplanet Imaging"
description: "Doctoral research on the theoretical and experimental development of tunable kernel-nulling for direct exoplanet detection via photonic interferometry"
start-date: 2023-11-01
tags: ["Research", "Physics", "Astrophotonics", "Instrumentation"]
image: "/images/projects/IA_PhD-Thesis.png"
featured: true
locale: en
---

My PhD thesis, conducted at the Lagrange laboratory (Côte d'Azur Observatory) under the supervision of Frantz Martinache and David Mary, focuses on the development of **Tunable Kernel Nulling**, a robust interferometric technique for the direct detection of exoplanets.

## The Challenge

Directly detecting an exoplanet requires distinguishing its faint light from the blinding glare of its host star — a challenge comparable to spotting a firefly in front of a lighthouse from kilometers away. Contrast ratios reach 10⁻⁶ to 10⁻¹⁰, making classical techniques insufficient against instrumental and atmospheric perturbations.

## Approach: Kernel Nulling

Kernel nulling, proposed by Martinache & Ireland (2018), leverages phase closure properties applied to nulling interferometry. By forming linear combinations of the output intensities of a beam combiner, one obtains observables that are **robust to second-order phase errors** — a major improvement over classical nulling, which is limited to first order.

My contribution extends this concept by making it **tunable**: using thermal phase shifters integrated on photonic chips, the combiner's transfer matrix can be optimized in real time to adapt to observing conditions, calibrate fabrication errors, and maximize sensitivity.

## Thesis Pillars

### Theory & Simulation — PHISE
Development of [PHISE](https://phise.readthedocs.io/) (PHotonic Interferometric Simulation for Exoplanets), a Python end-to-end simulation framework for photonic interferometric instruments. PHISE models the complete chain from the astrophysical scene (stars, exoplanets) to the detected signal, including coherent propagation through photonic components (MMI, phase shifters, couplers).

### Experimentation — PHOBos
Development of [PHOBos](https://phob.readthedocs.io/) (Photonics Bench Operating System), the control software for the PHOTONICS optical bench. This bench reproduces a complete stellar interferometer at laboratory scale, enabling the characterization of photonic chips and the experimental validation of theoretical predictions.

### Scientific Results
- Transfer matrix characterization of 4×4 MMI beam combiners
- Experimental demonstration of kernel-nulling on the bench
- Statistical analysis of null stability and detection performance
- Thermal phase shifter calibration studies

## Publications

- **4×4 MMI Characterization** — Paper in preparation for Astronomy & Astrophysics
- **Calibration of 14 TOPs** — Paper in preparation
- **Test Statistics for Kernel Nulling** — Collaborative paper

## Technologies

Python, LaTeX, NumPy, SciPy, Numba, Astropy, Matplotlib
