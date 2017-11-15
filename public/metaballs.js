/**
 * Created by Espen on 15.03.2017.
 */

(function () {
    function map(x, minI, maxI, minO, maxO) {
        return (x - minI) * (maxO - minO) / (maxI - minI) + minO;
    }
    function ball(x, y, r) {
        var speedx = Math.random() * 10 + 1;
        var speedy = Math.random() * 10 + 1;
        var dimensions = {x: x, y: y, radius: r};
        return {
            space: dimensions,

            update: function(){
                dimensions.x += speedx;
                dimensions.y += speedy;
                if(dimensions.x > scr.width || dimensions.x < 0){
                    speedx *= -1;
                }
                if(dimensions.y > scr.height || dimensions.y < 0){
                    speedy *= -1;
                }

            }
        };
    }

    var scr;
    var balls = [];

    function setup() {
        scr = dcl.setupScreen(window.innerWidth ,window.innerHeight );
        scr.setBgColor('black');
        document.body.style.backgroundColor = 'black';
        scr.imageData = scr.ctx.createImageData(scr.width, scr.height);
        document.body.addEventListener('keyup', function (event) {
            if (event.keyCode === 32) {
                var point = scr.randomSpot();
                balls.push(ball(point.x, point.y, Math.random() * window.innerWidth / 3 + 3));
            }
            if (event.keyCode === 88) {
                balls.pop();
            }
            draw();
        });
    }
    function dist(x1,y1, x2, y2){
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx*dx + dy*dy);
    }
    function clamp(val,min, max){
        return val < min ? min : val > max ? max : val;
    }

    function render() {
        var data = scr.imageData.data;
        for (var x = 0; x < scr.width; x+=3) {
            for (var y = 0; y < scr.height; y+=3) {
                var color = 0;
                var index = (x + y * scr.width) * 4;

                balls.forEach(function(b){
                    var d = dist(b.space.x,b.space.y,x,y);
                    color += 100 * b.space.radius / d;

                });
                var h = map(clamp(color,0,255),0,255,0.6,0.3);
                var l = map(clamp(color,0,255),0,255,0.0,1.0);
                var c = hsl(h,1,l);
                data[index++] = c[0];
                data[index++] = c[1];
                data[index++] = c[2];
                data[index] = 255;

            }
        }
        scr.ctx.putImageData(scr.imageData,0,0);
    }
    function hsl(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
    function draw() {
        balls.forEach(function(b) {
            b.update();
        });
        render();
        requestAnimationFrame(function(){
            draw();
        });
    }

    setup();
    draw();
})();