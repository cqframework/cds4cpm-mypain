import React from 'react';
import './MultiSelectButton.css';

// const multiSelectArray: Array<string> = [];

export default class MultiSelectButtonComponent extends React.Component {
    constructor(props: any) {
        super(props);
        console.log('before props: ',props)

        this.state =
        {
        };
    }

    public render(): JSX.Element {
        console.log('props: ', this.props)
        return (
            <div className="multi-button">
                <label>

                    <input
                        // TODO set up the followup questions
                        // name={}
                        type="checkbox"
                        name={this.props.children?.toString()}
                        onChange={(event: any) => this.getCheckboxValue(event)}

                    // checked={}
                    // onChange={}
                    /> <span>{this.props.children}</span>
                </label>
            </div>
        )
    }

    sendData = (data: any) => {
        // this.props.valueCallback(data)
    }

    getCheckboxValue(value: any) {
        console.log('incoming value: ', value);
        // if(multiSelectArray.includes(value)) {

        //   multiSelectArray.filter(obj => obj !== value);
        //   console.log('filteredArray', multiSelectArray)
        // } else {
        //   multiSelectArray.push(value);
        //   console.log('multiselect array', multiSelectArray)
        // }
        // return (

        // )

    }

}