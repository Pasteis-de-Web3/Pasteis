import React from "react";

export default class Timeline extends React.Component {

    render() {
        const getDateText = (timestamp) => {
            const date = new Date(timestamp);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            const hour = date.getHours();
            const minute = date.getMinutes();
            return `${month}/${day}/${year} ${hour}:${minute}`;

        }

        const timelineStyle = {
            height: '100%',
            margin: 'auto',
            padding: '0',
        }

        const entryStyle = {
            listStyle: 'none',
            width: '100%',
        }

        const verticalLine = {
            backgroundColor: '#ccc',
            height: '70px',
            width: '1px',
            margin: '10px auto',
        }

        const contentStyle = {
            backgroundColor: '#ECEAE3',
            width: '300px',
            margin: 'auto',
            padding: '5px',
            borderRadius: '20px',
            boxShadow: '-5px 5px 8px 0 rgba(0, 0, 0, 0.25)',
        }

        return (
            <div>
                <h1>Timeline</h1>
                <ul style={timelineStyle}>
                    {
                        this.props.moments.sort((a, b) => a.timestamp - b.timestamp).map((moment, index) => {
                            return (
                                <li style={entryStyle} key={index}>
                                    <div style={contentStyle}>
                                        <p><strong>{moment.title}</strong></p>
                                        <p>{getDateText(moment.timestamp)}</p>

                                    </div>
                                    {
(index !== this.props.moments.length - 1) ? <div style={verticalLine}></div> : null
                                    }

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }


}