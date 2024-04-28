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
            var totalLength = tmpText.length + outputText.length;

            if (totalLength >= 128) {
                splitCount++;
                addTextToOutput(outputDiv, outputText, splitCount);
                outputText = '';
            }

            outputText += tmpText;
            tmpText = '';
        }
    }

    if (outputText.length > 0) {
        splitCount++;
        addTextToOutput(outputDiv, outputText, splitCount);
    }
}

function addTextToOutput(outputDiv, text, splitCount) {
    var formattedText = text.replace(/\n/g, "<br>");
    
    var div = document.createElement('div');
    div.innerHTML = `
        <div data-index="${splitCount - 1}" style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #ccc; padding: 10px;">
            <p>${splitCount}</p>
            <button onclick="copyText(${splitCount - 1})">コピー</button>
            <div style="flex-grow: 1; margin-left: 10px;">
                <p>${formattedText}</p>
                <p>残り文字数: ${128 - text.length}</p>
            </div>
        </div>
    `;
    
    outputDiv.appendChild(div);
}

function copyText(index) {
    var text = document.querySelector(`#output div[data-index="${index}"] div p:first-of-type`).innerText;
    navigator.clipboard.writeText(text)
        .then(() => {
            var button = document.querySelector(`#output div[data-index="${index}"] button`);
            button.textContent = 'コピー済';
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}
