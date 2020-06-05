import FHIR from 'fhirclient';
import {QuestionnaireResponse} from '../fhir-types/fhir-r4';


    export default function returnResponse(questionnaireResponse: QuestionnaireResponse){
            const client = FHIR.client('http://localhost:8080/cqf-ruler-r4/fhir')
            // @ts-ignore
            return client.create(questionnaireResponse)
    }
    /*
Welcome to MyPAIN

[Brief statement about MyPAIN]

You, [FirstName LastName] ([DOB:MM/DD/YYYY]), are scheduled for a visit with [Clinician Name] on
[MM/DD/YYYY] at [XX:XX AM/PM].

We see that you will be coming in for a visit that may be related to pain management for
and want to learn more about pain you may be experiencing related to this visit.
{
  "Patient":{
    "firstName":"",
    "lastName":"",
    "DOB":"",
    "clinician":"",
    "apptDate":"",
    "apptTime":""
  }
}


     */