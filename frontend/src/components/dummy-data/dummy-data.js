import { urlList } from "../../urls";

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
    {
      question:
        "On which date did the Indian Constitution come into effect, marking the birth of the Republic of India?",
      Options: [
        { value: "15th August 1947", correctStatus: false },
        { value: "26th November 1949", correctStatus: false },
        { value: "26th January 1950", correctStatus: true },
        { value: "1st January 1950", correctStatus: false },
      ],
    },
    {
      question:
        "Who was the first President of India, who took office on the same day the Constitution came into force?",
      Options: [
        { value: "Dr. Rajendra Prasad", correctStatus: true },
        { value: "C. Rajagopalachari", correctStatus: false },
        { value: "Sarvepalli Radhakrishnan", correctStatus: false },
        { value: "Jawaharlal Nehru", correctStatus: false },
      ],
    },
    {
      question:
        "How many Articles did the original Indian Constitution have when it was first adopted in 1949?",
      Options: [
        { value: "395", correctStatus: true },
        { value: "448", correctStatus: false },
        { value: "368", correctStatus: false },
        { value: "280", correctStatus: false },
      ],
    },
    {
      question:
        "Which country’s Constitution inspired the Directive Principles of State Policy included in the Indian Constitution?",
      Options: [
        { value: "United States", correctStatus: false },
        { value: "United Kingdom", correctStatus: false },
        { value: "Ireland", correctStatus: true },
        { value: "France", correctStatus: false },
      ],
    },
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
    // { "question": "According to the Preamble, which type of equality is guaranteed to Indian citizens?",
    //     "Options": [
    //         { "value": "Social", "correctStatus": false },
    //         { "value": "Economic", "correctStatus": false },
    //         { "value": "Political", "correctStatus": false },
    //         { "value": "Status and Opportunity", "correctStatus": true }
    //     ]
    // },
    {
      question:
        "Which word was added to the Preamble of the Indian Constitution by the 42nd Amendment in 1976?",
      Options: [
        { value: "Secular", correctStatus: false },
        { value: "Socialist", correctStatus: false },
        { value: "Both Secular and Socialist", correctStatus: true },
        { value: "Republic", correctStatus: false },
      ],
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
        { value: "5 years", correctStatus: true },
        { value: "4 years", correctStatus: false },
        { value: "6 years", correctStatus: false },
        { value: "7 years", correctStatus: false },
      ],
    },
    {
      question:
        "Which house of the Indian Parliament is known as the ‘House of the People’?",
      Options: [
        { value: "Lok Sabha", correctStatus: true },
        { value: "Rajya Sabha", correctStatus: false },
        { value: "Vidhan Sabha", correctStatus: false },
        { value: "Legislative Assembly", correctStatus: false },
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
        {
          value: "Having two houses: Lok Sabha and Rajya Sabha",
          correctStatus: true,
        },
        { value: "Having only one house", correctStatus: false },
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
        { value: "Speaker of Lok Sabha", correctStatus: true },
        { value: "President", correctStatus: false },
        { value: "Prime Minister", correctStatus: false },
        { value: "Chief Justice of India", correctStatus: false },
      ],
    },
  ],
  executive_questions: [
    {
      question: "Who is the head of the Union Executive in India?",
      Options: [
        { value: "President", correctStatus: true },
        { value: "Prime Minister", correctStatus: false },
        { value: "Vice-President", correctStatus: false },
        { value: "Chief Justice of India", correctStatus: false },
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
        { value: "Chief Justice of India", correctStatus: true },
        { value: "Speaker of Lok Sabha", correctStatus: false },
        { value: "Governor of RBI", correctStatus: false },
        { value: "Chief Minister", correctStatus: false },
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
        { value: "Prime Minister", correctStatus: true },
        { value: "President", correctStatus: false },
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
        { value: "65 years", correctStatus: true },
        { value: "62 years", correctStatus: false },
        { value: "60 years", correctStatus: false },
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
        {
          value: "President after a Parliamentary process",
          correctStatus: true,
        },
        { value: "Prime Minister", correctStatus: false },
        { value: "Chief Justice of India", correctStatus: false },
        { value: "Law Minister", correctStatus: false },
      ],
    },
    {
      question:
        "Which of the following writs is NOT issued by the Supreme Court?",
      Options: [
        { value: "Injunction", correctStatus: true },
        { value: "Habeas Corpus", correctStatus: false },
        { value: "Mandamus", correctStatus: false },
        { value: "Prohibition", correctStatus: false },
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
      { word: "Justice", choices: ["Equality", "Justice", "Freedom"] },
      // { word: "Liberty", choices: ["Faith", "Liberty", "Rights"] },
      { word: "Fraternity", choices: ["Diversity", "Fraternity", "Unity"] },
      {
        word: "Constitution",
        choices: ["Constitution", "Declaration", "Bill"],
      },
      // { word: "Equality", choices: ["Freedom", "Rights", "Equality"] },
      // { word: "Assembly", choices: ["Parliament", "Assembly", "Council"] },
      { word: "Dignity", choices: ["Unity", "Dignity", "Respect"] },
    ],
  },
};

const preambleLevels = [
  {
    number: 1,
    status: "unlocked",
    videoUrl: urlList.CheckpointGifUrl,
    questionType: "flashcard",
    questionData: constitutional_questions.constitution_history_questions,
  },
  {
    number: 2,
    status: "unlocked",
    videoUrl: urlList.CheckpointGifUrl,
    questionType: "flashcard",
    questionData: constitutional_questions.preamble_questions,
  },
  {
    number: 3,
    status: "locked",
    videoUrl: urlList.TrophyGifUrl,
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

const UserData = {
  firstName: "Pranav",
  lastName: "Ajith",
  username: "Pranav Ajith",
  email: "pranav.ajith.cse21@itbhu.ac.in",
  userProfileImage: {
    type: "url",
    path: urlList.GenericKidImageUrl,
  },
  password: "fakePassword",
  gameProgress: {
    levelsComplete: [1, 2],
    totalLevels: 10,
  },
  streakData: {
    latestPlayed: "2024-09-14",
    latestStreakStartDate: "2024-08-01",
  },
};

const leaderboardData = [
  {
    username: "Pranav Ajith",
    score: 500,
    league: "Bronze",
  },
  {
    username: "Aditya Abhiram",
    score: 600,
    league: "Silver",
  },
  {
    username: "Anish Dixit",
    score: 700,
    league: "Gold",
  },
  {
    username: "Kancharla Kiranmai",
    score: 800,
    league: "Platinum",
  },
  {
    username: "Niranjan",
    score: 900,
    league: "Ruby",
  },
  {
    username: "Ishika Saini",
    score: 1000,
    league: "Diamond",
  },
];

export {
  preambleLevels,
  leaderboardData,
  constitutional_questions,
  constitutional_events,
  UserData,
  TypeGameData,
};
