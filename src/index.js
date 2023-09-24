import { noise } from "@chriscourses/perlin-noise";

import "./style.scss";
import Effect from "./@app/Effect";


const effect = new Effect(window.innerWidth - 2, window.innerHeight - 2, 100, 20);

effect.init();
