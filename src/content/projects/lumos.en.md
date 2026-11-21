---
title: "LUMOS - Modular Optical Simulator"
description: "End-to-end optical simulator, from the scene to the detected data, with a web interface and control of real instruments"
start-date: 2026-10-16
tags: ["Simulation", "Software", "Physics", "Astro", "Personal", "Instrumentation"]
image: "/images/projects/LUMOS.webp"
url: "https://lumos.vincent.foriel.pro"
featured: false
locale: en
---

LUMOS (*Lumos is a Universal and Modular Optical Simulator & Operating System*) is an optical simulator I develop alongside my PhD. It simulates light end to end, from a scene (astronomical, terrestrial or laboratory) to the detected data, through any optical system. The same object model also drives real equipment on an optical bench, so a measurement can be compared directly with its simulation.

## Features

- Building an optical system by connecting blocks (sources, telescopes, atmosphere, fibres, photonic chips, coronagraphs, detectors...) in a web interface
- Ready-made presets: adaptive optics, Bracewell nuller, kernel-nuller, vortex coronagraph, debris disk
- Parameter studies and Monte-Carlo draws, with archived results
- Control of real instruments and data processing pipelines
- Usable from Python (`pip install lumos-maxima`), from the browser, or by an assistant through an MCP server

## Technologies

Python, NumPy, JAX, Astropy, React, MCP

## Status

LUMOS is still in early development (pre-alpha), but a public instance is online to try it directly in the browser. It takes over from my first optical simulation tools.
