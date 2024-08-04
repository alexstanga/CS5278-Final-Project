import React, {useState} from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css"
import { json } from "./json";
import {surveyJson} from "./pha";
import ResultsComponent from "./ResultsComponent";

function SurveyComponent() {
    const formatted = {};
    const survey = new Model(surveyJson);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        formatted["phq-9"] = formatResults(sender.data, "phq-");
        formatted["gad-7"] = formatResults(sender.data, "gad-");
        console.log(JSON.stringify(formatted, null, 3));
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/jpa/surveys/1/results");
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.onload = xhr.onerror = function () {
            localStorage.removeItem('surveyResults');
            localStorage.setItem('surveyResults', xhr.response);
            console.log(xhr.response);
            if (xhr.status === 200) {
                console.log("Success!")
            } else {
                console.log("There was an error with the request")
            }
        }
        xhr.send(JSON.stringify(formatted));


    });

    survey.navigateToUrl = "results"

    return (
            <Survey model={survey} />
    );
}

// Formate the results into
// "phq-9": {
//    "phq-1: {
//          "answer": "Frequently",
//          "score: 2
//    },
//    ....
// }
const formatResults = (results, prefix) => {
    const formatted = {};
    Object.keys(results).forEach(key => {
        if (key.startsWith(prefix)) {
            const answer = results[key];
            const question = surveyJson.pages[0].elements.find(e => e.name === key);
            const choice = question.choices.find(c => c.value === answer);
            formatted[key] = {
                answer: choice ? choice.text : answer,
                score: choice ? choice.score : 0
            };
        }
    });
    return formatted;
}

export default SurveyComponent;