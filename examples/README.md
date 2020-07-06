"testQuestionnaireResponse.json" is an example of the output of the mypain-opiod.json questionnaire submitted.


<H4> MyPAIN app </H4>

1.  Open linux shell
2.  cd "/mnt/d/projects/mypain"
3.  Run "yarn start"
4.  Edit "\cqf-ruler\r4\src\main\resources\hapi.properties"
	set questionnaireResponseExtract.enabled=true
	set questionnaireResponseExtract.endpoint= to base fhir server (i.e. "https://cds4cpm-develop.sandbox.alphora.com/cqf-ruler-r4/fhir")
	set observationTransform.enabled=true
	set observationTransform.replaceCode=false
5.  Start cqfruler
6.  In a browser paste
	"http://localhost:8000/launch.html?launch=eyJhIjoiMSIsImIiOiI1YzQxY2VjZi1jZjgxLTQzNGYtOWRhNy1lMjRlNWE5OWRiYzIiLCJlIjoiZWZiNWQ0Y2UtZGZmYy00N2RmLWFhNmQtMDVkMzcyZmRiNDA3IiwiZiI6IjEifQ==&iss=http://localhost:8080/cqf-ruler-r4/fhir".
	launch is base64 encoded string including curly braces: {"a":"1","b":"5c41cecf-cf81-434f-9da7-e24e5a99dbc2","e":"efb5d4ce-dffc-47df-aa6d-05d372fdb407","f":"1"}
7.  MyPAIN app should come up.
8.  Answer and submit questionnaire

<H4> QuestionnaireResponse $extract operation </H4>

1.  Query the cqfruler to find and copy the QuestionnaireResponse generated with the MyPAIN app.  "GET http://localhost:8080/cqf-ruler-r4/fhir/QuestionnaireResponse" (may have to search through responses to find the right one)
	An example one can be found at "\cds4cpm-mypain\examples\testQuestionnaireResponse.json".
2.  Send the QuestionnaireResponse to the cqfruler as "POST http://localhost:8080/cqf-ruler-r4/fhir/QuestionnaireResponse/$extract".  Parameter name is questionnaireResponse.
3.  The resulting bundle of Observations created from the QuestionnaireResponse will be posted to the questionnaireResponseExtract.endpoint set above.

<H4> Observation $transform operation </H4>

1.  Create a Parameters resource contaning a Bundle of Observations and a ConceptMap url similar to those found at "\cds4cpm-mypain\examples\testObservationBundle.json" and "\cds4cpm-mypain\examples\testConceptMap.json".
2.  Send the QuestionnaireResponse to the cqfruler as "POST http://localhost:8080/cqf-ruler-r4/fhir/QuestionnaireResponse/$extract".  Parameter name is questionnaireResponse.
3.  The returning Bundle of Observations will be a transformed Bundle with the site codes replacing the original codes for the values of the Observations or if "observationTransform.replaceCode=false" then the site codes will be added as a new Observation value code with the concept map's corresponding display value. 

