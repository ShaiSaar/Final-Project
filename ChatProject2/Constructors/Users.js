exports.Users = Users;

function Users() {
    this.data = []
}

Users.prototype.removeUser= function(username) {

    for (let i = 0; i <this.data.length ; i++) {
        if(this.data[i].getName()===username){
            let position = this.data.indexOf(this.data[i]);
            this.data.splice(position,1);
            return true;
        }
    }
    return false;
};

Users.prototype.addUser= function(user) { /// adding to data
    this.data.push(user);
    return true;
}

Users.prototype.getUsers = function(){
    const arr = this;
    return arr;
}

Users.prototype.getUser = function(username){
    for (let i = 0; i <this.data.length ; i++) {
        if(this.data[i].getName() === username){
            return this.data[i];
        }
    }
    console.log("User not exist");
    return null;
}

Users.prototype.isUserExist = function (username) {
    if(this.data.length>0){
    this.data.forEach(function (entry) {
        if(entry._name == username){
           return true;
        }
    });
    return false;
    }
    return false;
};

Users.prototype.print = function () {
    if(this.data.length>0){
        this.data.forEach(function (entry) {
           entry.print();
        });
    }
};


