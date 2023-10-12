import React from "react";
import "./Loading.css";

export default function Spinner() {
    return (
        <div className="spinnerContainer">
        <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        </div>
    );
}