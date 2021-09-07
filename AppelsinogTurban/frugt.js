/* Frugt-klasse til at lave appelsiner, limefrugter med mere ud fra*/

class Frugt {


    constructor(x, y, r, xs, ys, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.yspeed = ys;
        this.xspeed = xs;
        this.col = c;
        this.tid = random(100,400);
        this.moving = false;
        this.showing = false;
        console.log("Ny frugt er lavet, dens ventetid er "+this.tid);
    }

    /*
    Her viser den hvilken figur der skal vises
    */

    display = function() {
        if (this.showing) {
        file(this.col);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        }
    }

    //Her er hvordan frugten bevæger sig, hvodan man får point og mister liv.
    move() {
        if (this.moving) {
            this.x += this.xspeed;
            this.y += this.yspeed;
            this.yspeed += grav;

            if (this.x > width || this.y > height) {
                missed += 1;
                liv -= 1;
                if (liv < 1) {
                    spilIgang = false;
                    genstartKnap.show();
                }
                console.log("Afskyder frugt igen");
                this.shootNew();
            }


        }

          else {
            this.tid -= 1;
            if (this.tid < 60) {
                this.showing = true;
                if (tid < 0) {
                    this.moving = true;
                }
            }
        }
    }

    //Her skal vi sørge for at frugten skydes afsted igen
    shootNew() {
        this.x = this.r;
        this.y = random(200, 550);
        this.yspeed = -10 * (this.y/550);
        this.xspeed = random(4);
        this.moving = false;
        this.showing = false;
        this.tid = random(100, 400);
    }



    checkScore = function() {
        if (this.yspeed > 0) {
            if (turban.grebet(this.x, this.y, this.r)) {
                score += 1;
                this.shootNew();
            }
        }
    }

}
