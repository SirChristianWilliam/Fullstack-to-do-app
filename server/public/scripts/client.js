$(document).ready(onReady);
//let checked = "unchecked";

function onReady() {
console.log('client.js ready, jquery ready');
    showTasks();
    $('#submitBtn').on('click',addTask);
    $('#tbody').on('click', '.delBtn', deleteTask);
    $('#tbody').on('click','.check',changeStatus);
    /*$('#tbody').on('mouseout','.noteBox',changeNotes);*/
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
        
        const textClass = x.completed ? "textClass" : "";
 
            $('#tbody').append(`
            <tr class=${tasksClass}>
                <td> - ${x.task}</td> 
                <td> ${x.completed} </td>
                <td class=${checkClass}> <input type="checkbox" data-id="${x.id}" class="check" ${checkText}> ${btnText} </input></td>
                <td class=${textClass}><textarea class="noteBox" data-note="${x.notes}">${x.notes} </textarea></td>
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
    let message = "Are you sure you want to delete this task?";
    if (confirm(message) == true) {
        $.ajax({
            method: 'DELETE',
            url: `/tasks/${taskId}`,
        }).then(function(response) {
            console.log("The song was deleted!");
            showTasks();
        }).catch(function(error) {
            console.log("ERROR on delete",error);
        });
    } else {
      return;
    }

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

/*
function changeNotes(evt) {
     evt.preventDefault();
    let noteId = $(this).data('note');
    console.log(noteId);

    let noteObj = {
        newNotes:  $(this).data('note')
    }
     $.ajax({
        method: 'PUT',
        url: `/tasks/${noteId}`,
        data:noteObj
     })
    .then(function(response) {
        console.log("The note was updated");
        console.log(response,"in .then notes");
        showTasks();
    })
    .catch(function(err) {
        console.log("Err on notebox",err);
    });
};

*/