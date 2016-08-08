/**
 * Created by funfungo on 16/7/18.
 */

var page2 = {
    canvas: document.getElementById("canvas2"),
    width: 800,
    height: 600,
    activeGrid : false,
    activeCircle: true,
    activeHighlight: false,
    cubeSize: 50
};
page2.init = function () {
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = "#ffffff";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.grid = grid(this);
    this.circles = [];
    for(var i = 0 ; i < 5; i++){
        this.circles.push(new Circle(this.width, this.height));
    }
    page2.update();
};
page2.drawGrid = function () {
    this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.stroke();
    this.ctx.strokeStyle = "rgba(255,255,255,0.3)";
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "rgba(0,0,0,0.5)";

    for(var i = 0 ; i < this.grid.length; i++){
        var row = this.grid[i];
        for( var j = 0; j < row.length; j++){
            this.ctx.beginPath();
            this.ctx.rect(row[j].x, row[j].y, this.cubeSize, this.cubeSize);
            this.ctx.stroke();
            if(row[j].active){
                this.ctx.fill();
            }
        }
    }
};
page2.drawCircle = function () {
    for(var i = 0 ; i < this.circles.length; i++){
        this.circles[i].draw(this.ctx);
    }
};
page2.drawHighlight = function () {
    for(var i = 0; i < this.grid.length; i++){
        var row = this.grid[i];
        for(var j = 0; j < row.length; j++){
            var cube = row[j];
            cube.active = false;
            var potential = calmPotential(cube.x + this.cubeSize/2, cube.y +this.cubeSize/2, page2.circles);
            if(potential >= threshold){
                cube.active = true;
            }
        }
    }
};
page2.update = function () {
//        stats.update();
    for(var i = 0 ; i < page2.circles.length; i++){
        page2.circles[i].update();
    }
    page2.draw();
    pageAni = requestAnimationFrame(page2.update);
};

page2.draw = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if(this.activeGrid){
        this.drawGrid();
    }
    if(this.activeCircle){
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#ffffff";
        this.drawCircle();
    }
    if(this.activeHighlight){
        this.drawHighlight();
    }

};


