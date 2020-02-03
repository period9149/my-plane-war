/**
/* 敌机类和敌机的生成方法
/* author : period9149
**/

//获取min到max的随机数的方法
let getRandForNum = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

class Enemy{
    constructor(width, height, url, canvas){
        var x = getRandForNum(0, canvas.width - width);
        this.x = x;
        this.y = -height;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = url;
        this.speed = getRandForNum(3,10);
    }
    draw(canvas){
        var context = canvas.getContext('2d');
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    move(){
        this.y += this.speed;
    }
    isOutOfScreen(canvas){
        if(this.y > canvas.height){
            return true;
        }else{
            return false;
        }
    }
}
let createEnemy = (width, height, url, canvas) => {
    var enemy = new Enemy(width, height, url, canvas);
    return enemy;
}

//碰撞检测方法
let isEnemyHitHero = (obj1, obj2) => {
    let minX1 = obj1.x;
    let minX2 = obj2.x;
    let maxX1 = obj1.x + obj1.width;
    let maxX2 = obj2.x + obj2.width;

    let minY1 = obj1.y;
    let minY2 = obj2.y;
    let maxY1 = obj1.y + obj1.height;
    let maxY2 = obj2.y + obj2.height;

    let minX = Math.max(minX1, minX2);
    let minY = Math.max(minY1, minY2);

    let maxX = Math.min(maxX1, maxX2);
    let maxY = Math.min(maxY1, maxY2);

    if(minX < maxX && minY < maxY){
        return true;
    }else{
        return false;
    }
}