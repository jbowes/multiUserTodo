/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({
  clearDone : function(cmp){
    var items = cmp.getValue("m.items");
    for(var i = items.getLength()-1; i >= 0; i--){
      var item = items.get(i);
      if(item.selected===true){
        items.remove(i);
        
        aura.log('Local removal of item ' + item.name);
        
        // Remove the item from goinstant.
        cmp.get('v.goinstantKey').key(item.name).remove();
      };
    };
  },
  
  createNewTodo : function(cmp, event, helper){
    var keyCodeValue =  event.getParam("keyCode");
    if(keyCodeValue===13){
      var input = cmp.get("newTodo");
      var text = input.getValue("v.value").value;
      input.getValue("v.value").setValue("");
      
      // Add the item to goinstant
      // NOTE: value should not be passed to cb, this is a platform bug!
      cmp.get('v.goinstantKey').add(text, function(err, value, context) {
        if (err) {
          aura.error('Could not add todo to goinstant', err);
          return;
        }
        
        var name = context.addedKey.substr(context.addedKey.lastIndexOf('/') + 1);
        aura.log('Local add of item ' + name);

        // Add the item to aura.
        helper.addItem(cmp, text, name);
      });
    };
  },
  
  crossout : function(cmp, event){
    var elem = event.getSource().getElement();
    $A.util.toggleClass(elem, "done");
  },
  
  connectGoinstant: function(cmp) {
    var url = cmp.get('v.goinstantUrl');
    goinstant.connect(url, function(err, connection, lobby) {
      if (err) {
        aura.error('Could not connect to GoInstant', err);
        return;
      }
      
      aura.log('Connected to GoInstant');
      
      // TODO: Get the 'todo' string from the component localId
      // TODO : There must be a better way than constantly re-fetching $A.get('root.todo')
      var key = lobby.key('todo');
      $A.get('root.todo').getValue('v.goinstantKey').setValue(key);
      
      key.get(function(err, value) {
        if (err) {
          aura.error('Could not fetch key value', err);
          return;
        }
        
        $A.run(function(){
          _.each(value, function(text, name) {
            var cmp = $A.get('root.todo');
            // TODO : It would be better to share the code that's in the helper,
            // but I couldn't figure out how to access it from here.
            var items = cmp.getValue("m.items");
            var newTodo = {
                label: text, 
                name: name,
                selected: false, 
                value: text, 
                disabled: false
            };
            items.push(newTodo);
          });
        });
        
        key.on('add', { bubble: true, listener: function(text, context) {
          $A.run(function(){
            var cmp = $A.get('root.todo');
            // TODO : It would be better to share the code that's in the helper,
            // but I couldn't figure out how to access it from here.
            var name = context.addedKey.substr(context.addedKey.lastIndexOf('/') + 1);
            var items = cmp.getValue("m.items");
            var newTodo = {
                label: text, 
                name: name,
                selected: false, 
                value: text, 
                disabled: false
            };
            items.push(newTodo);
            
            aura.log('Remote add of item ' + name);
          });
        }});
        
        key.on('remove', { bubble: true, listener: function(value, context) {
          $A.run(function(){
            var name = context.key.substr(context.key.lastIndexOf('/') + 1);
            var cmp = $A.get('root.todo');
            var items = cmp.getValue("m.items");
            
            aura.log('Remote removal of item ' + name);
            
            for(var i = items.getLength()-1; i >= 0; i--){
              var item = items.get(i);
              if (item.name === name) {
                items.remove(i);
                break;
              }
            }
          });
        }});
      });
    });
  }
});