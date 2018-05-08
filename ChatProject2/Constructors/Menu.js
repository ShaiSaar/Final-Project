exports.Menu = Menu;

function Menu() {

    this.main_menu = ["\n=== MAIN MENU ===","[1] Users", "[2] Groups", "[3] Exit"];
    this.users = ["\n=== USERS MENU ===", "[1] Adding a new user","[2] Deleting exist user",
        "[3] Updating users password", "[4] Updating users age", "[5] Print user in group path", "[6] Print all users", "[9] EXIT "];
    this.groups = ["\n=== GROUPS MENU ===", "[1] Adding a new group","[2] Deleting exist group", "[3] Assigning user to group",
        "[4] Delete user from group", "[5] Flattening group by id", "[6] Print path of group by id ", "[7] Print full tree ", "[9] EXIT"];

    this.users_questions = {
        addUser: ["\nEnter a unique username ", "Enter a password ", "Enter your age "],
        removeUser: ["\nEnter the username you want to delete "],

    };
    this.groups_questions = {
        addGroup: ["\nEnter a group name ", "Choose the group id you want to enter under "],
        removeUser: ["\nEnter the username you want to delete "],

    };
    this.user_questions = {
        getUserPath: ["\nEnter the username you want to search "],
        changePassword:["\nWhich user would you like to update the password to? ", "Enter a new password "],
        changeAge:["\nWhich user would you like to update the age to? ", "Enter a new age "]
    };

    this.group_questions = {
        assigningUserToGroup: ["\nEnter a username you ", "Enter a group id "],
        deleteGroup: ["\nEnter a group id you want to delete "],
        deleteUserFromGroup: ["\nEnter the username you want to delete ","Enter a group id you want to delete it from "],
        searchGroupByID: ["\nEnter id of group you want the path to "],
        FlatteningGroupById:["\nWhich group you want to flaten? "]
    };

}

