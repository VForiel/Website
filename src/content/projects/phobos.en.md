---
title: "PHOBos - Optical Bench Control"
description: "Complete Python system for the control and automation of a kernel-nulling test bench in integrated photonics"
start-date: 2024-03-01
tags: ["Computer Science", "Instrumentation", "Physics", "Open Source"]
image: "/images/projects/IA_PHOBos.png"
url: "https://phob.readthedocs.io/"
featured: true
locale: en
---

PHOBos (**PH**otonics **B**ench **O**perating **S**ystem) is a Python software developed as part of my PhD to control all the equipment on the kernel-nulling interferometry test bench at the Lagrange laboratory (Côte d'Azur Observatory).

## Context

The PHOTONICS optical bench is a laboratory instrument that reproduces on a small scale the operation of a stellar interferometer. It enables the experimental testing and validation of kernel-nulling techniques on integrated photonic components, before their deployment on a real telescope.

## Controlled Equipment

PHOBos provides a unified Python interface to control:

- **Deformable Mirror (BMC)** — Wavefront control and atmospheric turbulence simulation
- **C-RED3 Camera** — High-speed acquisition of interferometric data
- **Filter Wheel (Thorlabs)** — Automated spectral selection
- **Pupil Mask** — Telescope array configuration
- **Photonic Chip** — Thermal phase shifters (TOPs) control for tunable kernel-nulling
- **Motors (Newport/Zaber)** — Precision mechanical positioning

## Architecture

The software adopts a modular architecture with hardware abstraction, enabling a **sandbox mode** that automatically simulates missing components via mock interfaces. This makes development and testing possible without access to the laboratory hardware.

## Technologies

Python, NumPy, PySerial, Sphinx, BMC SDK

## Impact

PHOBos is the central experimental tool of my PhD, enabling the acquisition of photonic chip characterization data and the experimental validation of tunable kernel-nulling.
