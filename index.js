var json_data = [

]
//(1) 
// create a new list entry looping through the objects above 
var json_data = JSON.parse(localStorage.getItem("json_data"));

var myList = document.getElementById("todo-list");  // bind list Id so we can add more things
if(json_data){
json_data.forEach(element => {          // loop through objects to add them all 
  if (element){
    newTodo(element.title,element.id)    // checking if its a valid object, loads it on to page
                                          // this is because when we delete a todo it becomes null at that index
  }            

});}
  
// delete vent listener 
deleteEventListener();                            // delete event func to listen for the delete of the array elements

//(2)
// delete function 
function deleteEventListener(){                               // function so we can reuse it 
var  closeButtons = document.getElementsByClassName("delete");
    for(var i = 0; i < closeButtons.length; i++){                      // loop through the delete class to listen for a click 
        closeButtons[i].addEventListener("click", deleteToDo, false);}} // then the delete function we entered as param will be called    
                                                 

function deleteToDo (){                         
    var li = this.parentElement;                // we  find the parent element of button thats clicked( the list item its part of)
                                               // 'this' is trigger when the delete function is called inside the delete event listener 

    myList.removeChild(li);                     // then we remove the parent from the list( which is the list element)

/// delete from local storage

var json_temp = JSON.parse( localStorage.getItem('json_data') );
      delete json_temp[li.dataset.id];
      localStorage.setItem('json_data', 
        JSON.stringify(json_temp));


}

//(3)
function newTodo(todoTitle,todoID){
if(!todoTitle && !todoID){                  // we specify a parameter so that we can add existing to do thats in array 
                                            // when creating a new we check if no param entered then we create the param by getting the todoTitle from input
    todoTitle = document.getElementById("todoTitle").value; // if its false that means we are calling it through the add button not json data
 if(todoTitle){
    var todoID = storeTodoLocal(todoTitle);  }  // the store local func returns the id so we can use it 
}
if(todoTitle){
var listItem = document.createElement("li"); // Create Li Element then add the new Todo
listItem.dataset.id = todoID;                // allows to uniquely identify each li element in the DOM when we try delete by binding to its id

listItem.appendChild(
    document.createTextNode(todoTitle)
); 

var deleteButton = document.createElement("button");          // create a button element first for delete link to be created
deleteButton.className = "btm btn-sm btn-danger m-1 delete";  // bootstrap as class name to create styling
deleteButton.appendChild(
        document.createTextNode("Delete")                    // give the button a name 
);
listItem.appendChild(deleteButton);                          // add the delete button to list entry
myList.appendChild(listItem);     
              deleteEventListener();                         // calling delete button event func from above so we can continue listening for the delete click 
console.log("new todo added");
console.log(listItem);}}

//(4)
//save to do list so you can refresh 
function storeTodoLocal(todoTitle) {
      
      // retrieve and parse existing JSON from localstorage
      var json_temp = JSON.parse( localStorage.getItem('json_data') );  // retrieve existing stored data

      if (!json_temp) { 
        json_temp = [];     // if nothing is stores then create an empty arr
      }

      // creating a new todo ID based on length of existing localstorage array
      var todoID = json_temp.length;

      // add new todo object to JSON
      json_temp.push({
        "id": todoID,
        "title": todoTitle,
        "completed": false
      });

      // log updated JSON to console
      console.log(json_temp);

      // stringify updated JSON and store back in localStorage
      localStorage.setItem('json_data', 
        JSON.stringify(json_temp)
      );

      // return ID of new todo
      return todoID;

    }

//(5)
    function deleteAllTodos(){

      if (confirm ("Are you sure you want to delete all the ToDo's?")){ // confirm returns boolean, true if ok is clicked.
      localStorage.removeItem("json_data"); // delete all from local storage

      myList.innerHTML = " ";  // delete all li text in html content
      }

    }