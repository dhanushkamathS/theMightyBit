#takes in strings as system variables
#system variables needs to match exactly with list l1, refer lr_utils for more info
#program to predict

from sklearn.preprocessing import StandardScaler
import numpy as np
import pandas as pd
import os
import sys
import json
import pickle
from lr_utils import *
import sys

#List of Diseases is listed in list disease.
disease, l1 = get_list()                        #gets the list of diseases and symptoms

l2 = []
for i in range(0, len(l1)):
    l2.append(0)

def write_json(filename, data):
    file = filename + ".json"
    with open(file, 'w') as fp:
        json.dump(data, fp)

def tree_model(psymptoms):
    with open('tree_model', 'rb') as f:
        clf3 = pickle.load(f)
    with open('random_forest', 'rb') as f:
        clf1 = pickle.load(f)
    with open('naive', 'rb') as f:
        gnb = pickle.load(f)
    with open('knn', 'rb') as f:
        knn = pickle.load(f)
    for k in range(0, len(l1)):
        for z in psymptoms:
            if(z==l1[k]):
                l2[k] = 1
    tree_ = disease[int(clf3.predict([l2]))]
    random = disease[int(clf1.predict([l2]))]
    naives = disease[int(gnb.predict([l2]))]
    knn = disease[int(knn.predict([l2]))]
    return tree_, random, naives, knn

#train_model()
tree_, random, naives, knn = tree_model(sys.argv[1:])
filename = 'test'
data = {}
data['tree'] = tree_
data['random'] = random
data['naives'] = naives
data['knn'] = knn
write_json(filename, data)
print(tree_)
print(random)
print(naives)
print(knn)