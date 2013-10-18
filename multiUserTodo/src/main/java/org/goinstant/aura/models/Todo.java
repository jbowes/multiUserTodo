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
package org.goinstant.aura.models;

import java.util.ArrayList;
import java.util.List;

import org.auraframework.components.ui.InputOption;
import org.auraframework.system.Annotations.AuraEnabled;
import org.auraframework.system.Annotations.Model;

/**
 * Used by /expressionTest/expressionFunction.cmp which expects the current return values.
 */
@Model
public class Todo {
    
    private List<InputOption> items;
    
    public Todo(){
        items = new ArrayList<InputOption>();
    }
    
    @AuraEnabled
    public List<InputOption> getItems() {
        return items;
    }
}
