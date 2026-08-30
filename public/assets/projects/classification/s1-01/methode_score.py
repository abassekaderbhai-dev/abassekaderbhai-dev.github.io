def nombre_eleves(tab) :
    '''cette fonction prend en paramètre un tableau de réponses 
    et retourne le nombre d'elèves ayant répondu au questionnaire '''
    return len(tab)//5 #pour chaque élève il y a 5 information


def eleves(tab_reponses) :
    '''Fonction prenant en paramètre un tableau de réponses et retournant un tableau contenant uniquement 
    le nom des élèves ayant répondu aux questionnaire. ''' 
    i = 0 
    tab_eleves = [] #tableau à retourner contenant le nom des elèves 
    while i < len(tab_reponses) :
        tab_eleves.append(tab_reponses[i])
        i += 5 #on augmente l'indice de 5 pour choisir que les prénoms
    return tab_eleves


def lecture_reponses(fichier) :
    '''Entrée : fichier texte
       Sortie : tableau '''
    
    f = open(fichier, 'r')
    texte = f.readline().strip()
    tab_finale = []
    while texte != '' :
        donnees = texte.split(":")
        donnees_num = donnees[1].split('/')
        tab_finale.append(donnees[0])
        i = 0 
        while i < 4 :
            tab_finale.append(int(donnees_num[i]))
            i += 1 
        texte = f.readline().strip()   
    
    f.close()    
    return tab_finale


def maison(tab, indice):
    '''Entrée : tableau de réponses ainsi que l'indice d'un élève
       Sortie : la maison correspondant à l'affectation de cet élève'''
    tab_maison = ["Gryffondor","Serdaigle","Poufsouffle","Serpentard"]
    # On initialise avec la première réponse de l'élève
    i = indice + 1
    val_max = tab[i]
    indice_max = 0
    j = 0
    while j < 4:
        if tab[indice + 1 + j] > val_max:
            val_max = tab[indice + 1 + j]
            indice_max = j
        j += 1
    return tab_maison[indice_max]


def repartition(tab) :
    '''Entrée : tableau de réponses
       Sortie : dictionnaire dont les clés sont les noms des élèves et 
       les valeurs la maison à laquelle les élèves ont été affectés'''
    dico = {} 
    i = 0 
    while i < len(tab) :
        dico[tab[i]] = maison(tab,i)
        i += 5 
    return dico


def nb_erreurs(dico1 , dico2) :
    '''Entrée : Deux dictionnaires dont les clés sont des élèves et les valeurs les 
                maisons auxquelles ils sont affectés
       Sortie : le nombre d'erreurs
    '''
    erreur = 0 
    cle = list(dico1)
    i = 0 
    while i < len(cle) :
        if dico1[cle[i]] != dico2[cle[i]] :
            erreur += 1 
        i += 1 
    return erreur 