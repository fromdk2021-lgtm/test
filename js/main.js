//Меню задач
var allZad = document.getElementById("all-1");
var act = document.getElementById("all-2");
var ready = document.getElementById("all-3");
var addZad = document.getElementById("all-4");

function showAll() {
    allZad.style.opacity = "1";
    allZad.style.zIndex = "10";

    act.style.opacity = "0";
    act.style.zIndex = "-1";

    ready.style.opacity = "0";
    ready.style.zIndex = "-1";

    addZad.style.opacity = "0";
    addZad.style.zIndex = "-1";
}

function showAct() {
    allZad.style.opacity = "0";
    allZad.style.zIndex = "-1";

    act.style.opacity = "1";
    act.style.zIndex = "10";

    ready.style.opacity = "0";
    ready.style.zIndex = "-1";

    addZad.style.opacity = "0";
    addZad.style.zIndex = "-1";
}

function showReady() {
    allZad.style.opacity = "0";
    allZad.style.zIndex = "-1";

    act.style.opacity = "0";
    act.style.zIndex = "-1";

    ready.style.opacity = "1";
    ready.style.zIndex = "10";

    addZad.style.opacity = "0";
    addZad.style.zIndex = "-1";
}

function showAdd() {
    allZad.style.opacity = "0";
    allZad.style.zIndex = "-1";

    act.style.opacity = "0";
    act.style.zIndex = "-1";

    ready.style.opacity = "0";
    ready.style.zIndex = "-1";

    addZad.style.opacity = "1";
    addZad.style.zIndex = "10";
}

//добавление новой задачи
var NewZad = document.getElementById("zadacha");
var Zad = document.getElementById("addZ");
var actZad = document.getElementById("activeZad");
var count = 0;
function newZad(){
    const text = NewZad.value;

    if (text.trim() === "") {
        alert("Сначала введите задачу!");
        return;
    }

    count++;
    var clasS = "Zad-" + count;
    const newEl_1 = document.createElement("input");
    newEl_1.type = "radio";
    newEl_1.setAttribute('class', clasS);
    addZ.append(newEl_1);
    const act_1 = newEl_1.cloneNode(true);
    activeZad.append(act_1);

    const newEl_2 = document.createElement("label");
    newEl_2.setAttribute('for', count);
    newEl_2.setAttribute('class', clasS);
    newEl_2.textContent = text;
    addZ.append(newEl_2);
    const act_2 = newEl_2.cloneNode(true);
    activeZad.append(act_2);

    const newEl_3 = document.createElement("br");
    addZ.append(newEl_3);
    newEl_3.setAttribute('class', clasS);
    const act_3 = newEl_3.cloneNode(true);
    activeZad.append(act_3);

    NewZad.value = "";
    NewZad.focus();

}

/* ИИ КОД!!!!
Проверка выполнения задачи из списка
+ добавление задач в выполненные
+ зачеркивание выполненных задач
*/
var compZad = document.getElementById("finish");

Zad.addEventListener('change', function(event) {
    if (event.target.type === 'radio' && event.target.checked) {
        // Точно так же берем уникальный класс задачи
        const taskClass = event.target.classList[0]; 

        event.target.disabled = true;

        const currentLabel = Zad.querySelector(`label.${taskClass}`);
        if (currentLabel) {
            currentLabel.style.textDecoration = 'line-through';
            currentLabel.style.color = '#888';
        }

        // Ищем ВСЕ элементы с этим классом внутри противоположного блока (actZad)
        const elementsInActive = actZad.querySelectorAll('.' + taskClass);

        elementsInActive.forEach(element => {
            const clone = element.cloneNode(true);
            
            // Необязательно, но красиво: если это радиокнопка, делаем её активной и заблокированной
            if (clone.type === 'radio') {
                clone.checked = true;
                clone.disabled = true; 
            }

            if (clone.tagName === 'LABEL') {
                clone.style.textDecoration = 'line-through';
                clone.style.color = '#888';
            }
            
            compZad.append(clone); // Добавляем в третий блок
        });

        // Полностью удаляем их из HTML
        elementsInActive.forEach(element => element.remove());
    }
});

actZad.addEventListener('change', function(event) {
    if (event.target.type === 'radio' && event.target.checked) {
        // Получаем имя уникального класса задачи (например, "zadachka-1")
        const taskClass = event.target.classList[0]; 

        event.target.disabled = true;

        const mirroRadio = Zad.querySelector(`input.${taskClass}`);
        if (mirroRadio) {
            mirroRadio.checked = true; 
            mirroRadio.disabled = true; // Тоже делаем серой

            // И зачеркиваем текст в блоке Zad
            const mirrorLabel = Zad.querySelector(`label.${taskClass}`);
            if (mirrorLabel) {
                mirrorLabel.style.textDecoration = 'line-through';
                mirrorLabel.style.color = '#888';
            }
        }
        

        // Ищем ВСЕ элементы с этим классом внутри противоположного блока (Zad)
        const elementsInZad = actZad.querySelectorAll('.' + taskClass);

        const mirrorRadio = Zad.querySelector('.' + taskClass);
        
        if (mirrorRadio) {
            mirrorRadio.checked = event.target.checked; 
        }

        elementsInZad.forEach(element => {
            const clone = element.cloneNode(true);
            
            if (clone.type === 'radio') {
                clone.checked = true;
                clone.disabled = true;
            }

            if (clone.tagName === 'LABEL') {
                clone.style.textDecoration = 'line-through';
                clone.style.color = '#888';
            }
            
            compZad.append(clone);
        });

        // Полностью удаляем их из HTML
        elementsInZad.forEach(element => element.remove());
    }
});