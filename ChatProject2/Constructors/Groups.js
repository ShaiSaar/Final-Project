exports.Groups = Groups;

function Groups() {
    this.data = [];
}

Groups.prototype.removeGroup= function(id) {
    for (let i = 0; i <=this.data.length ; i++) {
        if(this.data[i].getId()===Number(id)){
            this.data.splice(i,1);
            return true;
        }
        return false;
    }
    };
Groups.prototype.addGroup= function(group) { /// adding to data
        this.data.push(group);
        return true;
    }

Groups.prototype.getGroup = function(id){
    for (let i = 0; i <this.data.length ; i++) {
        if(this.data[i].getId()==id){
            return this.data[i];
        }
    }
    return null;
};

Groups.prototype.print = function () {

    this.data.forEach(function (entry) {
        entry.print();
    });
}

