### This MERN project is for learning purpose

#### In Insomnia or Postman use these url's for different purpose:

##### todo list: `GET /`

##### get one item: `GET /:id`

##### add item: `POST /addNewTodo/`
payload
```
{
  completed: Boolean,
  task: String,
}
```

##### update item: `POST /:id/update`
payload
```
{
  completed: Boolean,
  task: String,
}
```

##### delete item: `DELETE /:id/delete`
