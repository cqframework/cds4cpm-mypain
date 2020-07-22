import React from 'react';
import './MultiSelectButton.css';
import { InputGroup, FormControl } from 'react-bootstrap';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const multiSelectArray: Array<string> = [];

export default class MultiSelectButtonComponent extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);

        this.state =
        {
            checked: false,
            value: ''
        };
    }

    public render(): JSX.Element {
        return (
            <div className="multi-container">

                <div className={`multi-button ${this.state.checked ? "selected" : ""}`}>
                    <label>

                        <input
                            // TODO set up the followup questions
                            // name={}
                            type="checkbox"
                            checked={this.state.checked}
                            onChange={event => {
                                let checked = event.target.checked
                                this.setState({ checked: checked, value: this.props.children })
                            }
                                // onChange={}
                            } /> <span>{this.props.children}</span>
                    </label>

                </div>

                <div className={`additional-info-box ${this.state.checked ? "" : 'hidden'}`} >
                    <div>
                        <span> <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> What type of {this.props.children} pain?</span>
                        <div className="button-box">
                            <button>Burning</button>
                            <button>Aching</button>
                            <button>Stabbing</button>
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