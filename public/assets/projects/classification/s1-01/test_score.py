from methode_score import *


reponses = ["Harry Potter", 10, 5, 8, 1, "Cedric Diggory", 6, 7, 9, 4, "Drago Malefoy", 1, 3, 2, 10]


def test_nb_eleves() :
    '''fonction de test unitaire de la fonction : nombre_eleves '''
    assert nombre_eleves(reponses) == 3
    print("test ok")


def test_eleves() :
    '''fonction de test unitaire de la fonction : eleves  '''
    assert eleves(reponses) == ["Harry Potter", "Cedric Diggory", "Drago Malefoy"]
    print("test ok ")


f = open("reponse", "w")
texte = f.write("Harry Potter:10/5/8/1\n""Cedric Diggory:6/7/9/4\n""Drago Malefoy:1/3/2/10\n")
f.close()


def test_lecture_reponse() :
    '''fonction de test unitaire de la fonction : lectures_reponses '''
    assert lecture_reponses("reponse") == ["Harry Potter", 10, 5, 8, 1, "Cedric Diggory", 6, 7, 9, 4, "Drago Malefoy", 1, 3, 2, 10]
    print("test ok")


def test_maison():
    '''fonction de test unitaire de la fonction : maison '''
    assert maison(reponses, 0) == "Gryffondor"
    assert maison(reponses, 5) == "Poufsouffle"
    assert maison(reponses, 10) == "Serpentard"
    print("test ok")


def test_repartition() :
    '''fonction de test unitaire de la fonction : repartition '''
    assert repartition(reponses) == {
    "Harry Potter": "Gryffondor",
   "Cedric Diggory": "Poufsouffle",
    "Drago Malefoy": "Serpentard"
    }
    print("test ok")


dico1 = {"Harry Potter": "Gryffondor", "Cedric Diggory": "Poufsouffle", "Drago Malefoy": "Serpentard"}
dico2 = {"Cedric Diggory": "Serdaigle", "Drago Malefoy": "Gryffondor", "Harry Potter": "Gryffondor"}
dico3 = {"Harry Potter": "Serpentard", "Cedric Diggory": "Poufsouffle", "Drago Malefoy": "Serdaigle"}

def test_nb_erreurs() :
    '''fonction de test unitaire de la fonction : nb_erreurs '''
    assert nb_erreurs(dico1, dico2) == 2
    assert nb_erreurs(dico1, dico3) == 2
    assert not nb_erreurs(dico2, dico3) == 2
    print("test ok")
    

test_nb_eleves()
test_eleves()
test_lecture_reponse()
test_maison()
test_repartition()
test_nb_erreurs()


a = lecture_reponses("questionnaire_premiere_annee.txt")
b = repartition(a)
c = lecture_reponses("affectation_premiere_annee.txt")
affectation_premiere_annee = repartition(c)
print(f"Le nombre d'erreurs est de {nb_erreurs(b, affectation_premiere_annee)}, soit {round((nb_erreurs(b, affectation_premiere_annee)/len(b)*100), 2)}% d'erreurs")

#essai de la répartition de manière aléatoire
from random import * 
nb_erreur = 0 
i = 0
while i < 100 :
    dico_alea = {}
    tab_maison = ["Gryffondor","Serdaigle","Poufsouffle","Serpentard"]
    cle = list(affectation_premiere_annee)
    j = 0
    while j < len(cle) : #parcours du dictinnaire par clé (on en parcours qu'un seul car les deux contiennent les mêmes clés) 
        dico_alea[cle[j]] = tab_maison[randint(0,3)]
        j += 1
    nb_erreur += nb_erreurs(affectation_premiere_annee,dico_alea)
    i += 1
    

print(f"il y'a en moyenne {nb_erreur/100} erreur par repartion aléatoire soit {nb_erreur/len(affectation_premiere_annee)} % d'erreur en moyenne")