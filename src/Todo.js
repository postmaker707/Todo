'use strict';
import React from 'react';

export class Todo extends React.Component {
  
    constructor() {
       super();
       this.state = {
         itemArray: [{text: 'Task1', edit: false, checked: false,}],
         newTask: ''
       }
   }
   
   HandleSubmit(event) {
     event.preventDefault();
     
     const item = this.state.itemArray;
     var text = this.state.newTask;
     item.push({ text });
     this.setState({itemArray: item});
     
     console.log(this.state.newTask);
   }
   
   HandleChange(event) {
     this.setState({newTask: event.target.value});
   }
  
   DeleteTask(event, index) {
     
     event.preventDefault();
     
     var item = this.state.itemArray;
     item.splice(index, 1);
     this.setState({itemArray: item});
   }
   
   RenameTask(event, index) {
     
     event.preventDefault();
         
     var item = this.state.itemArray;
     item[index].edit = true;
     this.setState({itemArray: item});
   }
   
   HandleKeyPress(event){
     if(event.keyCode === 13){
       event.target.blur(); 
     }
  }
   
   RenameDone(event, index) {
     var item = this.state.itemArray;
     item[index].edit = false;
     this.setState({itemArray: item});
   }
   
   HandleRename(event, index) {
     event.preventDefault();
     
     var item = this.state.itemArray;
     item[index].text = event.target.value;
     this.setState({itemArray: item});
   }
   
   HandleCheck(event, index) {
     var item = this.state.itemArray;
     item[index].checked = !item[index].checked;
     this.setState({itemArray: item});
   }
   
   render() {
     return (
        <div className="fatherDiv">
       <div id="cont1" align="center">
         <form 
         onSubmit={(event) => this.HandleSubmit(event)}>
         <label>
         Task:&nbsp;&nbsp;<input className="inputTask" type="text" placeholder="Task" required onChange={(event) => this.HandleChange(event)}/>&nbsp;&nbsp;
           </label>
           <button className="buttonSubmit" type="submit" >ADD</button>
         </form>
           </div>
       <div>
         {this.state.itemArray.map((item, index) => {
           return (
             <div align="center">
                 <span>
                  <input className="checkBox" type="checkbox"  onChange={(event) => this.HandleCheck(event, 
                          index)}/>&nbsp;&nbsp;
                   {!item.edit && (
                   <span className="task_name" onClick={(event) => this.RenameTask(event, index)}>
                   {item.text}
                   </span>)}
                   {item.edit && (
                   <span className="task_name">
                     <input autoFocus type="text" value={item.text} onChange={(event) => this.HandleRename(event, index)} onBlur={(event) => this.RenameDone(event, index)} onKeyDown={(event) => this.HandleKeyPress(event, index)}/>
                   </span>)}
                   &nbsp;&nbsp;<button type="text" className="close" onClick={(event) => this.DeleteTask(event, index)}>X</button>
                </span>
             </div>
           );
         })}
         </div>
         </div>
         
     );
   }
 };
 
