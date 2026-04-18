"use strict";
// Grab the elements from our HTML
const button = document.getElementById('spinButton');
const input = document.getElementById('userInput');
const output = document.getElementById('output');
button.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) {
        output.innerText = "Please enter an event to spin.";
        return;
    }
    // Show a loading message
    output.innerText = "Consulting legal and PR teams...";
    output.className = "loading";
    button.disabled = true;
    try {
        // Talk to your Express backend!
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });
        const data = await response.json();
        if (response.ok) {
            output.innerText = data.result;
            output.className = ""; // Remove loading style
        }
        else {
            output.innerText = `Error: ${data.error}`;
            output.className = "";
        }
    }
    catch (error) {
        output.innerText = "Failed to connect to the server. Is your Express backend running?";
        output.className = "";
    }
    finally {
        button.disabled = false;
    }
});
