
function pre_questions_page_enter() {
    document.getElementById("pre_questions_page").hidden = false;
    experiment_events[experiment_index] = {
        'dateString' : new Date().toJSON(),
        'name' : "PageOpened",
        'type' : "PreQuestionsPage"
    }
    experiment_index = experiment_index + 1;

    test_pre_questions();
}

function pre_questions_page_exit() {
    document.getElementById("pre_questions_page").hidden = true;
}

function test_pre_questions() {
    swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: false,
        progressSteps: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
        allowOutsideClick: false,
        width : "80%",
      }).queue([
        // 1. Greeting messages
        {
            title: 'Please complete the next questionnaire'
        },
        // 2. Gender
        {
            title: 'Please select your gender',
            input: 'radio',
            inputOptions: {
                "male" : "Male",
                "female" : "Female",
                "other" : "Other"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 3. Age
        {
            title: 'Please write your age',
            input: 'text',
            inputPlaceholder: 'Type your age here...',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }

                var n = Math.floor(Number(value));
                if ( n !== Infinity && String(n) === value && n >= 0 ) {
                    console.log("numar bun");
                } else {
                    return 'Please write a postive integer'
                }
            }
        },
        // 4. Country
        {
            title: 'Please select your country',
            input: 'select',
            inputOptions: {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"},
            inputPlaceholder: 'Select your contry',
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 5. Educational Background
        {
            title: 'What is your educational background ?',
            input: 'radio',
            inputOptions: {
                "SCS" : "Social and Cognitive Sciences",
                "TS" : "Technical Sciences",
                "MS" : "Medical Sciences",
                "CS" : "Computer Sciences",
                "N" : "None",
                "O" : "Other"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 6. Knowledge about the robots
        {
            title: 'How is you knowledge about robots ?',
            input: 'radio',
            inputOptions: {
                "5" : "Very Well",
                "4" : "Well",
                "3" : "Acceptable",
                "2" : "Poor",
                "1" : "Very Poor"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 7. Interact with a robot before
        {
            title: 'Did you interact with a robot before ?',
            input: 'radio',
            inputOptions: {
                "yes" : "Yes",
                "no" : "No"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 8. Willing to count on Tiago
        {
            title: 'To what extent are you willing to count on Tiago?',
            input: 'radio',
            inputOptions: {
                "1" : "To an Extremely Small Extent",
                "2" : "To a Very Small Extent",
                "3" : "To a Small Extent",
                "4" : "To a Moderate Extent",
                "5" : "To a Large Extent",
                "6" : "To a Very Large Extent",
                "7" : "To an Extremely Large Extent"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 9. Friend with Tiago
        {
            title: 'To what extent would you like to become friend with Tiago?',
            input: 'radio',
            inputOptions: {
                "1" : "To an Extremely Small Extent",
                "2" : "To a Very Small Extent",
                "3" : "To a Small Extent",
                "4" : "To a Moderate Extent",
                "5" : "To a Large Extent",
                "6" : "To a Very Large Extent",
                "7" : "To an Extremely Large Extent"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 10. Cooperate with Tiago
        {
            title: 'To what extent are you willing to cooperate with Tiago?',
            input: 'radio',
            inputOptions: {
                "1" : "To an Extremely Small Extent",
                "2" : "To a Very Small Extent",
                "3" : "To a Small Extent",
                "4" : "To a Moderate Extent",
                "5" : "To a Large Extent",
                "6" : "To a Very Large Extent",
                "7" : "To an Extremely Large Extent"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 11. Education of one of my parents
        {
            title: 'The highest formal education of one of my parents is:',
            input: 'radio',
            inputOptions: {
                "ES" : "Elementary school",
                "HS" : "High school",
                "PS" : "Professional school",
                "BD" : "Bachelor Degree",
                "MD" : "Master degree",
                "PHD" : "PhD degree"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 12. When I grew up i was
        {
            title: 'When I grew up i was:',
            input: 'radio',
            inputOptions: {
                "ONLY" : "The only child in my family",
                "YOUNG" : "Youngest in a family with more than one child",
                "OLD" : "Oldest in a family with more than one child",
                "MIDDLE" : "I was neither the oldest nor the youngest in my family"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 13. With which of the following two statements do you agree
        {
            title: 'With which of the following two statements do you agree:',
            input: 'radio',
            inputOptions: {
                "RT" : "The robots can be trusted",
                "RNT" : "You can't be too careful in dealing with robots"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 14. Would you say that most of the time robots
        {
            title: 'Would you say that most of the time robots:',
            input: 'radio',
            inputOptions: {
                "RH" : "Try to be helpful",
                "RNH" : "Are not so helpful"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 15. Do you think that robots would try to
        {
            title: 'Do you think that robots would try to:',
            input: 'radio',
            inputOptions: {
                "RA" : "Take advantages of you if they got a change",
                "RF" : "Be fair"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 16. Mean to me
        {
            title: 'When somebody else is mean to me:',
            input: 'radio',
            inputOptions: {
                "R" : "I go out of my way to be mean back to them",
                "C" : "I let it pass as if nothing had happened"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        },
        // 17. To what extent do you trust Tiago in doing the tasks right now ?
        {
            title: 'To what extent do you trust Tiago in doing the tasks right now ?',
            input: 'radio',
            inputOptions: {
                "1" : "To an Extremely Small Extent",
                "2" : "To a Very Small Extent",
                "3" : "To a Small Extent",
                "4" : "To a Moderate Extent",
                "5" : "To a Large Extent",
                "6" : "To a Very Large Extent",
                "7" : "To an Extremely Large Extent"
            },
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        }
      ]).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
            console.log("EROARE");
        } else if (result.value) {
            console.log("ce rezulta este:", result.value);
            feedback_values[feedback_index] = {
                "T0" : Number.parseInt(result.value[result.value.length - 1]),
                "QA" : result.value
            };
            feedback_index = feedback_index + 1;
            changeState("main_page");
        }
    })
}