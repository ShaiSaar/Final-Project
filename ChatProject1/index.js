const readline = require('readline');
const {User} = require("./Constructor");
const {Group} = require("./Constructor");
const {printAll} = require("./Constructor");
const {CheckNameAvailability} = require("./Constructor");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var groups= [];
var users= [];
var tempUserDetails= [];

//// MENUS STRINGS
var menu = {
    main: ["\n MAIN MENU - pick a number","1- Users", "2- Groups", "3- Exit"],
    users: ["\n USERS MENU", "1- Adding a new user","2- Deleting exist user",
            "3- Updating users password", "4- Updating users age", "5- Print all users", "9- EXIT "],
    groups: ["\n GROUPS MENU", "1- Adding a new group","2- Deleting exist group", "3- Assigning user to group",
            "4- Delete user from group", "5- Print all groups", "9- EXIT"]
}

//// MAIN MENUS
function main_menu (){
    menu.main.forEach(function (element){
        console.log(element);
    });
    (function ask(){
        rl.question('Please choose a department ', (answer) =>{
                switch (Number(answer)){
                    case 1:
                        users_menu();
                        return;
                    case 2:
                        group_menu();
                        break;
                    case 3:
                        process.exit();
                        break;
                     default:
                        ask();
                         break;
                }
    });
    })();
}

//// USERS MENUS
function users_menu (){
    menu.users.forEach(function (element){
        console.log(element);
    });
    (function ask(){
        rl.question('Please choose a department ', (answer) =>{
            switch (Number(answer)){
                case 1: //Adding a new user
                    addUserQuestions();
                    break;
                case 2: //Delete exist user
                    oneStepQuestion(operations.deleteUser);
                    break;
                case 3: //Updating users password
                    changingPassOrAge("password");
                    break;
                case 4: //Updating users age
                    changingPassOrAge("age");
                    break;
                case 5: //Print all users
                    if(users.length>0){
                        printAll(users);
                    }else{
                        console.log("There is no users to show")
                    }
                    users_menu();
                    break;
                case 9: //EXIT
                    main_menu();
                    break;
                default:
                    ask();
                    break;
            }
        });
    })();
}

//// GROUP MENUS
function group_menu (){
    menu.groups.forEach(function (element){
        console.log(element);
    });
    (function ask(){
        rl.question('Please choose a department ', (answer) =>{
            switch (Number(answer)){
                case 1: //Add a new group
                    oneStepQuestion(operations.addGroup);
                    break;
                case 2: //Delete an exist group
                    oneStepQuestion(operations.deleteGroup);
                    break;
                case 3: //Assigning user to group
                    insertUserIntoGroup();
                    break;
                case 4: //Delete user from group
                    DeleteUserFromGroup();
                    break;
                case 5: //Print all groups
                    if(groups.length>0){
                        printAll(groups);
                    }else{
                        console.log("There is no users to show")
                    }
                    group_menu();
                    break;
                case 9: //EXIT
                    main_menu();
                    break;
                default:
                    ask();
                    break;
            }
        });
    })();
}


//// SEPARATE FUNCTIONS
const operations = {
    addUser: [0,users, "please enter a unique name to be your permanent user name \n"],//3 steps
    addGroup: [1, groups, "Please enter a unique name for the new group \n"],
    deleteUser: [2, users, "Please enter a user name you want to delete \n"],
    deleteGroup: [3, groups, "Please enter a group name you want to delete \n" ],
    };

function oneStepQuestion(operations) {
    rl.question(operations[2], (input)=>{
        switch (operations[0]){
            case 0: //addUser
                questionOne(input);
                users_menu ();
                break;
            case 1: //addGroup
                if(!CheckNameAvailability(groups,input.trim())&& input.trim().length>0){
                    groups.push(new Group(input.trim()));
                    console.log(`Group ${input.trim()} was added`);
                } else{
                    console.log(`Group ${input.trim()} already exist`);
                }
                group_menu ();
                return;
            case 2: //deleteUser
                if(CheckNameAvailability(operations[1],input.trim())){
                    for (let i = 0; i <users.length ; i++) {
                        if(users[i].name() === input.trim()){
                            users[i].delUser(users, groups);
                        }
                    }
                    console.log(`User ${input.trim()} has been deleted`);
                }else{
                    console.log(`User ${input.trim()} does not exist`);
                }
                users_menu ();
                return;
            case 3: //deleteGroup
                if(CheckNameAvailability(operations[1],input.trim())){
                    for (let i = 0; i <groups.length ; i++) {
                        if(groups[i].name() === input.trim()){
                            groups[i].delGroup(groups);
                            console.log(`Group ${input.trim()} has been deleted`);
                            group_menu ();
                        }
                    }

                } else {
                    console.log(`Group ${input.trim()} does not exist`);
                    group_menu ();
                }
                break;
            default:
                users_menu ()
                break;

        }
    });

}

function addUserQuestions() {

    rl.question("please enter a unique name to be your permanent user name \n", questionOne);

    function questionOne(input) { //user name

        if (!CheckNameAvailability(users,input.trim()) && input.trim().length > 0) {
            tempUserDetails.push(input);
        } else {
            console.log("Your user name either exist or too short ");
            users_menu();
            return;
        }
        rl.question('please choose a password to your user name \n', questionTwo);
    }
    function questionTwo(input) { // password
        if (input.trim().length > 0) {
            tempUserDetails.push(input);
        } else {
            console.log("Your password is too short ");
            users_menu();
            return;
        }
        rl.question('what is your age \n', questionThree);
    }
    function questionThree(input) {
        if (Number(input) && input.trim().length > 0) {
            tempUserDetails.push(input);
            users.push(new User(tempUserDetails[0], tempUserDetails[1], tempUserDetails[2]));
            console.log(`New user: name- ${tempUserDetails[0]}, password- ${tempUserDetails[1]}, age- ${tempUserDetails[2]} was added`);
            tempUserDetails=[];
            users_menu();
        } else {
            console.log("Please enter a number to your age. \n");
            users_menu();
            return;
        }

    }
}

function DeleteUserFromGroup (){
    let temp_username= "";
    let temp_group= "";
    rl.question("Please choose the Username you wish to delete ", delFromGroup);

    function delFromGroup(input) {
        if (CheckNameAvailability(users, input.trim())){
            temp_username += input.trim();
            rl.question(`From which group would you like to delete ${temp_username} from? `, (input)=>{
                if (CheckNameAvailability(groups, input.trim())){
                    temp_group += input.trim();
                        //finding the group
                    var elementPos = groups.map(function(x) {return x.name(); }).indexOf(temp_group);
                    console.log("elementPos", elementPos);
                    console.log("temp_username", temp_username);
                    groups[elementPos].delUserInGroup(groups[elementPos], users, temp_username);
                    group_menu();
                    return;
                }else {
                    console.log("Group not found");
                    group_menu();
                    return;
                }
                group_menu();
                return;
            })
        }else {
            console.log("User not found");
            group_menu();
            return;
        }

    }
}

function insertUserIntoGroup() {
    let temp_username= "";
    let temp_group= "";
    rl.question("Please choose the Username you wish to insert ", insertToGroup);

    function insertToGroup(input) {
        if (CheckNameAvailability(users, input.trim())){
            temp_username += input.trim();
            rl.question(`In which group would you like to insert ${temp_username} to? `, groupToInsert)
                function groupToInsert(input) {
                    if (CheckNameAvailability(groups, input.trim())){
                        temp_group += input.trim();
                        //finding the group
                        var elementPos = groups.map(function(x) {return x.name(); }).indexOf(temp_group);
                        if(!CheckNameAvailability(groups[elementPos].users,temp_username)){
                            groups[elementPos].insertUserInGroup(groups[elementPos], users, temp_username);
                            group_menu();
                        }else {
                            console.log("User already exist inside that group");
                            group_menu();
                            return;
                        }
                        return;
                    }else {
                        console.log("Group not found");
                        group_menu();
                        return;
                    }
                    return;
                }
        }else {
            console.log("User not found");
            group_menu();
            return;
        }
    }
}

function changingPassOrAge(value) {

    let temp_username= "";
    let newRequest= "";
    rl.question("Please choose the Username you wish to update", changeDetails);

    function changeDetails(input) {
        if (CheckNameAvailability(users, input.trim())){
            temp_username += input.trim();
            rl.question(`To which ${value} would you like to update your user profile to?`, valueUpdate);
            function valueUpdate(input) {
                if (input.trim().length>0){
                    newRequest += input.trim();
                    //finding the user
                    var elementPos = users.map(function(x) {return x.name(); }).indexOf(temp_username);
                    if(value=="password"){
                        users[elementPos].setPassword(newRequest);
                        console.log(`User's password was updated ${newRequest}`);
                    }else{
                        if(Number(newRequest)){
                            users[elementPos].setAge(newRequest);
                            console.log(`User's age was updated ${newRequest}`);
                            users_menu();
                        }else{
                            console.log(`${value} must have a number`);
                            users_menu();
                        }
                        return;

                    }
                    users_menu();
                    return;
                }else {
                    console.log(`${value} must have a value`);
                    users_menu();
                    return;
                }
                users_menu();
                return;

            }
        }else {
            console.log("User not found");
            users_menu();
            return;
        }
        return;
    }
    return;
}

//groups.push(new Group("work"));
//users.push(new User("shai","123",12));
//groups[0].users.push(users[0]);


// users.push(new User("ariel","456",22));
// users.push(new User("tofel","789",52));
// users.push(new User("david","3421",87));
// users.push(new User("gal","47356",11));
// users.push(new User("itay","141",42));
// users.push(new User("raz","4782",56));
// groups[0].users.push(users[0]);
// groups[0].users.push(users[0]);
// groups[0].users.push(users[3]);
// groups[0].users.push(users[1]);
// groups[1].users.push(users[1]);
// groups[1].users.push(users[4]);
// groups[2].users.push(users[2]);
// groups[2].users.push(users[5]);
// groups[2].users.push(users[6]);
//
// groups.push(new Group("work"));
// groups.push(new Group("friends"));
// groups.push(new Group("Just guys"));

main_menu();

