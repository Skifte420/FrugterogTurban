/*
 * Dette script definerer klassen Kurv, som vi bruger til at lave turbanen
 */

 class Kurv {
     /*
      I constructoren er parametrene taget og lavet om
      til nye objekter. Dette gør så at værdigerne
      bliver gemt og kan blive fremkaldet senere via "this.".
      */
     constructor(x, y, bredde, dybde, speed, turbanbillede) {
         this.x = x;
         this.y = y;
         this.bred = bredde;
         this.dyb = dybde;
         this.speed = speed;
         this.col = [250, 230, 150];
         this.turbanbillede;
     }

    /*
     * Her bliver turbanen "tegnet", i andre ord bliver den sat ind på banen.
     */
    tegn() {
        fill(this.col);
        rect(this.x, this.y, this.bred, this.dyb);
        image(turbanbillede, this.x+1, this.y+5, this.bred-1, this.dyb-10);
    }

    /*
     * Flytter kurvens position.
     Move() er den kode der gør at man kan bevæge turbanen rundt på skærmen, hen ad x-aksen og y-aksen, (moveY og moveX).
     */
    move() {
        if (keyIsDown(UP_ARROW)) {
            this.moveY(-this.speed);
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.moveY(this.speed);
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.moveX(-this.speed);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.moveX(this.speed);
        }
    }
    moveX = function(flyt) {
        this.x += flyt;
        if (this.x < 0) {this.x = 0;};
        if (this.x > width-this.bred) {this.x = width - this.bred;};
    }



    moveY = function(flyt) {
        this.y += flyt;
        if (this.y < 0) {this.y = 0;};
        if (this.y > height-this.dyb) {this.y = height - this.dyb;};
    }


    /*
     * Tjekker om appelsinen (eller, burde være en appelsin men er istedet stadig en orange cirkel) er grebet ved at se om den rammer
     * "rent" ned gennem kurvens overkant. Parametrene er hhv. boldens
     * midtpunkts koordinater og dens radius
     */
     grebet = function(xa, ya, ra) {
         if ((ya < this.y+3 && ya > this.y-3) && xa > this.x+ra && xa < this.x+this.bred-ra) {
             return true;
         }
         else {
             return false;
         }
     }

   }
