/**
/* 实现背景图片的移动
/* author : period9149
**/

let loadBackground = (bgURL, canvas, completeCallback) => {
    let context = canvas.getContext('2d'); 
    let width = canvas.width;
    let height = canvas.height;

    let image = new Image();
    image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
        context.drawImage(image, 0, -height, width, height);
        if(completeCallback){
            completeCallback(image);
        }
    }
    image.src = bgURL;
}

let backgroundOffset = 0;

//实现背景滚动
let animateBackground = (canvas, image, speed) => {
    let context = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;

    //清除画布
    context.clearRect(0, 0, canvas.width, canvas.height);

    //存储状态
    context.save();

    //更新位置
    backgroundOffset += speed;
    if(backgroundOffset >= height){
        backgroundOffset = 0;
    }
    context.translate(0,backgroundOffset);

    // 绘制图片
    context.drawImage(image, 0, 0, width, height);
    context.drawImage(image, 0, -height, width, height);

    //获取存储状态
    context.restore();
    
}