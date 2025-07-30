import { writeFileSync } from 'fs';
import { createCanvas } from 'canvas';

// Create a canvas
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

// Draw a green star
ctx.fillStyle = '#00582A';
ctx.beginPath();
ctx.moveTo(100, 40);
ctx.lineTo(122, 86);
ctx.lineTo(172, 86);
ctx.lineTo(132, 110);
ctx.lineTo(152, 160);
ctx.lineTo(100, 130);
ctx.lineTo(48, 160);
ctx.lineTo(68, 110);
ctx.lineTo(28, 86);
ctx.lineTo(78, 86);
ctx.closePath();
ctx.fill();

// Add text
ctx.fillStyle = '#00582A';
ctx.font = 'bold 20px Arial';
ctx.textAlign = 'center';
ctx.fillText('USLS', 100, 180);

// Save to file
const buffer = canvas.toBuffer('image/png');
writeFileSync('public/images/usls-logo.png', buffer);

console.log('Logo generated successfully!');
