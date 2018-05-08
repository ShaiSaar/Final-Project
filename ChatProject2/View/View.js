const readline = require('readline');
const {Menu} = require("../Constructors/Menu");
const {Controller} = require("../Controler/Controller");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var menu, controller;

(function init() {
    menu = new Menu();
    controller = new Controller();
    controller.defaultGroup();

    //testing ===================
    const TestingModeOff = true;
    if(TestingModeOff){
        main_menu ();
    }else{
        controller.addUser(["shai","saar",18]);
        controller.addUser(["Dudu","123",21]);
        controller.addUser(["Dudu","123",21]);
        controller.addUser(["Ufnik","456",11]);
        controller.addUser(["Shabi","789",76]);
        controller.addUser(["Uza","nsf",89]);
        controller.addUser(["Pingi","qer",46]);

        controller.Users.print();
        controller.removeUser("ariel");
        controller.changePasswordOrAgeToUser(["password","shai","gever"]);
        controller.changePasswordOrAgeToUser(["age","shi",12]);
        controller.addNewGroup(["ggg",1]);
        controller.addNewGroup(["dudu",1]);
        controller.addNewGroup(["baba",2]);
        controller.addNewGroup(["kuku",3]);
        controller.addNewGroup(["sheshe",3]);
        controller.addNewGroup(["family",11]);
        controller.addNewGroup(["friend",6]);
        controller.addNewGroup(["work",4]);
        controller.addNewGroup(["wedding",7]);
        controller.addNewGroup(["home",8]);
        controller.addNewGroup(["sheshe",3]);
        controller.addNewGroup(["sheshe",3]);
        controller.addNewGroup(["sheshe",3]);

        controller.assigningUserIntoGroup(["shai",6]);
        controller.assigningUserIntoGroup(["shai",5]);
        controller.assigningUserIntoGroup(["Dudu",6]);
        controller.assigningUserIntoGroup(["Pingi",5]);
        controller.assigningUserIntoGroup(["shai",6]);

        controller.addNewGroup(["deedee",6]);
        controller.addNewGroup(["dddd",5]);
        //controller.flattening(6);
        controller.searchForAUserPath("shai");
        controller.removeUser("shai");
        controller.searchForAUserPath("shai");
        controller.deleteUserFromGroup(["shai",6]);
        controller.searchForAUserPath("shai");
        // controller.deleteGroup("8");
        controller.assigningUserIntoGroup(["Pingi",9]);
        controller.printTree();
    }

})();

function main_menu (){
    menu.main_menu.forEach(function (element){
        console.log(element);
    });
    (function ask(){
        rl.question('\nPlease choose a department ', (answer) =>{
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
        let answers= [];
        rl.question('\nWhat would you like to do? ', (answer) =>{
            switch (Number(answer)){
                case 1: //Adding a new user
                    userQuestions(menu.users_questions.addUser);
                    break;
                case 2: //Delete exist user
                    rl.question(menu.users_questions.removeUser[0], (input)=>{
                        controller.removeUser(input.trim());
                        users_menu ();
                    });
                    break;
                case 3: //Updating users password
                    answers= [];
                    answers.push("password");
                    rl.question(menu.user_questions.changePassword[0], (input)=>{
                        answers.push(input.trim());
                        if(!controller.isUserExist(input.trim())){
                            console.log("User name is not exist");
                            users_menu();
                            return;
                        }
                        rl.question(menu.user_questions.changePassword[1], (input)=>{
                            answers.push(input.trim());
                            controller.changePasswordOrAgeToUser(answers);
                            users_menu ();
                        });
                    });
                    break;
                case 4: //Updating users age
                    answers= [];
                    answers.push("age");
                    rl.question(menu.user_questions.changeAge[0], (input)=>{
                        answers.push(input.trim());
                        if(!controller.isUserExist(input.trim())){
                            console.log("User name is not exist");
                            users_menu();
                            return;
                        }
                        rl.question(menu.user_questions.changeAge[1], (input)=>{
                            answers.push(input.trim());
                            controller.changePasswordOrAgeToUser(answers);
                            users_menu ();
                        });
                    });
                    break;
                case 5: //Print user in groups
                    rl.question(menu.user_questions.getUserPath[0], (input)=>{
                        controller.searchForAUserPath(input.trim());
                        users_menu();
                    });

                    break;
                case 6: //Print all users
                    controller.Users.print();
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
        let answers= [];
        rl.question('\nWhat would you like to do? ', (answer) =>{
            switch (Number(answer)){
                case 1: //Add a new group
                    answers = [];
                    rl.question(menu.groups_questions.addGroup[0], (input)=>{
                        answers.push(input.trim());
                        controller.printTree();
                        rl.question(menu.groups_questions.addGroup[1], (input)=>{
                            answers.push(input.trim());
                            controller.addNewGroup(answers);
                            group_menu ();
                        });
                    });
                    break;
                case 2: //Delete an exist group
                    controller.printTree();
                    rl.question(menu.group_questions.deleteGroup[0], (input)=>{
                        controller.deleteGroup(input.trim());
                        group_menu ();
                    });
                    break;
                case 3: //Assigning user to group
                    answers= [];
                    rl.question(menu.group_questions.assigningUserToGroup[0], (input)=>{
                        answers.push(input.trim());
                        if(!controller.isUserExist(input.trim())){
                            console.log("User name is not exist");
                            group_menu();
                            return;
                        }
                        controller.printTree();
                        rl.question(menu.group_questions.assigningUserToGroup[1], (input)=>{
                            answers.push(input.trim());
                            controller.assigningUserIntoGroup(answers);
                            group_menu ();
                        });
                    });
                    break;
                case 4: //Delete user from group
                    answers= [];
                    rl.question(menu.group_questions.deleteUserFromGroup[0], (input)=>{
                        answers.push(input.trim());
                        if(!controller.isUserExist(input.trim())){
                            console.log("User name is not exist");
                            group_menu();
                            return;
                        }
                        controller.printTree();
                        rl.question(menu.group_questions.deleteUserFromGroup[1], (input)=>{
                            answers.push(input.trim());
                            controller.deleteUserFromGroup(answers);
                            group_menu ();
                        });
                    });
                    break;
                case 5: //Flattening group by id
                    controller.printTree();
                    rl.question(menu.group_questions.FlatteningGroupById[0], (input)=>{
                        controller.flattening(Number(input))
                        group_menu ();
                    });
                    break;
                case 6:  //Print print path of group by id
                    controller.printTree();
                    rl.question(menu.group_questions.searchGroupByID[0], (input)=>{
                        let path = controller.printPathOfGroup(input);
                        console.log(path);
                        group_menu ();
                    });
                    break;

                case 7: //Print print tree
                    controller.printTree();
                    group_menu ();
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

/// 3 questions for new user
function userQuestions(arr){
    let answers=[];
    rl.question(arr[0], (input)=>{
        if(controller.isUserExist(input.trim())){
            console.log("User name is exist");
            users_menu();
            return;
        }
        answers.push(input.trim());
        rl.question(arr[1],(input)=>{
            answers.push(input.trim());
            rl.question(arr[2],(input)=>{
                answers.push(input.trim());
                controller.addUser(answers);
                users_menu ();
            })
        })
    });
}
