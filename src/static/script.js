fetch('http://localhost:3030/posts', {
    method: 'POST',
})
    .then((response) => response.json())
    .then((posts) => {
        console.log({ posts });
    });

fetch('http://localhost:3030/todos', {
    method: 'POST',
})
    .then((response) => response.json())
    .then((todos) => {
        console.log({ todos });
    });

fetch('http://localhost:3030/todos?search=react', {
    method: 'POST',
})
    .then((response) => response.json())
    .then((queryTodos) => {
        console.log({ queryTodos });
    });

fetch('http://localhost:3030/posts?search=puppa', {
    method: 'POST',
})
    .then((response) => response.json())
    .then((queryTodos) => {
        console.log({ queryTodos });
    });

fetch('http://localhost:3030/todos2', {
    method: 'POST',
})
    .then((response) => response.json())
    .then((todos2) => {
        console.log({ todos2 });
    });
