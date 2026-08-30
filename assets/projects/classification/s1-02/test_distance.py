import math

from methode_distance import *

# ------------------------------
# Données de test
# ------------------------------

answers_dict = {
    "Lisa Fischer": [7, 4, 8, 5, 7, 10, 3, 7, 8, 5],
    "Donna Weiss": [4, 6, 2, 10, 2, 10, 4, 8, 7, 9],
    "Justin Sanchez": [6, 5, 9, 2, 2, 7, 6, 7, 8, 4]
}

refs = [
    {
        "house": "Serpentard",
        "answer": [4, 6, 5, 9, 1, 7, 3, 10, 9, 8]
    },
    {
        "house": "Poufsouffle",
        "answer": [3, 4, 9, 3, 6, 5, 10, 1, 9, 9]
    },
    {
        "house": "Serdaigle",
        "answer": [2, 10, 4, 5, 2, 10, 4, 3, 7, 3]
    },
    {
        "house": "Gryffondor",
        "answer": [9, 3, 6, 2, 10, 2, 5, 1, 8, 2]
    }
]

# ------------------------------

f = open("test_answers.txt", "w")
f.write("Lisa Fischer:7/4/8/5/7/10/3/7/8/5\n")
f.write("Donna Weiss:4/6/2/10/2/10/4/8/7/9\n")
f.close()

result = create_answers_from_texte_file("test_answers.txt")

assert result == {
    "Lisa Fischer": [7, 4, 8, 5, 7, 10, 3, 7, 8, 5],
    "Donna Weiss": [4, 6, 2, 10, 2, 10, 4, 8, 7, 9]
}


# ------------------------------

dist = Euclidean_distance(
    answers_dict["Lisa Fischer"],
    answers_dict["Donna Weiss"]
)

assert math.isclose(dist, 10.862780491200215)


# ------------------------------

rep = [9, 4, 5, 3, 9, 2, 5, 1, 8, 2]
house = Euclidean_house(rep, refs)

assert house == "Gryffondor"


# ------------------------------

repartition = Euclidean_repartition(answers_dict, refs)

assert repartition == {
    "Lisa Fischer": "Serpentard",
    "Donna Weiss": "Serpentard",
    "Justin Sanchez": "Serdaigle"
}

# ------------------------------

answer = [10] * 10
ref = {
    "house": "Serdaigle",
    "answer": [10] * 10
}

pos = insertion_position_NN(answer, ref, refs)
assert pos == 0

# ------------------------------

ref_far = {
    "house": "Serdaigle",
    "answer": [1] * 10
}

neighbors = insertion_NN(answer, ref_far, refs, 5)
assert len(neighbors) == 5
assert neighbors[-1] == ref_far


# ------------------------------

answer = [2, 1, 5, 6, 8, 2, 4, 3, 5, 9]
neighbors = NN(answer, refs, 2)

assert len(neighbors) == 2
assert neighbors[0]["house"] == "Poufsouffle"
assert neighbors[1]["house"] == "Gryffondor"


# ------------------------------

neighbors_test = [
    {"house": "Serpentard", "answer": []},
    {"house": "Gryffondor", "answer": []},
    {"house": "Gryffondor", "answer": []}
]

house = NN_house(neighbors_test)
assert house == "Gryffondor"


# ------------------------------

repartition_nn = NN_repartition(answers_dict, refs, 3)

assert len(repartition_nn) == 3
assert repartition_nn["Lisa Fischer"] in [
    "Serpentard", "Poufsouffle", "Serdaigle", "Gryffondor"
]

print("Tous les tests ont réussi avec succès !")






