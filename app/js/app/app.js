/* 
    Created by Sándor Király on 03/17/21.

    Copyright © Sándor Király.
    All rights reserved.
*/

import '../jquery/jquery-3.6.0.min.js';

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;
let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;

    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

$(".header .refresh-list").bind("click", function() {
    let hasItems = localStorage.getItem("TODO");

    if (hasItems) {
        localStorage.clear();
        location.reload();
    } else {
        console.log("üres, nincs mit törölni");
    }
});

const dateElement = document.getElementById("date");

const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("hu-HU", options);

function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-times de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

$(document).bind("keyup", function(event) {
    if (event.keyCode == 13) {
        const toDo = $("#input").val();
        console.log(toDo);

        if (toDo) {
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }

        input.value = "";
    }
});

function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);

    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

$("#list").bind("click", function() {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    
    localStorage.setItem("TODO", JSON.stringify(LIST));
});