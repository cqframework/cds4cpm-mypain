import FHIR from 'fhirclient';
import {QuestionnaireResponse} from '../fhir-types/fhir-r4';
import { properties } from './properties';



    export function submitQuestionnaireResponse(questionnaireResponse: QuestionnaireResponse){
            const client = FHIR.client(properties.FHIR_FACADE_URL)
            // @ts-ignore
            return client.create(questionnaireResponse)
    }

    export function getQuestionnaire(){
        const client = FHIR.client(properties.FHIR_FACADE_URL)
        return client.request(properties.FHIR_FACADE_URL + '/Questionnaire/' + properties.QUESTIONNAIRE_ID)
            .then((response) =>{return response;});
    }
