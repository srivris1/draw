# Excalidraw Clone - Challenge 02 

Welcome to my custom-built HTML5 Canvas drawing application! This is my submission for **Challenge 02** of the Codenex recruitment process. I wanted to build this completely from scratch without relying on heavy third-party canvas libraries to demonstrate my grasp of core browser APIs.

## The Highlighting Feature (Out of the Box)
The absolute best "out of the box" feature I built for this project is the **Seamless Canvas Resizing with State Retention**. 

Usually, when you resize a browser window containing an HTML5 `<canvas>`, the browser completely wipes its memory and you lose your entire drawing. I engineered a custom React `useEffect` listener that acts as a hidden, in-memory ghost canvas. Every time you resize the window, it instantly snaps a screenshot of your drawing, resizes the canvas to perfectly fit your new window dimensions, and then redraws your art back onto the screen instantly. You never lose a single pixel of your work!

## Features
* **Custom Tools:** Draw with customizable brush colors and brush sizes (ranging from 1px to 50px).
* **Eraser:** Switch to the eraser tool to fix mistakes naturally.
* **Canvas Export:** Download your masterpiece directly as a `.png` file with a single click.
* **Touch Support:** Full multi-touch support for mobile and tablet devices.

## Tech Stack
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React Icons
* **Core API:** HTML5 Canvas Context 2D

## Project Structure
Here is a brief overview of how the app is structured:
* `/src/app/page.tsx` - The primary drawing interface. This file contains the Canvas element, the floating toolbar UI, and the custom React hooks for tracking the X/Y coordinates of the mouse and touch events.
* `/src/app/globals.css` - Custom styling resets for the full-screen canvas layout.

I built this with a heavy focus on performance (optimizing the re-renders during the `onMouseMove` events) and user experience. Hope you love it!
