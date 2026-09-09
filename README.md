# Excalidraw, But You're the Engineer! 🎨

Welcome to my custom-built HTML5 Canvas drawing application! This is my submission for **Challenge 02** of the Codenex recruitment process. 

## 🚀 The Highlighting Feature
The absolute best "out of the box" feature I built for this project is the **Seamless Canvas Resizing with State Retention**. 

Usually, when you resize a browser window containing an HTML5 `<canvas>`, the canvas completely wipes its memory and you lose your entire drawing. I engineered a custom React `useEffect` listener that uses a hidden, in-memory ghost canvas. Every time you resize the window, it instantly snaps a screenshot of your drawing, resizes the canvas to perfectly fit your new window dimensions, and then redraws your art back onto the screen instantly. You never lose your work!

## Features
* Draw with custom brush colors and brush sizes (ranging from 1px to 50px).
* Erase mistakes using the dedicated eraser tool.
* Clear the entire board with one click.
* Download your masterpiece directly as a `.png` file.
* Full touch support for mobile devices!

## Tech Stack
* **Next.js (App Router)**
* **React Hooks (useState, useRef, useEffect)**
* **Tailwind CSS v4**
* **Lucide React Icons**
* **HTML5 Canvas API**

I built this completely from scratch to prove I can handle core browser APIs as well as modern frameworks!
