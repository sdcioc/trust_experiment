
# Author: Ciocirlan Stefan-Dan 17/03/2019
import numpy as np

from sklearn.datasets import make_classification

from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.feature_selection import f_classif
from sklearn.gaussian_process import GaussianProcessClassifier
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.linear_model import RidgeClassifier
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from sklearn.naive_bayes import BernoulliNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.semi_supervised import LabelPropagation
from sklearn.svm import LinearSVC
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.calibration import CalibratedClassifierCV


def do_machinea_leaning_stuff(train_X, train_Y, test_X, test_Y):
    returnValue = [];
    test_predict_Y = [];

    # de facut ceva cu acest rezultat
    f_classif(X, y);

    #Algoritmi de clasificare
    rfc = RandomForestClassifier(n_estimators=100, max_depth=2, random_state=0);
    rfc.fit(train_X, train_Y);
    test_predict_Y = rfc.predict(test_X);
    returnValue.append({
        'name' : "RandomForestClassifier",
        'score' : rfc.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });

    etc = ExtraTreesClassifier();
    etc.fit(train_X, train_Y);
    test_predict_Y = etc.predict(test_X);
    returnValue.append({
        'name' : "ExtraTreesClassifier",
        'score' : etc.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });

    gpc = GaussianProcessClassifier(random_state=0);
    gpc.fit(train_X, train_Y);
    test_predict_Y = gpc.predict(test_X);
    # TODO : poate folosim si asta print(gpc.predict_proba(test_X))
    returnValue.append({
        'name' : "GaussianProcessClassifier",
        'score' : gpc.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });


    pac = PassiveAggressiveClassifier(max_iter=1000, random_state=0, tol=1e-3);
    pac.fit(train_X, train_Y);
    test_predict_Y = pac.predict(test_X);
    returnValue.append({
        'name' : "PassiveAggressiveClassifier",
        'score' : pac.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });

    rc = RidgeClassifier();
    rc.fit(train_X, train_Y);
    test_predict_Y = rc.predict(test_X);
    returnValue.append({
        'name' : "RidgeClassifier",
        'score' : rc.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });

    sgdc = SGDClassifier(max_iter=1000, tol=1e-3);
    sgdc.fit(train_X, train_Y);
    test_predict_Y = sgdc.predict(test_X);
    returnValue.append({
        'name' : "SGDClassifier",
        'score' : sgdc.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });
    
    
    bnb = BernoulliNB();
    bnb.fit(train_X, train_Y);
    test_predict_Y = bnb.predict(test_X);
    returnValue.append({
        'name' : "BernoulliNB",
        'score' : bnb.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });

    knnc = KNeighborsClassifier(n_neighbors=3);
    knnc.fit(train_X, train_Y)
    test_predict_Y = knnc.predict(test_X);
    returnValue.append({
        'name' : "KNeighborsClassifier",
        'score' : knnc.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });

    mlpc = MLPClassifier();
    mlpc.fit(train_X, train_Y)
    test_predict_Y = mlpc.predict(test_X);
    returnValue.append({
        'name' : "MLPClassifier",
        'score' : mlpc.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });

    label_prop_model = LabelPropagation();
    rng = np.random.RandomState(42);
    random_unlabeled_points = rng.rand(len(y)) < 0.3;
    labels = np.copy(y);
    labels[random_unlabeled_points] = -1;
    label_prop_model.fit(X, labels);
    test_predict_Y = label_prop_model.predict(test_X);
    returnValue.append({
        'name' : "LabelPropagation",
        'score' : label_prop_model.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });


    lsvc = LinearSVC(random_state=0, tol=1e-5);
    lsvc.fit(train_X, train_Y)
    test_predict_Y = lsvc.predict(test_X);
    returnValue.append({
        'name' : "LabelPropagation",
        'score' : label_prop_model.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });


    svc = SVC(gamma='auto');
    svc.fit(train_X, train_Y);
    test_predict_Y = svc.predict(test_X);
    returnValue.append({
        'name' : "SVC",
        'score' : svc.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });
    
    dtc = DecisionTreeClassifier(random_state=0);
    dtc.fit(train_X, train_Y);
    test_predict_Y = dtc.predict(test_X);
    returnValue.append({
        'name' : "DecisionTreeClassifier",
        'score' : dtc.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });

    cccv = CalibratedClassifierCV();
    cccv.fit(train_X, train_Y)
    test_predict_Y = cccv.predict(test_X);
    returnValue.append({
        'name' : "CalibratedClassifierCV",
        'score' : cccv.score(X, y),
        'accuracy_naive' : (test_Y != test_predict_Y).sum() * 1.0 / len(test_predict_Y),
        'accuracy_score' : accuracy_score(test_Y, test_predict_Y),
        'classification_report' : classification_report(test_Y, test_predict_Y)
    });

    return returnValue;



if __name__ == '__main__':
    X, y = make_classification(n_samples=1000, n_features=4,
                            n_informative=2, n_redundant=0,
                            random_state=0, shuffle=False);
    test_X = [[0, 0, 0, 0], [0, 1, 1, 0]];
    test_Y = [1, 0];
    print(do_machinea_leaning_stuff(X,y,test_X,test_Y));


