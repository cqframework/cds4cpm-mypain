import FHIR from 'fhirclient';

fetch(`${process.env.PUBLIC_URL}/my-pain-config/launch-context.json`)
    .then((response)      => {
        return response.json()
    })
    .then((launchContext) => {
        return FHIR.oauth2.authorize(launchContext)
    })
    .catch((error)        => console.error(error));
