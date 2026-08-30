import matplotlib.pyplot as plt
from complexes import *

# Fonction itérative de la suite z_{n+1} = z_n^2 + c.
def f(z, c) :
    return addZ_car(multZ_car(z, z), c)

# Calcule le nombre d'itérations avant divergence pour c.
def calcul_point(c, iteration=10**3) :
    z = [0, 0]
    for i in range(1, iteration+1) :
        z = f(z, c)
        if module_car(z) >= 2 :
            return i
    return 0

# Trace et affiche l'ensemble de Mandelbrot sur la zone donnée.
def Mandelbrot(xmin, xmax, ymin, ymax, precision=100, iteration=50) :
    
    pas_x = (xmax - xmin)/precision
    pas_y = (ymax - ymin)/precision
        
    fix, ax = plt.subplots(figsize=(10, 10))
    
    plt.xlim(xmin, xmax)
    plt.ylim(ymin, ymax)
    
    for i in range(precision+1) :
        x = pas_x*i + xmin
        
        for j in range(precision+1) :
            y = pas_y*j + ymin
            c = calcul_point([x, y], iteration)
            if c == 0 :
                col = (0, 0, 1)
            else :
                col = (c/iteration, 0, 0)
                
            rect = plt.Rectangle((x, y), pas_x, pas_y, facecolor=col)
            ax.add_patch(rect)
        print('\r', str(round(i/precision*100, 2)), "% du téléchargement", end = ' ')
    print("\nAffichage du graphe en cours...")
            
            
    plt.grid(True)        
    plt.show()