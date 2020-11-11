import React from 'react';
import './ReviewPageComponent.css';
import { Table } from 'react-bootstrap';
import parser from 'html-react-parser';
import { QuestionnaireResponseItem } from '../../fhir-types/fhir-r4';

export default class ReviewPageComponent extends React.Component<any, any> {
    // constructor(props: any) {
    //     super(props);
    // }


    public render(): JSX.Element {
        console.log('review: ', this.props)
        let sortedList = this.props.item.sort((a: any, b: any) => (Number(a.linkId) > Number(b.linkId)) ? 1 : -1)
        // return (
        //     <div>
        //         {JSON.stringify(this.props)}
        //     </div>
        // )
        // if (this.props.item) {
        return sortedList.map((question: QuestionnaireResponseItem) => {
            let text = JSON.stringify(question.text)
            // return (
            //     <div key={question.linkId}>
            //         <h1>{parser(text)}</h1>
            //         {JSON.stringify(question)}
            //     </div>)
            console.log('question: ', question);
            if (question.answer) {
                return (<div className='question-response-container' key={question.linkId}>
                    <div className="text-response-container">
                        <h6 className="text-response-question">{parser(text)}</h6>
                        <p className="text-response-answer">{question.answer[0].valueString}</p>
                    </div>
                </div>)

            } else {

                return (
                    <div className='question-response-container' key={question.linkId}>
                        <h6>{parser(text)}</h6>
                        {
                            <Table responsive bordered striped size="sm">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {question.item?.map((item: QuestionnaireResponseItem) => {
                                        if (item.answer!.length > 0) {
                                            if (item.answer![0].valueCoding) {
                                                return (
                                                    <tr key={item.linkId}>
                                                        <td>{parser(JSON.stringify(item.text))}</td>
                                                        <td>{item.answer![0].valueCoding?.display}</td>
                                                    </tr>
                                                )

                                            }
                                            if (item.answer![0].valueString!.length > 0) {

                                                return (
                                                    <tr key={item.linkId}>
                                                        <td>{parser(JSON.stringify(item.text))}</td>
                                                        <td>{item.answer![0].valueString}</td>
                                                    </tr>
                                                )
                                            } else {
                                                return <tr key={item.linkId}>
                                                    <td>{parser(JSON.stringify(item.text))}</td>
                                                    <td>Not answered.</td>
                                                </tr>
                                            }
                                        }
                                        return (
                                            <tr>

                                                <td>nothing here!</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        }
                    </div>
                )
            }
        })

        //         return (
        //             <div>
        //                 {
        //                     <Table responsive bordered striped>
        //                         <thead>
        //                             <tr>
        //                                 <th>Question</th>
        //                                 <th>Answer</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {this.props.item.map((item: any) => {
        //                                 if (item.answer.valueCoding) {
        //                                     if (item.answer.valueCoding.display) {
        //                                         return (<tr key={JSON.stringify(item)}>
        //                                             <td> {parser(item.text)} </td>
        //                                             <td> {JSON.stringify(item.answer[0].valueCoding.display)}</td>
        //                                         </tr>)


        //                                     }
        //                                     else {
        //                                         return <tr>
        //                                             <td>Other:</td>
        //                                             <td>{JSON.stringify(item)}</td>
        //                                         </tr>
        //                                     }
        //                                 }
        //                                 else if (item.answer.valueString) {
        //                                     return (<tr key={JSON.stringify(item)}>
        //                                         <td> {parser(item.text)} </td>
        //                                         <td> {item.answer.valueString}</td>
        //                                     </tr>)
        //                                 } else {
        //                                     console.log('not item: ', item)
        //                                     return <div></div>;
        //                                 }
        //                             }
        //                             )
        //                             }
        //                         </tbody>
        //                     </Table>

        //                 }
        //             </div>
        //         )
        //     })

        // } else {
        //     return <div></div>
        // }
    }
}