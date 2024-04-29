function splitText() {
    var inputText = document.getElementById('inputText').value;
    var outputDiv = document.getElementById('output');
    
    outputDiv.innerHTML = '';
    
    var tmpText = '';
    var outputText = '';
    var splitCount = 0;

    for (var i = 0; i < inputText.length; i++) {
        var currentChar = inputText[i];

        tmpText += currentChar;

        if (currentChar === '。' || currentChar === '\n' || i === inputText.length - 1) {
            outputText = outputText.replace(/^\n*/, '');
            var totalLength = tmpText.length + outputText.length;
            var lineCount = (outputText.match(/\n/g) || []).length;

            if (totalLength >= 128 || lineCount >= 10) {
                splitCount++;
                addTextToOutput(outputDiv, outputText, splitCount);
                outputText = '';
                tmpText = '';
            }

            outputText += tmpText;
            tmpText = '';
        }
    }

    if (outputText.length > 0) {
        splitCount++;
        outputText = outputText.replace(/^\n*/, '');
        addTextToOutput(outputDiv, outputText, splitCount);
    }
}

function addTextToOutput(outputDiv, text, splitCount) {
    var trimmedText = text.trim();
    var formattedText = trimmedText.replace(/\n/g, "<br>");
    
    var div = document.createElement('div');
    div.innerHTML = `
        <div data-index="${splitCount - 1}" style="border-top: 1px solid #ccc; padding-top: 10px;">
            <div style="display: flex; align-items: center;">
                <button id="copyButton-${splitCount - 1}" onclick="copyText(${splitCount - 1})">コピー</button>
                <p>${splitCount}</p>
            </div>
            <div>
                <p>${formattedText}</p>
                <p>残り文字数: ${128 - text.length}</p>
            </div>
        </div>
    `;
    
    outputDiv.appendChild(div);
}

function copyText(index) {
    var text = document.querySelector(`#output div[data-index="${index}"] div:nth-of-type(2) p:first-of-type`).innerText;
    navigator.clipboard.writeText(text)
        .then(() => {
            var nextButton = document.getElementById(`copyButton-${index + 1}`);
            if (nextButton) {
                nextButton.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            var
