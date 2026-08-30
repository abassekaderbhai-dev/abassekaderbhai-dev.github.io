from fractale_mandelbrot import *

iteration=50
precision=[10, 100, 200, 400]

xmin=-2
xmax=0.5

ymin=-1.2
ymax=1.2

Mandelbrot(xmin, xmax, ymin, ymax, precision[2], iteration)