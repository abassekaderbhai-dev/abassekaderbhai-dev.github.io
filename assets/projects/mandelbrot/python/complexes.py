from math import *

# Représentation cartésienne : [x, y] = x + iy

# Partie réelle
def partieReelle_car(z) : 
    return z[0]

# Partie imaginaire
def partieImaginaire_car(z) : 
    return z[1]

# Affichage cartésien
def printZ_car(z, precision=2) : 
    x=round(partieReelle_car(z), precision)
    y=round(partieImaginaire_car(z), precision)
    
    txt=""
    if(x==0 and y==0) : 
        txt=0
    if(x!=0) : 
        txt+=str(x)
    if(y>0 and x!=0) : 
        txt+='+'
    if(abs(y)!=1 and y!=0) : 
        txt+=str(y)
    if(y==-1) : 
        txt+='-'
    if(y!=0) : 
        txt+='i'
        
    print(txt)

# Addition
def addZ_car(z1, z2) : 
    return [partieReelle_car(z1) + partieReelle_car(z2), partieImaginaire_car(z1) + partieImaginaire_car(z2)]

# Opposé
def oppZ_car(z) : 
    return [-partieReelle_car(z), -partieImaginaire_car(z)]

# Soustraction
def sousZ_car(z1, z2) : 
    return addZ_car(z1, oppZ_car(z2))

# Multiplication
def multZ_car(z1, z2) : 
    return [partieReelle_car(z1) * partieReelle_car(z2) - partieImaginaire_car(z1) * partieImaginaire_car(z2), 
            partieReelle_car(z1)*partieImaginaire_car(z2) + partieReelle_car(z2)*partieImaginaire_car(z1)]

# Inverse
def invZ_car(z) : 
    x = partieReelle_car(z)
    y = partieImaginaire_car(z)
    
    if x == 0 and y == 0 :
        return []
    prem = (x**2 + y**2)
    return [x/prem, -y/prem]

# Division
def divZ_car(z1, z2) :
    inv = invZ_car(z2)
    if inv == [] :
        return []
    return multZ_car(z1, inv)


# Représentation polaire : [r, t] = r*e^(i*t)

# Module
def module_pol(z) : 
    return z[0]

# Argument
def argument_pol(z) :
    a = z[1]
    while not (-pi < a <= pi) :
        if a < 0  :
            a += 2*pi
        else :
            a-= 2*pi
    return a

# Affichage polaire
def printZ_pol(z, precision=2) : 
    r=round(module_pol(z), precision)
    t=argument_pol(z)/pi
    
    s=""
    if(t<0) : s="-"
    
    t=abs(t)
        
    tt=str(round(t, precision))+"π"
    if(abs(t-1/2)<10**(-precision**2)) : tt="π/2"
    if(abs(t-1/3)<10**(-precision**2)) : tt="π/3"
    if(abs(t-2/3)<10**(-precision**2)) : tt="2π/3"
    if(abs(t-1/4)<10**(-precision**2)) : tt="π/4"
    if(abs(t-3/4)<10**(-precision**2)) : tt="3π/4"
    if(abs(t-1/6)<10**(-precision**2)) : tt="π/6"
    if(abs(t-5/6)<10**(-precision**2)) : tt="5π/6"
    if(abs(t-1)<10**(-precision**2)) : tt="π"
    if(abs(t)<10**(-precision**2)) : tt="0π"
    
    if(r==0) : return 0
    
    txt=""
    if(r!=1) : txt+=str(r)
    if(t!=0) : txt+="e^{"+s+"i "+tt+"}"
    
    print(txt)

# Module
def module_car(z) : 
    return sqrt(partieReelle_car(z)**2 + partieImaginaire_car(z)**2)

# Argument
def argument_car(z) : 
    x = partieReelle_car(z)
    y = partieImaginaire_car(z)
    if x > 0 :
        return atan(y/x)
    if x < 0 :
        return atan(y/x) + pi
    if y > 0 :
        return pi/2
    if y < 0 :
        return -pi/2
    return 0

# Conversion cartésien vers polaire
def conversion_car_pol(z) : 
    return [module_car(z), argument_car(z)]

# Conversion polaire vers cartésien
def conversion_pol_car(z) : 
    r = module_pol(z)
    teta = argument_pol(z)
    return [r*cos(teta), r*sin(teta)]

# Addition
def addZ_pol(t1, t2) : 
    return conversion_car_pol(addZ_car(conversion_pol_car(t1), conversion_pol_car(t2)))

# Opposé
def oppZ_pol(t) : 
    return conversion_car_pol(oppZ_car(conversion_pol_car(t)))

# Soustraction
def sousZ_pol(t1, t2) : 
    return addZ_pol(t1, oppZ_pol(t2))

# Multiplication
def multZ_pol(t1, t2) : 
    return [module_pol(t1)*module_pol(t2), argument_pol(t1)+argument_pol(t2)]

# Inverse
def invZ_pol(t) : 
    r = module_pol(t)
    if r == 0 :
        return []
    return [1/r, -argument_pol(t)]

# Division
def divZ_pol(t1, t2) : 
    inv = invZ_pol(t2)
    if inv == 0 :
        return []
    return multZ_pol(t1, inv)