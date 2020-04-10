export default function returnResponse(questionnaireResponseString: string, id: string | undefined){
    let url = 'http://localhost:8080/cqf-ruler-dstu3/fhir';
    let returnBundle = createBundle(questionnaireResponseString, id);
    console.log(returnBundle);
    return fetch(url, {
        method: 'POST',
        body: returnBundle,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response: Response) => response.text());
}

    function createBundle(qrString: string, id: string | undefined){
        return '{"resourceType": "Bundle","type": "transaction","entry": [{"resource": ' + qrString + ',"request": {"method": "PUT","url":"QuestionnaireResponse/' + id +'"}}]}';
    }