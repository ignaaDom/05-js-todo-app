import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos,renderPending } from './use-cases';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {

    const displayTodos = () =>{
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        renderPending(ElementIDs.PendingCountLabel);
    }

    // Cuando la funcion App() se llama
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompleted = document.querySelector(ElementIDs.ClearCompleted);
    const filtersLI = document.querySelectorAll(ElementIDs.TodoFilters);

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) =>{
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', event =>{
        const element = event.target.closest('[data-id]');
        if(event.target.localName === "label" || event.target.localName === "input"){
            todoStore.toggleTodo(element.getAttribute('data-id'));
        }else return;
        displayTodos();
    });

    todoListUL.addEventListener('click', event =>{
        const isDestroyElement = event.target.className === 'destroy';
        if(!isDestroyElement) return;
        
        const element = event.target.closest('[data-id]');
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompleted.addEventListener('click', () =>{
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLI.forEach(element =>{
        element.addEventListener('click', (element) =>{
            filtersLI.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                break;
            }

            displayTodos();
        });
    });
}