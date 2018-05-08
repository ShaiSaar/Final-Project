//
// let arr = [
//     {id: 1, title: 'shai', parent: 0, children:[]},
//     {id: 2, title: 'david', parent: 0, children:[]},
//     {id: 3, title: 'batz', parent: 1, children:[]},
//     {id: 4, title: 'shabi', parent: 3, children:[]},
//     {id: 5, title: 'uza', parent: 4, children:[]},
//     {id: 6, title: 'pingi', parent: 4, children:[]},
//     {id: 7, title: 'dudu', parent: 3, children:[]},
//     {id: 8, title: 'nuli', parent: 2, children:[]}
// ];
//
// function getNestedChildren(arr, parent) {
//     let out = [];
//     for(let i in arr) {
//         if(arr[i].parent === parent) {
//             let children = getNestedChildren(arr, arr[i].id);
//
//             if(children.length) {
//                 arr[i].children = children;
//             }
//             out.push(arr[i]);
//         }
//     }
//     return out;
// }
// let tree = getNestedChildren(arr,0);
// console.log(
//     JSON.stringify(tree,null,2)
// );

var arr = [3, 5, 7];
arr.foo = 'hello';

for (var i in arr) {
    console.log(i); // logs "0", "1", "2", "foo"
}

for (var i of arr) {
    console.log(i); // logs 3, 5, 7
}