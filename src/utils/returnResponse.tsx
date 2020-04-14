import FHIR from 'fhirclient';
import {QuestionnaireResponse} from '../fhir-types/fhir-stu3';


    export default function returnResponse(questionnaireResponse: QuestionnaireResponse){
            const client = FHIR.client('http://localhost:8080/cqf-ruler-dstu3/fhir')
            // @ts-ignore
            return client.create(questionnaireResponse)
    }