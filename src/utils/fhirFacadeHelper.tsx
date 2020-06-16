import FHIR from 'fhirclient';
import Client from 'fhirclient/lib/Client';
import {QuestionnaireResponse} from '../fhir-types/fhir-r4';
import { properties } from './properties';



    export function submitQuestionnaireResponse(questionnaireResponse: QuestionnaireResponse){
        // const client: Client = FHIR.client(properties.QUESTIONNAIRE_RESPONSE_URL)
        // // @ts-ignore
        // return client.create(questionnaireResponse);
        
        return FHIR.oauth2.ready()
            .then((client: Client) => 
                // @ts-ignore
                client.create(questionnaireResponse)
            );
    }

    export function getQuestionnaire(){
        // const client = FHIR.client(properties.FHIR_FACADE_URL)
        // return client.request(properties.FHIR_FACADE_URL + '/Questionnaire/' + properties.QUESTIONNAIRE_ID)
        //     .then((response) =>{return response;});

        return FHIR.oauth2.ready()
            .then((client: Client) => 
                client.request('Questionnaire/' + properties.QUESTIONNAIRE_ID)
            );
    }
