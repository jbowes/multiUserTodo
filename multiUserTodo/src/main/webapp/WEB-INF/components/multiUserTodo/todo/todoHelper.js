({
  addItem: function(cmp, text, name) {
    var items = cmp.getValue("m.items");
    var newTodo = {
        label: text, 
        name: name,
        selected: false, 
        value: text, 
        disabled: false
    };
    items.push(newTodo);
  }
});