/**
 * Created by funfungo on 16/7/18.
 */
function Circle(width, height) {
    this.width = width;
    this.height = height;
    this.r = 50 + Math.random() * 50;
    this.x = this.r + (Math.random() * (this.width - this.r * 2));
    this.y = this.r + (Math.random() * (this.height - this.r * 2));
    this.vx = -1 + Math.random() * 2;
    this.vy = -1 + Math.random() * 2;
}
Circle.prototype.update = function () {
    if (this.x + this.r > this.width || this.x - this.r < 0) {
        this.vx = -this.vx;
    } else if (this.y + this.r > this.height || this.y - this.r < 0) {
        this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
};

Circle.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.stroke();
};

function calmPotential(x, y, circles) {
    var potential = 0;
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        potential += (circle.r * circle.r) / ((x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y));
    }
    return potential;
}

function potentialPos(dotA, dotB, posDir) {
    return dotA[posDir] + (dotB[posDir] - dotA[posDir]) * Math.abs((threshold-dotA.potential)/(dotB.potential - dotA.potential))
}


function Cube(lt, rt, lb, rb) {
    this.lt = lt;
    this.rt = rt;
    this.lb = lb;
    this.rb = rb;
    this.typeArr = [];
}

Cube.prototype.potentialMap = function (direction) {
    switch (direction){
        case "north":
            return potentialPos(this.lt, this.rt, "x");
            break;
        case "south":
            return potentialPos(this.lb, this.rb, "x");
            break;
        case "west":
            return potentialPos(this.lt, this.lb, "y");
            break;
        case "east":
            return potentialPos(this.rt, this.rb, "y");
    }
};

Cube.prototype.update = function () {
    this.typeArr = [];

    try{
        if (this.lt.potential > threshold) {
            this.typeArr.push(1);
        } else {
            this.typeArr.push(0);
        }
        if (this.rt.potential > threshold) {
            this.typeArr.push(1);
        } else {
            this.typeArr.push(0);
        }
        if (this.rb.potential > threshold) {
            this.typeArr.push(1);
        } else {
            this.typeArr.push(0);
        }
        if (this.lb.potential > threshold) {
            this.typeArr.push(1);
        } else {
            this.typeArr.push(0);
        }
    }catch (e){
        console.log(this);
    }

    this.type = parseInt(this.typeArr.join(''), 2);
};
Cube.prototype.outline = function (context) {
    context.strokeStyle = "rgba(255,255,255,0.5)";
    context.beginPath();
    context.rect(this.lt.x, this.lt.y, cubeSize, cubeSize);
    context.stroke();
};
Cube.prototype.draw = function (context, step) {
    context.strokeStyle = "#F05E1C";
    context.beginPath();
    if (step == 1){
        switch (this.type) {
            case 0:
                break;
            case 1:
                context.moveTo(this.lt.x, (this.lt.y+this.lb.y)/2);
                context.lineTo((this.lb.x+this.rb.x)/2, this.lb.y);
                break;
            case 2:
                context.moveTo(this.rt.x, (this.rb.y+this.rt.y)/2);
                context.lineTo((this.lb.x+this.rb.x)/2, this.lb.y);
                break;
            case 3:
                context.moveTo(this.lt.x, (this.lt.y+this.lb.y)/2);
                context.lineTo(this.rt.x, (this.rb.y+this.rt.y)/2);
                break;
            case 4:
                context.moveTo((this.lt.x+this.rt.x)/2, this.rt.y);
                context.lineTo(this.rt.x, (this.lt.y+this.lb.y)/2);
                break;
            case 5:
                context.moveTo(this.lt.x,(this.lt.y+this.lb.y)/2);
                context.lineTo((this.lt.x+this.rt.x)/2, this.rt.y);
                context.moveTo(this.rt.x, (this.rb.y+this.rt.y)/2);
                context.lineTo((this.lb.x+this.rb.x)/2, this.lb.y);
                break;
            case 6:
                context.moveTo((this.lt.x+this.rt.x)/2, this.rt.y);
                context.lineTo((this.lb.x+this.rb.x)/2, this.rb.y);
                break;
            case 7:
                context.moveTo(this.lt.x, (this.lt.y+this.lb.y)/2);
                context.lineTo((this.lt.x+this.rt.x)/2, this.rt.y);
                break;
            case 8:
                context.moveTo(this.lt.x, (this.lt.y+this.lb.y)/2);
                context.lineTo((this.lt.x+this.rt.x)/2, this.rt.y);
                break;
            case 9:
                context.moveTo((this.lt.x+this.rt.x)/2, this.rt.y);
                context.lineTo((this.lb.x+this.rb.x)/2, this.rb.y);
                break;
            case 10:
                context.moveTo((this.lt.x+this.rt.x)/2, this.rt.y);
                context.lineTo(this.rt.x, (this.rb.y+this.rt.y)/2);
                context.moveTo(this.lt.x, (this.lt.y+this.lb.y)/2);
                context.lineTo((this.lb.x+this.rb.x)/2, this.lb.y);
                break;
            case 11:
                context.moveTo((this.lt.x+this.rt.x)/2, this.rt.y);
                context.lineTo(this.rt.x, (this.rb.y+this.rt.y)/2);
                break;
            case 12:
                context.moveTo(this.lt.x, (this.lt.y+this.lb.y)/2);
                context.lineTo(this.rt.x,(this.rb.y+this.rt.y)/2);
                break;
            case 13:
                context.moveTo(this.rt.x, (this.rb.y+this.rt.y)/2);
                context.lineTo((this.lb.x+this.rb.x)/2, this.lb.y);
                break;
            case 14:
                context.moveTo(this.lt.x, (this.lt.y+this.lb.y)/2);
                context.lineTo((this.lb.x+this.rb.x)/2, this.lb.y);
                break;
            case 15:
                break;
                break;
        }
    }else if(step == 2){
        switch (this.type) {
            case 0:
                break;
            case 1:
                context.moveTo(this.lt.x, this.potentialMap("west"));
                context.lineTo(this.potentialMap("south"), this.lb.y);
                break;
            case 2:
                context.moveTo(this.rt.x, this.potentialMap("east"));
                context.lineTo(this.potentialMap("south"), this.lb.y);
                break;
            case 3:
                context.moveTo(this.lt.x, this.potentialMap("west"));
                context.lineTo(this.rt.x, this.potentialMap("east"));
                break;
            case 4:
                context.moveTo(this.potentialMap("north"), this.rt.y);
                context.lineTo(this.rt.x, this.potentialMap("east"));
                break;
            case 5:
                context.moveTo(this.lt.x, this.potentialMap("west"));
                context.lineTo(this.potentialMap("north"), this.rt.y);
                context.moveTo(this.rt.x, this.potentialMap("east"));
                context.lineTo(this.potentialMap("south"), this.lb.y);
                break;
            case 6:
                context.moveTo(this.potentialMap("north"), this.rt.y);
                context.lineTo(this.potentialMap("south"), this.rb.y);
                break;
            case 7:
                context.moveTo(this.lt.x, this.potentialMap("west"));
                context.lineTo(this.potentialMap("north"), this.rt.y);
                break;
            case 8:
                context.moveTo(this.lt.x, this.potentialMap("west"));
                context.lineTo(this.potentialMap("north"), this.rt.y);
                break;
            case 9:
                context.moveTo(this.potentialMap("north"), this.rt.y);
                context.lineTo(this.potentialMap("south"), this.rb.y);
                break;
            case 10:
                context.moveTo(this.potentialMap("north"), this.rt.y);
                context.lineTo(this.rt.x, this.potentialMap("east"));
                context.moveTo(this.lt.x, this.potentialMap("west"));
                context.lineTo(this.potentialMap("south"), this.lb.y);
                break;
            case 11:
                context.moveTo(this.potentialMap("north"), this.rt.y);
                context.lineTo(this.rt.x, this.potentialMap("east"));
                break;
            case 12:
                context.moveTo(this.lt.x, this.potentialMap("west"));
                context.lineTo(this.rt.x, this.potentialMap("east"));
                break;
            case 13:
                context.moveTo(this.rt.x, this.potentialMap("east"));
                context.lineTo(this.potentialMap("south"), this.lb.y);
                break;
            case 14:
                context.moveTo(this.lt.x, this.potentialMap("west"));
                context.lineTo(this.potentialMap("south"), this.lb.y);
                break;
            case 15:
                break;
        }
    }
    context.stroke();
};

function Dot(x, y) {
    this.x = x;
    this.y = y;
    this.potential = 0;
}

Dot.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
};

Dot.prototype.update = function (circles) {
    this.potential = calmPotential(this.x, this.y, circles);
};


function grid(obj) {
    var arr = [];
    for(var i = 0 ; i < obj.width/obj.cubeSize; i++){
        arr[i] = [];
        for( var j = 0; j < obj.height/obj.cubeSize; j++){
            arr[i][j] = {
                x: i*obj.cubeSize,
                y: j*obj.cubeSize,
                active: false
            }
        }
    }
    return arr;
}
