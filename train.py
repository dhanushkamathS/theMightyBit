#Make sure to pass a number as system argument when running this code
#this number specifies the random seed
#program to train various algos

from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn import tree
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import numpy as np
import pandas as pd
import os
import pickle
from lr_utils import *
import sys
import json

df = pd.read_csv('training.csv')
Df = pd.read_csv('training.csv', index_col='prognosis')
tr = pd.read_csv('testing.csv')

disease, l1 = get_list()

df.replace({'prognosis':{'Fungal infection':0,'Allergy':1,'GERD':2,'Chronic cholestasis':3,'Drug Reaction':4,
    'Peptic ulcer diseae':5,'AIDS':6,'Diabetes ':7,'Gastroenteritis':8,'Bronchial Asthma':9,'Hypertension ':10,
    'Migraine':11,'Cervical spondylosis':12,
    'Paralysis (brain hemorrhage)':13,'Jaundice':14,'Malaria':15,'Chicken pox':16,'Dengue':17,'Typhoid':18,'hepatitis A':19,
    'Hepatitis B':20,'Hepatitis C':21,'Hepatitis D':22,'Hepatitis E':23,'Alcoholic hepatitis':24,'Tuberculosis':25,
    'Common Cold':26,'Pneumonia':27,'Dimorphic hemmorhoids(piles)':28,'Heart attack':29,'Varicose veins':30,'Hypothyroidism':31,
    'Hyperthyroidism':32,'Hypoglycemia':33,'Osteoarthristis':34,'Arthritis':35,
    '(vertigo) Paroymsal  Positional Vertigo':36,'Acne':37,'Urinary tract infection':38,'Psoriasis':39,
    'Impetigo':40}},inplace=True)

tr.replace({'prognosis':{'Fungal infection':0,'Allergy':1,'GERD':2,'Chronic cholestasis':3,'Drug Reaction':4,
    'Peptic ulcer diseae':5,'AIDS':6,'Diabetes ':7,'Gastroenteritis':8,'Bronchial Asthma':9,'Hypertension ':10,
    'Migraine':11,'Cervical spondylosis':12,
    'Paralysis (brain hemorrhage)':13,'Jaundice':14,'Malaria':15,'Chicken pox':16,'Dengue':17,'Typhoid':18,'hepatitis A':19,
    'Hepatitis B':20,'Hepatitis C':21,'Hepatitis D':22,'Hepatitis E':23,'Alcoholic hepatitis':24,'Tuberculosis':25,
    'Common Cold':26,'Pneumonia':27,'Dimorphic hemmorhoids(piles)':28,'Heart attack':29,'Varicose veins':30,'Hypothyroidism':31,
    'Hyperthyroidism':32,'Hypoglycemia':33,'Osteoarthristis':34,'Arthritis':35,
    '(vertigo) Paroymsal  Positional Vertigo':36,'Acne':37,'Urinary tract infection':38,'Psoriasis':39,
    'Impetigo':40}},inplace=True)

x = df[l1]
y = df[['prognosis']]
np.ravel(y)
x_test = tr[l1]
y_test = tr[['prognosis']]
np.ravel(y_test)

def write_json(filename, data):
    file = filename + ".json"
    with open(file, 'w') as fp:
        json.dump(data, fp)

def train_model():
    clf3 = tree.DecisionTreeClassifier()
    clf1 = RandomForestClassifier()
    knn=KNeighborsClassifier(n_neighbors=5,metric='minkowski',p=2)
    gnb = GaussianNB()
    gnb.fit(x, np.ravel(y))
    clf3.fit(x ,y)
    clf1.fit(x, np.ravel(y))
    knn=knn.fit(x,np.ravel(y))
    with open('tree_model','wb') as f:
        pickle.dump(clf3, f)
    with open('random_forest','wb') as f:
        pickle.dump(clf1, f)
    with open('naive', 'wb') as f:
        pickle.dump(gnb, f)
    with open('knn', 'wb') as f:
        pickle.dump(knn, f)
    y_pred_tree = clf3.predict(x)
    y_pred_rand = clf1.predict(x)
    y_pred_naiv = gnb.predict(x)
    y_pred_knn = knn.predict(x)
    tree_acc = accuracy_score(y, y_pred_tree)
    random_acc = accuracy_score(y, y_pred_rand)
    naive_acc = accuracy_score(y, y_pred_naiv)
    knn_acc = accuracy_score(y, y_pred_knn)
    accuracy = {"tree" : tree_acc,
                "rand" : random_acc,
                "naiv" : naive_acc,
                "knn" : knn_acc}
    return accuracy

n = int(sys.argv[1])
np.random.seed(n)
acc = train_model()
data = {}
data['tree'] = acc['tree']
data['random'] = acc['rand']
data['naives'] = acc['naiv']
data['knn'] = acc['knn']
write_json('train_accuracy', data)