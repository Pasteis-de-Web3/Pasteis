import React from "react";
import { parse_date } from "../utils";

export default class Sticker extends React.Component {
    render() {
        const titleStyle = {
            fontSize: "24px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
            marginBottom: "10px",
        }

        const descriptionStyle = {
            fontSize: "16px",
            marginTop: "5px",
            textAlign: "justify",
        }

        const layoutStyle = {
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "400px",
            textAlign: "left",
            paddingLeft: "20px",
            paddingRight: "20px",
        }


        return (
            <div style={layoutStyle}>
                <p style={titleStyle}>{this.props.title}</p>
                <p style={descriptionStyle}>{this.props.description}</p>
                <p style={{ ...descriptionStyle, textAlign: "right" }}>{parse_date(this.props.date)}</p>
            </div>
        )
    }
}