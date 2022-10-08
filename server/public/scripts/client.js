$(document).ready(onReady);
//let checked = "unchecked";

function onReady() {
console.log('client.js ready, jquery ready');
    showTasks();
    $('#submitBtn').on('click',addTask);
    $('#tbody').on('click', '.delBtn', deleteTask);
    $('#tbody').on('click','.check',changeStatus);
 }

function showTasks() {
     console.log("in showTasks");
    $.ajax({
        method:'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log("GET /tasks response",response);
        render(response);
         }).catch((err) => {
            console.log("error in GET /tasks",err)
        })
}
function render(taskObj) {
    $('#tbody').empty();
    for(let x of taskObj) {
        const tasksClass = x.completed ? "lineThru" : "";
        const btnText = x.completed ? "" : "";
        
        const checkClass = x.completed ? "checkClass" : "";
        const checkText = x.completed ? "" : "";
            
            $('#tbody').append(`
            <tr class=${tasksClass}>
                <td> ${x.task}</td> 
                <td> ${x.completed} </td>
                <td class=${checkClass}> <input type="checkbox" data-id="${x.id}" class="check" ${checkText}> ${btnText} </input></td>
                <td> ${x.notes} </td>
                <td> <button class="delBtn" data-id="${x.id}"> Delete </button></td>
             </tr>
               `)
            }
}

function addTask(evt) {
    evt.preventDefault();
if($('#inputTask').val() == "") {
    alert("Please enter a task");
    return;
}
console.log("Submit button clicked");

    let taskObj = {
        task: $('#inputTask').val(),
        completed: false,
        notes: $('#inputNotes').val()
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskObj
    }).then(function(response) {
        $('#inputTask').val(''),
        $('#inputNotes').val('')
        showTasks();
    });

};

function deleteTask(evt) {
    evt.preventDefault();
console.log('DELETE button was clicked,ID being', $(this).data('id'));
    let taskId = $(this).data('id');
    $(this).parent().parent().css("background-color","blue");

    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
    }).then(function(response) {
        console.log("The song was deleted!");
        showTasks();
    }).catch(function(error) {
        console.log("ERROR on delete",error);
    });
};

function changeStatus(evt) {
     evt.preventDefault();
      let taskId = $(this).data('id');
    console.log(taskId);
     $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`
     })
    .then(function(response) {
        console.log("The task was complete/not completed");
        console.log(response,"HERRRR");
        showTasks();
    })
    .catch(function(err) {
        console.log("Err on checkbox",err);
    });
};

