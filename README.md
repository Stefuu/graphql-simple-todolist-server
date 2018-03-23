## Examples

``` js
query GetAll {
  tasks {
    id, name, done
  }
}

query GetOne {
  task(id: "B145CnGqM") {
    id, name, done
  }
}

mutation Add {
  createTask(name: "Entender essa porra", done: false) {
    id, name, done
  }
}

mutation Update {
  updateTask(id: "H1IUAnG5z", name: "Entender essa porra2", done: true) {
    id, name, done
  }
}

mutation Delete {
  deleteTask(id: "H1IUAnG5z")
}
```