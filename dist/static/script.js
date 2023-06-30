fetch('http://localhost:3030/json/posts', {
    method: 'POST'
}).then((response) => response.json()).then((posts) => {
    console.log({ posts });
});

fetch('http://localhost:3030/json/todos', {
    method: 'POST'
}).then((response) => response.json()).then((todos) => {
    console.log({ todos });
});

fetch('http://localhost:3030/json/todos?search=react', {
    method: 'POST'
}).then((response) => response.json()).then((queryTodos) => {
    console.log({ queryTodos });
});

fetch('http://localhost:3030/json/posts?search=puppa', {
    method: 'POST'
}).then((response) => response.json()).then((queryTodos) => {
    console.log({ queryTodos });
});

fetch('http://localhost:3030/json/todos2', {
    method: 'POST'
}).then((response) => response.json()).then((todos2) => {
    console.log({ todos2 });
});

