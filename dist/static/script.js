'use strict';
fetch('http://localhost:3030/json/posts')
    .then((response) => response.json())
    .then((posts) => {
        console.log({ posts });
    });
fetch('http://localhost:3030/json/todos')
    .then((response) => response.json())
    .then((todos) => {
        console.log({ todos });
    });
fetch('http://localhost:3030/todos?search=react')
    .then((response) => response.json())
    .then((queryTodos) => {
        console.log({ queryTodos });
    });
fetch('http://localhost:3030/posts?search=puppa')
    .then((response) => response.json())
    .then((queryTodos) => {
        console.log({ queryTodos });
    });
fetch('http://localhost:3030/todos2')
    .then((response) => response.json())
    .then((todos2) => {
        console.log({ todos2 });
    });
