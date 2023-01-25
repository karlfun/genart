import * as openSimplexNoise from "https://cdn.skypack.dev/open-simplex-noise@2.5.0";
import { makeNoise2D } from "https://cdn.skypack.dev/open-simplex-noise@2.5.0";



	let ns = 'http://www.w3.org/2000/svg';
	let svg = document.createElementNS(ns, 'svg');

	// set the svg attributes
svg.setAttribute('width', '100vw');
svg.setAttribute('height', '100vh');
	svg.setAttribute('style', 'background-color:beige;');
  svg.setAttribute('id','svg_circles')

  document.body.appendChild(svg);


  var svgCircle = document.getElementById("svg_circles");
  var NS = "http://www.w3.org/2000/svg";


  // seed the noise
  const my_noise = makeNoise2D(Date.now()); 
  
  // number of waves, increase by SMALL amounts
  const noise_freq = 0.1;
  // height of the waves
  const noise_amp = 30;
  const get_noise = (x,y) => {
    //return my_3d_noise(x * noise_freq, y * noise_freq) * noise_amp;
    return my_noise(x * noise_freq, y * noise_freq) * noise_amp;
  }

  
  // Let's get colorful
  
     var top_colors = [
  "#EBC710", "#F28D0C", "#F20CBF", "#5E05EB"
   ];

   var left_colors = [
  "#FFF200", "#F7941D", "#A7228E", "#4C3390"
   ];

   var right_colors = [
  "#EBC710", "#F28D0C", "#F20CBF", "#5E05EB"
   ];
  
  


  
// draw
//////////////////////////////

// lines loop
// Y
// formerly j
for (let row = 0; row <101; row++){

  
// put the random color selector inside the first loop to change each line
// or inside the second loop to change each circle
var random_top = top_colors[Math.floor(Math.random()*top_colors.length)];
console.log(random_top);

var random_left = left_colors[Math.floor(Math.random()*left_colors.length)];
console.log(random_left);
  
var random_right = right_colors[Math.floor(Math.random()*right_colors.length)];
console.log(random_right);  
    
  
  // points loop
  // X 
  // formerly i
  for (let column = 0; column < 96; column++) {
    
    var noisy = get_noise(column,row); 

    var stagger = -18; // stagger the start of each new row
    var gap = 22; // gap between iterations within a row
    
    var x = stagger * row + gap * column + noisy + noisy;
    
    
    
    // starting point from left + (l-r spacing * i) + noise
    // add more noise (+p) to make wilder noise lines    
   // var x = 50 + (28 * column) + noisy + noisy + noisy; 
        
    // starting point from top + (j * space between each repeated  line) + noise
    var y = 50 +  (row * 20) + noisy + noisy + noisy + noisy;

    // variable for increasing the size of the castles
    //var n = 3;
    var n = 11;
    // variables for adding noise to the height of the castles
    var lht = (5*n) + y + noisy; 
    var rht = (6*n) + y + noisy;
    
var left = document.createElementNS(NS, "polygon");
left.setAttribute("points",`${(2*n)+x} ${(2*n)+y} ${(4*n)+x} ${(3*n)+y} ${(4*n)+x} ${rht} ${(2*n)+x} ${lht} ${(2*n)+x} ${(2*n)+y}` );
left.setAttribute("stroke-width", "0.5")
left.setAttribute("stroke-linejoin", "bevel");
left.setAttribute("opacity", 0.8)  
left.style.fill=random_left;
left.style.stroke="black";

svgCircle.appendChild(left)


var top = document.createElementNS(NS, "polygon");
top.setAttribute("points", `${(2*n)+x} ${(2*n)+y} ${(4*n)+x} ${(3*n)+y} ${(6*n)+x} ${(2*n)+y} ${(4*n)+x} ${(1*n)+y} ${(2*n)+x} ${(2*n)+y}` );
top.setAttribute("stroke-width", "0.5")
top.setAttribute("stroke-linejoin", "bevel");
top.setAttribute("opacity", 0.8)  
top.style.fill=random_top;
top.style.stroke="black";

svgCircle.appendChild(top)

var right = document.createElementNS(NS,"polygon");
right.setAttribute("points", `${(6*n)+x} ${(2*n)+y} ${(6*n)+x} ${lht} ${(4*n)+x} ${rht} ${(4*n)+x} ${(3*n)+y} ${(6*n)+x} ${(2*n)+y}` );
right.setAttribute("stroke-width", "0.5")
right.setAttribute("stroke-linejoin", "bevel");
right.setAttribute("opacity", 0.8)  
right.style.fill=random_right;
right.style.stroke="black";

svgCircle.appendChild(right)  
    
    
  };
}




// download and save an SVG file
// via @senz on stackoverflow
////////////////////////////////////

function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


// uncomment this next line to automatically download an SVG
//saveSvg(svg, 'blerp.svg')
