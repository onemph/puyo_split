function splitText() {
    var inputText = document.getElementById('inputText').value;
    var outputDiv = document.getElementById('output');
    
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
        <p>${splitCount}</p>
        <p>${formattedText}</p>
        <p>残り文字数: ${128 - text.length}</p>
        <button onclick="copyText(${splitCount - 1})">コピー</button>
    `;
    outputDiv.appendChild(div);
}

function copyText(index) {
    var text = document.querySelectorAll('#output div')[index].querySelector('p:nth-child(2)').textContent;
    navigator.clipboard.writeText(text)
        .then(() => {
            var button = document.querySelectorAll('#output div')[index].querySelector('button');
            button.textContent = 'コピー済';
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}
