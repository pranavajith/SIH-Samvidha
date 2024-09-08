
const constitutional_questions = {
    preamble_questions: [ 
        { "question": "In what year did the Constituent Assembly adopt the Constitution of India?", 
            "Options": [ 
                { "value": "1948", "correctStatus": false }, 
                { "value": "1949", "correctStatus": true }, 
                { "value": "1950", "correctStatus": false }, 
                { "value": "1947", "correctStatus": false } 
            ] 
        }, 
        { "question": "Which of the following is NOT a value mentioned in the Preamble of the Indian Constitution?", 
            "Options": [ 
                { "value": "Justice", "correctStatus": false }, 
                { "value": "Liberty", "correctStatus": false }, 
                { "value": "Monarchy", "correctStatus": true },
                { "value": "Fraternity", "correctStatus": false }, 
            ] 
        }, 
        // { "question": "According to the Preamble, which type of equality is guaranteed to Indian citizens?", 
        //     "Options": [ 
        //         { "value": "Social", "correctStatus": false }, 
        //         { "value": "Economic", "correctStatus": false }, 
        //         { "value": "Political", "correctStatus": false }, 
        //         { "value": "Status and Opportunity", "correctStatus": true } 
        //     ] 
        // },
        { "question": "Which word was added to the Preamble of the Indian Constitution by the 42nd Amendment in 1976?", 
            "Options": [ 
                { "value": "Secular", "correctStatus": false }, 
                { "value": "Socialist", "correctStatus": false }, 
                { "value": "Both Secular and Socialist", "correctStatus": true }, 
                { "value": "Republic", "correctStatus": false } 
            ] 
        }, 
        // { "question": "Which value in the Preamble promotes a sense of brotherhood among all citizens?", 
        //     "Options": [ 
        //         { "value": "Liberty", "correctStatus": false }, 
        //         { "value": "Justice", "correctStatus": false }, 
        //         { "value": "Fraternity", "correctStatus": true }, 
        //         { "value": "Equality", "correctStatus": false } 
        //     ] 
        // },
        // { "question": "Which aspect of 'Justice' is NOT explicitly mentioned in the Preamble of the Indian Constitution?", 
        //     "Options": [ 
        //         { "value": "Social", "correctStatus": false }, 
        //         { "value": "Economic", "correctStatus": false }, 
        //         { "value": "Political", "correctStatus": false }, 
        //         { "value": "Judicial", "correctStatus": true } 
        //     ] 
        // }, 
        { "question": "What is the first word of the Preamble of the Indian Constitution?", 
            "Options": [ 
                { "value": "We", "correctStatus": true }, 
                { "value": "The", "correctStatus": false }, 
                { "value": "India", "correctStatus": false }, 
                { "value": "Sovereign", "correctStatus": false } 
            ] 
        }, 
        { "question": "The Preamble declares India to be a __________ Republic.", 
            "Options": [ 
                { "value": "Sovereign, Socialist, Secular, Democratic", "correctStatus": true }, 
                { "value": "Sovereign, Socialist, Democratic", "correctStatus": false }, 
                { "value": "Sovereign, Democratic, Socialist", "correctStatus": false }, 
                { "value": "Democratic, Socialist, Secular", "correctStatus": false } 
            ] 
        },
    ],
    legislature_questions: [ 
        { "question": "What is the maximum term of the Lok Sabha?", 
            "Options": [ 
                { "value": "5 years", "correctStatus": true }, 
                { "value": "4 years", "correctStatus": false }, 
                { "value": "6 years", "correctStatus": false }, 
                { "value": "7 years", "correctStatus": false } 
            ] 
        }, 
        { "question": "Which house of the Indian Parliament is known as the ‘House of the People’?", 
            "Options": [ 
                { "value": "Lok Sabha", "correctStatus": true }, 
                { "value": "Rajya Sabha", "correctStatus": false }, 
                { "value": "Vidhan Sabha", "correctStatus": false }, 
                { "value": "Legislative Assembly", "correctStatus": false } 
            ] 
        }, 
        { "question": "How many members of the Rajya Sabha are nominated by the President?", 
            "Options": [ 
                { "value": "12", "correctStatus": true }, 
                { "value": "10", "correctStatus": false }, 
                { "value": "14", "correctStatus": false }, 
                { "value": "15", "correctStatus": false } 
            ] 
        }, 
        { "question": "The concept of 'Bicameralism' in Indian Parliament refers to which of the following?", 
            "Options": [ 
                { "value": "Having two houses: Lok Sabha and Rajya Sabha", "correctStatus": true }, 
                { "value": "Having only one house", "correctStatus": false }, 
                { "value": "Division between central and state legislatures", "correctStatus": false }, 
                { "value": "Division of powers between Judiciary and Legislature", "correctStatus": false } 
            ] 
        }, 
        { "question": "Who can preside over the joint session of both houses of Parliament?", 
            "Options": [ 
                { "value": "Speaker of Lok Sabha", "correctStatus": true }, 
                { "value": "President", "correctStatus": false }, 
                { "value": "Prime Minister", "correctStatus": false }, 
                { "value": "Chief Justice of India", "correctStatus": false } 
            ] 
        }, 
    ],
    executive_questions: [ 
        { "question": "Who is the head of the Union Executive in India?", 
            "Options": [ 
                { "value": "President", "correctStatus": true }, 
                { "value": "Prime Minister", "correctStatus": false }, 
                { "value": "Vice-President", "correctStatus": false }, 
                { "value": "Chief Justice of India", "correctStatus": false } 
            ] 
        }, 
        { "question": "What is the term of office for the President of India?", 
            "Options": [ 
                { "value": "5 years", "correctStatus": true }, 
                { "value": "6 years", "correctStatus": false }, 
                { "value": "4 years", "correctStatus": false }, 
                { "value": "7 years", "correctStatus": false } 
            ] 
        }, 
        { "question": "Which of the following appointments is made by the President of India?", 
            "Options": [ 
                { "value": "Chief Justice of India", "correctStatus": true }, 
                { "value": "Speaker of Lok Sabha", "correctStatus": false }, 
                { "value": "Governor of RBI", "correctStatus": false }, 
                { "value": "Chief Minister", "correctStatus": false } 
            ] 
        }, 
        { "question": "Which of the following is NOT a function of the Indian President?", 
            "Options": [ 
                { "value": "Appointing the Prime Minister", "correctStatus": false }, 
                { "value": "Dissolving the Lok Sabha", "correctStatus": false }, 
                { "value": "Passing ordinances", "correctStatus": false }, 
                { "value": "Declaring war without parliamentary approval", "correctStatus": true } 
            ] 
        }, 
        { "question": "Who chairs the meetings of the Union Cabinet?", 
            "Options": [ 
                { "value": "Prime Minister", "correctStatus": true }, 
                { "value": "President", "correctStatus": false }, 
                { "value": "Vice President", "correctStatus": false }, 
                { "value": "Speaker of Lok Sabha", "correctStatus": false } 
            ] 
        }, 
    ],
    judiciary_questions: [ 
        { "question": "What is the highest judicial body in India?", 
            "Options": [ 
                { "value": "Supreme Court", "correctStatus": true }, 
                { "value": "High Court", "correctStatus": false }, 
                { "value": "District Court", "correctStatus": false }, 
                { "value": "Tribunal", "correctStatus": false } 
            ] 
        }, 
        { "question": "What is the retirement age of a judge of the Supreme Court of India?", 
            "Options": [ 
                { "value": "65 years", "correctStatus": true }, 
                { "value": "62 years", "correctStatus": false }, 
                { "value": "60 years", "correctStatus": false }, 
                { "value": "70 years", "correctStatus": false } 
            ] 
        }, 
        { "question": "Which article of the Indian Constitution deals with the establishment of the Supreme Court?", 
            "Options": [ 
                { "value": "Article 124", "correctStatus": true }, 
                { "value": "Article 74", "correctStatus": false }, 
                { "value": "Article 352", "correctStatus": false }, 
                { "value": "Article 226", "correctStatus": false } 
            ] 
        }, 
        { "question": "Who can remove a Supreme Court judge?", 
            "Options": [ 
                { "value": "President after a Parliamentary process", "correctStatus": true }, 
                { "value": "Prime Minister", "correctStatus": false }, 
                { "value": "Chief Justice of India", "correctStatus": false }, 
                { "value": "Law Minister", "correctStatus": false } 
            ] 
        }, 
        { "question": "Which of the following writs is NOT issued by the Supreme Court?", 
            "Options": [ 
                { "value": "Injunction", "correctStatus": true }, 
                { "value": "Habeas Corpus", "correctStatus": false }, 
                { "value": "Mandamus", "correctStatus": false }, 
                { "value": "Prohibition", "correctStatus": false } 
            ] 
        }, 
    ],
}

const preambleText = `
  WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a
  SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:

  JUSTICE, social, economic and political;
  LIBERTY of thought, expression, belief, faith and worship;
  EQUALITY of status and of opportunity;
  and to promote among them all

  FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;

  IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.
`;

export {constitutional_questions};
