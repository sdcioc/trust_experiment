#! /usr/bin/python

# Author: Ciocirlan Stefan-Dan 04/03/2019

import json
import subprocess
from sklearn.naive_bayes import GaussianNB

class MyAnalyzer:
    def __init__(self):
        print ("initalizat");
        self.events = {};
        self.feedbacks = {};
        self.data_train_X = [];
        self.data_train_Y = [];
        self.data_test_X = [];
        self.data_test_Y = [];
        self.data_predicted_Y = [];
        self.gnb = GaussianNB()
    
    def load_files(self):
        events_files=subprocess.run(['ls | grep event'], stdout=subprocess.PIPE, shell=True).stdout.decode('utf-8').splitlines();
        for event_filename in events_files:
            with open(event_filename) as fd:
                self.events[event_filename.spli('.')[0]] = json.loads(fd.read());
        feedbacks_files=subprocess.run(['ls | grep feedback'], stdout=subprocess.PIPE, shell=True).stdout.decode('utf-8').splitlines();
        for feedback_filename in feedbacks_files:
            with open(feedback_filename) as fd:
                self.feedbacks[feedback_filename.spli('.')[0]] = json.loads(fd.read());
    
    def make_train_data(self):
        for username in self.feedbacks:
            fb_dict = self.feedbacks[username];
            #TODO: de gandit daca se mentine
            new_data_X = [];
            new_data_X.append(fb_dict["0"]["value"]); #Tk-1
            new_data_X.append(fb_dict["0"]["value"]); #Pk-1 TODO
            new_data_X.append(fb_dict["1"]["COM"]); #COM
            new_data_X.append(fb_dict["1"]["D"]); #D
            new_data_X.append(fb_dict["1"]["IM"]); #IM
            new_data_X.append(fb_dict["1"]["IH"]); #IH
            new_data_X.append(fb_dict["1"]["IR"]); #IR
            new_data_X.append(fb_dict["1"]["F"]); #F
            new_data_X.append(fb_dict["1"]["P"]); #Pk
            new_data_Y = fb_dict["1"]["T"]; #Tk
            self.data_train_X.append(new_data_X);
            self.data_train_Y.append(new_data_Y);
            new_data_X = [];
            new_data_X.append(fb_dict["1"]["T"]); #Tk-1
            new_data_X.append(fb_dict["1"]["P"]); #Pk-1
            new_data_X.append(fb_dict["2"]["COM"]); #COM
            new_data_X.append(fb_dict["2"]["D"]); #D
            new_data_X.append(fb_dict["2"]["IM"]); #IM
            new_data_X.append(fb_dict["2"]["IH"]); #IH
            new_data_X.append(fb_dict["2"]["IR"]); #IR
            new_data_X.append(fb_dict["2"]["F"]); #F
            new_data_X.append(fb_dict["2"]["P"]); #Pk
            new_data_Y = fb_dict["2"]["T"]; #Tk
            self.data_train_X.append(new_data_X);
            self.data_train_Y.append(new_data_Y);
            new_data_X = [];
            new_data_X.append(fb_dict["2"]["T"]); #Tk-1
            new_data_X.append(fb_dict["2"]["P"]); #Pk-1
            new_data_X.append(fb_dict["3"]["COM"]); #COM
            new_data_X.append(fb_dict["3"]["D"]); #D
            new_data_X.append(fb_dict["3"]["IM"]); #IM
            new_data_X.append(fb_dict["3"]["IH"]); #IH
            new_data_X.append(fb_dict["3"]["IR"]); #IR
            new_data_X.append(fb_dict["3"]["F"]); #F
            new_data_X.append(fb_dict["3"]["P"]); #Pk
            new_data_Y = fb_dict["3"]["T"]; #Tk
            self.data_train_X.append(new_data_X);
            self.data_train_Y.append(new_data_Y);
    
    def train(self):
        self.gnb.fit(self.data_train_X, self.data_train_Y);
    
    def predict(self):
        self.data_predicted_Y = self.gnb.predict(self.data_test_X);
    
    def accuracy(self):
        return (self.data_test_Y != self.data_predicted_Y).sum();
