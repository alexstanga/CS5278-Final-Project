import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function ResultsComponent() {
    const [results, setResults ] = useState(null);

    useEffect(() => {
        const storedResults = localStorage.getItem('surveyResults');
        if (storedResults) {
            setResults(JSON.parse(storedResults));
        }
    }, []);

    const handleDownloadPdf = async () => {
        try {
            const response = await fetch(`http://localhost:8080/jpa/download/${results.result.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Create a blob from the PDF data
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Create a link element and simulate a click to download the PDF
            const a = document.createElement('a');
            a.href = url;
            a.download = 'results.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading the PDF:', error);
        }
    };

    return (
        <div>
            <h2>Survey Results</h2>
            {results ? (
                <div>
                    <pre>{JSON.stringify(results, null, 3)}</pre>
                <button onClick={handleDownloadPdf}>Download PDF</button>
                </div>
                ) : (
                    <p>No results found</p>
            )}
        </div>
    )
}

export default ResultsComponent;