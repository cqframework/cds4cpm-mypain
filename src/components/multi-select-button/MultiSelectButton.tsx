import React from 'react';
import './MultiSelectButton.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
// import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { QuestionnaireItem } from '../../fhir-types/fhir-r4';


export default class MultiSelectButtonComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state =
        {
            checked: false,
            value: ''
        };
    }

    public render(): JSX.Element {
        let text: string = this.props.text!;
        let prefix: string = this.props.prefix!;
        const collectAnswer = (QuestionnaireItem: any, answer: string) => {
            this.props.parentCallback(QuestionnaireItem, answer);
        }

        return (
            <div className="multi-container">

                <div className={`multi-button ${this.state.checked ? "selected" : ""}`}>
                    <label>

                        <input
                            value={prefix}
                            type="checkbox"
                            checked={this.state.checked}
                            onChange={event => {
                                let checked = event.target.checked
                                this.setState({ checked: checked, value: prefix })
                            }
                            } /> <span>{prefix}</span>
                    </label>

                </div>

                <div className={`additional-info-box ${this.state.checked ? null : 'hidden'}`} >
                    <div>
                        {/* <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> */}
                        <p>{text}</p>
                        <div className="button-box">
                            {
                                this.props.answerOption?.map((item: any) => {
                                   return <Button key={JSON.stringify(item.valueCoding)} value={JSON.stringify(item.valueCoding)} onClick={
                                       (event: any) => {
                                        collectAnswer(this.props, event.target.value)
                                    }} size="sm" variant="outline-secondary">{item.valueCoding?.display}</Button>
                                })
                            }
                        </div>
                        <InputGroup size="sm" className="mt-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Other</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>

                    </div>
                </div>
            </div>
        )
    }

}