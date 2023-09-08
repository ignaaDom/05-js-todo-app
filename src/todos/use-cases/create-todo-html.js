import { Todo } from "../models/todo.model";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) =>{
    if(!todo) throw new Error('A TODO object is required');

    const {done,description,id} = todo;

    const html = `
        <div class="view">
            <input id="${id}-id" class="toggle" type="checkbox" ${done ? 'checked' : ''}>
            <label for="${id}-id">${description}</label>
            <button class="destroy"></button>
        </div>
        <input name="b" class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id',id);
    if(done) liElement.classList.add('completed');

    return liElement;
}