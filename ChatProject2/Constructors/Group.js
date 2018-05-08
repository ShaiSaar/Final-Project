exports.Group = Group;

function Group (id, name, parent){
        this.numOfUserBelow = 0;
        this._id = id;
        this._name = name;
        this._parent = parent || 0;
        this._children = [];

}

Group.prototype.getNumOfUsers= function () {  //return String
    return this.numOfUserBelow;
};

Group.prototype.setNumOfUsers= function (num) {  //return String
     this.numOfUserBelow += num ;
     return true;
};

Group.prototype.getName= function () {  //return String
    return this._name;
};

Group.prototype.getParent= function () {  //return String
    return this._parent;
};

Group.prototype.getId= function () {  //return String
    return this._id;
};

Group.prototype.setParent= function (id) {  //return String
    this._parent = id;
    return true;
};

Group.prototype.getChildren= function (){    //return array
    return this._children;
};

Group.prototype.addUser= function (user){
    this._children.push(user);
    return true;
};

Group.prototype.removeGroupByIndex = function(index){
    this._children.splice(index,1);
}

Group.prototype.removeUser= function (user) {
    for(let i = 0; i < this._children.length; i++) {
        if (this._children[i] === user) {
            this._children.splice(i, 1);
            return true;
        }
        return false;
    }
    return false;
};
Group.prototype.print = function () {
    var gr= `name: ${this.getName()} `;
    gr+= `| id: ${this.getId()} `;
    gr+= `| parent: ${this.getParent()} `;
    gr+= "| children: " ;
    let numOfChildren = this._children.length;
    let type = "";
    if(this._children.length>0){
        if(this._children[0] instanceof Group){
            type = " Groups";
            gr += " " + numOfChildren + type;
        } else {
            type = " Users";
            gr += " " + numOfChildren + type;
        }
    }else {
        gr += numOfChildren + " children";
    }

    console.log(gr);
}
