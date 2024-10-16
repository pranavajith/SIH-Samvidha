const constitutional_questions = {
  constitution_history_questions: [
    {
      question:
        "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
      Options: [
        { value: "Jawaharlal Nehru", correctStatus: false },
        { value: "Dr. B.R. Ambedkar", correctStatus: true },
        { value: "Sardar Vallabhbhai Patel", correctStatus: false },
        { value: "Mahatma Gandhi", correctStatus: false },
      ],
    },
    // {
    //   question:
    //     "On which date did the Indian Constitution come into effect, marking the birth of the Republic of India?",
    //   Options: [
    //     { value: "15th August 1947", correctStatus: false },
    //     { value: "26th November 1949", correctStatus: false },
    //     { value: "26th January 1950", correctStatus: true },
    //     { value: "1st January 1950", correctStatus: false },
    //   ],
    // },
    // {
    //   question:
    //     "Who was the first President of India, who took office on the same day the Constitution came into force?",
    //   Options: [
    //     { value: "Dr. Rajendra Prasad", correctStatus: true },
    //     { value: "C. Rajagopalachari", correctStatus: false },
    //     { value: "Sarvepalli Radhakrishnan", correctStatus: false },
    //     { value: "Jawaharlal Nehru", correctStatus: false },
    //   ],
    // },
    // {
    //   question:
    //     "How many Articles did the original Indian Constitution have when it was first adopted in 1949?",
    //   Options: [
    //     { value: "395", correctStatus: true },
    //     { value: "448", correctStatus: false },
    //     { value: "368", correctStatus: false },
    //     { value: "280", correctStatus: false },
    //   ],
    // },
    // {
    //   question:
    //     "Which country’s Constitution inspired the Directive Principles of State Policy included in the Indian Constitution?",
    //   Options: [
    //     { value: "United States", correctStatus: false },
    //     { value: "United Kingdom", correctStatus: false },
    //     { value: "Ireland", correctStatus: true },
    //     { value: "France", correctStatus: false },
    // ],
    // },
  ],
  preamble_questions: [
    {
      question:
        "In what year did the Constituent Assembly adopt the Constitution of India?",
      Options: [
        { value: "1948", correctStatus: false },
        { value: "1949", correctStatus: true },
        { value: "1950", correctStatus: false },
        { value: "1947", correctStatus: false },
      ],
    },
    {
      question:
        "Which of the following is NOT a value mentioned in the Preamble of the Indian Constitution?",
      Options: [
        { value: "Justice", correctStatus: false },
        { value: "Liberty", correctStatus: false },
        { value: "Monarchy", correctStatus: true },
        { value: "Fraternity", correctStatus: false },
      ],
    },
    {
      question:
        "According to the Preamble, which type of equality is guaranteed to Indian citizens?",
      Options: [
        { value: "Social", correctStatus: false },
        { value: "Economic", correctStatus: false },
        { value: "Political", correctStatus: false },
        { value: "Status and Opportunity", correctStatus: true },
      ],
    },
    // {
    //   question:
    //     "Which word was added to the Preamble of the Indian Constitution by the 42nd Amendment in 1976?",
    //   Options: [
    //     { value: "Secular", correctStatus: false },
    //     { value: "Socialist", correctStatus: false },
    //     { value: "Both Secular and Socialist", correctStatus: true },
    //     { value: "Republic", correctStatus: false },
    //   ],
    // },
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
    {
      question:
        "What is the first word of the Preamble of the Indian Constitution?",
      Options: [
        { value: "We", correctStatus: true },
        { value: "The", correctStatus: false },
        { value: "India", correctStatus: false },
        { value: "Sovereign", correctStatus: false },
      ],
    },
    {
      question: "The Preamble declares India to be a __________ Republic.",
      Options: [
        {
          value: "Sovereign, Socialist, Secular, Democratic",
          correctStatus: true,
        },
        { value: "Sovereign, Socialist, Democratic", correctStatus: false },
        { value: "Sovereign, Democratic, Socialist", correctStatus: false },
        { value: "Democratic, Socialist, Secular", correctStatus: false },
      ],
    },
  ],
  legislature_questions: [
    {
      question: "What is the maximum term of the Lok Sabha?",
      Options: [
        { value: "4 years", correctStatus: false },
        { value: "5 years", correctStatus: true },
        { value: "6 years", correctStatus: false },
        { value: "7 years", correctStatus: false },
      ],
    },
    {
      question:
        "Which house of the Indian Parliament is known as the ‘House of the People’?",
      Options: [
        { value: "Rajya Sabha", correctStatus: false },
        { value: "Vidhan Sabha", correctStatus: false },
        { value: "Legislative Assembly", correctStatus: false },
        { value: "Lok Sabha", correctStatus: true },
      ],
    },
    {
      question:
        "How many members of the Rajya Sabha are nominated by the President?",
      Options: [
        { value: "12", correctStatus: true },
        { value: "10", correctStatus: false },
        { value: "14", correctStatus: false },
        { value: "15", correctStatus: false },
      ],
    },
    {
      question:
        "The concept of 'Bicameralism' in Indian Parliament refers to which of the following?",
      Options: [
        { value: "Having only one house", correctStatus: false },
        {
          value: "Having two houses: Lok Sabha and Rajya Sabha",
          correctStatus: true,
        },
        {
          value: "Division between central and state legislatures",
          correctStatus: false,
        },
        {
          value: "Division of powers between Judiciary and Legislature",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "Who can preside over the joint session of both houses of Parliament?",
      Options: [
        { value: "President", correctStatus: false },
        { value: "Prime Minister", correctStatus: false },
        { value: "Speaker of Lok Sabha", correctStatus: true },
        { value: "Chief Justice of India", correctStatus: false },
      ],
    },
  ],
  executive_questions: [
    {
      question: "Who is the head of the Union Executive in India?",
      Options: [
        { value: "Prime Minister", correctStatus: false },
        { value: "Vice-President", correctStatus: false },
        { value: "Chief Justice of India", correctStatus: false },
        { value: "President", correctStatus: true },
      ],
    },
    {
      question: "What is the term of office for the President of India?",
      Options: [
        { value: "5 years", correctStatus: true },
        { value: "6 years", correctStatus: false },
        { value: "4 years", correctStatus: false },
        { value: "7 years", correctStatus: false },
      ],
    },
    {
      question:
        "Which of the following appointments is made by the President of India?",
      Options: [
        { value: "Speaker of Lok Sabha", correctStatus: false },
        { value: "Governor of RBI", correctStatus: false },
        { value: "Chief Minister", correctStatus: false },
        { value: "Chief Justice of India", correctStatus: true },
      ],
    },
    {
      question:
        "Which of the following is NOT a function of the Indian President?",
      Options: [
        { value: "Appointing the Prime Minister", correctStatus: false },
        { value: "Dissolving the Lok Sabha", correctStatus: false },
        { value: "Passing ordinances", correctStatus: false },
        {
          value: "Declaring war without parliamentary approval",
          correctStatus: true,
        },
      ],
    },
    {
      question: "Who chairs the meetings of the Union Cabinet?",
      Options: [
        { value: "President", correctStatus: false },
        { value: "Prime Minister", correctStatus: true },
        { value: "Vice President", correctStatus: false },
        { value: "Speaker of Lok Sabha", correctStatus: false },
      ],
    },
  ],
  judiciary_questions: [
    {
      question: "What is the highest judicial body in India?",
      Options: [
        { value: "Supreme Court", correctStatus: true },
        { value: "High Court", correctStatus: false },
        { value: "District Court", correctStatus: false },
        { value: "Tribunal", correctStatus: false },
      ],
    },
    {
      question:
        "What is the retirement age of a judge of the Supreme Court of India?",
      Options: [
        { value: "62 years", correctStatus: false },
        { value: "60 years", correctStatus: false },
        { value: "65 years", correctStatus: true },
        { value: "70 years", correctStatus: false },
      ],
    },
    {
      question:
        "Which article of the Indian Constitution deals with the establishment of the Supreme Court?",
      Options: [
        { value: "Article 124", correctStatus: true },
        { value: "Article 74", correctStatus: false },
        { value: "Article 352", correctStatus: false },
        { value: "Article 226", correctStatus: false },
      ],
    },
    {
      question: "Who can remove a Supreme Court judge?",
      Options: [
        { value: "Prime Minister", correctStatus: false },
        { value: "Chief Justice of India", correctStatus: false },
        { value: "Law Minister", correctStatus: false },
        {
          value: "President after a Parliamentary process",
          correctStatus: true,
        },
      ],
    },
    {
      question:
        "Which of the following writs is NOT issued by the Supreme Court?",
      Options: [
        { value: "Habeas Corpus", correctStatus: false },
        { value: "Mandamus", correctStatus: false },
        { value: "Injunction", correctStatus: true },
        { value: "Prohibition", correctStatus: false },
      ],
    },
  ],
  ////////////////
  rigths_to_freedom: [
    {
      question:
        "Under Article 21A of the Indian Constitution, the Right to Education guarantees which of the following?",
      Options: [
        {
          value:
            "Free and compulsory education to all children between the ages of 6 to 18 years",
          correctStatus: false,
        },
        {
          value:
            "Free and compulsory education to all children of the age of 6 to 14 years",
          correctStatus: true,
        },
        {
          value:
            "Free higher education for all students in government institutions",
          correctStatus: false,
        },
        {
          value: "Compulsory education for all children irrespective of age",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "Which of the following is not a protection provided under Article 20 of the Indian Constitution regarding conviction for offences?",
      Options: [
        {
          value:
            "No person shall be convicted for an act unless it was a violation of a law in force at the time of commission.",
          correctStatus: false,
        },
        {
          value:
            "No person shall be prosecuted and punished for the same offence more than once.",
          correctStatus: false,
        },
        {
          value:
            "No person accused of an offence shall be forced to testify against others involved in the same offence.",
          correctStatus: true,
        },
        {
          value:
            "No person accused of an offence shall be compelled to be a witness against himself.",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "What is one of the exceptions that allows the State to impose reasonable restrictions on the right to practice any profession, occupation, trade, or business?",
      Options: [
        { value: "The individual's income level", correctStatus: false },
        {
          value:
            "Technical qualifications necessary for practicing a profession",
          correctStatus: true,
        },
        { value: "Age restrictions for business owners", correctStatus: false },
        {
          value: "The number of years a person has been in the profession",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "A 15-year-old student, Priya, was caught stealing food from a local grocery store due to extreme hunger. When taken to the police station, she was not allowed to contact her parents or a lawyer. The police held her for several hours without informing her of the charges against her and did not provide her with any legal assistance. The next day, she was presented in front of a magistrate who ordered her release due to the unlawful detention.Which right of Priya was violated in this scenario?",
      Options: [
        { value: "Right to Legal Representation", correctStatus: false },
        { value: "Right to Free Speech", correctStatus: false },
        {
          value: "Protection against Arrest and Detention in Certain Cases",
          correctStatus: true,
        },
        { value: "Right to Assembly", correctStatus: false },
      ],
    },
    {
      question:
        "Aisha Verma, a college student, was accused of participating in a protest that turned violent. During the protest, some individuals vandalized public property. Aisha was arrested a week later, and the police charged her under a new law that penalized participation in unlawful assemblies, which had been enacted just a few days before her arrest.Aisha claimed she was merely a bystander and had not engaged in any unlawful activities. Her lawyer argued that the new law should not apply to her case since the incident occurred before the law was enacted.During the trial, the judge had to consider Aisha's rights and whether the charges against her were valid under the current legal framework. In the context of Aisha's case, which of the following rights is most relevant to her defense against the charges imposed under the new law?",
      Options: [
        { value: "Right to Free Speech", correctStatus: false },
        {
          value: "Protection against Ex Post Facto Laws",
          correctStatus: false,
        },
        {
          value: "Protection in Respect of Conviction for Offences",
          correctStatus: true,
        },
        { value: "Right to Privacy", correctStatus: false },
      ],
    },
    {
      question:
        "Suresh was arrested for a minor traffic violation. The police detained him overnight without informing him of the reason for his arrest. He was also not allowed to contact anyone until the following morning.Which right of Suresh was violated in this scenario?",
      Options: [
        { value: "Right to Legal Representation", correctStatus: false },
        { value: "Right to Free Speech", correctStatus: false },
        {
          value: "Protection against Arrest and Detention in Certain Cases",
          correctStatus: true,
        },
        { value: "Right to Assembly", correctStatus: false },
      ],
    },
    {
      question:
        "A local government school announced that it would no longer provide free textbooks to students from low-income families. This decision was made without any prior notice, affecting students’ ability to attend school regularly.Which right of the affected students was violated in this scenario?",
      Options: [
        { value: "Right to Quality Education", correctStatus: true },
        { value: "Right to Privacy", correctStatus: false },
        { value: "Freedom of Religion", correctStatus: false },
        { value: "Right to Work", correctStatus: false },
      ],
    },
    {
      question:
        "During a protest, Anjali was detained by the police without a warrant or any formal charges against her. She was kept in custody for several hours, during which she was not allowed to make a phone call or have access to a lawyer.Which right of Anjali was violated in this scenario?",
      Options: [
        { value: "Right to Education", correctStatus: false },
        { value: "Freedom of Movement", correctStatus: false },
        {
          value: "Protection of Life and Personal Liberty",
          correctStatus: true,
        },
        { value: "Right to Equality", correctStatus: false },
      ],
    },
  ],
  rights_to_eq: [
    {
      question:
        "According to the provisions regarding laws inconsistent with or in derogation of the fundamental rights, which of the following statements is TRUE?",
      Options: [
        {
          value:
            "All laws in force before the Constitution is void regardless of consistency",
          correctStatus: false,
        },
        {
          value:
            "The State can make laws that abridge the rights conferred by this Part",
          correctStatus: false,
        },
        {
          value:
            "Any law inconsistent with fundamental rights is void to the extent of such inconsistency",
          correctStatus: true,
        },
        {
          value:
            "Customs and usages have no force of law in the territory of India",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "What does the principle of equality before law entail according to the Constitution?",
      Options: [
        {
          value: "The State shall deny equality to certain individuals",
          correctStatus: false,
        },
        {
          value: "All persons are equal in the eyes of the law",
          correctStatus: true,
        },
        {
          value:
            "Only certain classes of individuals receive equal protection under the law",
          correctStatus: false,
        },
        {
          value: "Equality before the law applies only to citizens of India",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "What does the prohibition of discrimination in the Indian Constitution entail?",
      Options: [
        {
          value:
            "The State can discriminate against citizens based on their religion",
          correctStatus: false,
        },
        {
          value:
            "No citizen shall face discrimination on grounds of religion, race, caste, sex, or place of birth",
          correctStatus: true,
        },
        {
          value:
            "Citizens can be denied access to public places based on caste",
          correctStatus: false,
        },
        {
          value: "Special provisions cannot be made for women and children",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "What does Article 16 of the Indian Constitution guarantee regarding public employment?",
      Options: [
        {
          value:
            "Equality of opportunity for all citizens in employment under the State",
          correctStatus: true,
        },
        {
          value:
            "Citizens can be discriminated against based on their religion",
          correctStatus: false,
        },
        {
          value:
            "Only certain castes are eligible for employment under the State",
          correctStatus: false,
        },
        {
          value:
            "Employment opportunities are only for residents of a specific state",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "What does Article 17 of the Indian Constitution state regarding untouchability?",
      Options: [
        {
          value: "Untouchability is permitted under certain conditions",
          correctStatus: false,
        },
        {
          value: "Untouchability is abolished and its practice is forbidden",
          correctStatus: true,
        },
        {
          value:
            "The practice of untouchability is allowed if it is traditional",
          correctStatus: false,
        },
        {
          value: "Enforcement of untouchability is encouraged by law",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "In a recent case, a businessman claimed he was treated unfairly by the tax authorities, who imposed a hefty fine on him while letting others off with a warning. He argued that this was due to his social status. Which right is most relevant to his claim of unfair treatment?",
      Options: [
        {
          value:
            "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
          correctStatus: false,
        },
        { value: "Equality before law", correctStatus: true },
        { value: "Abolition of Untouchability", correctStatus: false },
        { value: "Abolition of titles", correctStatus: false },
      ],
    },

    {
      question:
        "During a cultural festival, a group of students was barred from participating because of their religion. They argued that this exclusion was unjust and violated their rights. Which constitutional provision protects them in this situation?",
      Options: [
        { value: "Abolition of Untouchability", correctStatus: false },
        {
          value: "Equality of opportunity in matters of public employment",
          correctStatus: false,
        },
        {
          value:
            "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
          correctStatus: true,
        },
        { value: "Abolition of titles", correctStatus: false },
      ],
    },
    {
      question:
        "A qualified individual applied for a government job but was informed that they would not be considered because they lived outside the state where the job was located. They believed this to be discriminatory. Which right pertains to their situation?",
      Options: [
        { value: "Abolition of titles", correctStatus: false },
        {
          value:
            "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
          correctStatus: false,
        },
        { value: "Abolition of Untouchability", correctStatus: false },
        {
          value: "Equality of opportunity in matters of public employment",
          correctStatus: true,
        },
      ],
    },
    {
      question:
        "In a village, a particular community is systematically excluded from using public facilities like wells and schools due to their caste. This exclusion is based on outdated social practices. Which constitutional right is being violated in this case?",
      Options: [
        {
          value:
            "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
          correctStatus: false,
        },
        { value: "Abolition of titles", correctStatus: false },
        {
          value: "Equality of opportunity in matters of public employment",
          correctStatus: false,
        },
        { value: "Abolition of Untouchability", correctStatus: true },
      ],
    },
    {
      question:
        "An Indian citizen who has made significant contributions to art is offered a prestigious title by a foreign government. They wonder if accepting this title would conflict with any laws. Which provision in the Constitution addresses this concern?",
      Options: [
        { value: "Abolition of Untouchability", correctStatus: false },
        { value: "Equality before law", correctStatus: false },
        { value: "Abolition of titles", correctStatus: true },
        {
          value:
            "Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth",
          correctStatus: false,
        },
      ],
    },
    {
      question:
        "In light of the provisions outlined in the Constitution, which of the following statements accurately reflects the rules regarding titles and honors in India?",
      Options: [
        {
          value:
            "Titles may be conferred by the State for notable achievements in any field",
          correctStatus: false,
        },
        {
          value:
            "Indian citizens are prohibited from accepting any title from a foreign State",
          correctStatus: true,
        },
        {
          value:
            "Military and academic titles are exempt from restrictions placed on other titles",
          correctStatus: false,
        },
        {
          value:
            "Acceptance of titles from foreign States is allowed if approved by the Prime Minister",
          correctStatus: false,
        },
      ],
    },
  ],
};

const TypeGameData = {
  preamble: {
    text: `WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:
    JUSTICE, social, economic and political;
    LIBERTY of thought, expression, belief, faith and worship;
    EQUALITY of status and of opportunity;
    and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;
    
    IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.
`,
    keywords: [
      { word: "Sovereign", choices: ["Sovereign", "Socialist", "Republic"] },
      { word: "Republic", choices: ["Democratic", "Republic", "Secular"] },
      { word: "People", choices: ["People", "Humans", "Citizens"] },
      // { word: "Justice", choices: ["Equality", "Justice", "Freedom"] },
      // { word: "Liberty", choices: ["Faith", "Liberty", "Rights"] },
      { word: "Fraternity", choices: ["Diversity", "Fraternity", "Unity"] },
      // {
      //   word: "Constitution",
      //   choices: ["Constitution", "Declaration", "Bill"],
      // },
      // { word: "Equality", choices: ["Freedom", "Rights", "Equality"] },
      { word: "Assembly", choices: ["Parliament", "Assembly", "Council"] },
      { word: "Dignity", choices: ["Unity", "Dignity", "Respect"] },
    ],
  },
};

const gameLevelsModified = [
  {
    number: 1,
    levelName: "Constitutional History",
    // levelGroupId: 1,
    levelGroupText: "Preamble",
    videoUrl: "https://cdn-icons-mp4.flaticon.com/512/6844/6844338.mp4",
    questionType: "flashcard",
    questionData: constitutional_questions.constitution_history_questions,
  },
  {
    number: 2,
    levelName: "Preamble Questions",
    // levelGroupId: 1,
    levelGroupText: "Preamble",
    videoUrl: "https://cdn-icons-mp4.flaticon.com/512/6844/6844338.mp4",
    questionType: "flashcard",
    questionData: constitutional_questions.preamble_questions,
  },
  {
    number: 3,
    levelName: "Type the Preamble",
    // levelGroupId: 1,
    levelGroupText: "Preamble",
    videoUrl: "https://cdn-icons-mp4.flaticon.com/512/8617/8617218.mp4",
    questionType: "TypeGame",
    questionData: TypeGameData.preamble,
  },
  {
    number: 4,
    levelName: "Intro to rights",
    // levelGroupId: 1,
    levelGroupText: "Rights",
    videoUrl: "https://cdn-icons-mp4.flaticon.com/512/8617/8617218.mp4",
    questionType: "flashcard",
    questionData: constitutional_questions.rigths_to_freedom,
  },
  {
    number: 5,
    levelName: "Type the Preamble",
    // levelGroupId: 1,
    levelGroupText: "Rights",
    videoUrl: "https://cdn-icons-mp4.flaticon.com/512/8617/8617218.mp4",
    questionType: "flashcard",
    questionData: constitutional_questions.rigths_to_eq,
  },
  {
    number: 6,
    levelName: "Type the Preamble",
    // levelGroupId: 1,
    levelGroupText: "Rights",
    videoUrl: "https://cdn-icons-mp4.flaticon.com/512/8617/8617218.mp4",
    questionType: "TypeGame",
    questionData: TypeGameData.preamble,
  },
  {
    number: 7,
    levelName: "Type the Preamble",
    // levelGroupId: 1,
    levelGroupText: "Rights",
    videoUrl: "https://cdn-icons-mp4.flaticon.com/512/8617/8617218.mp4",
    questionType: "TypeGame",
    questionData: TypeGameData.preamble,
  },
  {
    number: 8,
    levelName: "Type the Preamble",
    // levelGroupId: 1,
    levelGroupText: "Rights",
    videoUrl: "https://cdn-icons-mp4.flaticon.com/512/8617/8617218.mp4",
    questionType: "TypeGame",
    questionData: TypeGameData.preamble,
  },
];

const constitutional_events = [
  {
    id: 1,
    title: "Independence of India",
    location: "New Delhi, India",
    description:
      "India gained independence from British colonial rule on this day in 1947. The end of British rule marked the beginning of a new era for India as it embarked on its journey as a sovereign nation.",
    date: "15 August 1947",
    image:
      "https://www.rammadhav.in/wp-content/uploads/2022/08/Independence-Day-India-Getty.jpg",
  },
  {
    id: 2,
    title: "Constitution Adopted",
    location: "New Delhi, India",
    description:
      "On 26th November 1949, the Constituent Assembly of India formally adopted the Constitution of India. This was a significant milestone as it laid down the framework for the country's laws, governance, and fundamental rights.",
    date: "26 November 1949",
    image:
      "https://img1.wsimg.com/isteam/ip/63b04b47-d65a-4207-a58c-3e58f38419ef/op.jpg",
  },
  {
    id: 3,
    title: "Republic of India",
    location: "New Delhi, India",
    description:
      "The Constitution of India came into effect on 26th January 1950, transforming India from a British Dominion into a republic. This day, known as Republic Day, is celebrated to honor the adoption of the Constitution and India's democratic heritage.",
    date: "26 January 1950",
    image: "https://www.fairobserver.com/wp-content/uploads/2020/09/India.jpg",
  },
  {
    id: 4,
    title: "First Amendment Act",
    location: "New Delhi, India",
    description:
      "The First Amendment Act of 1951 was enacted to address issues related to freedom of speech, property rights, and other fundamental rights, aiming to balance individual rights with national security and public order.",
    date: "18 June 1951",
    image: "https://pbs.twimg.com/media/GCgCRGPbMAA9JOa.jpg",
  },
  {
    id: 5,
    title: "States Reorganization Act",
    location: "New Delhi, India",
    description:
      "The States Reorganization Act of 1956 reorganized the boundaries of India's states and territories based on linguistic lines. This landmark legislation aimed at improving administrative efficiency and promoting regional harmony.",
    date: "1 November 1956",
    image:
      "https://st.adda247.com/https://www.studyiq.com/articles/wp-content/uploads/2023/01/13144953/Reorganisation-of-States.jpg",
  },
  {
    id: 6,
    title: "Constitution (42nd Amendment) Act",
    location: "New Delhi, India",
    description:
      "The 42nd Amendment Act of 1976 introduced significant changes to the Constitution, including alterations to the Preamble and the inclusion of Directive Principles of State Policy. It aimed to centralize powers and enhance the role of the government.",
    date: "18 December 1976",
    image:
      "https://unfoldlaw.in/wp-content/uploads/2023/12/42nd-Amendment.webp",
  },
  {
    id: 7,
    title: "Constitution (73rd Amendment) Act",
    location: "New Delhi, India",
    description:
      "The 73rd Amendment Act of 1992 aimed at strengthening the panchayati raj system and decentralized governance. It provided for the establishment of local self-government institutions and empowered rural areas through elected local bodies.",
    date: "16 December 1992",
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240213124445/73rd-Amendment-act-2024-copy.webp",
  },
  {
    id: 8,
    title: "Constitution (74th Amendment) Act",
    location: "New Delhi, India",
    description:
      "The 74th Amendment Act of 1993 focused on urban governance and the establishment of municipal bodies. It aimed to enhance the efficiency and responsiveness of local urban administration.",
    date: "1 June 1993",
    image:
      "https://images.squarespace-cdn.com/content/v1/5718b643e707eb46ff2abc3c/1622554692009-ZUYACVXLMZ1SN6TZAANB/9.png",
  },
  {
    id: 9,
    title: "Constitution (86th Amendment) Act",
    location: "New Delhi, India",
    description:
      "The 86th Amendment Act of 2002 made education a fundamental right for children aged 6 to 14 years. This historic amendment aimed to ensure that every child in India has access to free and compulsory education.",
    date: "15 January 2002",
    image:
      "https://st.adda247.com/https://www.studyiq.com/articles/wp-content/uploads/2023/02/08124400/Right-to-Education-Article-21-A.jpg",
  },
  {
    id: 10,
    title: "Constitution (103rd Amendment) Act",
    location: "New Delhi, India",
    description:
      "The 103rd Amendment Act of 2019 introduced reservations for economically weaker sections (EWS) in educational institutions and public employment. This amendment aimed to provide opportunities for underprivileged sections of society.",
    date: "11 December 2019",
    image:
      "https://plutusias.com/wp-content/uploads/2022/11/103-Amendment-of-Indian-Constitution.png",
  },
];

const testimonials = [
  {
    name: "Sreedevi Moham",
    image: "/testimonial-pics/sridevi.jpg",
    occupation: "LLB, Kerala High Court",
    Testimonial:
      "80% of civil cases happen because people weren't aware of their duties and rights. This is much needed for many people. Highly recommend!",
    Date: "September 11, 2024",
  },
  {
    name: "Soumya Srivastava",
    image: "/testimonial-pics/soumya.png",
    occupation: "Clinical Psychologist, IIT-BHU",
    Testimonial:
      "Everyday we see the need for citizens of our country to better understand the Constitution, and respect it. This website is definitely a step in the right direction to ensure the uplifting of the average person of our country.",
    Date: "September 15, 2024",
  },
  {
    name: "USS Uppuluri",
    image: "/testimonial-pics/uss.jpg",
    occupation: "Entrepreneur, CMD of Edvenswa Enterprises Limited",
    Testimonial:
      "The platform simplifies constitutional literacy with engaging tools. It’s invaluable for understanding institutional functions, which is crucial for corporate governance and business leaders like me.",
    Date: "September 15, 2024",
  },
  {
    name: "Ajith Prasad",
    image: "/testimonial-pics/ajith.png",
    occupation: "Executive Manager, Private Firm",
    Testimonial:
      "Being a resident of Kerala, I know many of my elder relatives and friends who find English government websites very hard to navigate. Having the language feature is very inclusive and gives a regional touch to the website.",
    Date: "September 16, 2024",
  },
  {
    name: "Rajesh Gupta",
    image: "/testimonial-pics/rajesh.png",
    occupation: "IIT(BHU) Alumnus, Co-Founder @ DricPro",
    Testimonial:
      "Aspirational and foresightful entrepreneurs like myself are always looking for quick and effective ways to understand and appreciate the Indian Governance, as well as the Political and Governmental Structure. This makes reading up the Constitution vital. This website would cater to a poweful audience among us.",
    Date: "September 15, 2024",
  },
  {
    name: "Gayathry Ajith",
    image: "/testimonial-pics/gayathry.jpg",
    occupation: "Chartered Accountant, Big 4",
    Testimonial:
      "Informative, Educational, Apt. Very much in need in today's generation.",
    Date: "September 14, 2024",
  },
  {
    name: "Dr. Anupama Boinepalli",
    image: "/testimonial-pics/anupama.jpg",
    occupation: "Chief Doctor at Snigdha Ayurvedic Hospitals",
    Testimonial:
      "Understanding constitutional roles is crucial for healthcare policies. This platform makes it accessible and interactive for professionals navigating legal frameworks in healthcare.",
    Date: "September 13, 2024",
  },
];

export {
  gameLevelsModified,
  testimonials,
  constitutional_questions,
  constitutional_events,
  TypeGameData,
};
