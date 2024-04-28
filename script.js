function splitText() {
    var inputText = document.getElementById('inputText').value;
    var outputDiv = document.getElementById('output');

    var copyButton = document.createElement('button');
    copyButton.textContent = 'コピー済';
    outputDiv.appendChild(copyButton);
    var copyButtonWidth = copyButton.getBoundingClientRect().width;

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
                addTextToOutput(outputDiv, outputText, splitCount, copyButtonWidth);
                outputText = '';
            }

            outputText += tmpText;
            tmpText = '';
        }
    }

    if (outputText.length > 0) {
        splitCount++;
        addTextToOutput(outputDiv, outputText, splitCount, copyButtonWidth);
    }
}

function addTextToOutput(outputDiv, text, splitCount, copyButtonWidth) {
    var formattedText = text.replace(/\n/g, "<br>");

    var div = document.createElement('div');
    div.innerHTML = `
        <div data-index="${splitCount - 1}" style="border-top: 1px solid #ccc; padding-top: 10px;">
            <div style="display: flex; align-items: center;">
                <button onclick="copyText(${splitCount - 1})" style="width: ${copyButtonWidth}px;">コピー</button>
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
    var textElement = document.querySelectorAll(`#output div[data-index="${index}"]`);
    var specificDiv = textElement[0];
    alert(specificDiv.outerHTML + '\n\n' + specificDiv.querySelector('div:nth-of-type(1) p:first-of-type').outerHTML + '\n\n' + specificDiv.querySelector('div:nth-of-type(2) p:first-of-type').outerHTML);
    var text = specificDiv.querySelector('div:nth-of-type(2) p:first-of-type').innerText;
    navigator.clipboard.writeText(text)
        .then(() => {
            var button = specificDiv.querySelector('button');
            button.textContent = 'コピー済';
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}
