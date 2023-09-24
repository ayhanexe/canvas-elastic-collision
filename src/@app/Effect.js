import Particle from "./Particle";
import { distance, generateRandomColor, getRandomIntFromRange } from "./Utils";

export default class Effect {
    constructor(width, height, particlesCount, particleSize) {
        this.canvas;
        this.context;
        this.width = width;
        this.height = height;
        this.particleSize = particleSize;
        this.particlesCount = particlesCount;
        this.particles = [];
        this.mousePos = {
            x: undefined,
            y: undefined
        }

        window.addEventListener("mousemove", this.#getMousePosition.bind(this));
        window.addEventListener("resize", this.#handleResize.bind(this));
    }

    #tick() {
        this.context.clearRect(0, 0, this.width, this.height);

        for (const particle of this.particles) {
            particle.update(this.particles);
        }

        window.requestAnimationFrame(this.#tick.bind(this));
    }

    #getMousePosition(e) {
        this.mousePos = {
            x: e.clientX,
            y: e.clientY
        }
    }

    #handleResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    #createParticles() {
        for (let i = 0; i < this.particlesCount; i++) {
            const particleSize = this.particleSize;

            let x = getRandomIntFromRange(particleSize, this.width - particleSize);
            let y = getRandomIntFromRange(particleSize, this.height - particleSize);

            if (this.particles.length > 0) {
                for (let j = 0; j < this.particles.length; j++) {
                    if (distance(x, y, this.particles[j].x, this.particles[j].y) - (particleSize + this.particles[j].size) < 0) {
                        x = getRandomIntFromRange(particleSize, this.width - particleSize);
                        y = getRandomIntFromRange(particleSize, this.height - particleSize);
                        j = -1;
                    }
                }
            }

            const color = generateRandomColor();

            const particle = new Particle(x, y, particleSize, this, color);

            this.particles.push(particle);
        }
    }

    #createAndAppendCanvas() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = this.width;
        canvas.height = this.height;

        this.canvas = canvas;
        this.context = context;

        document.body.appendChild(canvas);
    }

    init() {
        this.#createAndAppendCanvas();
        this.#createParticles();
        this.#tick();
    }
}