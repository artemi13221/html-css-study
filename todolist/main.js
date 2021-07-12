/*
window.onload = function () {
    const btn = document.querySelector('#textSubmit');
    const textbox = document.querySelector('#textInput');
    const textarea = document.querySelector('#textArea');
    let array = [];

    // 동일하게 반복한 문장은 form태그를 이용해 해결 가능.
    textbox.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
            btn.click();
        }
    });
    
    btn.addEventListener('click', function() {
        if (!textbox.value) {
            return
        }
        array.push([textbox.value, 0]);
        textbox.value = '';

        print(array);
    });

    // 배열 자체에 element를 넣는 방법도 생각해보자. 그렇게 된다면 항상 forEach를 하지 않아도 된다는 장점이 있음.
    // 함수 하나가 하는 일이 너무 많다. 의존성이 너무 강하다보니 다 한 함수에 몰려 생기는 일
    function print(array) {
        textarea.innerHTML = '<h2>Today</h2>';
        array.forEach(function(item, i) {
            let items = document.createElement('span');
            let rmBtn = document.createElement('button');
            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            if (item[1]) {
                checkBox.setAttribute('checked', true);
                items.classList.add('done');
            }
            rmBtn.append('🗑️');
            let str = '  ' + item[0] + ' ';
            items.appendChild(checkBox);
            items.append(str, rmBtn);
            textarea.append(items);
            textarea.append(document.createElement('br'));
            
            // Enable or Disenable checkbox
            checkBox.addEventListener('change', e => {
                if (e.target.checked) {
                    const tmpItem = array[i];
                    array.splice(i, 1);
                    tmpItem[1] = 1;
                    array.push(tmpItem);
                }
                else {
                    array[i][1] = 0;
                }
                
                print(array);
            });

            // click remove button
            rmBtn.addEventListener('click', function() {
                array.splice(i, 1);
                print(array);
            });
        });
    }
}

*/
'use strict';
const textAreaDiv = document.querySelector('#text-area');
const modalBox = document.querySelector('#my-modal');
const modalBoxRmBtn = document.querySelector('.cancle-button');
const textArray = [];
let removeSpanTag;
let inputBoxButton = false;

print();

window.addEventListener('click', (e) => {
  if (e.target === modalBox) {
    disableModalDiv();
  }
});

modalBoxRmBtn.addEventListener('click', () => {
  disableModalDiv();
});

function addArrayText(spanTag) {
  textArray.push({
    tag: spanTag,
    date: new Date(),
  });
}

function removeArrayText(spanTag) {
  const tmp = spanTag.closest('span');
  const removeIndex = textArray.findIndex((item) => item.tag === tmp);
  if (removeIndex >= 0) {
    textArray.splice(removeIndex, 1);
  }
}

function createTextTag(inputMsg) {
  const textSpanTag = document.createElement('span');
  const textCheckBoxTag = document.createElement('input');
  textCheckBoxTag.type = 'checkbox';
  textCheckBoxTag.checked = false;

  textSpanTag.append(textCheckBoxTag, ` ${inputMsg}`);

  addEventTag(textCheckBoxTag, textSpanTag);

  return textSpanTag;
}

function addEventTag(checkBoxTag, spanTag) {
  checkBoxTag.addEventListener('change', (e) => {
    if (e.target.checked) {
      checkBoxTag.checked = true;
      const tmpSpanTag = checkBoxTag.closest('span');
      tmpSpanTag.classList.add('done');
      removeArrayText(tmpSpanTag);
      addArrayText(tmpSpanTag);
    } else {
      checkBoxTag.checked = false;
      checkBoxTag.closest('span').classList.remove('done');
    }
    print();
  });

  spanTag.addEventListener('click', (e) => {
    if (e.target !== checkBoxTag) {
      changeModalContent(e.path[0]);
      enableModalDiv();
    }
  });
}

function print() {
  textAreaDiv.innerHTML = '<h2>Today</h2>';
  textArray.forEach((item) => {
    textAreaDiv.append(item.tag);
  });
  textAreaDiv.append(makeNewDoListButton(!inputBoxButton));
  textAreaDiv.append(makeNewDoListInputBox(inputBoxButton));
}

function changeModalContent(spanTag) {
  const modalBoxName = document.querySelector('.modal-content-name');
  const modalBoxDate = document.querySelector('.modal-content-details-date');
  const modalBoxCheckBox = document.createElement('input');
  const modalBoxSpanTagRmBtn = document.querySelector('.modal-content-details-deleteBtn');

  modalBoxCheckBox.type = 'checkbox';
  const arrayIndex = textArray.find((item) => item.tag === spanTag);

  modalBoxCheckBox.checked = spanTag.querySelector('input').checked;
  modalBoxName.textContent = '';
  modalBoxDate.textContent = '';
  modalBoxName.append(modalBoxCheckBox, spanTag.textContent);
  modalBoxDate.append(`Date : ${arrayIndex.date}`);

  modalBoxCheckBox.addEventListener('change', () => {
    spanTag.querySelector('input').click();
  });

  removeSpanTag = spanTag;
  modalBoxSpanTagRmBtn.addEventListener('click', clickModalBoxSpanTagRmBtn);
}

function clickModalBoxSpanTagRmBtn() {
  removeArrayText(removeSpanTag);
  disableModalDiv();
  print();
}

function enableModalDiv() {
  modalBox.classList.remove('deactivated');
  modalBox.classList.add('activated');
}

function disableModalDiv() {
  modalBox.classList.remove('activated');
  modalBox.classList.add('deactivated');
}

function makeNewDoListButton(isEnable) {
  const inputDiv = document.createElement('div');
  const plusSpan = document.createElement('span');
  plusSpan.append('+');
  plusSpan.classList.add('input-span');
  inputDiv.classList.add('input-div');

  if (isEnable) {
    inputDiv.classList.remove('deactivated');
    inputDiv.classList.add('activated');
  } else {
    inputDiv.classList.remove('activated');
    inputDiv.classList.add('deactivated');
  }
  inputDiv.append(plusSpan, 'Add task');

  clickNewDoList(inputDiv);

  return inputDiv;
}

function makeNewDoListInputBox(isEnable) {
  const inputDiv = document.createElement('div');
  const inputText = document.createElement('input');
  inputText.type = 'text';
  const inputEnterButton = document.createElement('button');
  const inputCancleButton = document.createElement('button');
  inputDiv.classList.add('input-type-div');
  inputEnterButton.append('Add task');
  inputCancleButton.append('Cancle');

  inputEnterButton.classList.add('input-enter-button');
  inputCancleButton.classList.add('input-cancle-button');

  if (isEnable) {
    inputDiv.classList.remove('deactivated');
    inputDiv.classList.add('activated');
  } else {
    inputDiv.classList.remove('activated');
    inputDiv.classList.add('deactivated');
  }

  inputDiv.append(inputText, inputEnterButton, inputCancleButton);
  clickInputBoxEnter(inputEnterButton);
  clickInputBoxCancle(inputCancleButton);

  return inputDiv;
}

function clickNewDoList(inputDiv) {
  inputDiv.addEventListener('click', () => {
    inputBoxButton = !inputBoxButton;
    print();
  });
}

function clickInputBoxEnter(inputEnterButton) {
  inputEnterButton.addEventListener('click', () => {
    const inputText = document.querySelector('.input-type-div input');
    if (inputText.value === '') {
      return;
    }
    addArrayText(createTextTag(inputText.value));
    inputBoxButton = !inputBoxButton;
    print();
  });
}

function clickInputBoxCancle(inputCancleButton) {
  inputCancleButton.addEventListener('click', () => {
    inputBoxButton = !inputBoxButton;
    print();
  });
}