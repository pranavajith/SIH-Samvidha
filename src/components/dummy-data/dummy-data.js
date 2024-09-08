const questions = [ 
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
    { "question": "According to the Preamble, which type of equality is guaranteed to Indian citizens?", 
        "Options": [ 
            { "value": "Social", "correctStatus": false }, 
            { "value": "Economic", "correctStatus": false }, 
            { "value": "Political", "correctStatus": false }, 
            { "value": "Status and Opportunity", "correctStatus": true } 
        ] 
    },
    { "question": "Which word was added to the Preamble of the Indian Constitution by the 42nd Amendment in 1976?", 
        "Options": [ 
            { "value": "Secular", "correctStatus": false }, 
            { "value": "Socialist", "correctStatus": false }, 
            { "value": "Both Secular and Socialist", "correctStatus": true }, 
            { "value": "Republic", "correctStatus": false } 
        ] 
    }, 
    { "question": "Which value in the Preamble promotes a sense of brotherhood among all citizens?", 
        "Options": [ 
            { "value": "Liberty", "correctStatus": false }, 
            { "value": "Justice", "correctStatus": false }, 
            { "value": "Fraternity", "correctStatus": true }, 
            { "value": "Equality", "correctStatus": false } 
        ] 
    },
    { "question": "Which aspect of 'Justice' is NOT explicitly mentioned in the Preamble of the Indian Constitution?", 
        "Options": [ 
            { "value": "Social", "correctStatus": false }, 
            { "value": "Economic", "correctStatus": false }, 
            { "value": "Political", "correctStatus": false }, 
            { "value": "Judicial", "correctStatus": true } 
        ] 
    }, 
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
];

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

export {questions, preambleText};
