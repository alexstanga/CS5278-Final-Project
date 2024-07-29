import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css"
import { json } from "./json";

function SurveyComponent() {
    const survey = new Model(json);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/your/server/url");
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.onload = xhr.onerror = function () {
            if (xhr.status === 200) {
                console.log("Success!")
            } else {
                console.log("There was an error with the request")
            }
        }
        xhr.send(JSON.stringify(sender.data));
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;