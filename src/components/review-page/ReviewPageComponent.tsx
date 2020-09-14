import React from 'react';
import './ReviewPageComponent.css';
// import { Table } from 'react-bootstrap';
// import parser from 'html-react-parser';

export default class ReviewPageComponent extends React.Component<any, any> {
    // constructor(props: any) {
    //     super(props);
    // }


    public render(): JSX.Element {
        console.log('review: ', this.props)
        return (
            <div>
                {JSON.stringify(this.props)}
            </div>
        )
        // if (this.props.item) {
        //     this.props.item.sort((a: any, b: any) => (Number(a.linkId) > Number(b.linkId)) ? 1 : -1)
        //     return (
        //         <div>
        //             {
        //                 // <Table responsive bordered striped>
        //                 //     <thead>
        //                 //         <tr>
        //                 //             <th>Question</th>
        //                 //             <th>Answer</th>
        //                 //         </tr>
        //                 //     </thead>
        //                 //     <tbody>
        //                 //         {this.props.item.map((item: any) => {
        //                 //             if (item.answer.valueCoding) {
        //                 //                 if (item.answer.valueCoding.display) {
        //                 //                     return (<tr key={JSON.stringify(item)}>
        //                 //                         <td> {parser(item.text)} </td>
        //                 //                         <td> {JSON.stringify(item.answer[0].valueCoding.display)}</td>
        //                 //                     </tr>)


        //                 //                 }
        //                 //                 else {
        //                 //                     return <tr>
        //                 //                         <td>Other:</td>
        //                 //                         <td>{JSON.stringify(item)}</td>
        //                 //                     </tr>
        //                 //                 }
        //                 //             }
        //                 //             else if (item.answer.valueString) {
        //                 //                 return (<tr key={JSON.stringify(item)}>
        //                 //                     <td> {parser(item.text)} </td>
        //                 //                     <td> {item.answer.valueString}</td>
        //                 //                 </tr>)
        //                 //             } else {
        //                 //                 console.log('not item: ', item)
        //                 //                 return <div></div>;
        //                 //             }
        //                 //         }
        //                 //         )
        //                 //         }
        //                 //     </tbody>
        //                 // </Table>

        //             }
        //         </div>
        //     )

        // } else {
        //     return <div></div>
        // }
    }
}