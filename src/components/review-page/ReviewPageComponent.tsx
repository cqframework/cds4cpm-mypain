import React from 'react';
import './ReviewPageComponent.css';
import { Table } from 'react-bootstrap';

export default class ReviewPageComponent extends React.Component<any, any> {
    // constructor(props: any) {
    //     super(props);
    // }


    public render(): JSX.Element {
        console.log('response: ', this.props)
        if (this.props.item) {
            this.props.item.sort((a: any, b: any) => (a.linkId > b.linkId) ? 1 : -1)
            return (
                // <div>{JSON.stringify(this.props)}</div>
                <div>
                    {console.log('item: ', this.props.item)}
                    {
                        <Table responsive bordered striped>
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.item.map((item: any) => {
                                    return (<tr>
                                        <td> {item.linkId} {item.text} </td>
                                        <td> {item.answer[0].valueCoding.display}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                        // this.props.item.map((item: any) => {
                        //    return (<p>{item.text}</p>)
                        // })
                    }
                </div>
            )

        } else {
            return <div></div>
        }
    }
}