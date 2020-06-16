import FHIR from 'fhirclient';
import Client from 'fhirclient/lib/Client';
import {QuestionnaireResponse} from '../fhir-types/fhir-r4';
import { properties } from './properties';



    export function submitQuestionnaireResponse(questionnaireResponse: QuestionnaireResponse){
        return FHIR.oauth2.ready()
            .then((client: Client) => 
                // @ts-ignore
                client.create(questionnaireResponse)
            );
    }

    export function getQuestionnaire(){
        return FHIR.oauth2.ready()
            .then((client: Client) => 
                client.request('Questionnaire/' + properties.QUESTIONNAIRE_ID)
            );
    }
