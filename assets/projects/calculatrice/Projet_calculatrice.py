from tkinter import Tk, Button, Frame, Label, StringVar
from math import *

def action(val) :
    nb = display.get()
    if val == '0' :
        if nb == '0' : nb = '0'
        else : nb += val
    if val.isdigit() :
        if nb == '0' : nb = val
        else : nb += val
    if val == 'C' : nb = '0'
    if val == '⌫' :
        nb = nb[:-1]
        if len(nb) == 0 : nb = '0'
    tabl = ['.', '+', '-', 'x', '÷']
    if val == '.' :
        if '.' not in nb : nb +='.'
    if val == '+' :
        if nb[-1] not in tabl : nb += '+'
    if val == '-' :
        if nb[-1] not in tabl : nb += '-'
    if val == 'x' :
        if nb[-1] not in tabl : nb += 'x'
    if val == '÷' :
        if nb[-1] not in tabl : nb += '÷'
    if val == '=' :
        if nb[-1] not in tabl :
            if '+' in nb :
                pos=nb.index('+'); nb1=nb[:pos]; nb2=nb[pos+1:]; nb=float(nb1)+float(nb2)
            elif '-' in nb :
                pos=nb.index('-'); nb1=nb[:pos]; nb2=nb[pos+1:]; nb=float(nb1)-float(nb2)
            elif 'x' in nb :
                pos=nb.index('x'); nb1=nb[:pos]; nb2=nb[pos+1:]; nb=float(nb1)*float(nb2)
            elif '÷' in nb :
                pos=nb.index('÷'); nb1=nb[:pos]; nb2=nb[pos+1:]
                if nb2 != 0 :
                    nb=float(nb1)/float(nb2); nb=round(nb,4)
    return display.set(nb)

def bouton(val) :
    return Button(frame_boutons,width='3',height='2',command=lambda:action(val),text=val,background='brown',font=("Courier",20))
fenetre=Tk();fenetre.geometry("305x403");fenetre.title("calculatrice")
frame_ecran=Frame(fenetre);frame_ecran.pack();display=StringVar();display.set('0');premnb=StringVar()
ecran=Label(frame_ecran,textvariable=display,font=("Courier",35));ecran.pack();frame_boutons=Frame(fenetre,height="200");frame_boutons.pack()
boutons=['C','()','⌫','÷','1','2','3','x','4','5','6','-','7','8','9','+','±','0','.','=']
i=0;ligne=0;colonne=0
while i<len(boutons):
    if colonne==4: colonne=0;ligne+=1
    bouton(boutons[i]).grid(column=colonne,row=ligne);colonne+=1;i+=1
fenetre.mainloop()
