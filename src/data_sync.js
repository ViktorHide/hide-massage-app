{\rtf1\ansi\ansicpg1251\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // data_sync.js - \uc0\u1057 \u1080 \u1085 \u1093 \u1088 \u1086 \u1085 \u1080 \u1079 \u1072 \u1094 \u1080 \u1103  \u1076 \u1072 \u1085 \u1085 \u1099 \u1093  \u1074  React\
\
// \uc0\u1060 \u1091 \u1085 \u1082 \u1094 \u1080 \u1103  \u1079 \u1072 \u1075 \u1088 \u1091 \u1079 \u1082 \u1080  \u1076 \u1072 \u1085 \u1085 \u1099 \u1093  \u1080 \u1079  JSON-\u1092 \u1072 \u1081 \u1083 \u1072 \
export const loadData = async () => \{\
    const existingData = localStorage.getItem('appData');\
\
    if (!existingData) \{\
        try \{\
            const response = await fetch('/data.json'); // \uc0\u1055 \u1091 \u1090 \u1100  \u1082  JSON-\u1092 \u1072 \u1081 \u1083 \u1091  \u1074  \u1087 \u1072 \u1087 \u1082 \u1077  public\
            const data = await response.json();\
            \
            localStorage.setItem('appData', JSON.stringify(data));\
            console.log('\uc0\u1044 \u1072 \u1085 \u1085 \u1099 \u1077  \u1091 \u1089 \u1087 \u1077 \u1096 \u1085 \u1086  \u1079 \u1072 \u1075 \u1088 \u1091 \u1078 \u1077 \u1085 \u1099  \u1080 \u1079  JSON-\u1092 \u1072 \u1081 \u1083 \u1072 !');\
        \} catch (error) \{\
            console.error('\uc0\u1054 \u1096 \u1080 \u1073 \u1082 \u1072  \u1087 \u1088 \u1080  \u1079 \u1072 \u1075 \u1088 \u1091 \u1079 \u1082 \u1077  \u1076 \u1072 \u1085 \u1085 \u1099 \u1093 :', error);\
        \}\
    \} else \{\
        console.log('\uc0\u1044 \u1072 \u1085 \u1085 \u1099 \u1077  \u1091 \u1078 \u1077  \u1077 \u1089 \u1090 \u1100  \u1074  localStorage.');\
    \}\
\};\
\
// \uc0\u1060 \u1091 \u1085 \u1082 \u1094 \u1080 \u1103  \u1089 \u1080 \u1085 \u1093 \u1088 \u1086 \u1085 \u1080 \u1079 \u1072 \u1094 \u1080 \u1080  \u1076 \u1072 \u1085 \u1085 \u1099 \u1093 \
export const syncData = () => \{\
    const existingData = JSON.parse(localStorage.getItem('appData')) || \{\};\
    const mergedData = \{\
        clients: existingData.clients || [],\
        transactions: existingData.transactions || []\
    \};\
\
    localStorage.setItem('appData', JSON.stringify(mergedData));\
\};\
}