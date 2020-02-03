let drawAirplane = () => {
    let bgCanvas = document.getElementById('backgroundCanvas');
    if(bgCanvas.getContext){
        let bgURL = './img/background.png';
        let moveBackground = bgImage => {
            var bgSound = new Audio('./audio/game_music.mp3');
            bgSound.loop = true;
            bgSound.play();
            setInterval(()=>{
            //执行速度
            let speed = 5;
            //执行方法
            animateBackground(bgCanvas, bgImage, speed);
        },30);
            //飞机出现
            let heroCanvas = document.getElementById('heroCanvas');
            let ctx = heroCanvas.getContext('2d');
            let img = './img/wdfj.gif';
            let heroLoaded = (image) => {
                hero.draw(heroCanvas);
            }
            let hero = createHero(66, 82, heroCanvas, img, heroLoaded);

            //飞机移动
            setInterval(()=>{
                ctx.clearRect(0, 0, 320, 568);
                hero.draw(heroCanvas);
            },30)

            //发射子弹
            let bCanvas = document.getElementById('bulletCanvas');
            let bContext = bCanvas.getContext('2d');
            let bWidth = 10;
            let bHeight = 18;

            var bURL = './img/bullet.png';
            var bulletArray = new Array();
            setInterval(() => {
                let bullet = createBullet(bWidth, bHeight, bURL, hero);
                bulletArray.push(bullet);
                bullet.draw(bCanvas);
            },200);

            setInterval(()=>{
                //清除画布
                bContext.clearRect(0, 0, 320, 568);
                for(var i = 0; i < bulletArray.length; i++){
                    //判断子弹是否超出屏幕，超出的子弹对应从数组中去除
                    if(bulletArray[i].isOutOfScreen()){
                        bulletArray.splice(i, 1);
                    }
                    bulletArray[i].move();
                    bulletArray[i].draw(bCanvas);
                    //不断生成敌机
                    for(var j = 0; j < enemyArray.length; j++){
                        if(isEnemyHitHero(bulletArray[i], enemyArray[j])){
                            enemyArray.splice(j, 1);
                            bulletArray.splice(i, 1);
                        }
                    }
                }
            },30);

            //创建敌机
            var eCanvas = document.getElementById('enemyCanvas');
            var eContext = eCanvas.getContext('2d');
            var enemyArray = new Array();

            setInterval(() => {
                //随机获取一到三的数值，用于匹配不同的飞机
                var num = getRandForNum(1,3);
                var enemy;
                switch(num){
                    case 1:
                        enemy = createEnemy(39, 38, './img/enemy1.png',eCanvas);
                        break;
                    case 2:
                        enemy = createEnemy(106.8, 169, './img/enemy2.png',eCanvas);
                        break;
                    case 3:
                        enemy = createEnemy(46, 60, './img/enemy3.png',eCanvas);
                        break;    
                }
                enemyArray.push(enemy);
            },1000);

            //让敌机降落
            var eTimer = setInterval(()=>{
                eContext.clearRect(0, 0, eCanvas.width, eCanvas.height);
                for(var i = 0; i < enemyArray.length; i++ ){
                    enemyArray[i].move();
                    enemyArray[i].draw(eCanvas);

                    //碰撞检测
                    if(isEnemyHitHero(enemyArray[i],hero)){
                        clearInterval(eTimer);
                        eTimer = null;
                        alert ('你输了！');
                    }
                    //判断敌机是否出屏
                    if(enemyArray[i].isOutOfScreen(eCanvas)){
                        enemyArray.splice(i, 1);
                    }

                }
            },50);

        }   
        //加载图片方法
        loadBackground(bgURL, bgCanvas, moveBackground);
    }
}