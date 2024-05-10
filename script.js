var copyButtonWidth = null;

document.addEventListener('DOMContentLoaded', function() {
    var outputDiv = document.getElementById('output');
    var copyButton = document.createElement('button');
    copyButton.textContent = 'コピー済';
    outputDiv.appendChild(copyButton);
    copyButtonWidth = copyButton.getBoundingClientRect().width;
    outputDiv.removeChild(copyButton);
});

function splitText() {
    var inputText = document.getElementById('inputText').value;
    var delimiter = document.getElementById('delimiter').value;
    var outputDiv = document.getElementById('output');

    outputDiv.innerHTML = '';

    var tmpText = '';
    var outputText = '';
    var splitCount = 0;

    for (var i = 0; i < inputText.length; i++) {
        var currentChar = inputText[i];

        // 強制区切り文字があれば、その時点で分割
        if (currentChar === delimiter) {
            splitCount++;
            addTextToOutput(outputDiv, outputText, splitCount);
            outputText = '';
        }

        tmpText += currentChar;

        // 文章の終端または句点・改行で分割
        if (currentChar === '。' || currentChar === '\n' || i === inputText.length - 1) {
            outputText = outputText.replace(/^\n*/, '');
            var totalLength = tmpText.length + outputText.length;
            var lineCount = (outputText.match(/\n/g) || []).length;

            if (totalLength >= 128 || lineCount >= 10) {
                splitCount++;
                addTextToOutput(outputDiv, outputText, splitCount);
                outputText = '';
            }

            outputText += tmpText;
            tmpText = '';
        }
    }

    outputText = outputText.trim();
    if (outputText.length > 0) {
        splitCount++;
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
                <button id="copyButton-${splitCount - 1}" onclick="copyText(${splitCount - 1})" style="background-color: #80e27e; width: ${copyButtonWidth}px;">コピー</button>
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
            var button = document.querySelector(`#output div[data-index="${index}"] button`);
            button.textContent = 'コピー済';
            button.style.backgroundColor = '#ffad60';
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}
