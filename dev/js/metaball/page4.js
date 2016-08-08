/**
 * Created by funfungo on 16/7/18.
 */

var page4 = {
    canvas: document.getElementById("canvas4"),
    width: 800,
    height: 600,
    activeGrid : true,
    activeCircle: true,
    activeHighlight: false,
    cubeSize: 50,
    activeModify: false
};
page4.init = function () {
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = "#ffffff";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.circles = [];
    this.dots = [];
    this.cubes = [];
    for (var i = 0; i < 5; i++) {
        this.circles.push(new Circle(this.width, this.height));
    }

    for (var i = 0; i <= this.width; i += this.cubeSize) {
        var arr = [];
        for (var j = 0; j <= this.height; j += this.cubeSize) {
            var dot = new Dot(i, j);
            dot.update(this.circles);
            arr.push(dot);
        }
        this.dots.push(arr);
    }

    for (var i = 0; i < this.width / this.cubeSize; i++) {
        for (var j = 0; j < this.height / this.cubeSize; j++) {
            try {
                var lt = this.dots[i][j];
                var rt = this.dots[i + 1][j];
                var lb = this.dots[i][j + 1];
                var rb = this.dots[i + 1][j + 1];
                if(lt == "undefined" || rt == "undefined" || lb == "undefined" || rb == "undefined"){
                    console.log(i + "," + j);
                }
                var cube = new Cube(lt, rt, lb,rb);
                this.cubes.push(cube);

            } catch (e) {
            }
        }
    }
    page4.update();
};

page4.update = function () {
    page4.ctx.clearRect(0, 0, page4.width, page4.height);

    if(page4.activeCircle){
        for (var i = 0; i < page4.circles.length; i++) {
            page4.circles[i].update();
            page4.ctx.strokeStyle = "#ffffff";
            page4.ctx.beginPath();
            page4.ctx.arc(page4.circles[i].x, page4.circles[i].y, page4.circles[i].r, 0, Math.PI * 2);
            page4.ctx.stroke();
        }
    }
    


    for(var i = 0 ; i < page4.circles.length; i++){
        page4.circles[i].update();
    }
    for (var i = 0; i < page4.dots.length; i++) {
        page4.ctx.fillStyle = "#F05E1C";

        var dotCol = page4.dots[i];

        for (var j = 0; j < dotCol.length; j ++) {
            var dot = dotCol[j];
            dot.update(page4.circles);
            if(page4.activeGrid && dot.potential > threshold){
                page4.ctx.beginPath();
                page4.ctx.rect(dot.x-3, dot.y-3, 6, 6);
                page4.ctx.fill();
            }
        }



    }
    for (var i = 0; i < page4.cubes.length; i++) {
        page4.cubes[i].update();
        if(page4.activeModify){
            page4.cubes[i].draw(page4.ctx, 2);
        }else {
            page4.cubes[i].draw(page4.ctx, 1);
        }
        if(page4.activeGrid){
            page4.cubes[i].outline(page4.ctx);
        }
    }


    // page4.draw();
    pageAni = requestAnimationFrame(page4.update);
};



page4.init();