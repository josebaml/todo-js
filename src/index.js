import './style.scss';

import {Todo, TodoList, crearTodoHtml} from './js/index';

export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo)); //todoList.todos.forEach(crearTodoHtml);