from fractale_mandelbrot import *


x=-0.81125
y=0.20125
zoom=0.01

iteration=50
precision=400

xmin=x-zoom
xmax=x+zoom

ymin=y-zoom
ymax=y+zoom

Mandelbrot(xmin, xmax, ymin, ymax, precision, iteration)