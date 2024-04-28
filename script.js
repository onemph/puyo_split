function splitText() {
    var inputText = document.getElementById('inputText').value;
    var outputDiv = document.getElementById('output');
    
    var variable1 = inputText;
    var variable2 = '';
    var variable3 = '';

    for (var i = 0; i < variable1.length; i++) {
        var currentChar = variable1[i];

        variable2 += currentChar;

        if (currentChar === '。' || currentChar === '\n' || i === variable1.length - 1) {
            var totalLength = variable2.length + variable3.length;

            if (totalLength >= 128) {
                addTextToOutput(outputDiv, variable3, i, totalLength);
                variable3 = '';
            }

            variable3 += variable2;
            variable2 = '';
        }
    }
}

function addTextToOutput(outputDiv, text, index, total) {
    var formattedText = text.replace(/\n/g, "<br>");
    
    var div = document.createElement('div');
    div.innerHTML = `
        <p>${index + 1}/${total}</p>
        <p>${formattedText}</p>
        <p>残り文字数: ${128 - text.length}</p>
        <button onclick="copyText(${index})">コピー</button>
    `;
    outputDiv.appendChild(div);
}

function copyText(index) {
    var text = document.querySelectorAll('#output div')[index].querySelector('p:nth-child(2)').textContent;
    navigator.clipboard.writeText(text)
        .then(() => {
            var button = document.querySelectorAll('#output div')[index].querySelector('button');
            button.textContent = 'コピー済';
            button.disabled = true;
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}
