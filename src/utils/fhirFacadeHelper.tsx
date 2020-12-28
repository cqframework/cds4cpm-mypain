import FHIR from 'fhirclient';
import Client from 'fhirclient/lib/Client';
import {QuestionnaireResponse} from '../fhir-types/fhir-r4';
import { properties } from './properties';



    export function submitQuestionnaireResponse(questionnaireResponse: QuestionnaireResponse){
        return FHIR.oauth2.ready()
            .then((client: Client) => {
                // @ts-ignore
                return client.create(questionnaireResponse)
            })
            .then((response) => {
                return response
            }).catch(error => {
                console.log('oops: ', error)
            });
    }

    export function getQuestionnaire(serverUrl:any){
        let url:string;
        return FHIR.oauth2.ready()
            .then((client: Client) => {
                url = client.state.serverUrl;
                return client.request('Questionnaire/' + properties.QUESTIONNAIRE_ID);
            })
            .then((questionnaire)=>{
                serverUrl.push(url + '/Questionnaire/' + questionnaire.id);
                return questionnaire;
            }).catch(error => {
                return error;
            });
    }
