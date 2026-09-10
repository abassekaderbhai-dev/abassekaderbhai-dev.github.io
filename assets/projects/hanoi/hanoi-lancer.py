import hanoi
import time


def resoudre_hanoi(nb_disques, depart, arrivee, intermediaire):
    if nb_disques == 1:
        hanoi.deplace_disque(depart, arrivee)
        time.sleep(0.3)
    else:
        resoudre_hanoi(nb_disques - 1, depart, intermediaire, arrivee)

        hanoi.deplace_disque(depart, arrivee)
        time.sleep(0.3)

        resoudre_hanoi(nb_disques - 1, intermediaire, arrivee, depart)


nb_disques = 5

hanoi.dessine_depart(nb_disques)

resoudre_hanoi(nb_disques, 1, 3, 2)

hanoi.fin()