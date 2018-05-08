exports.User = User;

function User (name, password, age) {
        this.inGroups = [];
        this._name = name || null;
        this._password = password|| null;
        this._age = age|| null;
    }

User.prototype.getInGroups=function () { //return String
    return this.inGroups;
}

User.prototype.setIntoInGroups=function (num) { //return String
    this.inGroups.push(num);
    return true;
}

User.prototype.getName=function () { //return String
        return this._name;
    }


User.prototype.getPassword=function (){    //return String
        return this._password;
    }

User.prototype.getAge =function (){    //return String
        return this._age;
    }

User.prototype.changePassword =function (password){
        this._password=password;
        return true;
    }

User.prototype.changeAge =function (age){
        this._age=age;
        return true;
    }

User.prototype.print = function () {
    console.log(`Username: ${this._name}, Password: ${this._password}, Age: ${this._age}`);
}