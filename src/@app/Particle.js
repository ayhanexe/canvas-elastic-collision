import { distance, generateRandomColor, getRandomIntFromRange, resolveCollision } from "./Utils";

export default class Particle {
    constructor(x, y, size, effect, color) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.velocityX = (Math.random() * 5) - 2.5;
        this.velocityY = (Math.random() * 5) - 2.5;
        this.mass = 1;
        this.size = size;
        this.color = color;
        this.opacity = 0.05;
    }

    update(particles) {
        this.#draw();

        for(const particle of particles) {
            if(this === particle) continue;

            if(distance(this.x, this.y, particle.x, particle.y) - (this.size + particle.size) < 0) {
                resolveCollision(this, particle);
            }
        }

        if(this.x - this.size < 0 || this.x + this.size >= this.effect.width) 
            this.velocityX = -this.velocityX;

        if(this.y - this.size < 0 || this.y + this.size >= this.effect.height) 
            this.velocityY = -this.velocityY;

        if((distance(this.effect.mousePos.x, this.effect.mousePos.y, this.x, this.y) - this.size) < 100) {
            this.opacity += 0.01;
        } else {
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity);
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    #draw() {
        this.effect.context.beginPath();
        this.effect.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.effect.context.save();
        this.effect.context.globalAlpha = this.opacity;
        this.effect.context.fillStyle = this.color;
        this.effect.context.fill();
        this.effect.context.restore();
        this.effect.context.strokeStyle = this.color;
        this.effect.context.stroke();
        this.effect.context.closePath();
    }
}