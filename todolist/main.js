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

// 코드 전체상으로 리팩토링이 요구 된다.
*/
"use strict";
const sendBtn = document.querySelector("#text-submit");
const sendTextBox = document.querySelector("#text-input");
const textAreaDiv = document.querySelector("#textArea");
const textArray = [];

sendBtn.addEventListener("click", () => {
  if (sendTextBox.value === "") {
    return;
  }
  addArrayText(createTextTag(sendTextBox.value));
  sendTextBox.value = "";

  print();
});

sendTextBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

function addArrayText(spanTag) {
  textArray.push(spanTag);
}

function removeArrayText(spanTag) {
  const tmp = spanTag.closest("span");
  textArray.forEach((item, i) => {
    if (item === tmp) {
      textArray.splice(i, 1);
    }
  });
}

function createTextTag(inputMsg) {
  const textSpanTag = document.createElement("span");
  const textRemoveBtnTag = document.createElement("button");
  const textCheckBoxTag = document.createElement("input");
  textCheckBoxTag.type = "checkbox";
  textCheckBoxTag.checked = false;

  textRemoveBtnTag.append("🗑️");
  textSpanTag.append(textCheckBoxTag, ` ${inputMsg}`, textRemoveBtnTag);

  addEventTag(textRemoveBtnTag, textCheckBoxTag);

  return textSpanTag;
}

function addEventTag(removeBtnTag, checkBoxTag) {
  checkBoxTag.addEventListener("change", (e) => {
    if (e.target.checked) {
      checkBoxTag.checked = true;
      const tmpSpanTag = checkBoxTag.closest("span");
      tmpSpanTag.classList.add("done");
      removeArrayText(tmpSpanTag);
      addArrayText(tmpSpanTag);
    } else {
      checkBoxTag.checked = false;
      checkBoxTag.closest("span").classList.remove("done");
    }
    print();
  });

  removeBtnTag.addEventListener("click", () => {
    removeArrayText(removeBtnTag);
    print();
  });
}

function print() {
  textAreaDiv.innerHTML = "<h2>Today</h2>";
  textArray.forEach((item) => {
    textAreaDiv.append(item);
  });
}
