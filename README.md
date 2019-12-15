# lets-todo

first project using vue-x
http://letstodo.royhan-mardista.online/, I deployed both server and bucket in google cloud platform

## Description

this webite works similarly with todoist.com and trello.com, but only a portion of their fitures is implemented here. Basically an authenticated user are allowed to crate a project, add tasks to the project then invite new member to complete the project together, user can also create task without creating project.

## API documentation

https://documenter.getpostman.com/view/9288133/SW14UGTA?version=latest

## Fitures

- the card will display due date, due time, title, disciption of each of your task
- when you first creating task the card color will be red indicating that the task is incomplete
- if you complete the task the card will turn green and the date and time will change to current date and time
- you can filter only for today task, or you can view your tasks until next week
- when creating task or project the minimum date and time is current time
- user can search a new member using email or username
- when adding a new member the website will confirm if there is duplicated member
- checking all overdue tasks and completed task
- adding google OAuth login

## Framework and Libraries

### FrontEnd(vue.js, vuex)

- moment
- bootsrap-vue
- sweetalert2
- axios

### BackEnd(node.js)

- express
- mongoose
- axios
- moment
- cors
- bcryptjs
- jsonwebtoken
- mongoose-unique-validator
- morgan

### Database

- mongoDB

### TTD

- Mocha js
- Chai
[+]
## Authentication and Authorization

### Authenticated user for task
- create task
- read task

### Authorized user for task
- update, delete, patch task status

### Authenticated user for project
- create project
- read project

### Authorized user for project
- update, delete, add member, remove member

### Authorized member in project
- read project
- create, update, delete, patch task status in the project
- quit project
