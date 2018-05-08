const {Group} = require("../Constructors/Group");
const {Groups} = require("../Constructors/Groups");
const {User} = require("../Constructors/User");
const {Users} = require("../Constructors/Users");


exports.Controller = Controller;

function Controller() {
    this.Users = new Users();
    this.User = new User();
    this.Group = new Group();
    this.Groups = new Groups();

    this.groupID=1;

}

Controller.prototype.searchForAUserPath = function(username){
    if(username.length===0){
        console.log("Username must be valid");
        return false;
    }
    if(!this.isUserExist(username)){
        console.log("Username not exist");
        return false;
    }
    let tempUser= this.Users.getUser(username);
    let arr = [];
    for(let i of tempUser.inGroups){
        let path = this.printPathOfGroup(i);
        path+=` =>[${username.toUpperCase()}]`;
        console.log(path)
        arr.push(path);
    }

    return true;
};

Controller.prototype.checkInstantOf = function(entry){

    if(entry instanceof Group){
        return "group";
    }
    if(entry instanceof User){
        return "user";
    }


};

Controller.prototype.assigningUserIntoGroup = function (arr){
    //arr[0]= username;
    //arr[1]= group id;


    //1.check if self user exist
    if(!this.isUserExist(arr[0])){
        console.log("Username not found");
        return false;
    }
    //2. check if target id exist
    if(!Number(arr[1])){
        console.log("Group id must be valid");
        return false;
    }

    if(arr[1]===0){
        console.log("Top group id is 1");
        return false;
    }
    if(!this.isGroupExist(arr[1])){
        console.log("Group is not exist");
        return false;
    }
    //3.check what type of children target has
        //3a. if type is Group -
            //3.a.a check if group exist there = if not add
        //3b. if type is User - create new "Other" group and put all the users there
            //and insert self into target
    let tempUser = this.Users.getUser(arr[0]);
    let tempGroup = this.searchForGroupById(arr[1]);

    if(Object.keys(tempGroup).length===0){
        console.log("Warning: no such group exists");
        return false;
    }
    //checks if children array is empty - if it is add the user
    if(tempGroup._children.length===0){
        tempGroup._children.push(tempUser);
        tempUser.inGroups.push(tempGroup.getId());
        this.incrementNumOfUsersInGroupsTop(tempGroup.getId(),1);
        console.log(`user ${tempUser.getName()} was added to group ${tempGroup.getName()}`)
        return true;
    }
    // if children array is not empty- check the type it holds -> if it users-> ok to add
    let type = this.checkInstantOf(tempGroup._children[0]);
    //console.log("type of children id tempGroup: " +type);
    if(type =="user"){
        //check if the user already in the group
        for(let c of tempGroup.getChildren() ){
            if(c===tempUser){
                console.log("User already exist in the group");
                return false;
            }
        }
        //user wasn't found in the group
        //add the user to the group;
        tempGroup._children.push(tempUser);
        tempUser.inGroups.push(tempGroup.getId());
        this.incrementNumOfUsersInGroupsTop(tempGroup.getId(),1);
        console.log(`user ${tempUser.getName()} was added to group ${tempGroup.getName()}`)
        return true;
    }

    // the children array holds groups -> send error.
    console.log("Process failed - this group contain other groups");
    return false;



};

Controller.prototype.deleteGroup = function (num){
    //checking group is legit

    if(!Number(num)){
        console.log("Group id must be valid");
        return false;
    }

    let id = Number(num);
    if(id<2){
        console.log("Top group id to delete is 2");
        return false;
    }

    let targetGroup = this.searchForGroupById(id);

    if(Object.keys(targetGroup).length===0){
        console.log("Warning: no such group exists");
        return false;
    }

    //getting group parent
    let parent_id= targetGroup.getParent();

    //getting parent group
    let groupParent = this.searchForGroupById(parent_id);
    let arr = groupParent.getChildren();
    for (let i in arr ){
        if(arr[i].getId()=== id){
            this.deleteGroupIdFromUsersArray(id);
            let numOfUsers = targetGroup.getNumOfUsers();
            this.incrementNumOfUsersInGroupsTop(id,-(numOfUsers));
            arr.splice(i,1);
            console.log("Group has been deleted");
            return true;
        }
    }
    console.log("Group wasn't found");
    return false;
};

Controller.prototype.deleteGroupIdFromUsersArray = function(id){
    for(let entry of this.Users.data){
        for(let i in entry.inGroups){
            if(entry.inGroups[i]==id){
                entry.inGroups.splice(i,1);
            }
        }
    }
};

Controller.prototype.addNewGroup = function (arr){
    if(arr[0].length===0){
        console.log("Group name must be valid");
        return false;
    }
    if(!Number(arr[1])){
        console.log("Group id must be a number");
        return false;
    }
    if(arr[1]===0){
        console.log("Top group id is 1");
        return false;
    }

    let targetGroup = this.searchForGroupById(arr[1]);

    if(Object.keys(targetGroup).length===0){
        console.log("Warning: no such group exists");
        return false;
    }

    if(!this.isGroupExist(arr[1])){
        console.log("addNewUser|| Group is not exist");
        return false;
    }

    //check if the group has no children
    if(targetGroup._children.length===0){
        // add group to groups
        let group = new Group(this.groupID,arr[0],arr[1]);


        // add group to target group
        targetGroup._children.push(group);
        this.groupID++;
        console.log("Group was added successfully");
        return true;
    }

    //check if children of group are Users or Groups
    if(targetGroup._children.length>0){
        let insChild = targetGroup._children[0];
        let type = this.checkInstantOf(insChild);
        console.log("addNewGroup|| type: ", type);
        if(type ==="group"){
            // children are groups -> check if username in group exist
            for(let c of targetGroup._children){
                if(c.getName()==arr[0]){
                    console.log("Group by that name already exist in the target group you chose");
                    return false;
                }
            }
            // Didn't found group by that name -> add group to groups
            let group = new Group(this.groupID,arr[0],arr[1]);
           // this.Groups.data.push(group);

            // add group to target group
            targetGroup._children.push(group);
            this.groupID++;
            console.log("Group was added successfully");
            return true;

        }else{
            // children are users -> create new group name OThER and move the users

            //save the array of the users in a temp var
            let tempArr = targetGroup.getChildren();
            // clear the target children
            let lenTempArr= tempArr.length;
            targetGroup._children = [];
            this.incrementNumOfUsersInGroupsTop(targetGroup.getId(),-(lenTempArr));
            //add group to groups
            let group = new Group(this.groupID,arr[0],arr[1]);
            //incrementing counter by 1
            this.groupID++;
            // add group to target group
            targetGroup.addUser(group);
            //create a new group name Other
            let otherGroup = new Group(this.groupID,"Other",targetGroup.getId());
            //assigning the users to it.
            otherGroup._children = tempArr;

            //adding the Other group to the parent group
            targetGroup.addUser(otherGroup);
            let tempid = otherGroup.getId();
            this.incrementNumOfUsersInGroupsTop(tempid,lenTempArr);
            //add group to groups

            console.log("Group was added successfully");
            return true;

        }
    }

};

Controller.prototype.addUser = function (arr) {
    if(arr[0].length===0){
        console.log("Username must be valid");
        return false;
    }
    if(this.isUserExist(arr[0])){
        console.log("Username is taken");
        return false;
    }
    if(!Number(arr[2])){
        console.log("Age must be a number");
        return false;
    }
    if(arr[1].length===0){
        console.log("Password must be enter");
        return false;
    }
    this.Users.data.push(new User(arr[0],arr[1],arr[2]));
    console.log("User was added");
    return true;

};

Controller.prototype.removeUser= function (username) {
    //checks if a valid name was entered
    if(username.length===0){
        console.log("You must enter a valid username");
        return;
    }
    let user = this.Users.getUser(username);
    // remove user from Users
    if(this.Users.data.length>0){
        if(this.Users.removeUser(username)){
            console.log("User was deleted from Users");
            // remove user from Groups
            if(this.Groups.data.length>0){

                for(let i of user.inGroups){
                    let group = this.searchForGroupById(i);
                    for(let i in group.children){
                        if(group.children[i]===user){
                            this.incrementNumOfUsersInGroupsTop(group.getId(),-1);
                            group.children.splice(i,1);
                        }
                    }
                }

                console.log("User was deleted from Groups");
                return;
            }
            console.log("No groups exist");
            return;
        }
        console.log("No such user exist");
        return;
        }
    console.log("No users exist");
}

Controller.prototype.changePasswordOrAgeToUser = function (arr) {
    if(arr[1].length===0){
        console.log("Username must be valid");
        return false;
    }
    if(arr[2].length===0){
        console.log("Password must be enter");
        return false;
    }

    let user = this.Users.getUser(arr[1]);
    if (user!==null){
        //check if its password that was entered
        if(arr[0]==="password"){
            user.changePassword(arr[2]);
            console.log("Password was updated");
            return;
        }else{
            // age was entered
            if(Number(arr[2])){
                user.changeAge(arr[2]);
                console.log("Age was updated");
                return;
            }else{
                console.log("Age must be a number");
                return;
            }
        }

    }

};

Controller.prototype.defaultGroup = function(){
    this.Groups.data.push(new Group(this.groupID,"root",0));
    this.groupID++;
};

Controller.prototype.printTree = function () {

    let groups = this.Groups.data;
    let dash = "--";
    printGroups(groups[0],0);

    function printGroups(currentGroup, level) {
        let info = `id: ${currentGroup.getId()}, name: ${currentGroup.getName()}, (${currentGroup.getNumOfUsers()}) `;
        console.log(dash.repeat(level)+info);
        for(let node of currentGroup.getChildren()){
            if(node instanceof Group){
                printGroups(node, level+1);
            }else {
                let printUser = `User name: ${node.getName()}`;
                console.log(dash.repeat(level+1)+printUser);
            }
        }
    }

};

Controller.prototype.searchForGroupById = function(id){
        let out = {};
        searchForGroup(this.Groups.data);
        function searchForGroup(arr) {
            for(let i in arr) {
                if(arr[i] instanceof Group){
                    if (arr[i].getId() == id) {
                        out= arr[i];
                        return;
                    }
                    else{
                        searchForGroup(arr[i].getChildren());
                    }
                }
            }
        }
        return out;
};

Controller.prototype.printPathOfGroup = function(id){
    let path = [];
    if (id==0){
        path.push("root");
        return path;
    }

    while(id!==0){
        let group = this.searchForGroupById(id);
        if(Object.keys(group).length===0){
            console.log("Group does not exist");
            return false;
        }
        path.unshift(group.getName());
        id=group.getParent();
    }

    path = path.join(" -> ");
    return path;
};

Controller.prototype.isGroupExist = function (id) {
    let len = this.Groups.data.length;
    if(len===0){
        console.log("Groups data is empty, no such groups exist");
        return false;
    }
    let result = this.searchForGroupById(id);

    if(Object.keys(result).length === 0){
        console.log("group does not exist");
        return false;
    }
    return true;

};

Controller.prototype.isUserExist= function (username){

    if(this.Users.data.length>0){
        let bool = false;
        this.Users.data.forEach(function (entry) {
            if(entry.getName() == username){
                bool= true;
            }
        });
        return bool;
    }
    return false;
};

Controller.prototype.deleteUserFromGroup = function (arr) {
    //arr[0]= username;
    //arr[1]= group id;


    //1.check if self user exist
    if(!this.isUserExist(arr[0])){
        console.log("Username not found");
        return false;
    }
    //2. check if target id exist
    if(!Number(arr[1])){
        console.log("Group id must be valid");
        return false;
    }

    if(arr[1]===0){
        console.log("Top group id is 1");
        return false;
    }
    if(!this.isGroupExist(arr[1])){
        console.log("Group is not exist");
        return false;
    }

    //and insert self into target
    let tempUser = this.Users.getUser(arr[0]);
    let tempGroup = this.searchForGroupById(arr[1]);

    if(Object.keys(tempGroup).length===0){
        console.log("Warning: no such group exists");
        return false;
    }
    //check if group contain users
    if(tempGroup._children.length===0){
        console.log("Group has no users");
        return false;
    }

    if(tempGroup._children[0] instanceof User){
        for(let i in tempGroup._children){
            if(tempGroup._children[i]===tempUser){

                this.incrementNumOfUsersInGroupsTop(tempGroup.getId(),-1);
                tempGroup._children.splice(i,1);
                //delete the group reference in the inGroup array User
                for(let x in tempUser.inGroups){
                    if(tempUser.inGroups[x]==tempGroup.getId()){
                        tempUser.inGroups.splice(x,1);
                        console.log("User-Group reference deleted")
                    }
                }
                console.log(`${tempUser.getName()} was deleted from ${tempGroup.getName()}`);
                return true;
            }
        }
    }
    console.log(`${tempUser.getName()} is not in ${tempGroup.getName()}`);
    return false;
}

Controller.prototype.flattening= function (id) {

    let group = this.searchForGroupById(id);
    let grID= group.getId();

    if(Object.keys(group).length === 0){
        console.log("group does not exist");
        return false;
    }
    if(group._children.length===0){
        console.log("group does not exist");
        return false;
    }
    while(group._children.length===1){
        //check if child is User or group
        if(group._children[0] instanceof User){
            console.log("Last group in chain");
            return true;
        }
        //if group- get the his children and change their PARENT ID to => grID
        let tempGroup = group._children[0];
        let tempArr= tempGroup.getChildren();
        for(let entry of tempArr){
            entry.setParent(grID);
        }
        //delete the child group and check again
        this.deleteGroup(tempGroup.getId());
    }
    console.log("Flattening done");
    return true;
};

Controller.prototype.incrementNumOfUsersInGroupsTop = function (id, num) {

    while(Number(id)!==0){
        //get the group by id
        let group = this.searchForGroupById(id);
        //increment/decrement num of users
        group.numOfUserBelow += num;
        //get its parent to move to the top group
        id=group.getParent();
    }
    return true;
}

Controller.prototype.printingWell = function () {

    console.log("Tree was not printed");
    console.log(
        JSON.stringify(this.Groups.data,null,2)
    );

};



