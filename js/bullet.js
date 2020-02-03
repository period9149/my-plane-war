/**
/* 子弹类和子弹的生成方法
/* author : period9149
**/
class Bullet{
    constructor(x, y, width, height, URL){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = URL;
    }
    draw(canvas){
        var context = canvas.getContext('2d');
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + 45, this.y, this.width, this.height);
    }
    move(){
        this.y -= 10;
    }
    isOutOfScreen(){
        if(this.y < -this.h){
            return true;
        }else{
            return false;
        }
    }
}
let createBullet = (bWidth, bHeight, bURL, hero) => {
    var x = hero.x + bWidth/2;
    var y = hero.y - bHeight;
    var bullet = new Bullet(x, y, bWidth, bHeight, bURL);
    return bullet;
}
