window.onload = function(){
    el = document.getElementById("infoArticle").style = "block";
}

function changeArticle(e){
    var elem = document.getElementsByClassName("articleContent");
    for(var i = 0; i<elem.length; i++)
        elem[i].style = "display : none;";
    switch(e.id){
        case "info":
            document.getElementById("infoArticle").style = "block";
            break;
        case "horizontal_theory":
            document.getElementById("theoryHorizontalArticle").style = "block";
            break;
        case "diagonal_theory":
            document.getElementById("theoryDiagonalArticle").style = "block";
            break;
        case "horizontal_simulation":
            document.getElementById("horizontalArticle").style = "block";
            readyCanvas("horizontal");
            positionHorizontal(0,"none");
            break;
        case "diagonal_simulation":
            document.getElementById("diagonalArticle").style = "block";
            readyCanvas("diagonal");
            positionDiagonal(0,"none");
            break;    
    }
}


function readyCanvas(id_chart){
    //filling of the axis of the chart
    var chart = document.getElementById(id_chart);
    if(chart.getContext){
        var grid_size = 40;
        var x_axis_distance_grid_lines = 14;
        var y_axis_distance_grid_lines = 1;
        var x_axis_starting_point = { number: 1, suffix: '' };
        var y_axis_starting_point = { number: 1, suffix: '' };
        
        var ctx = chart.getContext("2d");

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, chart.width, chart.height);
        //clean the chart


        var chart_width = chart.width;
        var chart_height = chart.height;
        var x_num_lines = Math.floor(chart_height/grid_size);
        var y_num_lines = Math.floor(chart_width/grid_size);
        for(var i=0; i<=x_num_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
    
            if(i == x_axis_distance_grid_lines) 
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#ced4da";
    
            if(i == x_num_lines) {
            ctx.moveTo(0, grid_size*i);
            ctx.lineTo(chart_width, grid_size*i);
            }
            else {
            ctx.moveTo(0, grid_size*i+0.5);
            ctx.lineTo(chart_width, grid_size*i+0.5);
            }
            ctx.stroke();
        }

        for(i=0; i<=y_num_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
    
            if(i == y_axis_distance_grid_lines) 
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#ced4da";

            if(i == y_num_lines) {
                ctx.moveTo(grid_size*i, 0);
                ctx.lineTo(grid_size*i, chart_height);
            }
            else {
                ctx.moveTo(grid_size*i+0.5, 0);
                ctx.lineTo(grid_size*i+0.5, chart_height);
            }
            ctx.stroke();
        }

        ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

    for(i=1; i<(y_num_lines - y_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(grid_size*i+0.5, -3);
        ctx.lineTo(grid_size*i+0.5, 3);
        ctx.stroke();

        ctx.font = '13px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, grid_size*i-2, 15);
    }

    for(i=1; i<x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(-3, -grid_size*i+0.5);
        ctx.lineTo(3, -grid_size*i+0.5);
        ctx.stroke();

        ctx.font = '13px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, -grid_size*i+3);
    }        
        }else{
            alert("Canvas error!");
        }      
}


function positionHorizontal(value, id_out){
    if(id_out != "none")
        document.getElementById(id_out).value = Number(value).toFixed(2);
    readyCanvas("horizontal");
    var chart = document.getElementById("horizontal");
    var H = document.getElementById("height").value;    
    var g = document.getElementById("gravity").value;
    var V0 = document.getElementById("velocity").value;

    if(chart.getContext){
            var context = chart.getContext("2d");
            context.lineWidth = 2;
            context.strokeStyle = "#333";
            context.beginPath();
            var x = 0;
            for(var x = 0; x <= 23; x += 0.02){
                var y = horizontal(H, g, V0, x);
                console.log("H: " + H + "x: " + 40*x +" y: " + 40*y);
                if(y < 0)
                    break;
                context.lineTo(40*x, -40*y);
            }
            context.lineJoin = 'round';
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.stroke();

            fillHorizontalParameters();
        }else{
            alert("Canvas error!");
        } 
}

function fillHorizontalParameters(){
    var H = document.getElementById("height").value;    
    var g = document.getElementById("gravity").value;
    var V0 = document.getElementById("velocity").value;
    document.getElementById("rangeHorizontalDiv").innerHTML = Number(horizontalRange(V0, H, g)).toFixed(2);
    document.getElementById("timeHorizontalDiv").innerHTML = Number(horizontalTime(H,g)).toFixed(2);
}

function horizontal(H, g, V0, x){
    var result = H - 1.0 * g/(2*V0*V0) * Math.pow(x,2);
    return result;
}

function horizontalRange(V0, H, g){
    var result = V0 * Math.sqrt((2*H)/g);
    return result;
}

function horizontalTime(H,g){
    return Math.sqrt((2*H)/g);
}

function positionDiagonal(value, id_out){
    if(id_out != "none")
        document.getElementById(id_out).value = Number(value).toFixed(2);
    readyCanvas("diagonal");
    var chart = document.getElementById("diagonal");
    var H = document.getElementById("heightDiagonal").value;    
    var g = document.getElementById("gravityDiagonal").value;
    var V0 = document.getElementById("velocityDiagonal").value;
    var a = document.getElementById("angleDiagonal").value;

    if(chart.getContext){
        var context = chart.getContext("2d");
        context.lineWidth = 2;
        context.strokeStyle = "#333";
        context.beginPath();
        var x = 0;
        for(var x = 0; x <= 23; x += 0.02){
            var y = diagonal(H, g, V0, x, a);
            if(y < 0)
                break;
            context.lineTo(40*x, -40*y);
        }
        context.lineJoin = 'round';
        context.lineWidth = 2;
        context.strokeStyle = "red";
        context.stroke();

        fillDiagonalParameters();
    }else{
        alert("Canvas error!");
    } 
}

function fillDiagonalParameters(){
    var H = document.getElementById("heightDiagonal").value;    
    var g = document.getElementById("gravityDiagonal").value;
    var V0 = document.getElementById("velocityDiagonal").value;
    var a = document.getElementById("angleDiagonal").value;
    document.getElementById("rangeDiagonalDiv").innerHTML = Number(diagonalRange(H, V0, a, g)).toFixed(2);
    document.getElementById("heightDiagonalDiv").innerHTML = Number(diagonalHeight(H, V0, a, g)).toFixed(2);
    document.getElementById("timeFallDiagonalDiv").innerHTML = Number(diagonalFallTime(H, V0, a, g)).toFixed(2);
    document.getElementById("timeFlyDiagonalDiv").innerHTML = Number(diagonalTotalTime(H, V0, a, g)).toFixed(2);
}

function diagonal(H,g,V0, x, a){
    var radAlpha = a * (Math.PI/180);
    return parseFloat(H) + 1.0 * x*Math.tan(radAlpha) - (g/(2.0*Math.pow(V0,2) * Math.pow(Math.cos(radAlpha),2))) * Math.pow(x,2);
}

function diagonalRange(H, V0, a, g){
    var radAlpha = a * (Math.PI/180);
    return V0*Math.cos(radAlpha) * (V0*Math.sin(radAlpha)/g + Math.sqrt(2*H/g + Math.pow(V0*Math.sin(radAlpha)/g,2)));
}

function diagonalHeight(H, V0, a, g){
    var radAlpha = a * (Math.PI/180);
    return parseFloat(H) + ( Math.pow(V0,2) * Math.pow(Math.sin(radAlpha),2) ) / (2*g);
}

function diagonalFallTime(H, V0, a, g){
    var radAlpha = a * (Math.PI/180);
    return Math.sqrt((2 * H) / g + Math.pow(V0*Math.sin(radAlpha),2)/(g*g));
}

function diagonalTotalTime(H, V0, a, g){
    var radAlpha = a * (Math.PI/180);
    return (V0*Math.sin(radAlpha))/g + diagonalFallTime(H,V0,a,g);
}




function simulateDiagonal(){
    readyCanvas("diagonal");
    fillDiagonalParameters();
    var canvas = document.getElementById("diagonal");
    var H = document.getElementById("heightDiagonal").value;    
    var V0 = document.getElementById("velocityDiagonal").value;
    var a = document.getElementById("angleDiagonal").value;
    var g = document.getElementById("gravityDiagonal").value;
    var radAlpha = a * (Math.PI/180);

    var x = 0;
    var y = parseFloat(H);
    var r = 10;


    var vx = V0*Math.cos(radAlpha);
    var vy = V0*Math.sin(radAlpha);

    var ax = 0;
    var ay = -g;

    var dt = 0.02;
    var t = 0;

    if(canvas.getContext){
        var context = canvas.getContext("2d");
        while(y >= 0){
            ballAnimationDiagonal(t, context, x, y, r, vx, vy);
            //updateVx
            var change_vx = vx + ax*dt;
            x = x + 0.5*(vx + change_vx)*dt;
            //updateVy
            var change_vy = vy + ay*dt;
            y = y + 0.5*(vy + change_vy)*dt;
            vx = change_vx;
            vy = change_vy;
            t = t + dt;
        }
    }else{
        alert("Canvas context error");
    }

}

function simulateHorizontal(){
    readyCanvas("horizontal");
    var canvas = document.getElementById("horizontal");
    var H = document.getElementById("height").value;    
    var g = document.getElementById("gravity").value;
    var V0 = document.getElementById("velocity").value;

    fillHorizontalParameters();

    var x = 0;
    var y = parseFloat(H);
    var r = 10;


    var vx = V0;
    var vy = 0;

    var ax = 0;
    var ay = -g;

    var dt = 0.02;
    var t = 0;

    if(canvas.getContext){
        var context = canvas.getContext("2d");
        while(y >= 0){
            ballAnimationHorizontal(t, context, x, y, r, vx, vy);
            //updateVx
            var change_vx = vx;
            x = x + vx*dt;
            //updateVy
            var change_vy = vy + ay*dt;
            y = y + 0.5*(vy + change_vy)*dt;
            vx = change_vx;
            vy = change_vy;
            t = t + dt;
        }
    }else{
        alert("Canvas context error");
    }
}

function ballAnimationDiagonal(t, context, x, y, r, vx, vy) { 
    setTimeout(function() { 
        readyCanvas("diagonal");
        context.beginPath();
        context.fillStyle = "#145026"
        drawBall(context, x, y, r);
        document.getElementById("equationVxDiagonal").innerHTML = Number(vx).toFixed(2);
        document.getElementById("equationVyDiagonal").innerHTML = Number(vy).toFixed(2);
        context.fill();
        context.closePath();
    }, 1500 * t); 
} 

function ballAnimationHorizontal(t, context, x, y, r, vx, vy) { 
    setTimeout(function() { 
        readyCanvas("horizontal");
        context.beginPath();
        context.fillStyle = "#145026"
        drawBall(context, x, y, r);
        document.getElementById("equationVxHorizontal").innerHTML = Number(vx).toFixed(2);
        document.getElementById("equationVyHorizontal").innerHTML = Number(vy).toFixed(2);
        context.fill();
        context.closePath();
    }, 1500 * t); 
  } 

function drawBall(context, x, y, r){
    context.arc(40*x, -40*y, r, 0, 2*Math.PI, true);
    context.stroke();
}