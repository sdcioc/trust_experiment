#! /usr/bin/python

# Author: Ciocirlan Stefan-Dan 04/03/2019

import json
import subprocess
import csv
from testing_ml import do_machinea_leaning_stuff

class MyAnalyzer:
    def __init__(self):
        print ("initalizat");
        self.events = {};
        self.feedbacks = {};
        self.data_train_X = [];
        self.data_train_Y = [];
        self.data_test_X = [];
        self.data_test_Y = [];
        self.train_data_X_type_1 =[];
        self.train_data_X_type_2 =[];
        self.train_data_X_type_3 =[];
        self.all_train_data =[];
        self.train_data_Y_type_1 =[];
        self.train_data_Y_type_2 =[];
        self.train_data_Y_type_3 =[];
    
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
            new_train_data_X_type_1 = [];
            new_train_data_X_type_2 = [];
            new_train_data_X_type_3 = [];
            new_all_train_data = {};
            new_train_data_Y_type_1 = 0;
            new_train_data_Y_type_2 = 0;
            new_train_data_Y_type_3 = 0;
            for index in fb_dict["0"]["QA"]:
                new_train_data_X_type_1.append(fb_dict["0"]["QA"][index]);
                new_train_data_X_type_2.append(fb_dict["0"]["QA"][index]);
                new_train_data_X_type_3.append(fb_dict["0"]["QA"][index]);
                new_all_train_data["Q" + str(index)] = fb_dict["0"]["QA"][index];
            #TODO: de gandit daca se mentine
            new_data_X = [];
            new_all_train_data["T0"] = fb_dict["0"]["T0"];

            new_all_train_data["COM1"] = -1; #COM
            new_all_train_data["D1"] = -1; #D
            new_all_train_data["IM1"] = -1; #IM
            new_all_train_data["IH1"] = -1; #IH
            new_all_train_data["IR1"] = -1; #IR
            new_all_train_data["F1"] = -1; #F
            new_all_train_data["P1"] = -1; #Pk
            new_all_train_data["S1"] = -1; #Sk
            new_all_train_data["W1"] = -1; #Wk
            new_all_train_data["Task1"] = -1; #Tnok
            new_all_train_data["NM1"] = -1; #NoMessagesk
            new_all_train_data["T1"] = -1; ##Tk
            new_all_train_data["COM2"] = -1; #COM
            new_all_train_data["D2"] = -1; #D
            new_all_train_data["IM2"] = -1; #IM
            new_all_train_data["IH2"] = -1; #IH
            new_all_train_data["IR2"] = -1; #IR
            new_all_train_data["F2"] = -1; #F
            new_all_train_data["P2"] = -1; #Pk
            new_all_train_data["S2"] = -1; #Sk
            new_all_train_data["W2"] = -1; #Wk
            new_all_train_data["Task2"] = -1; #Tnok
            new_all_train_data["NM2"] = -1; #NoMessagesk
            new_all_train_data["T2"] = -1; ##Tk
            new_all_train_data["COM3"] = -1; #COM
            new_all_train_data["D3"] = -1; #D
            new_all_train_data["IM3"] = -1; #IM
            new_all_train_data["IH3"] = -1; #IH
            new_all_train_data["IR3"] = -1; #IR
            new_all_train_data["F3"] = -1; #F
            new_all_train_data["P3"] = -1; #Pk
            new_all_train_data["S3"] = -1; #Sk
            new_all_train_data["W3"] = -1; #Wk
            new_all_train_data["Task3"] = -1; #Tnok
            new_all_train_data["NM3"] = -1; #NoMessagesk
            new_all_train_data["T3"] = -1; #Tk
            if(fb_dict["1"]):
                new_data_X.append(fb_dict["0"]["T0"]); #Tk-1
                new_data_X.append(7); #Pk-1 TODO
                new_data_X.append(fb_dict["1"]["COM"]); #COM
                new_data_X.append(fb_dict["1"]["D"]); #D
                new_data_X.append(fb_dict["1"]["IM"]); #IM
                new_data_X.append(fb_dict["1"]["IH"]); #IH
                new_data_X.append(fb_dict["1"]["IR"]); #IR
                new_data_X.append(fb_dict["1"]["F"]); #F
                new_data_X.append(fb_dict["1"]["P"]); #Pk
                new_data_X.append(fb_dict["1"]["S"]); #Sk
                new_data_X.append(fb_dict["1"]["W"]); #Wk
                new_data_X.append(fb_dict["1"]["Task"]); #Tnok
                new_data_X.append(fb_dict["1"]["NM"]); #NoMessagesk
                new_data_Y = fb_dict["1"]["T"]; #Tk
                self.data_train_X.append(new_data_X);
                self.data_train_Y.append(new_data_Y);
                new_train_data_X_type_1.extend(new_data_X);
                new_train_data_X_type_2.extend(new_data_X);
                new_train_data_X_type_3.extend(new_data_X);
                new_train_data_Y_type_1 = new_data_Y;
                new_all_train_data["T0"] = fb_dict["0"]["T0"];
                new_all_train_data["COM1"] = fb_dict["1"]["COM"]; #COM
                new_all_train_data["D1"] = fb_dict["1"]["D"]; #D
                new_all_train_data["IM1"] = fb_dict["1"]["IM"]; #IM
                new_all_train_data["IH1"] = fb_dict["1"]["IH"]; #IH
                new_all_train_data["IR1"] = fb_dict["1"]["IR"]; #IR
                new_all_train_data["F1"] = fb_dict["1"]["F"]; #F
                new_all_train_data["P1"] = fb_dict["1"]["P"]; #Pk
                new_all_train_data["S1"] = fb_dict["1"]["S"]; #Sk
                new_all_train_data["W1"] = fb_dict["1"]["W"]; #Wk
                new_all_train_data["Task1"] = fb_dict["1"]["Task"]; #Tnok
                new_all_train_data["NM1"] = fb_dict["1"]["NM"]; #NoMessagesk
                new_all_train_data["T1"] = fb_dict["1"]["T"]; ##Tk
                self.train_data_X_type_1.append(new_train_data_X_type_1);
                self.train_data_Y_type_1.append(new_train_data_Y_type_1);

                if(fb_dict["2"]):
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
                    new_data_X.append(fb_dict["2"]["S"]); #Sk
                    new_data_X.append(fb_dict["2"]["W"]); #Wk
                    new_data_X.append(fb_dict["2"]["Task"]); #Tnok
                    new_data_X.append(fb_dict["2"]["NM"]); #NoMessagesk
                    new_data_Y = fb_dict["2"]["T"]; #Tk
                    self.data_train_X.append(new_data_X);
                    self.data_train_Y.append(new_data_Y);
                    new_train_data_X_type_2.extend(new_data_X);
                    new_train_data_X_type_3.extend(new_data_X);
                    new_train_data_Y_type_2 = new_data_Y;
                    new_all_train_data["COM2"] = fb_dict["2"]["COM"]; #COM
                    new_all_train_data["D2"] = fb_dict["2"]["D"]; #D
                    new_all_train_data["IM2"] = fb_dict["2"]["IM"]; #IM
                    new_all_train_data["IH2"] = fb_dict["2"]["IH"]; #IH
                    new_all_train_data["IR2"] = fb_dict["2"]["IR"]; #IR
                    new_all_train_data["F2"] = fb_dict["2"]["F"]; #F
                    new_all_train_data["P2"] = fb_dict["2"]["P"]; #Pk
                    new_all_train_data["S2"] = fb_dict["2"]["S"]; #Sk
                    new_all_train_data["W2"] = fb_dict["2"]["W"]; #Wk
                    new_all_train_data["Task2"] = fb_dict["2"]["Task"]; #Tnok
                    new_all_train_data["NM2"] = fb_dict["2"]["NM"]; #NoMessagesk
                    new_all_train_data["T2"] = fb_dict["2"]["T"]; ##Tk
                    self.train_data_X_type_2.append(new_train_data_X_type_2);
                    self.train_data_Y_type_2.append(new_train_data_Y_type_2);

                    if(fb_dict["3"]):
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
                        new_data_X.append(fb_dict["3"]["S"]); #Sk
                        new_data_X.append(fb_dict["3"]["W"]); #Wk
                        new_data_X.append(fb_dict["3"]["Task"]); #Tnok
                        new_data_X.append(fb_dict["3"]["NM"]); #NoMessagesk
                        new_data_Y = fb_dict["3"]["T"]; #Tk
                        self.data_train_X.append(new_data_X);
                        self.data_train_Y.append(new_data_Y);
                        new_train_data_X_type_3.extend(new_data_X);
                        new_train_data_Y_type_3 = new_data_Y;
                        new_all_train_data["COM3"] = fb_dict["3"]["COM"]; #COM
                        new_all_train_data["D3"] = fb_dict["3"]["D"]; #D
                        new_all_train_data["IM3"] = fb_dict["3"]["IM"]; #IM
                        new_all_train_data["IH3"] = fb_dict["3"]["IH"]; #IH
                        new_all_train_data["IR3"] = fb_dict["3"]["IR"]; #IR
                        new_all_train_data["F3"] = fb_dict["3"]["F"]; #F
                        new_all_train_data["P3"] = fb_dict["3"]["P"]; #Pk
                        new_all_train_data["S3"] = fb_dict["3"]["S"]; #Sk
                        new_all_train_data["W3"] = fb_dict["3"]["W"]; #Wk
                        new_all_train_data["Task3"] = fb_dict["3"]["Task"]; #Tnok
                        new_all_train_data["NM3"] = fb_dict["3"]["NM"]; #NoMessagesk
                        new_all_train_data["T3"] = fb_dict["3"]["T"]; ##Tk
                        self.train_data_X_type_3.append(new_train_data_X_type_3);
                        self.train_data_Y_type_3.append(new_train_data_Y_type_3);
            
            self.all_train_data.append(new_all_train_data);
            
    def write_data_to_csv(self):
        with open('input_data.csv', mode='w') as csv_file:
            fieldnames = [];
            for x in self.all_train_data[0]:
                fieldnames.append(x);
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

            writer.writeheader()
            writer.writerows(self.all_train_data);
            
    def write_results_to_csv(self):
        with open('results_data.csv', mode='w') as csv_file:
            fieldnames = [];
            results = do_machinea_leaning_stuff(self.train_X, self.train_Y, self.test_X, self.test_Y);
            for x in results[0]:
                fieldnames.append(x);
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

            writer.writeheader()
            writer.writerows(results);
if __name__ == '__main__':
    my_analyzer = MyAnalyzer();