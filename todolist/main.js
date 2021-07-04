window.onload = function () {
    const btn = document.querySelector('#textSumbit');
    const textbox = document.querySelector('#textInput');
    const textarea = document.querySelector('#textArea');
    let array = [];

    // 동일하게 반복한 문장은 form태그를 이용해 해결 가능.
    textbox.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
            if (!textbox.value) {
                return
            }
            array.push([textbox.value, 0]);
            textbox.value = '';
    
            print(array);
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