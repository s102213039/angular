angular
    .module('todolist',[])
    .config(config);
    
    config.$inject = ['$httpProvider'];
     function config($httpProvider){
         $httpProvider.defaults.withCredentials = true;
     };
angular
    .module('todolist')
    .controller('ListCtrl',todolist);
        
angular
    .module('todolist')
    .service('List',List);
    
    List.$inject = ['$http'];
    
    
    function List($http){
           this.baseURL = "https://richegg.top";
           this.tasks = [];
           this.auth = function(listName){
                var data = {
                   listName : listName
                };
               
               return $http.post(this.baseURL+'/lists', data);
            };
       
            this.addTask = function(newTaskText){
                var data = {
                    text : newTaskText
                };
                return $http.post(this.baseURL+'/tasks',data);
            }
            this.getTasks = function(){
                return $http.get(this.baseURL + '/tasks');
            }
            
            this.updateTask = function(task){
                var data = {
                    isDone:task.isDone
                };
                return $http.patch(this.baseURL+'/tasks/'+task.id , data);
            };
            
            
            this.deleteTask = function(taskId){
                return $http.delete(this.baseURL+'/tasks/' + taskId);
            }
    };
        
    function todolist(List){
       var self = this; 
       
       
       
       self.tasks = [];

       self.auth = function(listName){
           List.auth(listName)
               .then(function(res){
                  self.tasks = List.tasks = res.data.tasks;
              },function(err){
                  console.log(err);
              });
       };
       
       self.getTasks = function(){
           //code
           List.getTasks()
            .then(function(res){
               self.tasks = List.tasks = res.data.tasks;
            },function(err){
                console.log(err);
            });
       };
       
       self.addTask = function(newTaskText){
           List.addTask(newTaskText)
               .then(function(res){
                    self.getTasks();
                },function(err){
                    console.log(err);
                });
            self.newTaskText="";
       };
       
       self.updateTask = function(task){
           List.updateTask(task)
            .then(function(res){
                self.getTasks();
            },function(err){
                console.log(err);
            });
       };
       
       self.deleteTask = function(taskId){
           List.deleteTask(taskId)
            .then(function(res){
                self.getTasks();
            },function(err){
                console.log(err);
            });
       };
    };