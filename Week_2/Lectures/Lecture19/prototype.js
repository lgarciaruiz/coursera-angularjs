//**  Prototypal inheritance
// var parent = {
//   value: "parentValue",
//   obj: {
//     objValue: "parentObjValue"
//   },
//   walk: function () {
//     console.log("walking!");
//   }
// };

// var child = Object.create(parent);
// console.log("CHILD - child.value: ", child.value);
// console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
// console.log("PARENT - parent.value: ", parent.value);
// console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
// console.log("parent: ", parent);
// console.log("child: ", child);

// child.value = "childValue";
// child.obj.objValue = "childObjValue"; //this will change the parent becuase the child object does not contain obj property
// console.log("*** CHANGED: child.value = 'childValue'");
// console.log("*** CHANGED: child.obj.objValue = 'childObjValue'");
// console.log("CHILD - child.value: ", child.value);
// console.log("CHILD - child.obj.objValue: ", child.obj.objValue);
// console.log("PARENT - parent.value: ", parent.value);
// console.log("PARENT - parent.obj.objValue: ", parent.obj.objValue);
// console.log("parent: ", parent);
// console.log("child: ", child);

// console.log("child.obj === parent.obj ? ", child.obj === parent.obj); //checks if the object of one is equal to the other object which means it would be the exact same instance; becuase of line 21

// var grandChild = Object.create(child);
// console.log("Grandchild: ", grandChild);
// grandChild.walk();

//** Function constructors
// See my other course: HTML, CSS, and Javascript for Web Developers
// Lecture #48
// function Dog(name) {
//   this.name = name;
//   console.log("'this' is: ", this);
// }

// var myDog = new Dog("Max");
// console.log("myDog: ", myDog);

// // Not being used as a function constructor; this will point to the outer scope whic equals the window object
// Dog("Max2");
