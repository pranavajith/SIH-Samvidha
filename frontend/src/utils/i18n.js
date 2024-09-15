import React from "react";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
const savedLanguage = localStorage.getItem('language') || 'en';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "wlcm": "Welcome Back!",
           "Samvidhan" : "Samvidhan",
           "Sam":"Sam",
           "team": "Meet our team",
           "PA":"Pranav Ajith",
           "IS":"Ishika Saini",
           "AAU":"Aditya Uppuluri",
           "KK":"Kancharla Kiranmai",
           "NB":"B. Niranjan",
           "AD":"Anish Dixit",
           "email":"Email",
           "emailh": "Please enter your email",
           "pass":"Password",
           "passh":"Please enter your password!",
           "toggle":"Toggle Language",
           "login": "Login",
           "accna":"Don't have an account?",
           "testimonial":"Here are some expert testimonials!",
           "vidhan": "vidhan",
           "proud":"We are proud to have developed this website as part of the Smart India Hackathon, showcasing our team's dedication to learning, growing, and contributing to technological advancements.",
           "SIH":"Smart India Hackathon",
           "SIHbody":"is a nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives. Launched by the Government of India, SIH aims to foster innovation and creativity while enhancing skills like problem-solving and collaboration. It brings together bright minds to create solutions for real-world problems in a competitive environment.",
           "ahvac":"Already have an account? Log In",
           "About" : "About us",
           "timeline" : "Timeline",
           "pc":"The Power of the Constitution",
            "Demo": "Try a demo!",
            "tip":"Tip of your Fingers!",
            "at":"at the",
            "Signin":"Sign in",
            "sup":"Sign up",
            "ok":"Timeline of the Indian Constitution",
           "i1t":"Independence of India",
           "i1loc": "New Delhi, India",
           "i1des":"India gained independence from British colonial rule on this day in 1947. The end of British rule marked the beginning of a new era for India as it embarked on its journey as a sovereign nation.",
           "i1dat":"15 August 1947",

           "i2t":"Constitution Adopted",
           "i2loc": "New Delhi, India",
           "i2des":"On 26th November 1949, the Constituent Assembly of India formally adopted the Constitution of India. This was a significant milestone as it laid down the framework for the country's laws, governance, and fundamental rights.",
           "i2dat":"26 November 1949",

           "i3t":"Republic of India",
           "i3loc": "New Delhi, India",
           "i3des":"The Constitution of India came into effect on 26th January 1950, transforming India from a British Dominion into a republic. This day, known as Republic Day, is celebrated to honor the adoption of the Constitution and India's democratic heritage.",
           "i3dat":"26 January 1950",

           "i4t":"First Amendment Act",
           "i4loc": "New Delhi, India",
           "i4des":"The First Amendment Act of 1951 was enacted to address issues related to freedom of speech, property rights, and other fundamental rights, aiming to balance individual rights with national security and public order.",
           "i4dat":"18 June 1951",

           "i5t":"States Reorganization Act",
           "i5loc": "New Delhi, India",
           "i5des":"The States Reorganization Act of 1956 reorganized the boundaries of India's states and territories based on linguistic lines. This landmark legislation aimed at improving administrative efficiency and promoting regional harmony.",
           "i5dat":"1 November 1956",

           "i6t":"Constitution (42nd Amendment) Act",
           "i6loc": "New Delhi, India",
           "i6des":"The 42nd Amendment Act of 1976 introduced significant changes to the Constitution, including alterations to the Preamble and the inclusion of Directive Principles of State Policy. It aimed to centralize powers and enhance the role of the government.",
           "i6dat":"18 December 1976",

           "i7t":"Constitution (73rd Amendment) Act",
           "i7loc": "New Delhi, India",
           "i7des":"The 73rd Amendment Act of 1992 aimed at strengthening the panchayati raj system and decentralized governance. It provided for the establishment of local self-government institutions and empowered rural areas through elected local bodies.",
           "i7dat":"16 December 1992",

           "i8t":"Constitution (74th Amendment) Act",
           "i8loc": "New Delhi, India",
           "i8des":"The 74th Amendment Act of 1993 focused on urban governance and the establishment of municipal bodies. It aimed to enhance the efficiency and responsiveness of local urban administration.",
           "i8dat":"1 June 1993",

           "i9t":"Constitution (86th Amendment) Act",
           "i9loc": "New Delhi, India",
           "i9des":"The 86th Amendment Act of 2002 made education a fundamental right for children aged 6 to 14 years. This historic amendment aimed to ensure that every child in India has access to free and compulsory education.",
           "i9dat":"15 January 2002",

           "i10t":"Constitution (103rd Amendment) Act",
           "i10loc": "New Delhi, India",
           "i10des":"The 103rd Amendment Act of 2019 introduced reservations for economically weaker sections (EWS) in educational institutions and public employment. This amendment aimed to provide opportunities for underprivileged sections of society.",
           "i10dat":"11 December 2019",
        }
      },
      hi: {
        translation: {
          "wlcm": "हमारे एप्लिकेशन में आपका स्वागत है",
          "SIH":"स्मार्ट इंडिया हैकाथॉन",
            "Samvidhan" : "संविधान",
            "Sam":"सं",
            "PA":"प्रणव अजित",
            "team": "हमारी टीम से मिलें",
           "IS":"इशिका सैनी",
           "AAU":"आदित्य उप्पुलुरी",
           "KK":"कंचरला किरणमई",
           "NB":"निरंजन बालाकुमार",
           "AD":"अनीश दीक्षित",
            "login":"लॉग इन करें",
            "accna":"कोई खाता नहीं है?",
            "email":"ईमेल",
            "pass":"पासवर्ड",
           "passh":"अपना पासवर्ड दर्ज करें!",
            "emailh": "कृपया अपना ईमेल दर्ज करें",
            "toggle":"भाषा बदलें",
            "testimonial":"यहां कुछ विशेषज्ञ प्रशंसापत्र हैं",
           "vidhan": "विधान",
            "proud":"हमें इस वेबसाइट को स्मार्ट इंडिया हैकथॉन के हिस्से के रूप में विकसित करने पर गर्व है, जो सीखने, बढ़ने और तकनीकी प्रगति में योगदान देने के लिए हमारी टीम के समर्पण को प्रदर्शित करता है।",
            "timeline" : "समयरेखा",
            "SIHbody":"छात्रों को हमारे दैनिक जीवन में आने वाली कुछ गंभीर समस्याओं को हल करने के लिए एक मंच प्रदान करने की एक राष्ट्रव्यापी पहल है। भारत सरकार द्वारा लॉन्च किए गए एसआईएच का उद्देश्य समस्या-समाधान और सहयोग जैसे कौशल को बढ़ाते हुए नवाचार और रचनात्मकता को बढ़ावा देना है। यह प्रतिस्पर्धी माहौल में वास्तविक दुनिया की समस्याओं का समाधान बनाने के लिए प्रतिभाशाली दिमागों को एक साथ लाता है।",
            "Demo": "एक डेमो आज़माएं",
            "sup":"साइन अप करें",
            "pc":"संविधान की शक्ति",
            "at":"आपकी",
            "ahvac":"क्या आपके पास पहले से एक खाता मौजूद है? लॉग इन करें!",
            "tip":"आपकी उंगलियों पर",
            "Signin":"साइन इन करें",
            "About" : "हमारे बारे में",
            "ok":"भारतीय संविधान की समयरेखा",
            "i1t":"भारत की आजादी",
           "i1loc": "नई दिल्ली, भारत",
           "i1des":"1947 में इसी दिन भारत को ब्रिटिश औपनिवेशिक शासन से आजादी मिली थी। ब्रिटिश शासन के अंत ने भारत के लिए एक नए युग की शुरुआत को चिह्नित किया क्योंकि इसने एक संप्रभु राष्ट्र के रूप में अपनी यात्रा शुरू की।",
           "i1dat":"15 अगस्त 1947",

           "i2t":"संविधान अपनाया गया",
           "i2loc": "नई दिल्ली, भारत",
           "i2des":"26 नवंबर 1949 को भारत की संविधान सभा ने औपचारिक रूप से भारत के संविधान को अपनाया। यह एक महत्वपूर्ण मील का पत्थर था क्योंकि इसने देश के कानूनों, शासन और मौलिक अधिकारों के लिए रूपरेखा तैयार की।",
           "i2dat":"26 नवंबर 1949",

           "i3t":"भारत की स्वतंत्रता",
           "i3loc": "नई दिल्ली, भारत",
           "i3des":"भारत का संविधान 26 जनवरी 1950 को लागू हुआ, जिसने भारत को एक ब्रिटिश डोमिनियन से एक गणतंत्र में बदल दिया। यह दिन, जिसे गणतंत्र दिवस के रूप में जाना जाता है, संविधान को अपनाने और भारत की लोकतांत्रिक विरासत का सम्मान करने के लिए मनाया जाता है।",
           "i3dat":"26 जनवरी 1950",

           "i4t":"पहला संशोधन अधिनियम",
           "i4loc": "नई दिल्ली, भारत",
           "i4des":"1951 का पहला संशोधन अधिनियम भाषण की स्वतंत्रता, संपत्ति के अधिकार और अन्य मौलिक अधिकारों से संबंधित मुद्दों को संबोधित करने के लिए अधिनियमित किया गया था, जिसका उद्देश्य राष्ट्रीय सुरक्षा और सार्वजनिक व्यवस्था के साथ व्यक्तिगत अधिकारों को संतुलित करना था।",
           "i4dat":"18 जून 1951",

           "i5t":"राज्य पुनर्गठन अधिनियम",
           "i5loc": "नई दिल्ली, भारत",
           "i5des":"1956 के राज्य पुनर्गठन अधिनियम ने भाषाई आधार पर भारत के राज्यों और क्षेत्रों की सीमाओं को पुनर्गठित किया। इस ऐतिहासिक कानून का उद्देश्य प्रशासनिक दक्षता में सुधार और क्षेत्रीय सद्भाव को बढ़ावा देना है।",
           "i5dat":"1 नवंबर 1956",

           "i6t":"संविधान (42वाँ संशोधन) अधिनियम",
           "i6loc": "नई दिल्ली, भारत",
           "i6des":"1976 के 42वें संशोधन अधिनियम ने संविधान में महत्वपूर्ण बदलाव पेश किए, जिसमें प्रस्तावना में बदलाव और राज्य नीति के निदेशक सिद्धांतों को शामिल करना शामिल था। इसका उद्देश्य शक्तियों को केंद्रीकृत करना और सरकार की भूमिका को बढ़ाना था।",
           "i6dat":"18 दिसंबर 1976",

           
           "i7t":"संविधान (73वाँ संशोधन) अधिनियम",
           "i7loc": "नई दिल्ली, भारत",
           "i7des":"1992 के 73वें संशोधन अधिनियम का उद्देश्य पंचायती राज व्यवस्था और विकेंद्रीकृत शासन को मजबूत करना था। इसने स्थानीय स्व-सरकारी संस्थानों की स्थापना और निर्वाचित स्थानीय निकायों के माध्यम से ग्रामीण क्षेत्रों को सशक्त बनाने का प्रावधान किया।",
           "i7dat":"16 दिसंबर 1992",

           "i8t":"संविधान (74वाँ संशोधन) अधिनियम",
           "i8loc": "नई दिल्ली, भारत",
           "i8des":"1993 का 74वां संशोधन अधिनियम शहरी प्रशासन और नगर निकायों की स्थापना पर केंद्रित था। इसका उद्देश्य स्थानीय शहरी प्रशासन की दक्षता और जवाबदेही को बढ़ाना था।",
           "i8dat":"1 जून 1993",

           "i9t":"संविधान (86वाँ संशोधन) अधिनियम",
           "i9loc": "नई दिल्ली, भारत",
           "i9des":"2002 के 86वें संशोधन अधिनियम ने 6 से 14 वर्ष की आयु के बच्चों के लिए शिक्षा को मौलिक अधिकार बना दिया। इस ऐतिहासिक संशोधन का उद्देश्य यह सुनिश्चित करना था कि भारत में प्रत्येक बच्चे को मुफ्त और अनिवार्य शिक्षा मिले।",
           "i9dat":"15 जनवरी 2002",

           "i10t":"संविधान (103वाँ संशोधन) अधिनियम",
           "i10loc": "नई दिल्ली, भारत",
           "i10des":"2019 के 103वें संशोधन अधिनियम ने शैक्षणिक संस्थानों और सार्वजनिक रोजगार में आर्थिक रूप से कमजोर वर्गों (ईडब्ल्यूएस) के लिए आरक्षण की शुरुआत की। इस संशोधन का उद्देश्य समाज के वंचित वर्गों के लिए अवसर प्रदान करना था।",
           "i10dat":"11 दिसंबर 2019",
        }
      }
    },

    lng: savedLanguage, // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default i18n;