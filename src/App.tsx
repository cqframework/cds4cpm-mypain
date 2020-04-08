import React from 'react';
import './App.css';
import QuestionnaireComponent from './components/questionnaire/QuestionnaireComponent';
import { Questionnaire } from './fhir-types/fhir-stu3';

function App() {
  let questionnaire: Questionnaire = 
  // NAIVE EXAMPLE
  // {
  //   resourceType: 'Questionnaire',
  //   status: 'completed',
  //   item: [
  //     {
  //       linkId: 'link',
  //       type: 'choice',
  //       text: 'item 1'
  //     },
  //     {
  //       linkId: 'link',
  //       type: 'choice',
  //       text: 'item 2'
  //     }
  //   ]
  // };

  // FHIR GENERAL EXAMPLE
  // {
  //   "resourceType": "Questionnaire",
  //   "id": "3141",
  //   "text": {
  //     "status": "generated",
  //     "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      <pre>\n            1.Comorbidity?\n              1.1 Cardial Comorbidity\n                1.1.1 Angina?\n                1.1.2 MI?\n              1.2 Vascular Comorbidity?\n              ...\n            Histopathology\n              Abdominal\n                pT category?\n              ...\n          </pre>\n    </div>"
  //   },
  //   "url": "http://hl7.org/fhir/Questionnaire/3141",
  //   "title": "Cancer Quality Forum Questionnaire 2012",
  //   "status": "draft",
  //   "date": "2012-01",
  //   "subjectType": [
  //     "Patient"
  //   ],
  //   "item": [
  //     {
  //       "linkId": "1",
  //       "code": [
  //         {
  //           "system": "http://example.org/system/code/sections",
  //           "code": "COMORBIDITY"
  //         }
  //       ],
  //       "type": "group",
  //       "item": [
  //         {
  //           "linkId": "1.1",
  //           "code": [
  //             {
  //               "system": "http://example.org/system/code/questions",
  //               "code": "COMORB"
  //             }
  //           ],
  //           "prefix": "1",
  //           "type": "choice",
  //           "options": {
  //             "reference": "http://hl7.org/fhir/ValueSet/yesnodontknow"
  //           },
  //           "item": [
  //             {
  //               "linkId": "1.1.1",
  //               "code": [
  //                 {
  //                   "system": "http://example.org/system/code/sections",
  //                   "code": "CARDIAL"
  //                 }
  //               ],
  //               "type": "group",
  //               "enableWhen": [
  //                 {
  //                   "question": "1.1",
  //                   "answerCoding": {
  //                     "system": "http://hl7.org/fhir/v2/0136",
  //                     "code": "Y"
  //                   }
  //                 }
  //               ],
  //               "item": [
  //                 {
  //                   "linkId": "1.1.1.1",
  //                   "code": [
  //                     {
  //                       "system": "http://example.org/system/code/questions",
  //                       "code": "COMORBCAR"
  //                     }
  //                   ],
  //                   "prefix": "1.1",
  //                   "type": "choice",
  //                   "options": {
  //                     "reference": "http://hl7.org/fhir/ValueSet/yesnodontknow"
  //                   },
  //                   "item": [
  //                     {
  //                       "linkId": "1.1.1.1.1",
  //                       "code": [
  //                         {
  //                           "system": "http://example.org/system/code/questions",
  //                           "code": "COMCAR00",
  //                           "display": "Angina Pectoris"
  //                         },
  //                         {
  //                           "system": "http://snomed.info/sct",
  //                           "code": "194828000",
  //                           "display": "Angina (disorder)"
  //                         }
  //                       ],
  //                       "prefix": "1.1.1",
  //                       "type": "choice",
  //                       "options": {
  //                         "reference": "http://hl7.org/fhir/ValueSet/yesnodontknow"
  //                       }
  //                     },
  //                     {
  //                       "linkId": "1.1.1.1.2",
  //                       "code": [
  //                         {
  //                           "system": "http://snomed.info/sct",
  //                           "code": "22298006",
  //                           "display": "Myocardial infarction (disorder)"
  //                         }
  //                       ],
  //                       "prefix": "1.1.2",
  //                       "type": "choice",
  //                       "options": {
  //                         "reference": "http://hl7.org/fhir/ValueSet/yesnodontknow"
  //                       }
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   "linkId": "1.1.1.2",
  //                   "code": [
  //                     {
  //                       "system": "http://example.org/system/code/questions",
  //                       "code": "COMORBVAS"
  //                     }
  //                   ],
  //                   "prefix": "1.2",
  //                   "type": "choice",
  //                   "options": {
  //                     "reference": "http://hl7.org/fhir/ValueSet/yesnodontknow"
  //                   }
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       "linkId": "2",
  //       "code": [
  //         {
  //           "system": "http://example.org/system/code/sections",
  //           "code": "HISTOPATHOLOGY"
  //         }
  //       ],
  //       "type": "group",
  //       "item": [
  //         {
  //           "linkId": "2.1",
  //           "code": [
  //             {
  //               "system": "http://example.org/system/code/sections",
  //               "code": "ABDOMINAL"
  //             }
  //           ],
  //           "type": "group",
  //           "item": [
  //             {
  //               "linkId": "2.1.2",
  //               "code": [
  //                 {
  //                   "system": "http://example.org/system/code/questions",
  //                   "code": "STADPT",
  //                   "display": "pT category"
  //                 }
  //               ],
  //               "type": "choice"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // };

  // FHIR ZIKA EXPOSURE EXAMPLE
  {
    "resourceType": "Questionnaire",
    "id": "zika-virus-exposure-assessment",
    "text": {
      "status": "generated",
      "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      <pre>\n      </pre>\n    </div>"
    },
    "url": "http://example.org/Questionnaire/zika-virus-exposure-assessment",
    "name": "ExampleZikaVirusExposureAssessment",
    "title": "Example Zika Virus Exposure Assessment",
    "status": "draft",
    "date": "2016-11-14",
    "description": "Example questionnaire to assess Zika virus exposure potential.",
    "effectivePeriod": {
      "start": "2016-11-14"
    },
    "subjectType": [
      "Patient"
    ],
    "item": [
      {
        "extension": [
          {
            "url": "http://example.org/additional-information",
            "valueAttachment": {
              "url": "http://www.cdc.gov/zika/geo/index.html",
              "title": "Areas with active Zika virus transmission/exposure risk"
            }
          }
        ],
        "linkId": "1",
        "code": [
          {
            "system": "http://example.org/questionnaires",
            "code": "CDE: Resident of or Frequent Traveler to Zika Area"
          }
        ],
        "text": "Are you a resident of, or do you travel frequently to, an area with active Zika transmission?",
        "type": "boolean"
      },
      {
        "extension": [
          {
            "url": "http://example.org/additional-information",
            "valueAttachment": {
              "url": "http://www.cdc.gov/zika/geo/index.html",
              "title": "Areas with active Zika virus transmission/exposure risk"
            }
          }
        ],
        "linkId": "2",
        "code": [
          {
            "system": "http://example.org/questionnaires",
            "code": "CDE: Recent Travel to Zika Area"
          }
        ],
        "text": "Have you recently traveled to a an area with active Zika transmission?",
        "type": "boolean",
        "enableWhen": [
          {
            "question": "1",
            "answerBoolean": false
          }
        ]
      },
      {
        "linkId": "3",
        "code": [
          {
            "system": "http://example.org/questionnaires",
            "code": "CDE: Time Since Returned From Travel"
          }
        ],
        "text": "How long has it been since you returned?",
        "type": "quantity",
        "enableWhen": [
          {
            "question": "2",
            "answerBoolean": true
          }
        ]
      },
      {
        "extension": [
          {
            "url": "http://example.org/additional-information",
            "valueAttachment": {
              "url": "http://www.cdc.gov/zika/geo/index.html",
              "title": "Areas with active Zika virus transmission/exposure risk"
            }
          }
        ],
        "linkId": "4",
        "code": [
          {
            "system": "http://example.org/questionnaires",
            "code": "CDE: Recent Sexual Encounter with Traveler to Zika Area"
          }
        ],
        "text": "Have you recently had condomless sex with a partner that has travelled in an area with active Zika transmission?",
        "type": "boolean",
        "enableWhen": [
          {
            "question": "2",
            "answerBoolean": false
          }
        ]
      },
      {
        "linkId": "5",
        "code": [
          {
            "system": "http://example.org/questionnaires",
            "code": "CDE: Time Since Sexual Encounter"
          }
        ],
        "text": "How long has it been since your last condomless sexual encounter?",
        "type": "quantity",
        "enableWhen": [
          {
            "question": "4",
            "answerBoolean": true
          }
        ]
      },
      {
        "extension": [
          {
            "url": "http://example.org/additional-information",
            "valueAttachment": {
              "url": "http://www.cdc.gov/zika/geo/index.html",
              "title": "Areas with active Zika virus transmission/exposure risk"
            }
          }
        ],
        "linkId": "6",
        "code": [
          {
            "system": "http://example.org/questionnaires",
            "code": "CDE: Planned Travel to Zika Area"
          }
        ],
        "text": "Do you plan to travel to an area with active Zika transmission?",
        "type": "boolean",
        "enableWhen": [
          {
            "question": "4",
            "answerBoolean": false
          }
        ]
      }
    ]
  };

  return (
    <div className="app">
      <header className="app-header">
        <p>
          MyPain Development Branch v2
        </p>
      </header>
      <div>
        <QuestionnaireComponent Questionnaire={questionnaire} />
      </div>
    </div>
  );
}

export default App;
