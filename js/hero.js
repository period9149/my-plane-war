/**
/* 飞机类和飞机的生成、移动方法
/* author : period9149
**/

class Hero{
    constructor(x, y, width, height, imageURL, completeCallback){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.onload = () => {
            if(completeCallback){
                completeCallback(this);
            }
        }
        this.image.src = imageURL;
    }
    draw(canvas){
        let context = canvas.getContext('2d');
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

}

let createHero = (width, height, canvas, imageURL, completeCallback) => {
    var context = canvas.getContext('2d');
    var timer;

    var x = canvas.width / 2 - width / 2;//水平居中
    var y = canvas.height- height - 20;//垂直底部向上20px

    let hero = new Hero(x, y, width, height, imageURL, completeCallback);

    document.onkeydown = e => {
        let event = e || window.event;

        switch(event.keyCode){
            case 37:{hero.left = true; break;}
            case 38:{hero.up = true; break;}
            case 39:{hero.right = true; break;}
            case 40:{hero.down = true; break;}
        }
    }

    document.onkeyup = e => {
        let event = e || window.event;

        switch(event.keyCode){
            case 37:{hero.left = false; break;}
            case 38:{hero.up = false; break;}
            case 39:{hero.right = false; break;}
            case 40:{hero.down = false; break;}
        }
    }

    timer = setInterval(() => {
        if(hero.left == true && hero.x > 0) hero.x -= 2;
        if(hero.up == true && hero.y > 0) hero.y -= 2;
        if(hero.right == true && hero.x < 260) hero.x += 2;
        if(hero.down == true && hero.y < 500) hero.y += 2;
    })

    return hero;
}