#! /usr/bin/python

# Author: Ciocirlan Stefan-Dan 04/03/2019

import json
import subprocess
import csv
from testing_ml import do_machinea_leaning_stuff
from scipy import stats
import numpy as np
from sklearn.model_selection import train_test_split

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
        self.question_counting = {};
        for index in xrange(17):
            self.question_counting["Q" + str(index+1)] = {};
    
    def load_files(self):
        #events_files=subprocess.run(['ls | grep event'], stdout=subprocess.PIPE, shell=True).stdout.decode('utf-8').splitlines();
        #for event_filename in events_files:
        #    with open(event_filename) as fd:
        #        self.events[event_filename.spli('.')[0]] = json.loads(fd.read());
        feedbacks_files=subprocess.Popen(['ls | grep feedback'], stdout=subprocess.PIPE, shell=True).stdout;
        for feedback_filename in feedbacks_files:
            feedback_filename = feedback_filename.rstrip();
            with open(feedback_filename) as fd:
                self.feedbacks[feedback_filename.split('.')[0]] = json.loads(fd.read());
    
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
            for index,value in enumerate(fb_dict["0"]["QA"]):
                new_train_data_X_type_1.append(fb_dict["0"]["QA"][index]);
                new_train_data_X_type_2.append(fb_dict["0"]["QA"][index]);
                new_train_data_X_type_3.append(fb_dict["0"]["QA"][index]);
                new_all_train_data["Q" + str(index+1)] = fb_dict["0"]["QA"][index];
                if value in self.question_counting["Q" + str(index+1)]:
                    self.question_counting["Q" + str(index+1)][value] = self.question_counting["Q" + str(index+1)][value] + 1;
                else:
                    self.question_counting["Q" + str(index+1)][value] = 1;
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
            if("1" in fb_dict):
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
                if ("NM" in fb_dict["1"]):
                    new_data_X.append(fb_dict["1"]["NM"]); #NoMessagesk
                else:
                    new_data_X.append(0);
                new_data_Y = fb_dict["1"]["TK"]; #Tk
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
                if ("NM" in fb_dict["1"]):
                    new_all_train_data["NM1"] = fb_dict["1"]["NM"]; #NoMessagesk
                else:
                    new_all_train_data["NM1"] = 0;
                new_all_train_data["T1"] = fb_dict["1"]["TK"]; ##Tk
                self.train_data_X_type_1.append(new_train_data_X_type_1);
                self.train_data_Y_type_1.append(new_train_data_Y_type_1);

                if("2" in fb_dict):
                    new_data_X = [];
                    new_data_X.append(fb_dict["1"]["TK"]); #Tk-1
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
                    if ("NM" in fb_dict["2"]):
                        new_data_X.append(fb_dict["2"]["NM"]); #NoMessagesk
                    else:
                        new_data_X.append(0);
                    new_data_Y = fb_dict["2"]["TK"]; #Tk
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
                    if ("NM" in fb_dict["2"]):
                        new_all_train_data["NM2"] = fb_dict["2"]["NM"]; #NoMessagesk
                    else:
                        new_all_train_data["NM2"] = 0;
                    new_all_train_data["T2"] = fb_dict["2"]["TK"]; ##Tk
                    self.train_data_X_type_2.append(new_train_data_X_type_2);
                    self.train_data_Y_type_2.append(new_train_data_Y_type_2);

                    if("3" in fb_dict):
                        new_data_X = [];
                        new_data_X.append(fb_dict["2"]["TK"]); #Tk-1
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
                        if ("NM" in fb_dict["3"]):
                            new_data_X.append(fb_dict["3"]["NM"]); #NoMessagesk
                        else:
                            new_data_X.append(0);
                        new_data_Y = fb_dict["3"]["TK"]; #Tk
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
                        if ("NM" in fb_dict["3"]):
                            new_all_train_data["NM3"] = fb_dict["3"]["NM"]; #NoMessagesk
                        else:
                            new_all_train_data["NM3"] = 0;
                        new_all_train_data["T3"] = fb_dict["3"]["TK"]; ##Tk
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
        X_train, X_test, y_train, y_test = train_test_split(self.data_train_X, self.data_train_Y, test_size=0.33, random_state=42)
        with open('results_data.csv', mode='w') as csv_file:
            fieldnames = [];
            #results = do_machinea_leaning_stuff(self.train_X, self.train_Y, self.test_X, self.test_Y);
            results = do_machinea_leaning_stuff(X_train, y_train, X_test, y_test);
            for x in results[0]:
                fieldnames.append(x);
            writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

            writer.writeheader()
            writer.writerows(results);
    
    def analyze_data(self):
        print(self.question_counting);
        nr_part = self.question_counting['Q1'][True];
        print ("Numar de participanti:" + str(nr_part));
        nr_males = self.question_counting['Q2']['male'];
        nr_females = self.question_counting['Q2']['female'];
        nr_others = self.question_counting['Q2']['other'];
        pr_males = (nr_males * 100.0) / nr_part;
        pr_females = (nr_females * 100.0) / nr_part;
        pr_others = (nr_others * 100.0) / nr_part;
        print("numar barabati:" + str(nr_males) + " procent:" + str(pr_males));
        print("numar femeie:" + str(nr_females) + " procent:" + str(pr_females));
        print("numar alt gen:" + str(nr_others) + " procent:" + str(pr_others));
        ages = [];
        for age in self.question_counting['Q3']:
            for i in xrange(self.question_counting['Q3'][age]):
                ages.append(int(age));
        np_ages = np.array(ages);
        mean_age = np.mean(np_ages);
        std_age = np.std(np_ages);
        min_age = np.min(np_ages);
        max_age = np.max(np_ages);
        print("Varsta medies:" + str(mean_age) + " deviata standard:" + str(std_age) + " max:" + str(max_age) + " min:" + str(min_age));
        different_countries = 0;
        for country in self.question_counting['Q4']:
            different_countries = different_countries + 1;
        print("Numar de tari:" + str(different_countries));
        nr_cs = self.question_counting['Q5']['CS'];
        nr_ts = self.question_counting['Q5']['TS'];
        nr_ms = self.question_counting['Q5']['MS'];
        nr_scs = self.question_counting['Q5']['SCS'];
        nr_o = self.question_counting['Q5']['O'];
        pr_cs = (nr_cs * 100.0) / nr_part;
        pr_ts = (nr_ts * 100.0) / nr_part;
        pr_ms = (nr_ms * 100.0) / nr_part;
        pr_scs = (nr_scs * 100.0) / nr_part;
        pr_o = (nr_o * 100.0) / nr_part;
        print (" Computer sciecne nr:" + str(nr_cs) + " pr:" + str(pr_cs));
        print (" Technical sciecne nr:" + str(nr_ts) + " pr:" + str(pr_ts));
        print (" Medical sciecne nr:" + str(nr_ms) + " pr:" + str(pr_ms));
        print (" Social sciecne nr:" + str(nr_scs) + " pr:" + str(pr_scs));
        print (" Other nr:" + str(nr_o) + " pr:" + str(pr_o));
        #Q6 knowledge robot
        print ("Knowledge about the robots: Very poor:" + str(self.question_counting['Q6']['1']) +
                "poor:" + + str(self.question_counting['Q6']['2']) +
                "Acceptable:" + + str(self.question_counting['Q6']['3']) +
                "Well:" + + str(self.question_counting['Q6']['4']) +
                "Very Well:" + + str(self.question_counting['Q6']['5']));
        #Q7 intereact with robot
        print ("intereact with robots before: Yes:" + str(self.question_counting['Q7']['yes']) +
                "No:" + + str(self.question_counting['Q7']['no']) )
        #Q11 highest parents educational backgorund
        nr_es = self.question_counting['Q11']['ES'];
        nr_hs = self.question_counting['Q11']['HS'];
        nr_ps = self.question_counting['Q11']['PS'];
        nr_bd = self.question_counting['Q11']['BD'];
        nr_md = self.question_counting['Q11']['MD'];
        nr_phd = self.question_counting['Q11']['PHD'];
        pr_es = (nr_es * 100.0) / nr_part;
        pr_hs = (nr_hs * 100.0) / nr_part;
        pr_ps = (nr_ps * 100.0) / nr_part;
        pr_bd = (nr_bd * 100.0) / nr_part;
        pr_md = (nr_md * 100.0) / nr_part;
        pr_phd = (nr_phd * 100.0) / nr_part;
        print("PArents:")
        print (" Elementary school nr:" + str(nr_es) + " pr:" + str(pr_es));
        print (" High school nr:" + str(nr_hs) + " pr:" + str(pr_hs));
        print (" Professional school nr:" + str(nr_ps) + " pr:" + str(pr_ps));
        print (" Bachelor Degree nr:" + str(nr_bd) + " pr:" + str(pr_bd));
        print (" Master degree nr:" + str(nr_md) + " pr:" + str(pr_md));
        print (" PhD degree nr:" + str(nr_phd) + " pr:" + str(pr_phd));

    def statistical_test(self):
        Cond1 =[];
        Cond2 =[];
        Cond = [];
        for value in self.all_train_data:
            if(value["COM1"] > -1):
                if(value["S1"] > -1):
                    Cond1.append(value["COM1"]);
                    Cond2.append(value["S1"]);
                    Cond.append(value["COM1"]*2+value["S1"]);
        print("Conditia de comunicare")
        print(stats.shapiro(np.array(Cond1)))
        print("Conditia de serviciu")
        print(stats.shapiro(np.array(Cond2)))
        print("Conditiile impreuna")
        print(stats.shapiro(np.array(Cond)))
        print("persoane ce au facut taskuri")
        print((len(Cond)))

if __name__ == '__main__':
    my_analyzer = MyAnalyzer();
    my_analyzer.load_files();
    my_analyzer.make_train_data();
    #my_analyzer.write_data_to_csv();
    #my_analyzer.write_results_to_csv();
    my_analyzer.analyze_data();