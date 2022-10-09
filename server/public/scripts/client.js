$(document).ready(onReady);
function onReady() {
console.log('client.js ready, jquery ready');
    showTasks(); //This is my "on ready"/last function my code runs through
    $('#submitBtn').on('click',addTask);
    $('#tbody').on('click', '.delBtn', deleteTask);
    $('#tbody').on('click','.check',changeStatus);
    //$('#tbody').on('mouseout','.noteBox',changeNotes);
    //Line 8: See comment @ bottom of this page
 };
function showTasks() {
     console.log("in showTasks");
    $.ajax({
        method:'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log("GET /tasks response",response);
        render(response); //response = the database rows
         }).catch((err) => {
            console.log("error in GET /tasks",err)
        })
};
function render(taskObj) {
$('#tbody').empty(); //Empty past appended table rows
    for(let x of taskObj) { 
        const tasksClass = x.completed ? "lineThru" : "";
        const btnText = x.completed ? "" : "";
        const checkClass = x.completed ? "checkClass" : "";
        const checkText = x.completed ? "" : "";
//Lines 26-29: These variables allow me to toggle classes 
//depending on the x.completed boolean state, for the checkbox and the task text
        const textClass = x.completed ? "textClass" : "";
//Line 32 allows a class toggle based off the boolean state for the noteBox class
        if(x.task.length > 20) {
            fontChange = "smaller";
        } else {
            fontChange = "norm";
          }     
            $('#tbody').append(`
            <tr class=${tasksClass}>
                <td class="taskSizeClass, ${fontChange}"> <span class="spanClass">-</span> ${x.task}</td> 
                <td> ${x.completed} </td>
                <td class=${checkClass}> <input type="checkbox" data-id="${x.id}" class="check" ${checkText}> ${btnText} </input></td>
                <td class=${textClass}><textarea class="noteBox" data-note="${x.notes}">${x.notes} </textarea></td>
                <td> <button class="delBtn" data-id="${x.id}"> Delete </button></td>
             </tr>
            `)
    };
//Regarding line 44's data-note: See comments at bottom of page
};
function addTask(evt) { 
evt.preventDefault();
    if($('#inputTask').val() == "") {
        alert("Please enter a task");
        return;
    };
//Line 53-55: If no value is in the inputTask,leave this function & don't update DB or DOM
    console.log("Submit button clicked");  
    let taskObj = {
        task: $('#inputTask').val(),
        completed: false, //Start every new item as not complete
        notes: $('#inputNotes').val()
    };
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskObj
    })
    .then(function(response) {
        $('#inputTask').val(''), 
        $('#inputNotes').val('')
        showTasks();
//After database is updated, clear the inputs and call showTasks()
// to get and then display the new data on the DOM
    });
};
function deleteTask(evt) {
evt.preventDefault();
    console.log('DELETE button was clicked,ID being', $(this).data('id'));
    let taskId = $(this).data('id');
    let message = "Are you sure you want to delete this task?";
    if(confirm(message) == true) { //Gives the user the option to cancel if they
        //didn't mean to actually delete
        $.ajax({
            method: 'DELETE',
            url: `/tasks/${taskId}`, //Send the id of the current item clicked
            //to be used on the server side
        })
        .then(function(response) {
            console.log("The task was deleted!");
            showTasks(); //The databse has been udpated, this function will display
            // the new/current result
        }).catch(function(err) {
            console.log("ERROR on delete",err);
        });
    } else {
        return; //Leaves this function & doesn't update the DB if the message == false (if cancel is clicked)
    };
};
function changeStatus(evt) {
evt.preventDefault();
    let taskId = $(this).data('id');
    console.log(taskId);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`//Get the selected elements' ID, to be sent and used by the state
    })
    .then(function(response) {
        console.log("The checkbox was successfully toggled");
        showTasks(); //As usual, use the new data from the server to visually update the DOM
    })
    .catch(function(err) {
        console.log("Err on checkbox",err);
    });
};

//THE COMMENTED OUT CODE BELOW IS MY ATTEMPT TO GET THE INPUT NOTES BOX VALUE
//WHENEVER I MOVE MY MOUSE OUT, AND THEN UPDATE THE DATABASE AND APPEND
//THAT NEW VALUE TO THE DOM. HOWEVER, IT SEEMED THAT IT JUST KEPT
//LINKING TO THE FIRST PUT REQUEST IN THE ROUTES SERVER AND I COULDN'T FIGURE
//OUT HOW TO FIX THAT. LEAVING THIS HERE JUST IN CASE I WANT TO GO BACK AND TRY AGAIN.

// function changeNotes(evt) {
//      evt.preventDefault();
//     let noteId = $(this).data('note');
//     console.log(noteId);

//     let noteObj = {
//         newNotes:  $(this).data('note')
//     }
//      $.ajax({
//         method: 'PUT',
//         url: `/tasks/${noteId}`,
//         data:noteObj
//      })
//     .then(function(response) {
//         console.log("The note was updated");
//         console.log(response,"in .then notes");
//         showTasks();
//     })
//     .catch(function(err) {
//         console.log("Err on notebox",err);
//     });
// };

