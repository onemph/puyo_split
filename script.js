function splitText() {
  var inputText = document.getElementById('inputText').value;
  var splitTexts = inputText.match(/.{1,128}[。\n]|.{1,128}$/g);
  
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';
  
  var tempText = '';
  splitTexts.forEach(function(text, index) {
    if (index === splitTexts.length - 1) {
      tempText += text;
    }
    if ((tempText.length + text.length) > 128 || index === splitTexts.length - 1) {
      var div = document.createElement('div');
      div.innerHTML = `
        <p>${index + 1}/${splitTexts.length}</p>
        <p>${tempText}</p>
        <p>残り文字数: ${128 - tempText.length}</p>
        <button onclick="copyText(${index})">コピー</button>
      `;
      outputDiv.appendChild(div);
    }
  });
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
