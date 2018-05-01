//// EXPORTS

exports.User = User;
exports.Group = Group;
exports.printAll = printAll;
exports.CheckNameAvailability = CheckNameAvailability;

///// USER CLASS
function User(name, password, age) {
    var userName = "";

    (function (){
        userName+=name;
    })();

    this.name = function() {
        return userName;
    }
    this.password = password;
    this.age = age;
}

User.prototype.print = function () {
    console.log(`name: ${this.name()}, password: ${this.password}, age: ${this.age}`);
}

User.prototype.delUser = function (users, groups){
    //delete from the users array
    var usernameForDelete= this.name();
    var elementPos = users.map(function(x) {return x.name(); }).indexOf(this.name());
    // delete from groups array
    groups.forEach(function(entry) {
        entry.users.forEach(function(list){
            if (list.name()===usernameForDelete){
                //console.log(`${usernameForDelete} is on group ${entry.name()}`);
                var elementPos = entry.users.map(function(x) {return x.name(); }).indexOf(usernameForDelete);
                entry.users.splice(elementPos,1);
            }
        })
        //console.log(arr.indexOf(entry),entry);
    });
    users.splice(elementPos,1);

}

User.prototype.setPassword= function (newPass) {
    this.password= newPass;
    return;
}

User.prototype.setAge= function (newAge) {
    this.age=newAge;
    return;
}


///// GROUP CLASS
function Group(name) {
    var groupName = "";

    (function (){
        groupName+=name;
    })();

    this.name = function() {
        return groupName;
    }

    this.users=[];
}

Group.prototype.print = function () {
    var gr= `name: ${this.name()} \n`;
    gr+= "users: \n";
    if(this.users.length>0){
    this.users.forEach(function (entry) {
        gr+=`\t name: ${entry.name()}, password: ${entry.password}, age: ${entry.age} \n`;
    });
    }
    console.log(gr);
}

Group.prototype.delGroup = function (groups){
    var elementPos = groups.map(function(x) {return x.name; }).indexOf(this.name);
    groups.splice(elementPos,1);
}

Group.prototype.delUserInGroup = function (group, users, user){
    if (CheckNameAvailability(users, user)){
        var elementPos = group.users.map(function(x) {return x.name(); }).indexOf(user);
        group.users.splice(elementPos,1);
        console.log(`The user ${user} was deleted from the group ${this.name()}`);
        return;
    }else{
        console.log("No such user was found");
        return;
    }

}

Group.prototype.insertUserInGroup = function (group, users, user){
    if (CheckNameAvailability(users, user)){
        var elementPos = users.map(function(x) {return x.name(); }).indexOf(user);
       group.users.push(users[elementPos]);
        console.log(`The user ${user} was inserted to the group ${group.name()}`);
        return;
    }else{
        console.log("No such user was found");
        return;
    }

}


/// GENERAL FUNCTIONS
function printAll (arr){
    if(arr.length>0){
    arr.forEach(function(entry) {
        entry.print();
    });
    }
}

function CheckNameAvailability (type, name){
    var elementPos = type.map(function(x) {return x.name(); }).indexOf(name);
    if (elementPos>-1){
        //console.log("name exist");
        return true;
    }
    //console.log("name is available");
    return false;
}





