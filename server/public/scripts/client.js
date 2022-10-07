$(document).ready(onReady);
function onReady() {
console.log('client.js ready, jquery ready');
    showTasks();
    $('#submitBtn').on('click',addTask);
}

function showTasks() {
    console.log("in showTasks");
    $('#tbody').empty();
    $.ajax({
        method:'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log("GET /tasks response",response);
        for(let x of response) {
            $('#tbody').append(`
            <tr>
                <td> ${x.task}</td> 
                <td> ${x.completed} </td>
                <td><input type="checkbox" class="check"/></td>
                <td> ${x.notes} </td>
                <td> <button id="delBtn" data-id="dataDel">Delete</button></td>
            </tr>
               `)
            }
        }).catch((err) => {
            console.log("error in GET /tasks",err)
        })
}

function addTask(evt) {
    evt.preventDefault();
if($('#inputTask').val() == "") {
    alert("Please enter a task");
    return;
}
console.log("Submit button clicked");

    let trackObj = {
        task: $('#inputTask').val(),
        completed: false,
        notes: $('#inputNotes').val()
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: trackObj
    }).then(function(response) {
        $('#inputTask').val(''),
        $('#inputNotes').val('')
        showTasks();
    });

};

