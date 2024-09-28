// import React from "react";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const savedLanguage = localStorage.getItem("language") || "en";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          username: "Username",
          wlcm: "Welcome Back!",
          Samvidhan: "Samvidhan",
          Sam: "Sam",
          team: "Meet our team",
          PA: "Pranav Ajith",
          IS: "Ishika Saini",
          AAU: "Aditya Uppuluri",
          KK: "Kancharla Kiranmai",
          NB: "B. Niranjan",
          AD: "Anish Dixit",
          email: "Email",
          emailh: "Please enter your email",
          pass: "Password",
          passh: "Please enter your password!",
          toggle: "Toggle Language",
          login: "Login",
          accna: "Don't have an account? ",
          testimonial: "Here are some expert testimonials!",
          vidhan: "vidhan",
          proud:
            "We are proud to have developed this website as part of the Smart India Hackathon, showcasing our team's dedication to learning, growing, and contributing to technological advancements.",
          SIH: "Smart India Hackathon",
          SIHbody:
            "is a nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives. Launched by the Government of India, SIH aims to foster innovation and creativity while enhancing skills like problem-solving and collaboration. It brings together bright minds to create solutions for real-world problems in a competitive environment.",
          ahvac: "Already have an account? Log In",
          About: "About us",
          timeline: "Timeline",
          pc: "The Power of the Constitution",
          Demo: "Try a demo!",
          tip: "Tip of your Fingers!",
          at: "at the",
          Signin: "Sign in",
          sup: "Sign up",
          ok: "Timeline of the Indian Constitution",
          i1t: "Independence of India",
          i1loc: "New Delhi, India",
          i1des:
            "India gained independence from British colonial rule on this day in 1947. The end of British rule marked the beginning of a new era for India as it embarked on its journey as a sovereign nation.",
          i1dat: "15 August 1947",

          i2t: "Constitution Adopted",
          i2loc: "New Delhi, India",
          i2des:
            "On 26th November 1949, the Constituent Assembly of India formally adopted the Constitution of India. This was a significant milestone as it laid down the framework for the country's laws, governance, and fundamental rights.",
          i2dat: "26 November 1949",

          i3t: "Republic of India",
          i3loc: "New Delhi, India",
          i3des:
            "The Constitution of India came into effect on 26th January 1950, transforming India from a British Dominion into a republic. This day, known as Republic Day, is celebrated to honor the adoption of the Constitution and India's democratic heritage.",
          i3dat: "26 January 1950",

          i4t: "First Amendment Act",
          i4loc: "New Delhi, India",
          i4des:
            "The First Amendment Act of 1951 was enacted to address issues related to freedom of speech, property rights, and other fundamental rights, aiming to balance individual rights with national security and public order.",
          i4dat: "18 June 1951",

          i5t: "States Reorganization Act",
          i5loc: "New Delhi, India",
          i5des:
            "The States Reorganization Act of 1956 reorganized the boundaries of India's states and territories based on linguistic lines. This landmark legislation aimed at improving administrative efficiency and promoting regional harmony.",
          i5dat: "1 November 1956",

          i6t: "Constitution (42nd Amendment) Act",
          i6loc: "New Delhi, India",
          i6des:
            "The 42nd Amendment Act of 1976 introduced significant changes to the Constitution, including alterations to the Preamble and the inclusion of Directive Principles of State Policy. It aimed to centralize powers and enhance the role of the government.",
          i6dat: "18 December 1976",

          i7t: "Constitution (73rd Amendment) Act",
          i7loc: "New Delhi, India",
          i7des:
            "The 73rd Amendment Act of 1992 aimed at strengthening the panchayati raj system and decentralized governance. It provided for the establishment of local self-government institutions and empowered rural areas through elected local bodies.",
          i7dat: "16 December 1992",

          i8t: "Constitution (74th Amendment) Act",
          i8loc: "New Delhi, India",
          i8des:
            "The 74th Amendment Act of 1993 focused on urban governance and the establishment of municipal bodies. It aimed to enhance the efficiency and responsiveness of local urban administration.",
          i8dat: "1 June 1993",

          i9t: "Constitution (86th Amendment) Act",
          i9loc: "New Delhi, India",
          i9des:
            "The 86th Amendment Act of 2002 made education a fundamental right for children aged 6 to 14 years. This historic amendment aimed to ensure that every child in India has access to free and compulsory education.",
          i9dat: "15 January 2002",

          i10t: "Constitution (103rd Amendment) Act",
          i10loc: "New Delhi, India",
          i10des:
            "The 103rd Amendment Act of 2019 introduced reservations for economically weaker sections (EWS) in educational institutions and public employment. This amendment aimed to provide opportunities for underprivileged sections of society.",
          i10dat: "11 December 2019",
        },
      },
      hi: {
        translation: {
          username: "उपयोक्तानाम",
          wlcm: "हमारे एप्लिकेशन में आपका स्वागत है",
          SIH: "स्मार्ट इंडिया हैकाथॉन",
          Samvidhan: "संविधान",
          Sam: "सं",
          PA: "प्रणव अजित",
          team: "हमारी टीम से मिलें",
          IS: "इशिका सैनी",
          AAU: "आदित्य उप्पुलुरी",
          KK: "कंचरला किरणमई",
          NB: "निरंजन बालाकुमार",
          AD: "अनीश दीक्षित",
          login: "लॉग इन करें",
          accna: "कोई खाता नहीं है?",
          email: "ईमेल",
          pass: "पासवर्ड",
          passh: "अपना पासवर्ड दर्ज करें!",
          emailh: "कृपया अपना ईमेल दर्ज करें",
          toggle: "भाषा बदलें",
          testimonial: "यहां कुछ विशेषज्ञ प्रशंसापत्र हैं",
          vidhan: "विधान",
          proud:
            "हमें इस वेबसाइट को स्मार्ट इंडिया हैकथॉन के हिस्से के रूप में विकसित करने पर गर्व है, जो सीखने, बढ़ने और तकनीकी प्रगति में योगदान देने के लिए हमारी टीम के समर्पण को प्रदर्शित करता है।",
          timeline: "समयरेखा",
          SIHbody:
            "छात्रों को हमारे दैनिक जीवन में आने वाली कुछ गंभीर समस्याओं को हल करने के लिए एक मंच प्रदान करने की एक राष्ट्रव्यापी पहल है। भारत सरकार द्वारा लॉन्च किए गए एसआईएच का उद्देश्य समस्या-समाधान और सहयोग जैसे कौशल को बढ़ाते हुए नवाचार और रचनात्मकता को बढ़ावा देना है। यह प्रतिस्पर्धी माहौल में वास्तविक दुनिया की समस्याओं का समाधान बनाने के लिए प्रतिभाशाली दिमागों को एक साथ लाता है।",
          Demo: "एक डेमो आज़माएं",
          sup: "साइन अप करें",
          pc: "संविधान की शक्ति",
          at: "आपकी",
          ahvac: "क्या आपके पास पहले से एक खाता मौजूद है? लॉग इन करें!",
          tip: "उंगलियों पे",
          Signin: "साइन इन करें",
          About: "हमारे बारे में",
          ok: "भारतीय संविधान की समयरेखा",
          i1t: "भारत की आजादी",
          i1loc: "नई दिल्ली, भारत",
          i1des:
            "1947 में इसी दिन भारत को ब्रिटिश औपनिवेशिक शासन से आजादी मिली थी। ब्रिटिश शासन के अंत ने भारत के लिए एक नए युग की शुरुआत को चिह्नित किया क्योंकि इसने एक संप्रभु राष्ट्र के रूप में अपनी यात्रा शुरू की।",
          i1dat: "15 अगस्त 1947",

          i2t: "संविधान अपनाया गया",
          i2loc: "नई दिल्ली, भारत",
          i2des:
            "26 नवंबर 1949 को भारत की संविधान सभा ने औपचारिक रूप से भारत के संविधान को अपनाया। यह एक महत्वपूर्ण मील का पत्थर था क्योंकि इसने देश के कानूनों, शासन और मौलिक अधिकारों के लिए रूपरेखा तैयार की।",
          i2dat: "26 नवंबर 1949",

          i3t: "भारत की स्वतंत्रता",
          i3loc: "नई दिल्ली, भारत",
          i3des:
            "भारत का संविधान 26 जनवरी 1950 को लागू हुआ, जिसने भारत को एक ब्रिटिश डोमिनियन से एक गणतंत्र में बदल दिया। यह दिन, जिसे गणतंत्र दिवस के रूप में जाना जाता है, संविधान को अपनाने और भारत की लोकतांत्रिक विरासत का सम्मान करने के लिए मनाया जाता है।",
          i3dat: "26 जनवरी 1950",

          i4t: "पहला संशोधन अधिनियम",
          i4loc: "नई दिल्ली, भारत",
          i4des:
            "1951 का पहला संशोधन अधिनियम भाषण की स्वतंत्रता, संपत्ति के अधिकार और अन्य मौलिक अधिकारों से संबंधित मुद्दों को संबोधित करने के लिए अधिनियमित किया गया था, जिसका उद्देश्य राष्ट्रीय सुरक्षा और सार्वजनिक व्यवस्था के साथ व्यक्तिगत अधिकारों को संतुलित करना था।",
          i4dat: "18 जून 1951",

          i5t: "राज्य पुनर्गठन अधिनियम",
          i5loc: "नई दिल्ली, भारत",
          i5des:
            "1956 के राज्य पुनर्गठन अधिनियम ने भाषाई आधार पर भारत के राज्यों और क्षेत्रों की सीमाओं को पुनर्गठित किया। इस ऐतिहासिक कानून का उद्देश्य प्रशासनिक दक्षता में सुधार और क्षेत्रीय सद्भाव को बढ़ावा देना है।",
          i5dat: "1 नवंबर 1956",

          i6t: "संविधान (42वाँ संशोधन) अधिनियम",
          i6loc: "नई दिल्ली, भारत",
          i6des:
            "1976 के 42वें संशोधन अधिनियम ने संविधान में महत्वपूर्ण बदलाव पेश किए, जिसमें प्रस्तावना में बदलाव और राज्य नीति के निदेशक सिद्धांतों को शामिल करना शामिल था। इसका उद्देश्य शक्तियों को केंद्रीकृत करना और सरकार की भूमिका को बढ़ाना था।",
          i6dat: "18 दिसंबर 1976",

          i7t: "संविधान (73वाँ संशोधन) अधिनियम",
          i7loc: "नई दिल्ली, भारत",
          i7des:
            "1992 के 73वें संशोधन अधिनियम का उद्देश्य पंचायती राज व्यवस्था और विकेंद्रीकृत शासन को मजबूत करना था। इसने स्थानीय स्व-सरकारी संस्थानों की स्थापना और निर्वाचित स्थानीय निकायों के माध्यम से ग्रामीण क्षेत्रों को सशक्त बनाने का प्रावधान किया।",
          i7dat: "16 दिसंबर 1992",

          i8t: "संविधान (74वाँ संशोधन) अधिनियम",
          i8loc: "नई दिल्ली, भारत",
          i8des:
            "1993 का 74वां संशोधन अधिनियम शहरी प्रशासन और नगर निकायों की स्थापना पर केंद्रित था। इसका उद्देश्य स्थानीय शहरी प्रशासन की दक्षता और जवाबदेही को बढ़ाना था।",
          i8dat: "1 जून 1993",

          i9t: "संविधान (86वाँ संशोधन) अधिनियम",
          i9loc: "नई दिल्ली, भारत",
          i9des:
            "2002 के 86वें संशोधन अधिनियम ने 6 से 14 वर्ष की आयु के बच्चों के लिए शिक्षा को मौलिक अधिकार बना दिया। इस ऐतिहासिक संशोधन का उद्देश्य यह सुनिश्चित करना था कि भारत में प्रत्येक बच्चे को मुफ्त और अनिवार्य शिक्षा मिले।",
          i9dat: "15 जनवरी 2002",

          i10t: "संविधान (103वाँ संशोधन) अधिनियम",
          i10loc: "नई दिल्ली, भारत",
          i10des:
            "2019 के 103वें संशोधन अधिनियम ने शैक्षणिक संस्थानों और सार्वजनिक रोजगार में आर्थिक रूप से कमजोर वर्गों (ईडब्ल्यूएस) के लिए आरक्षण की शुरुआत की। इस संशोधन का उद्देश्य समाज के वंचित वर्गों के लिए अवसर प्रदान करना था।",
          i10dat: "11 दिसंबर 2019",
        },
      },
      te: {
        translation: {
          username: "వినియోగదారు పేరు",
          wlcm: "స్వాగతం!",
          Samvidhan: "రాజ్యాంగం",
          Sam: "రా",
          team: "మా బృందాన్ని కలుసుకోండి",
          PA: "ప్రణవ్ అజిత్",
          IS: "ఇషికా సైని",
          AAU: "ఆదిత్య ఉప్పులూరి",
          KK: "కంచర్ల కిరణ్మయి",
          NB: "బి. నిరంజన్",
          AD: "అనిష్ డిక్సిట్",
          email: "ఇమెయిల్",
          emailh: "దయచేసి మీ ఇమెయిల్‌ను నమోదు చేయండి",
          pass: "పాస్వర్డ్",
          passh: "దయచేసి మీ పాస్వర్డ్‌ను నమోదు చేయండి!",
          toggle: "భాష మార్చు",
          login: "లాగిన్",
          accna: "ఖాతా లేదా?",
          testimonial: "ఇవి కొన్ని నిపుణుల సూచనలు!",
          vidhan: "జ్యాంగం",
          proud:
            "స్మార్ట్ ఇండియా హాకథాన్‌లో భాగంగా ఈ వెబ్‌సైట్‌ను అభివృద్ధి చేసినందుకు మేము గర్వంగా ఉన్నాము, ఇది మా బృందం నేర్చుకోవడంలో, పెరుగడంలో మరియు సాంకేతిక పురోగతికి సహకరించడంలో అంకితభావాన్ని ప్రదర్శిస్తుంది.",
          SIH: "స్మార్ట్ ఇండియా హాకథాన్",
          SIHbody:
            "మన రోజువారీ జీవితంలో ఎదురయ్యే కొన్ని అత్యవసర సమస్యలను పరిష్కరించడానికి విద్యార్థులకు వేదికను అందించడానికి దేశవ్యాప్త కార్యక్రమం. భారత ప్రభుత్వం ప్రారంభించిన SIH, సమస్యలు పరిష్కరించడంలో మరియు సహకారంలో సృజనాత్మకత మరియు నైపుణ్యాలను పెంపొందించడం లక్ష్యంగా పెట్టుకుంది. ఇది పోటీ వాతావరణంలో నిజజీవిత సమస్యలకు పరిష్కారాలను సృష్టించడానికి ప్రజ్ఞావంతమైన మనస్సులను ఒక చోటికి తీసుకువస్తుంది.",
          ahvac: "ఖాతా ఉందా? లాగిన్ చేయండి",
          About: "మా గురించి",
          timeline: "కాలక్రమం",
          pc: "రాజ్యాంగం యొక్క",
          Demo: "డెమో ప్రయత్నించండి!",
          tip: "మీ వేళ్ల కొన వద్ద!",
          at: "శక్తి",
          Signin: "సైన్ ఇన్",
          sup: "సైన్ అప్",
          ok: "భారత రాజ్యాంగ కాలక్రమం",
          i1t: "భారత స్వాతంత్ర్యం",
          i1loc: "న్యూఢిల్లి, ఇండియా",
          i1des:
            "భారతదేశం 1947లో బ్రిటీష్ వలస పాలన నుండి స్వతంత్రతను పొందింది. బ్రిటీష్ పాలన ముగియడం భారతదేశానికి కొత్త యుగం ఆరంభమైంది, ఇది సార్వభౌమ దేశంగా తన ప్రయాణాన్ని ప్రారంభించింది.",
          i1dat: "15 ఆగస్టు 1947",
          i2t: "రాజ్యాంగం స్వీకరించడం",
          i2loc: "న్యూఢిల్లి, ఇండియా",
          i2des:
            "భారత రాజ్యాంగ సభ 1949 నవంబర్ 26న అధికారికంగా భారత రాజ్యాంగాన్ని స్వీకరించింది. ఇది ఒక ముఖ్యమైన మైలురాయి, ఇది దేశ చట్టాలు, పాలన మరియు ప్రాథమిక హక్కులకు రూపకల్పన చేసింది.",
          i2dat: "26 నవంబర్ 1949",
          i3t: "భారత గణరాజ్యం",
          i3loc: "న్యూఢిల్లి, ఇండియా",
          i3des:
            "భారత రాజ్యాంగం 1950 జనవరి 26న అమల్లోకి వచ్చింది, భారతదేశం బ్రిటీష్ డొమినియన్ నుండి గణరాజ్యంగా మారింది. ఈ రోజును గణతంత్ర దినోత్సవంగా జరుపుకుంటారు, రాజ్యాంగ స్వీకరణను గౌరవించడానికి మరియు భారత ప్రజాస్వామ్య వారసత్వాన్ని స్మరించడానికి.",
          i3dat: "26 జనవరి 1950",

          i4t: "మొదటి సవరణ చట్టం",
          i4loc: "న్యూఢిల్లీ, భారత్",
          i4des:
            "1951 లో మొట్టమొదటి సవరణ చట్టం ప్రసంగ స్వేచ్ఛ, ఆస్తి హక్కులు మరియు ఇతర ప్రాథమిక హక్కులకు సంబంధించిన సమస్యలను పరిష్కరించడానికి తీసుకురాబడింది, వ్యక్తిగత హక్కులు, జాతీయ భద్రత మరియు ప్రజాస్వామ్యం మధ్య సమతుల్యతను ఉంచడం లక్ష్యంగా పెట్టుకుంది.",
          i4dat: "18 జూన్ 1951",

          i5t: "రాజ్యాల పునర్వ్యవస్థీకరణ చట్టం",
          i5loc: "న్యూఢిల్లీ, భారత్",
          i5des:
            "1956 యొక్క రాష్ట్రాల పునర్వ్యవస్థీకరణ చట్టం భారతదేశం యొక్క రాష్ట్రాలు మరియు ప్రాంతాల సరిహద్దులను భాషాత్మక ఆధారంగా పునర్వ్యవస్థీకరించింది. ఈ చారిత్రక చట్టం పరిపాలనా సామర్థ్యాన్ని మెరుగుపరచడం మరియు ప్రాంతీయ సౌహార్దాన్ని ప్రోత్సహించడం లక్ష్యంగా చేసుకుంది.",
          i5dat: "1 నవంబర్ 1956",

          i6t: "భారత రాజ్యాంగం (42వ సవరణ) చట్టం",
          i6loc: "న్యూఢిల్లీ, భారత్",
          i6des:
            "1976 లో 42వ సవరణ చట్టం రాజ్యాంగంలో ముఖ్యమైన మార్పులను తీసుకువచ్చింది, దీనిలో ప్రాంబుల్‌లో మార్పులు మరియు ప్రభుత్వ విధానాల డైరెక్టివ్ ప్రిన్సిపల్స్‌ను చేర్చడం కూడా ఉంది. ఇది ప్రభుత్వ అధికారాలను కేంద్రీకరించడం మరియు ప్రభుత్వ పాత్రను పెంచడం లక్ష్యంగా పెట్టుకుంది.",
          i6dat: "18 డిసెంబర్ 1976",

          i7t: "భారత రాజ్యాంగం (73వ సవరణ) చట్టం",
          i7loc: "న్యూఢిల్లీ, భారత్",
          i7des:
            "1992లో 73వ సవరణ చట్టం పంచాయతీరాజ్ వ్యవస్థ మరియు వికేంద్రీకృత పరిపాలనను బలోపేతం చేయడం లక్ష్యంగా పనిచేసింది. ఈ చట్టం స్థానిక స్వీయ-పాలన సంస్థల ఏర్పాటు కోసం మరియు ఎన్నికైన స్థానిక సంస్థల ద్వారా గ్రామీణ ప్రాంతాలను అధికార పూర్వకంగా అధికారం కల్పించడానికి ఉపయోగపడింది.",
          i7dat: "16 డిసెంబర్ 1992",

          i8t: "భారత రాజ్యాంగం (74వ సవరణ) చట్టం",
          i8loc: "న్యూఢిల్లీ, భారత్",
          i8des:
            "1993లో 74వ సవరణ చట్టం పట్టణ పరిపాలన మరియు మునిసిపల్ సంస్థల స్థాపనపై దృష్టి సారించింది. పట్టణ పరిపాలన యొక్క సామర్థ్యం మరియు ప్రతిస్పందన సామర్థ్యాన్ని పెంచడం లక్ష్యంగా పెట్టుకుంది.",
          i8dat: "1 జూన్ 1993",

          i9t: "భారత రాజ్యాంగం (86వ సవరణ) చట్టం",
          i9loc: "న్యూఢిల్లీ, భారత్",
          i9des:
            "2002 లో 86వ సవరణ చట్టం 6 నుండి 14 సంవత్సరాల వయస్సు గల పిల్లల విద్యను ప్రాథమిక హక్కుగా చేసింది. ఈ చారిత్రక సవరణ ప్రతి భారతీయ పిల్లవాడికి ఉచిత మరియు తప్పనిసరి విద్య అందించడానికి ఉద్దేశించబడింది.",
          i9dat: "15 జనవరి 2002",

          i10t: "భారత రాజ్యాంగం (103వ సవరణ) చట్టం",
          i10loc: "న్యూఢిల్లీ, భారత్",
          i10des:
            "2019 లో 103వ సవరణ చట్టం విద్యా సంస్థలు మరియు ప్రభుత్వ ఉద్యోగాల్లో ఆర్థికంగా బలహీన వర్గాల (EWS) కోసం రిజర్వేషన్లు ప్రవేశపెట్టింది. ఈ సవరణ సమాజంలోని నిరుపేద వర్గాలకు అవకాశాలను అందించడానికి ఉద్దేశించబడింది.",
          i10dat: "11 డిసెంబర్ 2019",
        },
      },
      ma: {
        translation: {
          username: "ഉപയോക്തൃനാമം",
          wlcm: "തീരിച്ചു വരവേൽപ്പു!",
          Samvidhan: "ഭരണഘടന",
          Sam: "ഭരണ",
          team: "ഞങ്ങളുടെ ടീം",
          PA: "പ്രണവ് അജിത്",
          IS: "ഇഷിക സൈനി",
          AAU: "ആദിത്യ ഉപ്പുലുരി",
          KK: "കാഞ്ചാർല കിരൺമയി",
          NB: "ബി. നിരഞ്ജൻ",
          AD: "ആനിഷ് ദീക്ഷിത്",
          email: "ഇമെയിൽ",
          emailh: "നിങ്ങളുടെ ഇമെയിൽ നൽകുക",
          pass: "പാസ്‌വേഡ്",
          passh: "നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക!",
          toggle: "ഭാഷ മാറ്റുക",
          login: "ലോഗിൻ",
          accna: "ഒരു അക്കൗണ്ട് ഇല്ലേ?",
          testimonial: "കഴിഞ്ഞവരുടെ പരിചയ വാക്കുകൾ!",
          vidhan: "ഘടന",
          proud:
            "സ്മാർട്ട് ഇന്ത്യ ഹാക്കത്തോൺ ഭാഗമാക്കുന്നതിൽ ഞങ്ങൾ അഭിമാനിക്കുന്നു, ഞങ്ങളുടെ ടീമിന്റെ പഠനത്തിനും സാങ്കേതിക പുരോഗതിയോടുള്ള പ്രതിബദ്ധതയും പ്രകടിപ്പിക്കുന്നു.",
          SIH: "സ്മാർട്ട് ഇന്ത്യ ഹാക്കത്തോൺ",
          SIHbody:
            "പ്രതിദിന ജീവിതത്തിൽ നേരിടുന്ന പ്രധാന പ്രശ്നങ്ങൾ പരിഹരിക്കാൻ വിദ്യാർത്ഥികൾക്ക് പ്ലാറ്റ്‌ഫോം നൽകുന്ന ദേശീയ തലത്തിലുള്ള സംരംഭമാണ് ഇത്. ഇന്ത്യയിലെ ഗവൺമെന്റ് ആരംഭിച്ച ഈ പദ്ധതി, പ്രശ്ന പരിഹാരവും സൃഷ്ടിപരതയും മെച്ചപ്പെടുത്തുന്നതിനും വിദ്യാർത്ഥികളിൽ കൂട്ടായ്മാ നൈപുണ്യങ്ങൾ വികസിപ്പിക്കുന്നതിനും ലക്ഷ്യമിടുന്നു.",
          ahvac: "അക്കൗണ്ട് ഉണ്ടോ? ലോഗിൻ ചെയ്യുക",
          About: "ഞങ്ങളേക്കുറിച്ച്",
          timeline: "കാലരേഖ",
          pc: "സംവിധാനത്തിന്റെ ശക്തി",
          Demo: "ഒരു ഡെമോ പരീക്ഷിക്കുക!",
          tip: "നിങ്ങളുടെ വിരലുകളുടെ ടിപ്പ്!",
          at: "അത്",
          Signin: "സൈൻ ഇൻ ചെയ്യുക",
          sup: "സൈൻ അപ്പ്",
          ok: "ഇന്ത്യൻ ഭരണഘടനയുടെ കാലരേഖ",
          i1t: "ഇന്ത്യയുടെ സ്വാതന്ത്ര്യം",
          i1loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i1des:
            "1947-ൽ ബ്രിട്ടീഷ് ആധിപത്യത്തിൽ നിന്ന് ഇന്ത്യ സ്വാതന്ത്ര്യം നേടി. ബ്രിട്ടീഷ് ഭരണം അവസാനിച്ചതോടെ, ഇന്ത്യ സ്വയംഭരണ രാഷ്ട്രമായി ഉയരാൻ തന്റെ യാത്ര ആരംഭിച്ചു.",
          i1dat: "1947 ആഗസ്റ്റ് 15",

          i2t: "ഭരണഘടന അംഗീകരിച്ചു",
          i2loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i2des:
            "1949 നവംബർ 26-ന്, ഇന്ത്യയുടെ ഭരണഘടന ഔദ്യോഗികമായി അംഗീകരിച്ചു. രാജ്യത്തിന്റെ നിയമങ്ങളുടെയും ഭരണഘടനയുടെയും അടിസ്ഥാന പരിധി സൃഷ്ടിച്ചുകൊണ്ട് ഇത് ഇന്ത്യയ്ക്ക് പ്രധാന ഘട്ടമായിരുന്നു.",
          i2dat: "1949 നവംബർ 26",

          i3t: "ഇന്ത്യ ഒരു റിപ്പബ്ലിക്ക്",
          i3loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i3des:
            "1950 ജനുവരി 26-ന്, ഇന്ത്യ ഒരു റിപ്പബ്ലിക്ക് ആയി മാറി. ജനുവരി 26-ന് റിപ്പബ്ലിക് ദിനം ആഘോഷിക്കുന്നു.",
          i3dat: "1950 ജനുവരി 26",

          i4t: "ആദ്യ ഭേദഗതി നിയമം",
          i4loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i4des:
            "1951-ലെ ആദ്യ ഭേദഗതി നിയമം സ്വാതന്ത്ര്യത്തിന്റെ അവകാശങ്ങൾക്കും രാജ്യ സുരക്ഷയ്ക്കുമിടയിലെ പ്രശ്നങ്ങൾ പരിഹരിക്കാൻ നടപ്പിലാക്കി.",
          i4dat: "1951 ജൂൺ 18",

          i5t: "സംസ്ഥാനങ്ങളുടെ പുനസംഘടനാ നിയമം",
          i5loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i5des:
            "1956-ലെ സംസ്ഥാനങ്ങളുടെ പുനസംഘടനാ നിയമം ഭാഷാപരമായി ഇന്ത്യയുടെ സംസ്ഥാനങ്ങളുടെ അതിർത്തി പുനസംഘടിപ്പിച്ചു.",
          i5dat: "1956 നവംബർ 1",

          i6t: "ഭരണഘടന (42-ആം ഭേദഗതി) നിയമം",
          i6loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i6des:
            "1976-ലെ 42-ആം ഭേദഗതി ഭരണഘടനയിൽ സുപ്രധാന മാറ്റങ്ങൾ ഉൾപ്പെടുത്തി. ഇത് സർക്കാർ അധികാരങ്ങൾ വർദ്ധിപ്പിക്കുന്നതിനുള്ള ശ്രമം ആയിരുന്നു.",
          i6dat: "1976 ഡിസംബർ 18",

          i7t: "ഭരണഘടന (73-ആം ഭേദഗതി) നിയമം",
          i7loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i7des:
            "1992-ലെ 73-ആം ഭേദഗതി ഗ്രാമീണ പ്രദേശങ്ങളിലെ ജനാധിപത്യത്തിൽ ശക്തമായ പങ്കാളിത്തം ഉറപ്പാക്കുക എന്നതാണ്.",
          i7dat: "1992 ഡിസംബർ 16",

          i8t: "ഭരണഘടന (74-ആം ഭേദഗതി) നിയമം",
          i8loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i8des:
            "1993-ലെ 74-ആം ഭേദഗതി നഗര ഭരണവും നഗര സ്ഥാപനങ്ങളുടെ ശക്തിയും കൂട്ടുന്നതിന് ഉദ്ദേശിച്ചിരിക്കുന്നു.",
          i8dat: "1993 ജൂൺ 1",

          i9t: "ഭരണഘടന (86-ആം ഭേദഗതി) നിയമം",
          i9loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i9des:
            "2002-ലെ 86-ആം ഭേദഗതി 6 മുതൽ 14 വയസ്സുവരെ ഉള്ള കുട്ടികൾക്ക് വിദ്യാഭ്യാസം ഒരു അടിസ്ഥാന അവകാശമായി മാറ്റി.",
          i9dat: "2002 ജനുവരി 15",

          i10t: "ഭരണഘടന (103-ആം ഭേദഗതി) നിയമം",
          i10loc: "ന്യൂഡൽഹി, ഇന്ത്യ",
          i10des:
            "2019-ലെ 103-ആം ഭേദഗതി സാമ്പത്തികമായി ബലഹീന വിഭാഗങ്ങൾക്ക് വിദ്യാഭ്യാസ മേഖലകളിലും, തൊഴിലിലും സംവരണം നൽകുന്നു.",
          i10dat: "2019 ഡിസംബർ 11",
        },
      },
    },

    lng: savedLanguage, // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
