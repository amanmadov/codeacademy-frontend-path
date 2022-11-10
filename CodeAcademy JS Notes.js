
/*
    CodeAcademy Frontend Path JavaScript Notes
    by: Nury Amanmadov 2022
*/

//#region Vanilla Javascript 


//#region Javascript Basics 


//#region Scope Pollution 

// It may seem like a great idea to always make your variables accessible, 
// but having too many global variables can cause problems in a program.

// When you declare global variables, they go to the global namespace. 
// The global namespace allows the variables to be accessible from anywhere in the program. 
// These variables remain there until the program finishes which means our global namespace can fill up really quickly.

// Scope pollution is when we have too many global variables that exist in the global namespace, 
// or when we reuse variables across different scopes. 
// Scope pollution makes it difficult to keep track of our different variables and sets us up for potential accidents. 
// For example, globally scoped variables can collide with other variables that are more locally scoped, causing unexpected behavior in our code.

// Let’s look at an example of scope pollution in practice so we know how to avoid it:

    let num = 50;

    const logNum = () => {
        num = 100; // Take note of this line of code
        console.log(num);
    };

    logNum(); // Prints 100
    console.log(num); // Prints 100


// You’ll notice:
// We have a variable num.
// Inside the function body of logNum(), we want to declare a new variable but forgot to use the let keyword.
// When we call logNum(), num gets reassigned to 100.
// The reassignment inside logNum() affects the global variable num.
// Even though the reassignment is allowed and we won’t get an error, if we decided to use num later, we’ll unknowingly use the new value of num.
// While it’s important to know what global scope is, it’s best practice to not define variables in the global scope.


// Practice Good Scoping
// Given the challenges with global variables and scope pollution, 
// we should follow best practices for scoping our variables as tightly as possible using block scope.

// Tightly scoping your variables will greatly improve your code in several ways:
    // It will make your code more legible since the blocks will organize your code into discrete sections.
    // It makes your code more understandable since it clarifies which variables are associated with 
    // different parts of the program rather than having to keep track of them line after line!
    // It’s easier to maintain your code, since your code will be modular.
    // It will save memory in your code because it will cease to exist after the block finishes running.

// Here’s another example of how to use block scope, as defined within an if block:

    const logSkyColor = () => {
        const dusk = true;
        let color = 'blue'; 
        if (dusk) {
            let color = 'pink';
            console.log(color); // pink
        }
        console.log(color); // blue 
    };

    console.log(color); // ReferenceError

// Block scope is a powerful tool in JavaScript, since it allows us to define variables with precision, and not pollute the global namespace. 
// If a variable does not need to exist outside a block — it shouldn’t!

// Scope refers to where variables can be accessed throughout the program, and is determined by where and how they are declared.
// Blocks are statements that exist within curly braces {}.
// Global scope refers to the context within which variables are accessible to every part of the program.
// Global variables are variables that exist within global scope.
// Block scope refers to the context within which variables are accessible only within the block they are defined.
// Local variables are variables that exist within block scope.
// Global namespace is the space in our code that contains globally scoped information.
// Scope pollution is when too many variables exist in a namespace or variable names are reused.


// A runtime environment is where your program will be executed. JavaScript code may be executed in one of two runtime environments:
    // 1) a browser’s runtime environment
    // 2) the Node runtime environment


// In each of these environments, different data values and functions are available, 
// and these differences help distinguish front-end applications from back-end applications.

// Front-end JavaScript applications are executed in a browser’s runtime environment and have access to the window object.
// Back-end JavaScript applications are executed in the Node runtime environment 
// and have access to the file system, databases, and networks attached to the server.


// Arrays with let and const
// You may recall that you can declare variables with both the let and const keywords. 
// Variables declared with let can be reassigned.

// Variables declared with the const keyword cannot be reassigned. 
// However, elements in an array declared with const remain mutable. 
// Meaning that we can change the contents of a const array, but cannot reassign a new array or a different value.

    let condiments = ["Ketchup", "Mustard", "Soy Sauce", "Sriracha"];
    condiments[0] = "Mayo";
    console.log(condiments);
    condiments = ['Mayo']
    console.log(condiments);

//#endregion

//#region Pass By Reference 

// Objects are passed by reference. 
// This means when we pass a variable assigned to an object into a function as an argument, 
// the computer interprets the parameter name as pointing to the space in memory holding that object. 
// As a result, functions which change object properties actually mutate the object permanently 
// (even when the object is assigned to a const variable).


    const spaceship = {
        homePlanet : 'Earth',
        color : 'silver'
    };

    let paintIt = obj => {
        obj.color = 'glorious gold'
    };

    paintIt(spaceship);

    spaceship.color // Returns 'glorious gold'


// Our function paintIt() permanently changed the color of our spaceship object. 
// However, reassignment of the spaceship variable wouldn’t work in the same way:


    let spaceship = {
        homePlanet: 'Earth',
        color: 'red'
    };

    let tryReassignment = obj => {
        obj = {
            identified: false,
            'transport type': 'flying'
        }
        console.log(obj) // Prints {'identified': false, 'transport type': 'flying'}
    };

    tryReassignment(spaceship) // The attempt at reassignment does not work.
    console.log(spaceship) // Still returns {homePlanet : 'Earth', color : 'red'};

    spaceship = {
        identified: false,
        'transport type': 'flying'
    }; // Regular reassignment still works.


    let spaceship = {
        "Fuel Type": "Turbo Fuel",
        homePlanet: "Earth",
    };

    // Write your code below
    function greenEnergy(obj) {
        obj["Fuel Type"] = "avocado oil";
    }

    function remotelyDisable(obj) {
        obj.disabled = true;
    }

    greenEnergy(spaceship);
    remotelyDisable(spaceship);

    console.log(spaceship);
    // {
    //     'Fuel Type': 'avocado oil',
    //     homePlanet: 'Earth',
    //     disabled: true
    // }

//#endregion


//#endregion

//#region ADVANCED OBJECTS 


//#region Advanced Objects Introduction 

    const robot = {
        model: 'B-4MI',
        mobile: true,
        greeting() {
            console.log(`I'm model ${this.model}, how may I be of service?`);
        }
    }

    const massProdRobot = (model, mobile) => {
        return {
            model,
            mobile,
            greeting() {
                console.log(`I'm model ${this.model}, how may I be of service?`);
            }
        }
    }

    const shinyNewRobot = massProdRobot('TrayHax', true)

    const chargingStation = {
        _name: 'Electrons-R-Us',
        _robotCapacity: 120,
        _active: true,
        _chargingRooms: ['Low N Slow', 'Middle of the Road', 'In and Output'],

        set robotCapacity(newCapacity) {
            if (typeof newCapacity === 'number') {
                this._robotCapacity = newCapacity;
            } else {
                console.log(`Change ${newCapacity} to a number.`)
            }
        },
        get robotCapacity() {
            return this._robotCapacity;
        }
    }

//#endregion

//#region The this Keyword 


    const goat = {
        dietType: 'herbivore',
        makeSound() {
            console.log('baaa');
        },
        diet() {
            console.log(dietType);
        }
    };
    goat.diet(); // Output will be "ReferenceError: dietType is not defined"

// That’s strange, why is dietType not defined even though it’s a property of goat? 
// That’s because inside the scope of the .diet() method, 
// we don’t automatically have access to other properties of the goat object.
// Here’s where the this keyword comes to the rescue.

    const goat = {
        dietType: 'herbivore',
        makeSound() {
            console.log('baaa');
        },
        diet() {
            console.log(this.dietType);
        }
    };

    goat.diet(); // Output: herbivore


// The this keyword references the calling object which provides access to the calling object’s properties. 
// In the example above, the calling object is goat and by using this we’re accessing the goat object itself, 
// and then the dietType property of goat by using property dot notation.


// Arrow Functions and this
// We saw in the previous exercise that for a method, the calling object is the object the method belongs to. 
// If we use the this keyword in a method then the value of this is the calling object. 
// However, it becomes a bit more complicated when we start using arrow functions for methods. 
// Take a look at the example below:


    const goat = {
        dietType: 'herbivore',
        makeSound() {
            console.log('baaa');
        },
        diet: () => {
            console.log(this.dietType);
        }
    };

    goat.diet(); // Prints undefined


// In the comment, you can see that goat.diet() would log undefined. 
// So what happened? Notice that the .diet() method is defined using an arrow function.

// Arrow functions inherently bind, or tie, an already defined this value to the function itself that is NOT the calling object. 
// In the code snippet above, the value of this is the global object, or an object that exists in the global scope, 
// which doesn’t have a dietType property and therefore returns undefined.

//#endregion

//#region Privacy 

// Accessing and updating properties is fundamental in working with objects. 
// However, there are cases in which we don’t want other code simply accessing and updating an object’s properties. 
// When discussing privacy in objects, we define it as the idea that only certain properties should be mutable or able to change in value.

// Certain languages have privacy built-in for objects, but JavaScript does not have this feature. 
// Rather, JavaScript developers follow naming conventions that signal to other developers how to interact with a property. 
// One common convention is to place an underscore _ before the name of a property to mean that the property should not be altered. 
// Here’s an example of using _ to prepend a property.

    const bankAccount = {
        _amount: 1000
    }

// In the example above, the _amount is not intended to be directly manipulated.
// Even so, it is still possible to reassign _amount:

    bankAccount._amount = 1000000;

//#endregion

//#region Getters 


// Getters are methods that get and return the internal properties of an object. 
// But they can do more than just retrieve the value of a property! 
// Let’s take a look at a getter method:

    const person = {
        _firstName: 'John',
        _lastName: 'Doe',
        get fullName() {
            if (this._firstName && this._lastName) {
                return `${this._firstName} ${this._lastName}`;
            } else {
                return 'Missing a first name or a last name.';
            }
        }
    }

    // To call the getter method: 
    person.fullName; // 'John Doe'

// Notice that in the getter method above:
// We use the get keyword followed by a function.
// We use an if...else conditional to check if both _firstName and _lastName exist 
// (by making sure they both return truthy values) 
// and then return a different value depending on the result.
// We can access the calling object’s internal properties using this. 
// In fullName, we’re accessing both this._firstName and this._lastName.
// In the last line we call fullName on person. 
// In general, getter methods do not need to be called with a set of parentheses. 
// Syntactically, it looks like we’re accessing a property.

// Important Note:
// Another thing to keep in mind when using getter (and setter) methods is that 
// properties cannot share the same name as the getter/setter function. 
// If we do so, then calling the method will result in an infinite call stack error. 
// One workaround is to add an underscore before the property name like we did in the example above.


    const robot = {
        _model: '1E78V2',
        _energyLevel: 100,
        get energyLevel() {
            if (typeof this._energyLevel === 'number') {
                return `My current energy level is ${this._energyLevel}`
            }
            else {
                return 'System malfunction: cannot retrieve energy level'
            }
        }
    };

    console.log(robot.energyLevel)


//#endregion

//#region Setters 

// Along with getter methods, we can also create setter methods which reassign values of existing properties within an object. 
// Let’s see an example of a setter method:


    const person = {
        _age: 37,
        set age(newAge) {
            if (typeof newAge === 'number') {
                this._age = newAge;
            } else {
                console.log('You must assign a number to age');
            }
        }
    };


// Notice that in the example above:
// We can perform a check for what value is being assigned to this._age.
// When we use the setter method, only values that are numbers will reassign this._age
// There are different outputs depending on what values are used to reassign this._age.

    // Then to use the setter method:
    person.age = 40;
    console.log(person._age); // Logs: 40
    person.age = '40'; // Logs: You must assign a number to age


// Setter methods like age do not need to be called with a set of parentheses. 
// Syntactically, it looks like we’re reassigning the value of a property.

// Like getter methods, there are similar advantages to using setter methods that include checking input, 
// performing actions on properties, and displaying a clear intention for how the object is supposed to be used. 
// Nonetheless, even with a setter method, it is still possible to directly reassign properties. 
// For example, in the example above, we can still set ._age directly:

    person._age = 'forty-five'
    console.log(person._age); // Prints forty-five

    const robot = {
        _model: '1E78V2',
        _energyLevel: 100,
        _numOfSensors: 15,
        get numOfSensors() {
            if (typeof this._numOfSensors === 'number') {
                return this._numOfSensors;
            } else {
                return 'Sensors are currently down.'
            }
        },
        set numOfSensors(num) {
            if (typeof num === 'number' && num >= 0) {
                this._numOfSensors = num
            }
            else {
                console.log('Pass in a number that is greater than or equal to 0')
            }
        }

    };

    robot.numOfSensors = 100
    console.log(robot.numOfSensors)

//#endregion

//#region Factory Functions 

// So far we’ve been creating objects individually, but there are times where we want to create many instances of an object quickly. 
// Here’s where factory functions come in. A real world factory manufactures multiple copies of an item quickly and on a massive scale. 
// A factory function is a function that returns an object and can be reused to make multiple object instances. 
// Factory functions can also have parameters allowing us to customize the object that gets returned.

// Let’s say we wanted to create an object to represent monsters in JavaScript. 
// There are many different types of monsters and we could go about making each 
// monster individually but we can also use a factory function to make our lives easier. 
// To achieve this diabolical plan of creating multiple monsters objects, we can use a factory function that has parameters:

    const monsterFactory = (name, age, energySource, catchPhrase) => {
        return {
            name: name,
            age: age,
            energySource: energySource,
            scare() {
                console.log(catchPhrase);
            }
        }
    };


// In the monsterFactory function above,it has four parameters and returns an object that has the properties: name, age, energySource, and scare(). 
// To make an object that represents a specific monster like a ghost, 
// we can call monsterFactory with the necessary arguments and assign the return value to a variable:

    const ghost = monsterFactory('Ghouly', 251, 'ectoplasm', 'BOO!');
    ghost.scare(); // 'BOO!'

// Now we have a ghost object as a result of calling monsterFactory() with the needed arguments. 
// With monsterFactory in place, we don’t have to create an object literal every time we need a new monster. 
// Instead, we can invoke the monsterFactory function with the necessary arguments to make a monster for us!


//#endregion

//#region Property Value Shorthand 


// ES6 introduced some new shortcuts for assigning properties to variables known as destructuring.
// In the previous exercise, we created a factory function that helped us create objects. 
// We had to assign each property a key and value even though the key name was the same as the parameter name we assigned to it. 
// To remind ourselves, here’s a truncated version of the factory function:

    const monsterFactory = (name, age) => {
        return {
            name: name,
            age: age
        }
    };

// Imagine if we had to include more properties, that process would quickly become tedious! 
// But we can use a destructuring technique, called property value shorthand, to save ourselves some keystrokes. 
// The example below works exactly like the example above:

    const monsterFactory = (name, age) => {
        return {
            name,
            age
        }
    }; 

// Destructured Assignment
// We often want to extract key-value pairs from objects and save them as variables. 
// Take for example the following object:    

    const vampire = {
        name: 'Dracula',
        residence: 'Transylvania',
        preferences: {
            day: 'stay inside',
            night: 'satisfy appetite'
        }
    };

// If we wanted to extract the residence property as a variable, we could use the following code:

    const residence = vampire.residence; 
    console.log(residence); // Prints 'Transylvania' 

// However, we can also take advantage of a destructuring technique called destructured assignment to save ourselves some keystrokes. 
// In destructured assignment we create a variable with the name of an object’s key that is wrapped in curly braces { } and assign to it the object. 
// Take a look at the example below:

    const { residence } = vampire; 
    console.log(residence); // Prints 'Transylvania'

// We can even use destructured assignment to grab nested properties of an object:

    const { day } = vampire.preferences; 
    console.log(day); // Prints 'stay inside'

    const robot = {
        model: '1E78V2',
        energyLevel: 100,
        functionality: {
            beep() {
                console.log('Beep Boop');
            },
            fireLaser() {
                console.log('Pew Pew');
            },
        }
    };

    const { functionality } = robot;
    functionality.beep();


//#endregion

//#region Built-in Object Methods 


// In the previous exercises we’ve been creating instances of objects that have their own methods. 
// But, we can also take advantage of built-in methods for Objects!
// For example, we have access to object instance methods like: .hasOwnProperty(), .valueOf(), 
// and many more! Practice your documentation reading skills and check out: MDN’s object instance documentation.
// There are also useful Object class methods such as Object.assign(), Object.entries(), and Object.keys() just to name a few. 
// For a comprehensive list, browse: MDN’s object instance documentation.

    const robot = {
        model: 'SAL-1000',
        mobile: true,
        sentient: false,
        armor: 'Steel-plated',
        energyLevel: 75
    };

    // What is missing in the following method call?
    const robotKeys = Object.keys(robot);

    console.log(robotKeys);
    // ["model", "mobile", "sentient", "armor", "energyLevel"]

    // Declare robotEntries below this line:
    const robotEntries = Object.entries(robot)

    console.log(robotEntries);
    // [["model", "SAL-1000"], ["mobile", true], ["sentient", false], ["armor", "Steel-plated"], ["energyLevel", 75]]

    // Declare newRobot below this line:
    const newRobot = Object.assign({ laserBlaster: true, voiceRecognition: true }, robot)

    console.log(newRobot);
    // {
    //     armor: "Steel-plated",
    //     energyLevel: 75,
    //     laserBlaster: true,
    //     mobile: true,
    //     model: "SAL-1000",
    //     sentient: false,
    //     voiceRecognition: true
    // }

//#endregion

//#region Exercise Project  


    const meals = ['Pizza', 'Lasagna', 'Kebap', 'Chicken Soup', 'Fish', 'Steak']

    let menu = {
        _meal: '',
        _price: 0,
        set meal(mealToCheck) {
            if (mealToCheck !== '') {
                this._meal = mealToCheck;
                return this._meal;
            }
        },
        set price(priceToCheck) {
            if (typeof priceToCheck === 'number') {
                this._price = priceToCheck;
                return this._price;
            }
        },
        get todaysSpecial() {
            if (this._price && this._meal) {
                return `Today\’s Special is ${this._meal} for \$${this._price}`;
            }
            else {
                if (!this._price) this._price = Math.floor(Math.random() * (20 - 10 + 1) + 10)
                if (!this._meal) {
                    let random = Math.floor(Math.random() * (meals.length))
                    this._meal = meals[random]
                }
                return `Today\’s Special is ${this._meal} for \$${this._price}`;
            }
        }
    }

    // menu.meal='Pizza'
    // menu.price = 10
    console.log(menu.todaysSpecial)


//#endregion

//#region Functions 

// Functions as Data
// Below, we have an annoyingly long function name that hurts the readability of any code in which it’s used. 

    const announceThatIAmDoingImportantWork = () => {
        console.log("I’m doing very important work!");
    };

// Let’s pretend this function does important work and needs to be called repeatedly.
// To rename this function without sacrificing the source code, we can re-assign the function to a variable with a suitably short name:

    const busy = announceThatIAmDoingImportantWork;
    busy(); // This function call barely takes any space!

    console.log(busy.name) // announceThatIAmDoingImportantWork

// busy is a variable that holds a reference to our original function. 
// If we could look up the address in memory of busy and the address in memory 
// of announceThatIAmDoingImportantWork they would point to the same place. 
// Our new busy() function can be invoked with parentheses as if that was the name we originally gave our function.
// Notice how we assign announceThatIAmDoingImportantWork without parentheses as the value to the busy variable. 
// We want to assign the value of the function itself, not the value it returns when invoked.

// In JavaScript, functions are first class objects. 
// This means that, like other objects you’ve encountered, JavaScript functions can have properties and methods.


// Functions as Parameters
// As you know, a parameter is a placeholder for the data that gets passed into a function. 
// Since functions can behave like any other type of data in JavaScript, 
// it might not surprise you to learn that functions can accept other functions as parameters. 
// A higher-order function is a function that either accepts functions as parameters, 
// returns a function, or both! We call functions that get passed in as parameters callback functions. 
// Callback functions get invoked during the execution of the higher-order function.

// When we invoke a higher-order function, and pass another function in as an argument, we don’t invoke the argument function. 
// Invoking it would evaluate to passing in the return value of that function call. 
// With callback functions, we pass in the function itself by typing the function name without the parentheses:


    const higherOrderFunc = param => {
        param();
        return `I just invoked ${param.name} as a callback function!`
    }

    const anotherFunc = () => {
        return 'Im being invoked by the higher-order function!';
    }

    higherOrderFunc(anotherFunc);

// Below we invoked higherOrderFunc() with an anonymous function (a function without a name) that counts to 10. 
// Anonymous functions can be arguments too!

    higherOrderFunc(() => {
        for (let i = 0; i <= 10; i++){
          console.log(i);
        }
      });


// forEach with callback function argument

    const veggies = ['broccoli', 'spinach', 'cauliflower', 'broccoflower'];

    const politelyDecline = (veg) => {
        console.log('No ' + veg + ' please. I will have pizza with extra cheese.');
    }

    const declineEverything = (arr) => {
        arr.forEach(politelyDecline)
    }

    // same as above
    const declineEverything = (arr) => {
        arr.forEach((el)=>{politelyDecline(el)})
    }
    
    declineEverything(veggies)


// Map with callback function
    const numbers = [2, 7, 9, 171, 52, 33, 14]
    const toSquare = num => num * num
    const squareNums = (arr) => arr.map(toSquare)


// Sort Function in descending order

    const checkYears = (year1, year2) => year1 < year2
    const sortYears = arr => arr.sort(checkYears)
    const years = [1970, 1999, 1951, 1982, 1963, 2011, 2018, 1922]
    console.log(sortYears(years))
    // Should print [ 2018, 2011, 1999, 1982, 1970, 1963, 1951, 1922 ]



// filter Function Exercise
// Write a function justCoolStuff() that takes in two arrays of strings, and, using the built-in .filter() method, 
// returns an array with the items that are present in both arrays.

    const justCoolStuff = (arr1,arr2) => arr1.filter(el => arr2.indexOf(el) !== -1)

    const coolStuff = ['gameboys', 'skateboards', 'backwards hats', 'fruit-by-the-foot', 'pogs', 'my room', 'temporary tattoos'];
    const myStuff = [ 'rules', 'fruit-by-the-foot', 'wedgies', 'sweaters', 'skateboards', 'family-night', 'my room', 'braces', 'the information superhighway']; 

    console.log(justCoolStuff(myStuff, coolStuff))
    // Should print [ 'fruit-by-the-foot', 'skateboards', 'my room' ]


// Write a function isTheDinnerVegan() that takes in an array of food objects in the format:
// {name: 'cabbage', source: 'plant' }
// and returns a boolean value based on whether or not every item in the array has entirely plant-based origins.

    const isTheDinnerVegan = (arr) => arr.every(el => el.source === 'plant')

    const dinner = [
                        { name: 'hamburger', source: 'meat' }, 
                        { name: 'cheese', source: 'dairy' }, 
                        { name: 'ketchup', source: 'plant' }, 
                        { name: 'bun', source: 'plant' }, 
                        { name: 'dessert twinkies', source: 'unknown' }
                ];

    console.log(isTheDinnerVegan(dinner))
    // Should print false


// Write a function sortSpeciesByTeeth() that takes in an array of species objects in the format:
// {speciesName: 'shark', numTeeth: 50 }
// and sorts the array in ascending order based on the average number of teeth.

    const speciesArray = [ 
                            {speciesName:'shark', numTeeth:50}, 
                            {speciesName:'dog', numTeeth:42}, 
                            {speciesName:'alligator', numTeeth:80}, 
                            {speciesName:'human', numTeeth:32}
                        ];

    // Write your code here:
    const compareTeeth = (speciesObj1, speciesObj2) => speciesObj1.numTeeth > speciesObj2.numTeeth
    const sortSpeciesByTeeth = arr => arr.sort(compareTeeth)
    console.log(sortSpeciesByTeeth(speciesArray))
    
    // Should print:
    // [ { speciesName: 'human', numTeeth: 32 },
    //   { speciesName: 'dog', numTeeth: 42 },
    //   { speciesName: 'shark', numTeeth: 50 },
    //   { speciesName: 'alligator', numTeeth: 80 } ]
    
// Write a function factorial() that takes a number as an argument and returns the factorial of the number.

    const factorial = (num) => {
        return num === 0 ? 1 : num * factorial(num - 1)
    }

    console.log(factorial(0))
    console.log(factorial(1))
    console.log(factorial(2))
    console.log(factorial(3))
    console.log(factorial(4))
    console.log(factorial(5))
    

//#endregion

//#region Classes 


// Introduction to Classes

    let halley = {
        _name: 'Halley',
        _behavior: 0,

        get name() {
            return this._name;
        },

        get behavior() {
            return this._behavior;
        },

        incrementBehavior() {
            this._behavior++;
        }
    }

// Now, imagine you own a dog daycare and want to create a catalog of all the dogs who belong to the daycare.
// Instead of using the syntax above for every dog that joins the daycare, we can create a Dog class that serves 
// as a template for creating new Dog objects. For each new dog, you can provide a value for their name.
// As you can see, classes are a great way to reduce duplicate code and debugging time.

    class Dog {
        constructor(name) {
            this._name = name;
            this._behavior = 0;
        }

        get name() {
            return this._name;
        }
        get behavior() {
            return this._behavior;
        }

        incrementBehavior() {
            this._behavior++;
        }
    }

    const halley = new Dog('Halley');
    console.log(halley.name); // Print name value to console
    console.log(halley.behavior); // Print behavior value to console
    halley.incrementBehavior(); // Add one to behavior
    console.log(halley.name); // Print name value to console
    console.log(halley.behavior); // Print behavior value to console


// Although you may see similarities between class and object syntax, there is one important method that sets them apart. 
// It’s called the constructor method. JavaScript calls the constructor() method every time it creates a new instance of a class.

    class Dog {
        constructor(name) {
            this.name = name;
            this.behavior = 0;
        }
    }


// Inheritance I
// Let’s say that our Cat class looks like this:

    class Cat {
        constructor(name, usesLitter) {
            this._name = name;
            this._usesLitter = usesLitter;
            this._behavior = 0;
        }

        get name() {
            return this._name;
        }

        get usesLitter() {
            return this._usesLitter;
        }

        get behavior() {
            return this._behavior;
        }

        incrementBehavior() {
            this._behavior++;
        }
    }


// In the example above, we create a Cat class. It shares a couple of properties (_name and _behavior) and a method (.incrementBehavior()) 
// with the Dog class from earlier exercises. The Cat class also contains one additional property (_usesLitter), 
// that holds a boolean value to indicate whether a cat can use their litter box.

// When multiple classes share properties or methods, they become candidates for inheritance
// — a tool developers use to decrease the amount of code they need to write.

// With inheritance, you can create a parent class (also known as a superclass) with properties 
// and methods that multiple child classes (also known as subclasses) share. 
// The child classes inherit the properties and methods from their parent class.
// Let’s abstract the shared properties and methods from our Cat and Dog classes into a parent class called Animal.

    class Animal {
        constructor(name) {
            this._name = name;
            this._behavior = 0;
        }

        get name() {
            return this._name;
        }

        get behavior() {
            return this._behavior;
        }

        incrementBehavior() {
            this._behavior++;
        }
    } 

// The Animal class above contains the properties and methods that the Cat and Dog classes share (name, behavior, .incrementBehavior()).
// Now that we have these shared properties and methods in the parent Animal class, we can extend them to the subclass, Cat.

    class Cat extends Animal {
        constructor(name, usesLitter) {
            super(name);
            this._usesLitter = usesLitter;
        }

        get usesLitter() {
            return this._usesLitter;
        }
    }

// Notice, we call super on the first line of our constructor(), then set the usesLitter property on the second line. .
// In a constructor(), you must always call the super method before you can use the this keyword 
// — if you do not, JavaScript will throw a reference error. 
// To avoid reference errors, it is best practice to call super on the first line of subclass constructors.

    const bryceCat = new Cat('Bryce', false); 
    console.log(bryceCat._name); // output: Bryce


// Now that we’ve abstracted animal daycare features, it’s easy to see how you can extend 
// Animal to support other classes, like Rabbit, Bird or even Snake.


// Static Methods
// Sometimes you will want a class to have methods that aren’t available in individual instances, but that you can call directly from the class.
// Take the Date class, for example — you can both create Date instances to represent whatever date you want, and call static methods, 
// like Date.now() which returns the current date, directly from the class. 
// The .now() method is static, so you can call it directly from the class, but not from an instance of the class


    class Animal {
        constructor(name) {
            this._name = name;
            this._behavior = 0;
        }

        static generateName() {
            const names = ['Angel', 'Spike', 'Buffy', 'Willow', 'Tara'];
            const randomNumber = Math.floor(Math.random() * 5);
            return names[randomNumber];
        }
    }


// In the example above, we create a static method called .generateName() that returns a random name when it’s called. 
// Because of the static keyword, we can only access .generateName() by appending it to the Animal class.
// We call the .generateName() method with the following syntax:

    console.log(Animal.generateName()); // returns a name

// You cannot access the .generateName() method from instances of the Animal class or instances of its subclasses (See below).

    const tyson = new Animal('Tyson'); 
    tyson.generateName(); // TypeError

// Example Class

    class HospitalEmployee {
        constructor(name) {
            this._name = name;
            this._remainingVacationDays = 20;
        }

        static generatePassword() {
            return Math.floor(Math.random() * 10000);
        }

        get name() {
            return this._name;
        }

        get remainingVacationDays() {
            return this._remainingVacationDays;
        }

        takeVacationDays(daysOff) {
            this._remainingVacationDays -= daysOff;
        }
    }

    class Nurse extends HospitalEmployee {
        constructor(name, certifications) {
            super(name);
            this._certifications = certifications;
        }

        get certifications() {
            return this._certifications;
        }

        addCertification(newCertification) {
            this.certifications.push(newCertification);
        }
    }

    const nurseOlynyk = new Nurse('Olynyk', ['Trauma', 'Pediatrics']);
    nurseOlynyk.takeVacationDays(5);
    console.log(nurseOlynyk.remainingVacationDays);
    nurseOlynyk.addCertification('Genetics');
    console.log(nurseOlynyk.certifications);

//#endregion


//#endregion

//#region JavaScript Testing


//#region Introduction 

// Testing is an essential part of development. 
// When used properly, testing can catch and identify issues with your implementation code before you deploy it to users. 
// Instead of testing every function manually, developers automate their tests with a test framework.

// Developers use test frameworks to organize and automate tests that provide useful feedback when errors occur. 
// In this lesson we will use the Mocha test framework to write tests against JavaScript methods.

// In this lesson you will:
//     - Learn to write a basic Mocha test suite
//     - Use Node’s assert.ok method to verify the expected output of your code

    const assert = require('assert');

    describe('Math', () => {
        describe('.max', () => {
            it('returns the argument with the highest value', () => {
                const minimum = 1;
                const median = 2;
                const maximum = 3;

                const result = Math.max(median, minimum, maximum);

                assert.ok(result === maximum);
            });
            it('returns -Infinity when no arguments are provided', () => {
                const negInfinity = -Infinity;

                const result = Math.max();

                assert.ok(result === negInfinity);
            });
        });
    });

//#endregion

//#region describe and it blocks 

// In Mocha we group tests using the describe function and define tests using the it function. 
// These two functions can be used to make your test suite complete, maintainable, and expressive in the following ways:
// - Structure your test suite: you can organize tests into nested groups that reflect the structure of your implementation code.
// - Provide informative messages: you can define your tests using human-readable strings.

    const assert = require('assert');

    describe('Math', () => {
        describe('.max', () => {
            it('returns the argument with the highest value', () => {
                // Your test goes here
            });
            it('returns -Infinity when no arguments are provided', () => {
                // Your test goes here
            });
        });
    });


//#endregion

//#region Setup, Exercise, and Verify 

// In this exercise you will be separating a test into setup, exercise, and verify phases. 
// This distinct and well-defined separation of steps makes your test more reliable, maintainable, and expressive.

// The phases are defined as follows:
// Setup - create objects, variables, and set conditions that your test depends on
// Exercise - execute the functionality you are testing
// Verify - check your expectations against the result of the exercise phase. You can use the assert library here

// Clear separation of each phase makes a test easier to read, change, and validate.

    const assert = require('assert');

    // Naive approach
    describe('.pop', () => {
        it('returns the last element in the array [naive]', () => {
            assert.ok(['padawan', 'knight'].pop() === 'knight');
        });
    });

    // 3 phase approach
    describe('.pop', () => {
        it('returns the last element in the array [3phase]', () => {
            // Setup
            const knightString = 'knight';
            const jediPath = ['padawan', knightString];

            // Exercise
            const popped = jediPath.pop();

            // Verify
            assert.ok(popped === knightString);
        });
    });

//#endregion

//#region Teardown 

// So far, we’ve been writing just one test using a single it() block. 
// However, in most situations, we will need to write many tests for a particular feature that get executed in succession.

// Running multiple tests can introduce issues if the tests make changes to the testing environment: 
// changes to the environment in one test might affect the next test. Some common changes to an environment include:
// - altering files and directory structure
// - changing read and write permissions on a file
// - editing records in a database

// To address this issue, we often add a teardown step to the end of our tests. 
// The teardown phase makes our tests isolated by resetting the environment before the next test runs. This provides two key benefits:
// - Changes to the environment caused by one test do not affect the other tests.
// - Isolated tests can be executed in any order!

    const assert = require('assert');
    const fs = require('fs');
    let path, str;

    describe('appendFileSync', () => {
        it('creates a new file with a string of text', () => {

            // Setup
            path = './message.txt';
            str = 'Hello Node.js';

            // Exercise: write to file
            fs.appendFileSync(path, str);

            // Verify: compare file contents to string
            const contents = fs.readFileSync(path);
            assert.equal(contents.toString(), str);

            // Teardown: restore file
            fs.unlinkSync(path);
        });

        it('creates a new file with a string of text', () => {

            // Setup
            path = './message.txt';
            str = '';

            // Exercise: write to file
            fs.appendFileSync(path, str);

            // Verify: compare file contents to string
            const contents = fs.readFileSync(path);
            assert.equal(contents.toString(), str);

            // Teardown: restore file
            fs.unlinkSync(path);
        });
    });


//#endregion

//#region Hooks 

// Over the last two exercises, we learned about the four main phases of a test: setup, execute, verify, and teardown. 
// In the last exercise, you may have noticed that the setup and teardown steps were identical between tests.

// While execution and verification are unique to each test, setup and teardown 
// are often similar or even identical for multiple tests within a test suite. 
// The Mocha test framework provides functions that enable us to reduce repetition, 
// simplify the scope of each test, and more finely control the execution of our tests.

// These functions (also referred to as hooks) are:
//     beforeEach(callback) - callback is run before each test
//     afterEach(callback) - callback is run after each test
//     before(callback) - callback is run before the first test
//     after(callback) - callback is run after the last test

// Each hook accepts a callback to be executed at various times during a test. 
// The before... hooks naturally happen before tests and are useful for separating out the setup steps of your tests. 
// Meanwhile, the after... hooks are executed after tests and are useful for separating out the teardown steps of your tests.

    describe('messing around with hooks', () => {

        let testValue; // Variable used by both tests

        beforeEach(() => {
            testValue = 5;
        });

        it('should add', () => {
            // testValue = 5 <-- moved to beforeEach()
            testValue = testValue + 5;
            assert.equal(testValue, 10);
        });

        it('should multiply', () => {
            // testValue = 5 <-- moved to beforeEach()
            testValue = testValue * 5;
            assert.equal(testValue, 25);
        });

    });


    const assert = require('assert');
    const fs = require('fs');
    let path, str;

    describe('appendFileSync', () => {

        before(() => {
            path = './message.txt';
        });

        afterEach(() => {
            fs.unlinkSync(path);
        });

        it('writes a string to text file at given path name', () => {
            str = 'Hello Node.js';
            fs.appendFileSync(path, str);
            const contents = fs.readFileSync(path);
            assert.equal(contents.toString(), str);
        });

        it('writes an empty string to text file at given path name', () => {
            str = '';
            fs.appendFileSync(path, str);
            const contents = fs.readFileSync(path);
            assert.equal(contents.toString(), str);
        });
    });

//#endregion

//#region assert.ok 

    const assert = require('assert');
    describe('-', () => {
        it('returns the difference of two values', () => {
            const bigNum = 100;
            const smallNum = 4;
            const expected = 96;
            const result = bigNum - smallNum;
            assert.ok(result === expected);
        });
    });

//#endregion

//#region assert.equal 

    const landAnimals = ['giraffe', 'squirrel'];
    const waterAnimals = ['shark', 'stingray'];
    landAnimals.push('frog');
    waterAnimals.push('frog');
    
    assert.ok(landAnimals[2] == waterAnimals[2]);
    assert.equal(landAnimals[2], waterAnimals[2]);  // same as above

    const assert = require('assert');
    describe('-', () => {
        it('returns the difference of two values', () => {
            const bigNum = 100;
            const smallNum = 4;
            const expected = 96;
            const result = bigNum - smallNum;
            assert.equal(result, expected);
        });
    });

//#endregion

//#region assert.strictEqual 

// If you need to be strict in evaluating equality, you can use assert.strictEqual().
//     assert.equal() performs a == comparison
//     assert.strictEqual() performs a === comparison

    const a = 3;
    const b = '3';
    assert.ok(a == b);
    assert.ok(a === b);

// July 2021 Update: the assert documentation recommends always using assert.strictEqual() instead of assert.equal().

//#endregion

//#region assert.deepEqual I 

    const a = {relation: 'twin', age: '17'};
    const b = {relation: 'twin', age: '17'};
    assert.equal(a, b);
    assert.strictEqual(a, b);

// Both assertions will throw an error because distinct objects are not considered equal 
// when using either loose or strict equality in JavaScript.
// If you need to compare the values within two objects, you can use assert.deepEqual(). 
// This method compares the values of each object using loose (==) equality

    const assert = require('assert');
    describe('+', () => {
        it('returns the sum of two values', () => {
            let expected = { a: 3, b: 4, result: 7 };
            let sum = { a: 3, b: 4 };
            sum.result = sum.a + sum.b;
            assert.deepEqual(sum, expected);
        });
    });

//#endregion

//#region assert.deepEqual II 

// In the last exercise you used deepEqual() to compare the values of two objects with loose equality. 
// Arrays are also objects, so deepEqual() also compares their values with loose equality.

    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    const arr3 = [1, 2, '3'];
    assert.deepEqual(arr1, arr2); // No error
    assert.deepEqual(arr1, arr3); // No error

    const assert = require('assert');
    describe('+', () => {
        it('returns the sum of two values', () => {
            let expected = [3, 4, 7];
            let sum = [3, 4];
            sum.push(3 + 4);
            assert.deepEqual(sum, expected);
        });
    });

//#endregion

//#region Sample Project  

// -------------------index.js-------------------

    // Define a rooster
    Rooster = {};

    // Return a morning rooster call
    Rooster.announceDawn = () => {
        return 'cock-a-doodle-doo!';
    }

    // Return hour as string
    // Throws Error if hour is not between 0 and 23 inclusive
    Rooster.timeAtDawn = (hour) => {
        if (hour < 0 || hour > 23) {
            throw new RangeError;
        } else {
            return hour.toString();
        };
    }

    module.exports = Rooster;


// -------------------index-test.js-------------------

    const assert = require("assert");
    const Rooster = require("../index");

    describe("Rooster", () => {
        describe(".announceDawn", () => {
            it("returns a rooster call", () => {
                const expected = 'cock-a-doodle-doo!';
                const result = Rooster.announceDawn();
                assert.strictEqual(result, expected);
            });
        });
        describe(".timeAtDawn", () => {
            it("returns its argument as a string", () => {
                const expected = "8";
                const result = Rooster.timeAtDawn(8);
                assert.strictEqual(result, expected);
            });
            it("throws an error if passed a number less than 0", () => {
                const expected = RangeError;
                const input = -1;
                assert.throws(() => {
                    Rooster.timeAtDawn(input);
                }, expected);
            });
            it("throws an error if passed a number greater than 23", () => {
                const expected = RangeError;
                const input = 25;
                assert.throws(() => {
                    Rooster.timeAtDawn(input);
                }, expected);
            });
        });
    });

//#endregion


//#endregion

//#region Async JavaScript and HTTP Requests 


//#region Basics of Asynchronous JavaScript 


//#region JavaScript and Asynchronous Code 

// JavaScript is a single-threaded language. This means it has a single thread that can carry out one task at a time. 
// However, Javascript has what is known as the event loop,
// a specific design that allows it to perform asynchronous tasks even while only using a single thread.

//#endregion

//#region Asynchronous Callbacks 

// One common example of asynchronicity in JavaScript is the use of asynchronous callbacks. 
// This is a type of callback function that executes after a specific condition is met and runs concurrently to any other code currently running. 
// Let’s look at an example:

    easterEgg.addEventListener('click', () => {
        console.log('Up, Up, Down, Down, Left, Right, Left, Right, B, A');
    });

// In the code above, the function passed as the second argument of .addEventListener() is an asynchronous callback 
// — this function doesn’t execute until the easterEgg is clicked.

//#endregion

//#region setTimeout 

// In addition to asynchronous callbacks, JavaScript provides a handful of built-in functions that can perform tasks asynchronously. 
// One function that is commonly used is the setTimeout() function.

// With setTimeout() we can write code that tells our JavaScript program to wait a minimum amount of time before executing its callback function. 
// Take a look at this example:

    setTimeout(() => {
        console.log('Delay the printing of this string, please.');
    }, 1000);

// Notice that setTimeout() takes 2 arguments, a callback function and a number specifying how long to wait before executing the function. 
// In the example above, the function will print 'Delay the printing of this string, please.' after 1000 milliseconds (or 1 second) have passed.

// Since setTimeout() is non-blocking, we can be executing multiple lines of code at the same time! 
// Imagine if we had a program like this:
    
    setTimeout(() => {
      console.log('Delay the printing of this string, please.');
    }, 1000);
    console.log('Doing important stuff.');
    console.log('Still doing important stuff.'); 

// Which outputs:
// 'Doing important stuff.'
// 'Still doing important stuff.' 
// 'Delay the printing of this string, please.'

// If we take a closer look at the output, we’ll see that our setTimeout()‘s callback function didn’t execute 
// until after our other very important console.log() statements were executed.

//#endregion

//#region setInterval 

// Another common built-in function is setInterval() which also takes a callback function and a number specifying how often the callback function should execute. 
// For example:

    setInterval(() => {
        alert('Are you paying attention???')
    }, 300000)

//#endregion

//#region Why Do We Need an Event Loop? 

// JavaScript is a single-threaded language, which means that two statements can’t be executed simultaneously. 
// For example, if you have a for loop that takes a while to process, it’ll have to finish executing before the rest of your code runs. 
// That results in blocking code. But as we already learned, we can run non-blocking code in JavaScript, which is where the Event Loop comes in. 
// Input/output (I/O) is handled with events and callbacks so code execution can continue. 
// Let’s look at an example of blocking and non-blocking code. Run this block of code yourself locally.

// Blocking code
    console.log("I'm learning about");
    for (let idx=0; idx < 999999999; idx++) {}
    console.log("the Event Loop");
     
// The second console.log() statement is delayed by the for loop's execution
// Now let’s take a look at the non-blocking example. There are functions like setTimeout() that work differently thanks to the Event Loop. 

    console.log("I’m learning about");
    setTimeout(() => { console.log("Event Loop");}, 2000);
    console.log("the");

//#endregion

//#region Understand the Components of the Event Loop 

// The event loop is made up of these parts:
    // Memory Heap
    // Call Stack
    // Event Queue
    // Event Loop
    // Node or Web APIs

// Let’s take a closer look at each part before we put it all together.


// The Heap
// The heap is a block of memory where we store objects in an unordered manner. 
// JavaScript variables and objects that are currently in use are stored in the heap.


// The Call Stack
// The stack, or call stack, tracks what function is currently being run in your code.
// When you invoke a function, a frame is added to the stack. Frames connect that function’s arguments and local variables from the heap. 
// Frames enter the stack in a last in, first out (LIFO) order. In the code snippet below, a series of nested functions are declared, then foo() is called and logged.

    function foo() {
        return function bar() {
            return function baz() {
                return 'I love CodeCademy'
            }
        }
    }
    console.log(foo()()());

// The function executing at any given point in time is at the top of the stack. 
// In our example code, since we have nested functions, they will all be added to the stack until the innermost function has been executed. 
// When the function finishes executing e.g. returns, its frame is removed from the stack
// You might have noticed that global() is at the bottom of the stack–when you first initiate a program, 
// the global execution context is added to the call stack, which contains the global variable and lexical environment. 
// Each subsequent frame for a called function has a function execution context that includes the function’s lexical and variable environment.
// So when we say the call stack tracks what function is currently being run in our code, what we are tracking is the current execution context. 
// When a function runs to completion, it is popped off of the call stack. The memory, or the frame, is cleared.


// The Event Queue
// The event queue is a list of messages corresponding to functions that are waiting to be processed. 
// In the diagram, these messages are entering the event queue from sources such as various web APIs 
// or async functions that were called and are returning additional events to be handled by the stack. 
// Messages enter the queue in a first in, first out (FIFO) order. 
// No code is executed in the event queue; instead, it holds functions that are waiting to be added back into the stack.


// The Event Loop
// This event loop is a specific part of our overall event loop concept. 
// Messages that are waiting in the event queue to be added back into the stack are added back via the event loop. 
// When the call stack is empty, if there is anything in the event queue, the event loop can add those one at a time to the stack for execution.
    // 1. First the event loop will poll the stack to see if it is empty.
    // 2. It will add the first waiting message.
    // 3. It will repeat steps 1 and 2 until the stack has cleared.


// The Event Loop in Action
// Now that we know all of the pieces of the event loop, let’s walk through some code to understand the event loop in action.

    console.log("This is the first line of code in app.js.");
    function usingsetTimeout() {
        console.log("I'm going to be queued in the Event Loop.");
    }
    setTimeout(usingsetTimeout, 3000);
    console.log("This is the last line of code in app.js.");


// 1. console.log("This is the first line of code in app.js."); is added to the stack, executes, then pops off of the stack.
// 2. setTimeout() is added to the stack.
// 3. setTimeout()’s callback is passed to be executed by a web API. The timer will run for 3 seconds. 
// After 3 seconds elapse, the callback function, usingsetTimeout() is pushed to the Event Queue.
// 4. The Event Loop, meanwhile, will check periodically if the stack is cleared to handle any messages in the Event Queue.
// 5. console.log("This is the last line of code in app.js."); is added to the stack, executes, then pops off of the stack.
// 6. The stack is now empty, so the event loop pushes usingsetTimeout onto the stack.
// 7. console.log("I'm going to be queued in the Event Loop."); is added to the stack, executes, gets popped
// 8. usesetTimeout pops off of the stack.


//#endregion


//#endregion

//#region Promises 


//#region Introduction 

// An asynchronous operation is one that allows the computer to “move on” to other tasks while waiting for the asynchronous operation to complete. 
// Asynchronous programming means that time-consuming operations don’t have to bring everything else in our programs to a halt.
// Operations like making a network request or querying a database can be time-consuming, but JavaScript allows us to execute other tasks while awaiting their completion.

// What is a Promise?
// Promises are objects that represent the eventual outcome of an asynchronous operation. 
// A Promise object can be in one of three states:
    // Pending: The initial state— the operation has not completed yet.
    // Fulfilled: The operation has completed successfully and the promise now has a resolved value. For example, a request’s promise might resolve with a JSON object as its value.
    // Rejected: The operation has failed and the promise has a reason for the failure. This reason is usually an Error of some kind.

// We refer to a promise as settled if it is no longer pending— it is either fulfilled or rejected. 
// Let’s think of a dishwasher as having the states of a promise:
    // Pending: The dishwasher is running but has not completed the washing cycle.
    // Fulfilled: The dishwasher has completed the washing cycle and is full of clean dishes.
    // Rejected: The dishwasher encountered a problem (it didn’t receive soap!) and returns unclean dishes.

// If our dishwashing promise is fulfilled, we’ll be able to perform related tasks, such as unloading the clean dishes from the dishwasher. 
// If it’s rejected, we can take alternate steps, such as running it again with soap or washing the dishes by hand.
// All promises eventually settle, enabling us to write logic for what to do if the promise fulfills or if it rejects.

//#endregion

//#region Constructing a Promise Object 

// Let’s construct a promise! To create a new Promise object, we use the new keyword and the Promise constructor method:

    const executorFunction = (resolve, reject) => { };
    const myFirstPromise = new Promise(executorFunction)

// The Promise constructor method takes a function parameter called the executor function which runs automatically when the constructor is called. 
// The executor function generally starts an asynchronous operation and dictates how the promise should be settled.

// The executor function has two function parameters, usually referred to as the resolve() and reject() functions. 
// The resolve() and reject() functions aren’t defined by the programmer. 
// When the Promise constructor runs, JavaScript will pass its own resolve() and reject() functions into the executor function.
//     - resolve is a function with one argument. Under the hood, if invoked, 
//         resolve() will change the promise’s status from pending to fulfilled, 
//         and the promise’s resolved value will be set to the argument passed into resolve().
//     - reject is a function that takes a reason or error as an argument. Under the hood, if invoked, 
//         reject() will change the promise’s status from pending to rejected, 
//         and the promise’s rejection reason will be set to the argument passed into reject().

// Let’s look at an example executor function in a Promise constructor:

    const executorFunction = (resolve, reject) => {
        if (someCondition) {
            resolve('I resolved!');
        } else {
            reject('I rejected!');
        }
    }
    const myFirstPromise = new Promise(executorFunction);

// Let’s break down what’s happening above:

// - We declare a variable myFirstPromise
// - myFirstPromise is constructed using new Promise() which is the Promise constructor method.
// - executorFunction() is passed to the constructor and has two functions as parameters: resolve and reject.
// - If someCondition evaluates to true, we invoke resolve() with the string 'I resolved!'
// - If not, we invoke reject() with the string 'I rejected!'

// In our example, myFirstPromise resolves or rejects based on a simple condition, but, in practice, 
// promises settle based on the results of asynchronous operations. 
// For example, a database request may fulfill with the data from a query or reject with an error thrown. In this exercise, 
// we’ll construct promises which resolve synchronously to more easily understand how they work.

// Example

    const inventory = {
        sunglasses: 10,
        pants: 1088,
        bags: 1344
    };

    const myExecutor = (resolve, reject) => {
        if (inventory.sunglasses > 0) resolve('Sunglasses order processed.');
        reject('That item is sold out.');
    }

    const orderSunglasses = () => {
        return new Promise(myExecutor);
    }

    let orderPromise = orderSunglasses();
    console.log(orderPromise); // Promise { 'Sunglasses order processed.' }


//#endregion

//#region The Node setTimeout() Function 

// Knowing how to construct a promise is useful, but most of the time, knowing how to consume, or use, promises will be key. 
// Rather than constructing promises, you’ll be handling Promise objects returned to you as the result of an asynchronous operation. 
// These promises will start off pending but settle eventually.

// Moving forward, we’ll be simulating this by providing you with functions that return promises which settle after some time. 
// To accomplish this, we’ll be using setTimeout(). setTimeout() is a Node API (a comparable API is provided by web browsers) 
// that uses callback functions to schedule tasks to be performed after a delay. 
// setTimeout() has two parameters: a callback function and a delay in milliseconds.

    const delayedHello = () => {
        console.log('Hi! This is an asynchronous greeting!');
    };

    setTimeout(delayedHello, 2000);

// Here, we invoke setTimeout() with the callback function delayedHello() and 2000. 
// In at least two seconds delayedHello() will be invoked. 
// But why is it “at least” two seconds and not exactly two seconds?

// This delay is performed asynchronously—the rest of our program won’t stop executing during the delay. 
// Asynchronous JavaScript uses something called the event-loop. 
// After two seconds, delayedHello() is added to a line of code waiting to be run. 
// Before it can run, any synchronous code from the program will run. Next, any code in front of it in the line will run. 
// This means it might be more than two seconds before delayedHello() is actually executed.
// Let’s look at how we’ll be using setTimeout() to construct asynchronous promises:

    const returnPromiseFunction = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve('I resolved!') }, 1000);
        });
    };

    const prom = returnPromiseFunction();

// In the example code, we invoked returnPromiseFunction() which returned a promise. 
// We assigned that promise to the variable prom. 
// Similar to the asynchronous promises you may encounter in production, prom will initially have a status of pending.

    console.log("This is the first line of code in app.js.");
    const usingSTO = () => {
        console.log('Executing....')
    }
    setTimeout(usingSTO, 1000);
    console.log("This is the last line of code in app.js.");

// Output:
    // This is the first line of code in app.js.
    // This is the last line of code in app.js.
    // Executing....


//#endregion

//#region Consuming Promises 

// The initial state of an asynchronous promise is pending, but we have a guarantee that it will settle. 
// How do we tell the computer what should happen then? 
// Promise objects come with an aptly named .then() method. 
// It allows us to say, “I have a promise, when it settles, then here’s what I want to happen…”

// In the case of our dishwasher promise, the dishwasher will run then:
//     If our promise rejects, this means we have dirty dishes, and we’ll add soap and run the dishwasher again.
//     If our promise fulfills, this means we have clean dishes, and we’ll put the dishes away.

// .then() is a higher-order function— it takes two callback functions as arguments. 
// We refer to these callbacks as handlers. When the promise settles, the appropriate handler will be invoked with that settled value.
    // The first handler, sometimes called onFulfilled, is a success handler, and it should contain the logic for the promise resolving.
    // The second handler, sometimes called onRejected, is a failure handler, and it should contain the logic for the promise rejecting.

// We can invoke .then() with one, both, or neither handler! 
// This allows for flexibility, but it can also make for tricky debugging. 
// If the appropriate handler is not provided, instead of throwing an error, 
// .then() will just return a promise with the same settled value as the promise it was called on. 
// One important feature of .then() is that it always returns a promise. 
// We’ll return to this in more detail in a later exercise and explore why it’s so important.


//#endregion

//#region Success and Failure Callback Functions 

// To handle a “successful” promise, or a promise that resolved, we invoke .then() on the promise, passing in a success handler callback function:

    const prom = new Promise((resolve, reject) => {
        resolve('Yay!');
    });

    const handleSuccess = (resolvedValue) => {
        console.log(resolvedValue);
    };

    prom.then(handleSuccess); // Prints: 'Yay!'

// Let’s break down what’s happening in the example code:
// - prom is a promise which will resolve to 'Yay!'.
// - We define a function, handleSuccess(), which prints the argument passed to it.
// - We invoke prom‘s .then() function passing in our handleSuccess() function.
// - Since prom resolves, handleSuccess() is invoked with prom‘s resolved value, 'Yay', so 'Yay' is logged to the console.

// With typical promise consumption, we won’t know whether a promise will resolve or reject, so we’ll need to provide the logic for either case. 
// We can pass both a success callback and a failure callback to .then().

    let prom = new Promise((resolve, reject) => {
        let num = Math.random();
        if (num < .5) {
            resolve('Yay!');
        } else {
            reject('Ohhh noooo!');
        }
    });

    const handleSuccess = (resolvedValue) => {
        console.log(resolvedValue);
    };

    const handleFailure = (rejectionReason) => {
        console.log(rejectionReason);
    };

    prom.then(handleSuccess, handleFailure);

// Let’s break down what’s happening in the example code:
// prom is a promise which will randomly either resolve with 'Yay!' or reject with 'Ohhh noooo!'.
// We pass two handler functions to .then(). 
// The first will be invoked with 'Yay!' if the promise resolves, and the second will be invoked with 'Ohhh noooo!' if the promise rejects.

//#endregion

//#region Using catch() with Promises 

// One way to write cleaner code is to follow a principle called separation of concerns. 
// Separation of concerns means organizing code into distinct sections each handling a specific task. 
// It enables us to quickly navigate our code and know where to look if something isn’t working.

// Remember, .then() will return a promise with the same settled value as the promise 
// it was called on if no appropriate handler was provided. 
// This implementation allows us to separate our resolved logic from our rejected logic. 
// Instead of passing both handlers into one .then(), we can chain a second 
// .then() with a failure handler to a first .then() with a success handler and both cases will be handled.

    prom
        .then((resolvedValue) => {
            console.log(resolvedValue);
        })
        .then(null, (rejectionReason) => {
            console.log(rejectionReason);
        });

// Since JavaScript doesn’t mind whitespace, we follow a common convention of putting each part of this chain on a new line to make it easier to read. 
// To create even more readable code, we can use a different promise function: .catch().

// The .catch() function takes only one argument, onRejected. 
// In the case of a rejected promise, this failure handler will be invoked with the reason for rejection. 
// Using .catch() accomplishes the same thing as using a .then() with only a failure handler.

// Let’s look at an example using .catch():

    prom
        .then((resolvedValue) => {
            console.log(resolvedValue);
        })
        .catch((rejectionReason) => {
            console.log(rejectionReason);
        });

// Let’s break down what’s happening in the example code:
// - prom is a promise which randomly either resolves with 'Yay!' or rejects with 'Ohhh noooo!'.
// - We pass a success handler to .then() and a failure handler to .catch().
// - If the promise resolves, .then()‘s success handler will be invoked with 'Yay!'.
// - If the promise rejects, .then() will return a promise with the same rejection reason 
//   as the original promise and .catch()‘s failure handler will be invoked with that rejection reason.

// Example
    const { checkInventory } = require('./library.js');

    const order = [['sunglasses', 0], ['bags', 2]];

    const handleSuccess = (resolvedValue) => {
        console.log(resolvedValue);
    };

    const handleFailure = (rejectReason) => {
        console.log(rejectReason);
    };

    checkInventory(order)
        .then(handleSuccess)
        .catch(handleFailure);


//#endregion

//#region Chaining Multiple Promises 

// One common pattern we’ll see with asynchronous programming is multiple operations 
// which depend on each other to execute or that must be executed in a certain order. 
// We might make one request to a database and use the data returned to us to make another request and so on! 
// Let’s illustrate this with another cleaning example, washing clothes:

// We take our dirty clothes and put them in the washing machine. 
// If the clothes are cleaned, then we’ll want to put them in the dryer. 
// After the dryer runs, if the clothes are dry, then we can fold them and put them away.

// This process of chaining promises together is called composition. 
// Promises are designed with composition in mind! Here’s a simple promise chain in code:

    firstPromiseFunction()
        .then((firstResolveVal) => {
            return secondPromiseFunction(firstResolveVal);
        })
        .then((secondResolveVal) => {
            console.log(secondResolveVal);
        });

// Let’s break down what’s happening in the example:
// - We invoke a function firstPromiseFunction() which returns a promise.
// - We invoke .then() with an anonymous function as the success handler.
// - Inside the success handler we return a new promise— the result of invoking a second function, 
//   secondPromiseFunction() with the first promise’s resolved value.
// - We invoke a second .then() to handle the logic for the second promise settling.
// - Inside that .then(), we have a success handler which will log the second promise’s resolved value to the console.

// In order for our chain to work properly, we had to return the promise secondPromiseFunction(firstResolveVal). 
// This ensured that the return value of the first .then() was our second promise rather than the default return 
// of a new promise with the same settled value as the initial.

// Example

    const { checkInventory, processPayment, shipOrder } = require('./library.js');

    const order = {
        items: [['sunglasses', 1], ['bags', 2]],
        giftcardBalance: 79.82
    };

    checkInventory(order)
        .then((resolvedValueArray) => {
            return processPayment(resolvedValueArray);
        })
        .then((resolvedValueArray) => {
            return shipOrder(resolvedValueArray);
        })
        .then((successMessage) => {
            console.log(successMessage);
        })
        .catch((errorMessage) => {
            console.log(errorMessage);
        });

//#endregion

//#region Avoiding Common Mistakes 

// Promise composition allows for much more readable code than the nested callback syntax that preceded it. 
// However, it can still be easy to make mistakes. In this exercise, we’ll go over two common mistakes with promise composition.

// Mistake 1: Nesting promises instead of chaining them.

    returnsFirstPromise()
        .then((firstResolveVal) => {
            return returnsSecondValue(firstResolveVal)
                .then((secondResolveVal) => {
                    console.log(secondResolveVal);
                })
        })

// Mistake 2: Forgetting to return a promise.
    returnsFirstPromise()
        .then((firstResolveVal) => {
            returnsSecondValue(firstResolveVal)
        })
        .then((someVal) => {
            console.log(someVal);
        })

//#endregion

//#region Using Promise.all() 

// When done correctly, promise composition is a great way to handle situations 
// where asynchronous operations depend on each other or execution order matters. 
// What if we’re dealing with multiple promises, but we don’t care about the order? 
// Let’s think in terms of cleaning again.

// For us to consider our house clean, we need our clothes to dry, our trash bins emptied, and the dishwasher to run. 
// We need all of these tasks to complete but not in any particular order. 
// Furthermore, since they’re all getting done asynchronously, they should really all be happening at the same time!

// To maximize efficiency we should use concurrency, multiple asynchronous operations happening together. 
// With promises, we can do this with the function Promise.all().

// Promise.all() accepts an array of promises as its argument and returns a single promise. 
// That single promise will settle in one of two ways:

// If every promise in the argument array resolves, the single promise returned from Promise.all() 
// will resolve with an array containing the resolve value from each promise in the argument array.
// If any promise from the argument array rejects, the single promise returned from Promise.all() 
// will immediately reject with the reason that promise rejected. 
// This behavior is sometimes referred to as failing fast.
// Let’s look at a code example:

    let myPromises = Promise.all([returnsPromOne(), returnsPromTwo(), returnsPromThree()]);

    myPromises
        .then((arrayOfValues) => {
            console.log(arrayOfValues);
        })
        .catch((rejectionReason) => {
            console.log(rejectionReason);
        })


// Ex:
    const { checkAvailability } = require('./library.js');

    const onFulfill = (itemsArray) => {
        console.log(`Items checked: ${itemsArray}`);
        console.log(`Every item was available from the distributor. Placing order now.`);
    };

    const onReject = (rejectionReason) => {
        console.log(rejectionReason);
    };


    let checkSunglasses = checkAvailability('sunglasses', 'Favorite Supply Co.');
    let checkPants = checkAvailability('pants', 'Favorite Supply Co.');
    let checkBags = checkAvailability('bags', 'Favorite Supply Co.');

    Promise.all([checkSunglasses, checkPants, checkBags])
        .then(onFulfill)
        .catch(onReject);

//#endregion

        
//#endregion

//#region Async Await 

// Often in web development, we need to handle asynchronous actions— actions we can wait on while moving on to other tasks. 
// We make requests to networks, databases, or any number of similar operations. 
// JavaScript is non-blocking: instead of stopping the execution of code while it waits, 
// JavaScript uses an event-loop which allows it to efficiently execute other tasks while it awaits the completion of these asynchronous actions.

// Originally, JavaScript used callback functions to handle asynchronous actions. 
// The problem with callbacks is that they encourage complexly nested code which quickly becomes difficult to read, debug, and scale. 
// With ES6, JavaScript integrated native promises which allow us to write significantly more readable code. 
// JavaScript is continually improving, and ES8 provides a new syntax for handling our asynchronous action, async...await. 
// The async...await syntax allows us to write asynchronous code that reads similarly to traditional synchronous, imperative programs.

// The async...await syntax is syntactic sugar— it doesn’t introduce new functionality into the language, 
// but rather introduces a new syntax for using promises and generators. 
// Both of these were already built in to the language. 
// Despite this, async...await powerfully improves the readability and scalability of our code. Let’s learn how to use it!


//#region The async Keyword 

// The async keyword is used to write functions that handle asynchronous actions. 
// We wrap our asynchronous logic inside a function prepended with the async keyword. 
// Then, we invoke that function.

    async function myFunc() {
        // Function body here
    };

    myFunc();

// we can also create async function expressions:

    const myFunc = async () => {
    // Function body here
    };
    
    myFunc();

// async functions always return a promise. 
// This means we can use traditional promise syntax, like .then() and .catch with our async functions. 
// An async function will return in one of three ways:
// - If there’s nothing returned from the function, it will return a promise with a resolved value of undefined.
// - If there’s a non-promise value returned from the function, it will return a promise resolved to that value.
// - If a promise is returned from the function, it will simply return that promise


    async function fivePromise() {
        return 5;
    }

    fivePromise()
        .then(resolvedValue => {
            console.log(resolvedValue);
        })  // Prints 5


// In the example above, even though we return 5 inside the function body, 
// what’s actually returned when we invoke fivePromise() is a promise with a resolved value of 5.


//#endregion

//#region The await Operator 

// By itself, async keyword doesn’t do much; async functions are almost always used with the additional keyword await inside the function body.

// The await keyword can only be used inside an async function. 
// await is an operator: it returns the resolved value of a promise. 
// Since promises resolve in an indeterminate amount of time, 
// await halts, or pauses, the execution of our async function until a given promise is resolved.

// In most situations, we’re dealing with promises that were returned from functions. 
// Generally, these functions are through a library, and, in this lesson, we’ll be providing them. 
// We can await the resolution of the promise it returns inside an async function. 
// In the example below, myPromise() is a function that returns a promise which will resolve to the string "I am resolved now!".

    async function asyncFuncExample() {
        let resolvedValue = await myPromise();
        console.log(resolvedValue);
    }

    asyncFuncExample(); // Prints: I am resolved now!

// Within our async function, asyncFuncExample(), we use await to halt our execution until myPromise() is resolved 
// and assign its resolved value to the variable resolvedValue. Then we log resolvedValue to the console. 
// We’re able to handle the logic for a promise in a way that reads like synchronous code.


//#endregion

//#region Writing async Functions 

// We’ve seen that the await keyword halts the execution of an async function until a promise is no longer pending. 
// Don’t forget the await keyword! It may seem obvious, but this can be a tricky mistake to catch because our function 
// will still run— it just won’t have the desired results

    let myPromise = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Yay, I resolved!')
            }, 1000);
        });
    }

// Now we’ll write two async functions which invoke myPromise():

    async function noAwait() {
        let value = myPromise();
        console.log(value);
    }

    async function yesAwait() {
        let value = await myPromise();
        console.log(value);
    }

    noAwait(); // Prints: Promise { <pending> }
    yesAwait(); // Prints: Yay, I resolved!

// In the first async function, noAwait(), we left off the await keyword before myPromise(). 
// In the second, yesAwait(), we included it. The noAwait() function logs Promise { <pending> } to the console. 
// Without the await keyword, the function execution wasn’t paused. 
// The console.log() on the following line was executed before the promise had resolved.

// Remember that the await operator returns the resolved value of a promise. 
// When used properly in yesAwait(), the variable value was assigned the resolved value of the myPromise() promise, 
// whereas in noAwait(), value was assigned the promise object itself.


//#endregion

//#region Handling Dependent Promises 


// The true beauty of async...await is when we have a series of asynchronous actions which depend on one another. 
// For example, we may make a network request based on a query to a database. I
// n that case, we would need to wait to make the network request until we had the results from the database. 
// With native promise syntax, we use a chain of .then() functions making sure to return correctly each one:

    function nativePromiseVersion() {
        returnsFirstPromise()
            .then((firstValue) => {
                console.log(firstValue);
                return returnsSecondPromise(firstValue);
            })
            .then((secondValue) => {
                console.log(secondValue);
            });
    }

// Let’s break down what’s happening in the nativePromiseVersion() function:
// - Within our function we use two functions which return promises: returnsFirstPromise() and returnsSecondPromise().
// - We invoke returnsFirstPromise() and ensure that the first promise resolved by using .then().
// - In the callback of our first .then(), we log the resolved value of the first promise, firstValue, and then return returnsSecondPromise(firstValue).
// - We use another .then() to print the second promise’s resolved value to the console.

// Here’s how we’d write an async function to accomplish the same thing:

    async function asyncAwaitVersion() {
        let firstValue = await returnsFirstPromise();
        console.log(firstValue);
        let secondValue = await returnsSecondPromise(firstValue);
        console.log(secondValue);
    }

// Let’s break down what’s happening in our asyncAwaitVersion() function:

// - We mark our function as async.
// - Inside our function, we create a variable firstValue assigned await returnsFirstPromise(). 
//   This means firstValue is assigned the resolved value of the awaited promise.
// - Next, we log firstValue to the console.
// - Then, we create a variable secondValue assigned to await returnsSecondPromise(firstValue). 
//   Therefore, secondValue is assigned this promise’s resolved value.
// - Finally, we log secondValue to the console.

// Though using the async...await syntax can save us some typing, the length reduction isn’t the main point. 
// Given the two versions of the function, the async...await version more closely resembles synchronous code, 
// which helps developers maintain and debug their code. 
// The async...await syntax also makes it easy to store and refer to resolved values from promises further 
// back in our chain which is a much more difficult task with native promise syntax. 
// Let’s create some async functions with multiple await statements!

//#endregion

//#region Handling Errors 

// When .catch() is used with a long promise chain, there is no indication of where in the chain the error was thrown. 
// This can make debugging challenging.

// With async...await, we use try...catch statements for error handling. 
// By using this syntax, not only are we able to handle errors in the same way we do with synchronous code, 
// but we can also catch both synchronous and asynchronous errors. 
// This makes for easier debugging!

    async function usingTryCatch() {
        try {
            let resolveValue = await asyncFunction('thing that will fail');
            let secondValue = await secondAsyncFunction(resolveValue);
        } catch (err) {
            // Catches any errors in the try block
            console.log(err);
        }
    }

    usingTryCatch();


// Remember, since async functions return promises we can still use native promise’s .catch() with an async function

    async function usingPromiseCatch() {
        let resolveValue = await asyncFunction('thing that will fail');
    }

    let rejectedPromise = usingPromiseCatch();
    rejectedPromise.catch((rejectValue) => {
        console.log(rejectValue);
    })

// This is sometimes used in the global scope to catch final errors in complex code.

    const cookBeanSouffle = require('./library.js');

// Example:
    async function hostDinnerParty() {
        try {
            let result = await cookBeanSouffle();
            console.log(`${result} is served!`)
        }
        catch (error) {
            console.log(error);
            console.log('Ordering a pizza!');
        }
    }

    hostDinnerParty();

//#endregion

//#region Handling Independent Promises 


// Remember that await halts the execution of our async function. 
// This allows us to conveniently write synchronous-style code to handle dependent promises. 
// But what if our async function contains multiple promises which are not dependent on the results of one another to execute?

    async function waiting() {
        const firstValue = await firstAsyncThing();
        const secondValue = await secondAsyncThing();
        console.log(firstValue, secondValue);
    }

    async function concurrent() {
        const firstPromise = firstAsyncThing();
        const secondPromise = secondAsyncThing();
        console.log(await firstPromise, await secondPromise);
    }

// In the waiting() function, we pause our function until the first promise resolves, then we construct the second promise. 
// Once that resolves, we print both resolved values to the console.

// In our concurrent() function, both promises are constructed without using await. 
// We then await each of their resolutions to print them to the console.

// With our concurrent() function both promises’ asynchronous operations can be run simultaneously. 
// If possible, we want to get started on each asynchronous operation as soon as possible! 
// Within our async functions we should still take advantage of concurrency, the ability to perform asynchronous actions at the same time.

// Note: if we have multiple truly independent promises that we would like to execute fully in parallel, 
// we must use individual .then() functions and avoid halting our execution with await.

// Ex:
    let { cookBeans, steamBroccoli, cookRice, bakeChicken } = require('./library.js')

    async function serveDinner() {
        const vegetablePromise = steamBroccoli();
        const starchPromise = cookRice();
        const proteinPromise = bakeChicken();
        const sidePromise = cookBeans();
        console.log(`Dinner is served. We're having ${await vegetablePromise}, ${await starchPromise}, ${await proteinPromise}, and ${await sidePromise}.`);
    }

    serveDinner();


//#endregion

//#region Await Promise.all() 


// Another way to take advantage of concurrency when we have multiple promises which can be executed simultaneously is to await a Promise.all().

// We can pass an array of promises as the argument to Promise.all(), and it will return a single promise. 
// This promise will resolve when all of the promises in the argument array have resolved. 
// This promise’s resolve value will be an array containing the resolved values of each promise from the argument array.

    async function asyncPromAll() {
        const resultArray = await Promise.all([asyncTask1(), asyncTask2(), asyncTask3(), asyncTask4()]);
        for (let i = 0; i < resultArray.length; i++) {
            console.log(resultArray[i]);
        }
    }

// In our above example, we await the resolution of a Promise.all(). 
// This Promise.all() was invoked with an argument array containing four promises (returned from required-in functions). 
// Next, we loop through our resultArray, and log each item to the console. 
// The first element in resultArray is the resolved value of the asyncTask1() promise, 
// the second is the value of the asyncTask2() promise, and so on.

// Promise.all() allows us to take advantage of asynchronicity— each of the four asynchronous tasks can process concurrently. 
// Promise.all() also has the benefit of failing fast, meaning it won’t wait for the rest of the asynchronous actions to complete once any one has rejected. 
// As soon as the first promise in the array rejects, the promise returned from Promise.all() will reject with that reason. 
// As it was when working with native promises, Promise.all() is a good choice if multiple asynchronous tasks are all required, 
// but none must wait for any other before executing.

// Ex:
    let { cookBeans, steamBroccoli, cookRice, bakeChicken } = require('./library.js')

    async function serveDinnerAgain() {
        const foodArray = await Promise.all([steamBroccoli(), cookRice(), bakeChicken(), cookBeans()]);
        console.log(
            `Dinner is served. We're having ${foodArray[0]}, ${foodArray[1]}, ${foodArray[2]}, and ${foodArray[3]}.`
        );
    }

    serveDinnerAgain();


//#endregion


//#endregion
    
//#region APIs and HTTP Requests 


//#region What is REST? 

// REST, or REpresentational State Transfer, is an architectural style for providing standards between computer systems on the web, 
// making it easier for systems to communicate with each other. 
// REST-compliant systems, often called RESTful systems, are characterized by how they are stateless and separate the concerns of client and server.

// Separation of Client and Server
// In the REST architectural style, the implementation of the client and the implementation of the server can be done independently without each knowing about the other. 
// This means that the code on the client side can be changed at any time without affecting the operation of the server, 
// and the code on the server side can be changed without affecting the operation of the client.

// As long as each side knows what format of messages to send to the other, they can be kept modular and separate. 
// Separating the user interface concerns from the data storage concerns, 
// we improve the flexibility of the interface across platforms and improve scalability by simplifying the server components. 
// Additionally, the separation allows each component the ability to evolve independently.

// By using a REST interface, different clients hit the same REST endpoints, perform the same actions, and receive the same responses.


//#endregion

//#region Statelessness 

// Systems that follow the REST paradigm are stateless, meaning that the server does not need to know anything about what state the client is in and vice versa. 
// In this way, both the server and the client can understand any message received, even without seeing previous messages. 
// This constraint of statelessness is enforced through the use of resources, rather than commands. 
// Resources are the nouns of the Web - they describe any object, document, or thing that you may need to store or send to other services.

// Because REST systems interact through standard operations on resources, they do not rely on the implementation of interfaces.

// These constraints help RESTful applications achieve reliability, quick performance, and scalability, as components that can be managed, 
// updated, and reused without affecting the system as a whole, even during operation of the system.

// Now, we’ll explore how the communication between the client and server actually happens when we are implementing a RESTful interface.

// Communication between Client and Server
// In the REST architecture, clients send requests to retrieve or modify resources, and servers send responses to these requests. 
// Let’s take a look at the standard ways to make requests and send responses.


//#endregion

//#region Making Requests 

// REST requires that a client make a request to the server in order to retrieve or modify data on the server. 
// A request generally consists of:
    // an HTTP verb, which defines what kind of operation to perform
    // a header, which allows the client to pass along information about the request
    // a path to a resource
    // an optional message body containing data

//#endregion

//#region HTTP Verbs 

// There are 4 basic HTTP verbs we use in requests to interact with resources in a REST system:
    // GET — retrieve a specific resource (by id) or a collection of resources
    // POST — create a new resource
    // PUT — update a specific resource (by id)
    // DELETE — remove a specific resource by id

//#endregion

//#region What is CRUD? 

// Headers and Accept parameters
// In the header of the request, the client sends the type of content that it is able to receive from the server. 
// This is called the Accept field, and it ensures that the server does not send data that cannot be understood or processed by the client. 
// The options for types of content are MIME Types (or Multipurpose Internet Mail Extensions, which you can read more about in the MDN Web Docs.

// MIME Types, used to specify the content types in the Accept field, consist of a type and a subtype. They are separated by a slash (/).

// For example, a text file containing HTML would be specified with the type text/html. 
// If this text file contained CSS instead, it would be specified as text/css. 
// A generic text file would be denoted as text/plain. This default value, text/plain, is not a catch-all, however. 
// If a client is expecting text/css and receives text/plain, it will not be able to recognize the content.

// Other types and commonly used subtypes:
    // image — image/png, image/jpeg, image/gif
    // audio — audio/wav, audio/mpeg
    // video — video/mp4, video/ogg
    // application — application/json, application/pdf, application/xml, application/octet-stream


// For example, a client accessing a resource with id 23 in an articles resource on a server might send a GET request like this:
    // GET /articles/23
    // Accept: text/html, application/xhtml

// The Accept header field in this case is saying that the client will accept the content in text/html or application/xhtml.

//#endregion

//#region Paths 

// Requests must contain a path to a resource that the operation should be performed on. 
// In RESTful APIs, paths should be designed to help the client know what is going on.

// Conventionally, the first part of the path should be the plural form of the resource. 
// This keeps nested paths simple to read and easy to understand.

// A path like fashionboutique.com/customers/223/orders/12 is clear in what it points to, 
// even if you’ve never seen this specific path before, because it is hierarchical and descriptive. 
// We can see that we are accessing the order with id 12 for the customer with id 223.

// Paths should contain the information necessary to locate a resource with the degree of specificity needed. 
// When referring to a list or collection of resources, it is not always necessary to add an id. 
// For example, a POST request to the fashionboutique.com/customers path would not need an extra identifier, 
// as the server will generate an id for the new object.

// If we are trying to access a single resource, we would need to append an id to the path. 
// For example:
    // GET fashionboutique.com/customers/:id — retrieves the item in the customers resource with the id specified. 
    // DELETE fashionboutique.com/customers/:id — deletes the item in the customers resource with the id specified.


//#endregion
    
//#region Sending Responses 

// Content Types
// In cases where the server is sending a data payload to the client, the server must include a content-type in the header of the response. 
// This content-type header field alerts the client to the type of data it is sending in the response body. 
// These content types are MIME Types, just as they are in the accept field of the request header. 
// The content-type that the server sends back in the response should be one of the options that the client specified in the accept field of the request.


// For example, when a client is accessing a resource with id 23 in an articles resource with this GET Request:
    // GET /articles/23 HTTP/1.1
    // Accept: text/html, application/xhtml

// The server might send back the content with the response header:
    // HTTP/1.1 200 (OK)
    // Content-Type: text/html


// This would signify that the content requested is being returned in the response body with a content-type of text/html, which the client said it would be able to accept.

//#endregion

//#region Response Codes 

// Responses from the server contain status codes to alert the client to information about the success of the operation. 
// As a developer, you do not need to know every status code (there are many of them), but you should know the most common ones and how they are used:

// Status code	Meaning
    // 200 (OK)	This is the standard response for successful HTTP requests.
    // 201 (CREATED)	This is the standard response for an HTTP request that resulted in an item being successfully created.
    // 204 (NO CONTENT)	This is the standard response for successful HTTP requests, where nothing is being returned in the response body.
    // 400 (BAD REQUEST)	The request cannot be processed because of bad request syntax, excessive size, or another client error.
    // 403 (FORBIDDEN)	The client does not have permission to access this resource.
    // 404 (NOT FOUND)	The resource could not be found at this time. It is possible it was deleted, or does not exist yet.
    // 500 (INTERNAL SERVER ERROR)	The generic answer for an unexpected failure if there is no more specific information available.

// For each HTTP verb, there are expected status codes a server should return upon success:
    // GET — return 200 (OK)
    // POST — return 201 (CREATED)
    // PUT — return 200 (OK)
    // DELETE — return 204 (NO CONTENT) If the operation fails, return the most specific status code possible corresponding to the problem that was encountered.

//#endregion

//#region Examples of Requests and Responses 

// Let’s say we have an application that allows you to view, create, edit, and delete customers and orders for a small clothing store hosted at fashionboutique.com. 
// We could create an HTTP API that allows a client to perform these functions:

// If we wanted to view all customers, the request would look like this:
    // GET http://fashionboutique.com/customers
    // Accept: application/json

// A possible response header would look like:
    // Status Code: 200 (OK)
    // Content-type: application/json

// followed by the customers data requested in application/json format.

// Create a new customer by posting the data:
    // POST http://fashionboutique.com/customers
    // Body:
    // {
    //     “customer”: {
    //     “name” = “Scylla Buss”,
    //     “email” = “scylla.buss@codecademy.org”
    //     }
    // }

// The server then generates an id for that object and returns it back to the client, with a header like:
    // 201 (CREATED)
    // Content-type: application/json

// To view a single customer we GET it by specifying that customer’s id:
    // GET http://fashionboutique.com/customers/123
    // Accept: application/json

// A possible response header would look like:
    // Status Code: 200 (OK)
    // Content-type: application/json

// followed by the data for the customer resource with id 23 in application/json format.

// We can update that customer by PUT ting the new data:
    // PUT http://fashionboutique.com/customers/123
    // Body:
    // {
    //     “customer”: {
    //     “name” = “Scylla Buss”,
    //     “email” = “scyllabuss1@codecademy.com”
    //     }
    // }

// A possible response header would have Status Code: 200 (OK), to notify the client that the item with id 123 has been modified.

// We can also DELETE that customer by specifying its id:
    // DELETE http://fashionboutique.com/customers/123

// The response would have a header containing Status Code: 204 (NO CONTENT), 
// notifying the client that the item with id 123 has been deleted, and nothing in the body.

//#endregion

//#region What is JSON? 

// JSON, or JavaScript Object Notation, is a popular, language-independent, standard format for storing and exchanging data. 
// Adopted by ECMA International, an industry association founded in 1961 to standardize information and communication systems, 
// JSON has become the de facto standard that facilitates storing and sending data between all programming languages.

// Common Uses of JSON
// JSON is heavily used to facilitate data transfer in web applications between a client, such as a web browser, and a server. 
// A typical example where such data transfer occurs is when you fill out a web form. 
// The form data is converted from HTML to JavaScript objects to JSON objects and sent to a remote web server for processing. 
// These transactions could be as simple as entering a search engine query to a multi-page job application.

// When companies make their data public for other applications, 
// like Spotify sharing its music library or Google sharing its map data, the information is formatted in JSON. 
// This way, any application, regardless of language, can collect and parse the data.

// Some of the popular web APIs that utilize JSON in data exchanges are:
    // Google Maps
    // Google Auth 2.0 Authentication
    // Facebook Social Graph API
    // Spotify Music Web API
    // LinkedIn Profile API

// JSON Syntax
// Since JSON is derived from the JavaScript programming language, its appearance is similar to that of JavaScript objects.

// A sample JSON object is represented as follows:
    {
        "student": {
            "name": "Rumaisa Mahoney",
            "age": 30,
            "fullTime": true,
            "languages": [ "JavaScript", "HTML", "CSS" ],
            "GPA": 3.9,
            "favoriteSubject": null
        }
    }

// Note the following syntax rules for JSON:
    // The curly braces, {..}, hold objects.
    // The square brackets, [..], hold arrays.
    // Data is stored in name-value pairs separated by a colon, :.
    // Every name-value pair is separated from another pair by a comma, ,. Similarly, every item in an array is delimited by a comma as well. Trailing commas are forbidden.
    // JSON property names must be in double-quoted (" ") text even though JavaScript names do not hold by this stringency.

// JSON Data Types
// A JSON data type must be one of the following:
    // string (double-quoted)
    // number (integer or floating point)
    // object (name-value pair)
    // array (comma-delimited)
    // boolean (true or false)
    // null

// Try to find all the data types in this JSON example:
    {
        "student": {
            "name": "Rumaisa Mahoney",
            "age": 30,
            "fullTime": true,
            "languages": [ "JavaScript", "HTML", "CSS" ],
            "GPA": 3.9,
            "favoriteSubject": null
        }
    }

// Notably, JSON doesn’t cover every data type. 
// Types that are not represented in JSON such as dates can be stored as a string and converted to a language-specific data structure. 
// Here’s an acceptable internationally-recognized date format in ISO 8601:
    "2014-01-01T23:28:56.782Z"

// This above format contains parts which resemble a date and time. 
// However, as a string, it is hard for a programming language to use as is. 
// Conveniently, every programming language has built-in JSON facilities to convert this string into a more readable and usable format, such as:
    // Wed Jan 01 2014 13:28:56 GMT-1000 (Hawaiian Standard Time)

// This pretty much covers the basic description of JSON, its popularity, and its syntax. Congratulations on reaching this milestone!

//#endregion

//#region Working with JSON in JavaScript 

// Introduction
// JSON, short for JavaScript Object Notation, is a language-independent data format that has been accepted as an industry standard. 
// Because it is based on the JavaScript programming language, JSON’s syntax looks similar to a JavaScript object with minor differences. 
// We’ll take a look at the subtle difference between them. Later on, we’ll learn how to parse JSON and extract its content as JavaScript. 
// Lastly, we’ll learn how to write a JSON object with JavaScript. So, let’s begin.

// JSON Object vs. JavaScript Object
// Here is an example JSON object of a person named Kate, who is 30 years old, and whose hobbies include reading, writing, cooking, and playing tennis:
    {
        "person": {  
            "name": "Kate",  
            "age": 30,  
            "hobbies": [ "reading", "writing", "cooking", "tennis" ] 
        }
    }

// Represented as a JavaScript object literal, the same information would appear as:
    {
        person: {
            name: 'Kate',
            age: 30,
            hobbies: ['reading', 'writing', 'cooking', 'tennis']
        }
    }

// Notice a slight difference between the two formats.
    // The name portion in each JSON name-value pair and all string values must be enclosed in double-quotes while this is optional in JavaScript.
    // JavaScript accepts string values that are single or double-quoted, however, there exists JavaScript coding guidelines that prefer one style over another.

// Reading a JSON String
// In a typical web application, the JSON data that we receive from a web request comes in the form of a string. 
// At other times, JSON data is stored in a file that is used for authentication, configuration, or database storage. 
// These files typically have a .json extension, and they have to be opened in order to retrieve the JSON string in it. 
// In either case, we will need to convert the string to a format that we can use in order to access its parts. 
// Each programming language has its own mechanism to handle this conversion. 
// In JavaScript, for example, we have a built-in JSON class with a method called .parse() that takes a JSON string as a parameter and returns a JavaScript object.

// The following code converts a JSON string object, jsonData, into a JavaScript object, jsObject, and logs jsObject on the console.

    const jsonData = '{ "book": { "name": "JSON Primer", "price": 29.99, "inStock": true, "rating": null } }';
    const jsObject = JSON.parse(jsonData);
    console.log(jsObject);

// This will print out jsObject as follows:
    // {
    //     book: { name: 'JSON Primer', price: 29.99, inStock: true, rating: null }
    // }

// Once we have converted a JSON object to a JavaScript object, we can access the individual properties inside the JavaScript object. 
// To access a value inside a JavaScript object based on its property name, we can either use dot notation, (.propertyName), or bracket notation, (['propertyName']).

// For instance, to retrieve the book property of jsObject we could do the following:
// Using the dot notation
    const book = jsObject.book;    
    console.log(book);
    console.log(book.name, book.price, book.inStock);
    
// Using the bracket notation
    const book2 = jsObject['book'];
    console.log(book2);
    console.log(book2["name"], book2["price"], book2["inStock"]);

// Both ways of accessing the book property return the same output:
// { name: 'JSON Primer', price: 29.99, inStock: true, rating: null }
// JSON Primer 29.99 true

// As you can see, after parsing jsonData into a JavaScript object that’s stored in the variable, book, you can treat book like any other object! 
// That means you can access property values, as shown above, edit existing values, iterate over the keys and values, etc…

// Writing a JSON String
// Before we can send off our data across the web, we need to convert them to a JSON string. 
// In JavaScript, we would use the built-in JSON class method, .stringify() to transform our JavaScript object to a JSON string.

// The following code converts a JavaScript object, jsObject, into a JSON string, jsonData.

    const jsObject = { book: 'JSON Primer', price: 29.99, inStock: true, rating: null };
    const jsonData = JSON.stringify(jsObject);
    console.log(jsonData);

// This will display the following output:
// { "book": "JSON Primer", "price": 29.99, "inStock": true, "rating": null }

//#endregion



//#endregion

//#region Requests with Fetch API 


//#region Intro to GET Requests using Fetch 

// The first type of requests we’re going to tackle is GET requests using fetch().

// The fetch() function:
    // Creates a request object that contains relevant information that an API needs.
    // Sends that request object to the API endpoint provided.
    // Returns a promise that ultimately resolves to a response object, which contains the status of the promise with information the API sent back.

// Let’s walk through the boilerplate code to the right for using fetch() to create a GET request step by step.
// First, call the fetch() function and pass it a URL as a string for the first argument, determining the endpoint of the request.

    fetch('https://api-to-call.com/endpoint');

// The .then() method is chained at the end of the fetch() function and in its first argument, the response of the GET request is passed to the callback arrow function. 
// The .then() method will fire only after the promise status of fetch() has been resolved.

// Inside the callback function, the ok property of the response object returns a Boolean value. 
// If there are no errors, response.ok will be true and the code will return response.json().

// If response.ok is a falsy value, our code will throw an error.
    throw new Error('Request failed!');

// A second argument passed to .then() will be another arrow function that will be triggered when the promise is rejected. 
// It takes a single parameter, networkError. 
// This object logs the networkError if we could not reach the endpoint at all (e.g., the server is down).

// A second .then() method will run after the previous .then() method has finished running without error. 
// It takes jsonResponse, which contains the returned response.json() object from the previous .then() method, as its parameter and can now be handled, however we may choose.



//#endregion

//#region Making a GET Request 

// In the previous exercise, we went over the boilerplate code for a GET request using fetch() and .then(). 
// In this exercise, we’re going to apply that code to access the Datamuse API and render the fetched information in the browser.

// The Datamuse API is a word-finding query engine for developers.
// It can be used in apps to find words that match a given set of constraints that are likely in a given context.

// If the request is successful, we’ll get back an array of words that sound like the word we typed into the input field.

// We may get some errors as we complete each step. 
// This is because sometimes we’ve split a single step into one or more steps to make it easier to follow. 
// By the end, we should be getting no errors.

// Information to reach API
    const url = "https://api.datamuse.com/words?sl=";

// Selects page elements
    const inputField = document.querySelector("#input");
    const submit = document.querySelector("#submit");
    const responseField = document.querySelector("#responseField");

// AJAX function
    const getSuggestions = () => {
        const wordQuery = inputField.value;
        const endpoint = url + wordQuery;
        fetch(endpoint, { cache: "no-cache" }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Request failed!");
            },
            (networkError) => {
                console.log(networkError.message);
            }
        );
    };

// Clears previous results and display results to webpage
    const displaySuggestions = (event) => {
        event.preventDefault();
        while (responseField.firstChild) {
            responseField.removeChild(responseField.firstChild);
        }
        getSuggestions();
    };

    submit.addEventListener("click", displaySuggestions);

//#endregion

//#region Handling a GET Request 

// In the previous exercise, we called the fetch() function to make a GET request to the Datamuse API endpoint. 
// Then, you chained a .then() method and passed two callback functions as arguments — one to handle the promise if it resolves, and one to handle network errors if the promise is rejected.

// In this exercise, we will chain another .then() method, which will allow us to take the information that was returned with the promise and manipulate the webpage! 
// Note that if there is an error returned in the first .then() method, the second .then() method will not execute.

// Information to reach API
const url = "https://api.datamuse.com/words?sl=";

// Selects page elements
    const inputField = document.querySelector("#input");
    const submit = document.querySelector("#submit");
    const responseField = document.querySelector("#responseField");

// Asynchronous function
    const getSuggestions = () => {
        const wordQuery = inputField.value;
        const endpoint = `${url}${wordQuery}`;

        fetch(endpoint, { cache: "no-cache" })
            .then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Request failed!");
                },
                (networkError) => {
                    console.log(networkError.message);
                }
            )
            .then((jsonResponse) => {
                //renderRawResponse(jsonResponse);
                renderResponse(jsonResponse);
            });
    };

// Clears previous results and display results to webpage
    const displaySuggestions = (event) => {
        event.preventDefault();
        while (responseField.firstChild) {
            responseField.removeChild(responseField.firstChild);
        }
        getSuggestions();
    };

    submit.addEventListener("click", displaySuggestions);

//#endregion

//#region Intro to POST Requests using Fetch 

// In the previous exercise, we successfully wrote a GET request using the fetch API and handled Promises to get word suggestions from Datamuse. 
// Now, we’re going to learn how to use fetch() to construct POST requests!
// Tthe fetch() call takes two arguments: an endpoint and an object that contains information needed for the POST request.

// The object passed to the fetch() function as its second argument contains two properties: 
// method, with a value of 'POST', and body, with a value of JSON.stringify({id: '200'});. 

// This second argument determines that this request is a POST request and what information will be sent to the API.
// A successful POST request will return a response body, which will vary depending on how the API is set up.
// The rest of the request is identical to the GET request. 
// A .then() method is chained to the fetch() function to check and return the response as well as throw an exception when a network error is encountered. 
// A second .then() method is added on so that we can use the response however we may choose.

// In this exercise, we’re going to use that boilerplate code to shorten a URL using the Rebrandly URL Shortener API.
// We will need a Rebrandly API key. To do this, read through the Rebrandly sign up guide to set up your API.
// Keep in mind, while it’s ok to use your API key in these exercises, you should not share your key with anyone (not even to ask a question in the forums)! 
// Also, if you reset the exercise at any point, you will have to paste in your API key again at the top.

// Information to reach API
    const apiKey = '<Your API Key>';
    const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
    const inputField = document.querySelector('#input');
    const shortenButton = document.querySelector('#shorten');
    const responseField = document.querySelector('#responseField');

// Asynchronous functions
    const shortenUrl = () => {
        const urlToShorten = inputField.value;
        const data = JSON.stringify({destination: urlToShorten});
        fetch(url, 
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'apikey': apiKey
                },
                body: data
            })
    }

// Clear page and call Asynchronous functions
    const displayShortUrl = (event) => {
        event.preventDefault();
        while(responseField.firstChild){
            responseField.removeChild(responseField.firstChild);
        }
        shortenUrl();
    }

    shortenButton.addEventListener('click', displayShortUrl);

//#endregion

//#region Handling a POST Request 

// The request returns a Promise which will either be resolved or rejected. 
// If the promise resolves, we can check and return that response. 
// We will chain another .then() method and handle the returned JSON object and display the information to our webpage.

// Let’s implement this knowledge into our code!
// Remember that if you reset the exercise at any point, you will have to paste in your API key again at the top!

// Information to reach API
    const apiKey = '<Your API Key>';
    const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
    const inputField = document.querySelector('#input');
    const shortenButton = document.querySelector('#shorten');
    const responseField = document.querySelector('#responseField');

// Asynchronous functions
    const shortenUrl = () => {
        const urlToShorten = inputField.value;
        const data = JSON.stringify({destination: urlToShorten});
        
        fetch(url,  {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'apikey': apiKey
                        },
                        body: data
                    })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            renderResponse(jsonResponse);
        })
    }

// Clear page and call Asynchronous functions
    const displayShortUrl = (event) => {
        event.preventDefault();
        while(responseField.firstChild){
            responseField.removeChild(responseField.firstChild);
        }
        shortenUrl();
    }

    shortenButton.addEventListener('click', displayShortUrl);





//#endregion

//#region Intro to async GET Requests 

// In the following exercises, we’re going to take what we’ve learned about chaining Promises and make it simpler using functionality introduced in ES8: async and await. 
// You read that right, you did the hard part already. 
// Now it’s time to make it easier.

// The structure for this request will be slightly different. We will use the new keywords async and await, as well as the try and catch statements.

// Here are some key points to keep in mind as we walk through the code:
    // The async keyword is used to declare an async function that returns a promise.
    // The await keyword can only be used within an async function. await suspends the program while waiting for a promise to resolve.
    // In a try...catch statement, code in the try block will be run and in the event of an exception, the code in the catch statement will run.

// Study the async getData() function to the right to see how the request can be written using async and await.

//#endregion

//#region Making an async GET Request 

// In this exercise, we’re going to apply the code to get nouns that describe the inputted word using the Datamuse API.

// Information to reach API
    const url = 'https://api.datamuse.com/words?';
    const queryParams = 'rel_jja=';

// Selecting page elements
    const inputField = document.querySelector('#input');
    const submit = document.querySelector('#submit');
    const responseField = document.querySelector('#responseField');

// Asynchronous function
    const getSuggestions = async () => {
        const wordQuery = inputField.value;
        const endpoint = url + queryParams + wordQuery;
        try {
            const response = await fetch(endpoint, { cache: 'no-cache' });
            if (response.ok) {
                const jsonResponse = await response.json();
                renderResponse(jsonResponse);
            }
        } catch (e.message) {
            console.log(e);
        }
    };

// Clear previous results and display results to webpage
    const displaySuggestions = (event) => {
        event.preventDefault();
        while (responseField.firstChild) {
            responseField.removeChild(responseField.firstChild)
        }
        getSuggestions();
    }

    submit.addEventListener('click', displaySuggestions);

//#endregion

//#region Intro to async POST Requests 

// Now that you’ve made an async GET request, let’s start getting familiar with the async POST request.
// As we’ve seen before, a POST request requires more information. 

// We still have the same structure of using try and catch as the async GET request we just learned about. 
// But, in the fetch() call, we now have to include an additional argument that contains more information like method and body.

// The method property value is set to 'POST' to specify the type of request we are making. 
// Then we have to include a body property with the value of JSON.stringify({id: 200}).

//#endregion

//#region Making an async POST Request 

// Since we’ve reviewed the boilerplate code for an async POST request, 
// the next step is to incorporate that logic into making a real request.
// In this exercise, we’ll need to retrieve our Rebrandly API key to access the Rebrandly API.
// We will then pass in the endpoint and the request object into the fetch() method to make our POST request.
// If you reset the exercise at any point, you will have to paste in your API key again at the top!

// information to reach API
    const apiKey = '<Your API Key>';
    const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
    const inputField = document.querySelector('#input');
    const shortenButton = document.querySelector('#shorten');
    const responseField = document.querySelector('#responseField');

// Asynchronous functions
    const shortenUrl = async () => {
        const urlToShorten = inputField.value;
        const data = JSON.stringify({ destination: urlToShorten });
        try {
            const response = await fetch(
                url,
                {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-type': 'application/json',
                        'apikey': apiKey
                    }
                }
            );
            if (response.ok) {
                const jsonResponse = await response.json();
                renderResponse(jsonResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

// Clear page and call Asynchronous functions
    const displayShortUrl = (event) => {
        event.preventDefault();
        while (responseField.firstChild) {
            responseField.removeChild(responseField.firstChild);
        }
        shortenUrl();
    }

    shortenButton.addEventListener('click', displayShortUrl);

//#endregion


//#endregion


//#endregion


//#endregion


//#region React 

//#region Destructuring with JavaScript

// Destructuring Arrays
    let cars = ['ferrari', 'tesla', 'cadillac'];
    let [car1, car2, car3] = cars;
    console.log(car1, car2, car3); // Prints: ferrari tesla cadillac

// Destructuring Objects
    let destinations = { x: 'LA', y: 'NYC', z: 'MIA' };
    let { x, y, z } = destinations;
    console.log(x, y, z); // Prints LA NYC MIA

// Destructuring Function Parameters
    let truck = {
        model: '1977 Mustang convertible',
        maker: 'Ford',
        city: 'Detroit',
        year: '1977',
        convertible: true
    };
       
    const printCarInfo = ({model, maker, city}) => {
        console.log(`The ${model}, or ${maker}, is in the city ${city}.`);
    };
       
    printCarInfo(truck);
    // Prints: The 1977 Mustang convertible, or Ford, is in the city Detroit.

//#endregion

//#region React: The Virtual DOM 

/*
The Problem
    DOM manipulation is the heart of the modern, interactive web. 
    Unfortunately, it is also a lot slower than most JavaScript operations.
    This slowness is made worse by the fact that most JavaScript frameworks update the DOM much more than they have to.
    As an example, let’s say that you have a list that contains ten items. You check off the first item. 
    Most JavaScript frameworks would rebuild the entire list. 
    That’s ten times more work than necessary! Only one item changed, but the remaining nine get rebuilt exactly how they were before.
    Rebuilding a list is no big deal to a web browser, but modern websites can use huge amounts of DOM manipulation. 
    Inefficient updating has become a serious problem.
    To address this problem, the people at React popularized something called the virtual DOM.

The Virtual DOM
    In React, for every DOM object, there is a corresponding “virtual DOM object.” 
    A virtual DOM object is a representation of a DOM object, like a lightweight copy.
    A virtual DOM object has the same properties as a real DOM object, 
    but it lacks the real thing’s power to directly change what’s on the screen.
    Manipulating the DOM is slow. Manipulating the virtual DOM is much faster, because nothing gets drawn onscreen. 
    Think of manipulating the virtual DOM as editing a blueprint, as opposed to moving rooms in an actual house.
    In React, for every DOM object, there is a corresponding “virtual DOM object.” 
    A virtual DOM object is a representation of a DOM object, like a lightweight copy.
    A virtual DOM object has the same properties as a real DOM object, 
    but it lacks the real thing’s power to directly change what’s on the screen.
    Manipulating the DOM is slow. 
    Manipulating the virtual DOM is much faster, because nothing gets drawn onscreen. 
    Think of manipulating the virtual DOM as editing a blueprint, as opposed to moving rooms in an actual house.

How it helps
    When you render a JSX element, every single virtual DOM object gets updated.
    This sounds incredibly inefficient, but the cost is insignificant because the virtual DOM can update so quickly.
    Once the virtual DOM has updated, then React compares the virtual DOM with a virtual DOM snapshot that was taken right before the update.
    By comparing the new virtual DOM with a pre-update version, React figures out exactly which virtual DOM objects have changed. 
    This process is called “diffing.”
    Once React knows which virtual DOM objects have changed, then React updates those objects, and only those objects, on the real DOM. 
    In our example from earlier, React would be smart enough to rebuild your one checked-off list-item, and leave the rest of your list alone.
    This makes a big difference! React can update only the necessary parts of the DOM. 
    React’s reputation for performance comes largely from this innovation.

In summary, here’s what happens when you try to update the DOM in React:
    - The entire virtual DOM gets updated.
    - The virtual DOM gets compared to what it looked like before you updated it. React figures out which objects have changed.
    - The changed objects, and the changed objects only, get updated on the real DOM.
    - Changes on the real DOM cause the screen to change


Extra Link: https://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/

*/

//#endregion

//#region Introduction to JSX 


//#region Why React? 

    // React.js is a JavaScript library. It was developed by engineers at Facebook.
    // Here are just a few of the reasons why people choose to program with React:
        // - React is fast. Apps made in React can handle complex updates and still feel quick and responsive.
        // - React is modular. Instead of writing large, dense files of code, you can write many smaller, reusable files. 
        //   React’s modularity can be a beautiful solution to JavaScript’s maintainability problems.
        // - React is scalable. Large programs that display a lot of changing data are where React performs best.
        // - React is flexible. You can use React for interesting projects that have nothing to do with making a web app. 
        //   People are still figuring out React’s potential. There’s room to explore.
        // - React is popular. While this reason has admittedly little to do with React’s quality, 
        //   the truth is that understanding React will make you more employable.

//#endregion

//#region What is JSX? 

    // JSX is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML.
    // What does “syntax extension” mean?
    // In this case, it means that JSX is not valid JavaScript. Web browsers can’t read it!
    // If a JavaScript file contains JSX code, then that file will have to be compiled. 
    // That means that before the file reaches a web browser, a JSX compiler will translate any JSX into regular JavaScript.

//#endregion

//#region JSX Elements 

    // A basic unit of JSX is called a JSX element.
    // Here’s an example of a JSX element:
    <h1>Hello world</h1>

    // This JSX element looks exactly like HTML! 
    // The only noticeable difference is that you would find it in a JavaScript file, instead of in an HTML file.

//#endregion

//#region JSX Elements And Their Surroundings 

    // JSX elements are treated as JavaScript expressions. 
    // They can go anywhere that JavaScript expressions can go.
    // That means that a JSX element can be saved in a variable, passed to a function, stored in an object or array…you name it.

    // Here’s an example of a JSX element being saved in a variable:

    const navBar = <nav>I am a nav bar</nav>;

    // Here’s an example of several JSX elements being stored in an object:

    const myTeam = {
        center: <li>Benzo Walli</li>,
        powerForward: <li>Rasha Loa</li>,
        smallForward: <li>Tayshaun Dasmoto</li>,
        shootingGuard: <li>Colmar Cumberbatch</li>,
        pointGuard: <li>Femi Billon</li>
    };

//#endregion

//#region Attributes In JSX 

    // JSX elements can have attributes, just like HTML elements can.
    // A JSX attribute is written using HTML-like syntax: a name, followed by an equals sign, followed by a value. 
    // The value should be wrapped in quotes, like this:

    my-attribute-name="my-attribute-value"

    // Here are some JSX elements with attributes:
    <a href='http://www.example.com'>Welcome to the Web</a>;
    const title = <h1 id='title'>Introduction to React.js: Part I</h1>; 

    // A single JSX element can have many attributes, just like in HTML:
    const panda = <img src='images/panda.jpg' alt='panda' width='500px' height='500px' />;

//#endregion

//#region Nested JSX 

    // You can nest JSX elements inside of other JSX elements, just like in HTML.
    // Here’s an example of a JSX <h1> element, nested inside of a JSX <a> element:

    <a href="https://www.example.com"><h1>Click me!</h1></a>

    // To make this more readable, you can use HTML-style line breaks and indentation:

    <a href="https://www.example.com">
        <h1>
            Click me!
        </h1>
    </a>

    // If a JSX expression takes up more than one line, then you must wrap the multi-line JSX expression in parentheses. 
    // This looks strange at first, but you get used to it:

    (
        <a href="https://www.example.com">
            <h1>
                Click me!
            </h1>
        </a>
    )

    // Nested JSX expressions can be saved as variables, passed to functions, etc., just like non-nested JSX expressions can! 
    // Here’s an example of a nested JSX expression being saved as a variable:

    const theExample = (
        <a href="https://www.example.com">
            <h1>
            Click me!
            </h1>
        </a>
    );

//#endregion

//#region JSX Outer Elements 

    // There’s a rule that we haven’t mentioned: a JSX expression must have exactly one outermost element.
    // In other words, this code will work:

    const paragraphs = (
        <div id="i-am-the-outermost-element">
            <p>I am a paragraph.</p>
            <p>I, too, am a paragraph.</p>
        </div>
    );

    // But this code will not work:

    const paragraphs = (
        <p>I am a paragraph.</p> 
        <p>I, too, am a paragraph.</p>
    );

    // The first opening tag and the final closing tag of a JSX expression must belong to the same JSX element!
    // It’s easy to forget about this rule, and end up with errors that are tough to diagnose.
    // If you notice that a JSX expression has multiple outer elements, the solution is usually simple: wrap the JSX expression in a <div></div>.

//#endregion

//#region Rendering JSX 

    import React from 'react';
    import ReactDOM from 'react-dom';

    ReactDOM.render(<h1>Hello world</h1>, document.getElementById('app'));

    // Let’s examine the code that you just wrote in the last exercise.

    // You can see something called ReactDOM. What’s that?
    // ReactDOM is the name of a JavaScript library. 
    // This library contains several React-specific methods, all of which deal with the DOM in some way or another.
    // Move slightly to the right, and you can see one of ReactDOM‘s methods: ReactDOM.render().

    // ReactDOM.render() is the most common way to render JSX. 
    // It takes a JSX expression, creates a corresponding tree of DOM nodes, and adds that tree to the DOM. 
    // That is the way to make a JSX expression appear onscreen.

    // Move to the right a little more, and you come to this expression:
       <h1>Hello world</h1>

    // This is the first argument being passed to ReactDOM.render(). 
    // ReactDOM.render()‘s first argument should be a JSX expression, and it will be rendered to the screen.

    // Move to the right a little more, and you will see this expression:
        document.getElementById('app')

    // You just learned that ReactDOM.render() makes its first argument appear onscreen. 
    // But where on the screen should that first argument appear?
    // The first argument is appended to whatever element is selected by the second argument.
    // In the code editor, select index.html. 
    // See if you can find an element that would be selected by document.getElementById('app').
    // That element acted as a container for ReactDOM.render()‘s first argument! 

    // At the end of the previous exercise, this appeared on the screen:
        <main id="app">
            <h1>Render me!</h1>
        </main>

//#endregion

//#region Passing a Variable to ReactDOM.render()

    // ReactDOM.render()‘s first argument should evaluate to a JSX expression, it doesn’t have to literally be a JSX expression.
    // The first argument could also be a variable, so long as that variable evaluates to a JSX expression.
    // In this example, we save a JSX expression as a variable named toDoList. 
    // We then pass toDoList as the first argument to ReactDOM.render():

    const toDoList = (
        <ol>
            <li>Learn React</li>
            <li>Become a Developer</li>
        </ol>
    );
    
    ReactDOM.render(
        toDoList, 
        document.getElementById('app')
    );


//#endregion

//#region The Virtual DOM 

    // One special thing about ReactDOM.render() is that it only updates DOM elements that have changed.
    // That means that if you render the exact same thing twice in a row, the second render will do nothing:
    // const hello = <h1>Hello world</h1>;
    
    // This will add "Hello world" to the screen:
    ReactDOM.render(hello, document.getElementById('app'));
    
    // This won't do anything at all:
    ReactDOM.render(hello, document.getElementById('app'));

    // This is significant! Only updating the necessary DOM elements is a large part of what makes React so successful.
    // React accomplishes this thanks to something called the virtual DOM. 

//#endregion


//#endregion

//#region Advanced JSX 


//#region class vs className 

    // Grammar in JSX is mostly the same as in HTML, but there are subtle differences to watch out for. Probably the most frequent of these involves the word class.
    // In HTML, it’s common to use class as an attribute name:
    <h1 class="big">Hey</h1>

    // In JSX, you can’t use the word class! You have to use className instead:
    <h1 className="big">Hey</h1>

    // This is because JSX gets translated into JavaScript, and class is a reserved word in JavaScript.
    // When JSX is rendered, JSX className attributes are automatically rendered as class attributes.

//#endregion

//#region Self-Closing Tags 

    // Another JSX ‘gotcha’ involves self-closing tags.

    // What’s a self-closing tag?
        // Most HTML elements use two tags: an opening tag (<div>), and a closing tag (</div>). 
        // However, some HTML elements such as <img> and <input> use only one tag. 
        // The tag that belongs to a single-tag element isn’t an opening tag nor a closing tag; it’s a self-closing tag.

    // When you write a self-closing tag in HTML, it is optional to include a forward-slash immediately before the final angle-bracket:

    // Fine in HTML with a slash:
    // <br />
    // Also fine, without the slash:
    // <br>
    
    // But! In JSX, you have to include the slash. 
    // If you write a self-closing tag in JSX and forget the slash, you will raise an error:

    // Fine in JSX:
    // <br />
    // NOT FINE AT ALL in JSX:
    // <br>

//#endregion

//#region Curly Braces in JSX

    // Any code in between the tags of a JSX element will be read as JSX, not as regular JavaScript! 
    // JSX doesn’t add numbers - it reads them as text, just like HTML.
    // You need a way to write code that says, “Even though I am located in between JSX tags, treat me like ordinary JavaScript and not like JSX.”
    // You can do this by wrapping your code in curly braces.

    import React from 'react';
    import ReactDOM from 'react-dom';
    
    // Write code here:
    ReactDOM.render(
        <h1>{2 + 3}</h1>, document.getElementById('app')
    );

//#endregion

//#region Variables in JSX 

    // When you inject JavaScript into JSX, that JavaScript is part of the same environment as the rest of the JavaScript in your file.
    // That means that you can access variables while inside of a JSX expression, even if those variables were declared on the outside.

    // Declare a variable:
    const name = 'Gerdo';
    
    // Access your variable 
    // from inside of a JSX expression:
    const greeting = <p>Hello, {name}!</p>;

//#endregion

//#region Variable Attributes in JSX 

    // When writing JSX, it’s common to use variables to set attributes.
    // Here’s an example of how that might work:

    // Use a variable to set the `height` and `width` attributes:
    const sideLength = "200px";
    
    const panda = (
        <img 
            src="images/panda.jpg" 
            alt="panda" 
            height={sideLength} 
            width={sideLength} 
        />
    );

    // Notice how in this example, the <img />‘s attributes each get their own line. 
    // This can make your code more readable if you have a lot of attributes on one element.
    // Object properties are also often used to set attributes:

    const pics = {
        panda: "http://bit.ly/1Tqltv5",
        owl: "http://bit.ly/1XGtkM3",
        owlCat: "http://bit.ly/1Upbczi"
    }; 
    
    const panda = (
        <img 
            src={pics.panda} 
            alt="Lazy Panda" 
        />
    );
    
    const owl = (
        <img 
            src={pics.owl} 
            alt="Unimpressed Owl" 
        />
    );
    
    const owlCat = (
        <img 
            src={pics.owlCat} 
            alt="Ghastly Abomination"
        />
    ); 


//#endregion

//#region Event Listeners in JSX 

    // JSX elements can have event listeners, just like HTML elements can. 
    // Programming in React means constantly working with event listeners.
    // You create an event listener by giving a JSX element a special attribute. 
    
    // Here’s an example:
    <img onClick={myFunc} />

    // An event listener attribute’s name should be something like onClick or onMouseOver: 
    // the word on, plus the type of event that you’re listening for. 
    // You can see a list of valid event names here.

    // An event listener attribute’s value should be a function. 
    // The above example would only work if myFunc were a valid function that had been defined elsewhere:

    function myFunc() {
        alert('Make myFunc the pFunc... omg that was horrible i am so sorry');
    }
    
    <img onClick={myFunc} />

    // Note that in HTML, event listener names are written in all lowercase, such as onclick or onmouseover. 
    // In JSX, event listener names are written in camelCase, such as onClick or onMouseOver.

//#endregion

//#region JSX Conditionals: If Statements That Don't Work 

    // Here’s a rule that you need to know: you can not inject an if statement into a JSX expression.
    // This code will break:

    // (
    //     <h1>
    //         {
    //             if (purchase.complete) {
    //                 'Thank you for placing an order!'
    //             }
    //         }
    //     </h1>
    // )

    // The reason why has to do with the way that JSX is compiled. 
    // You don’t need to understand the mechanics of it for now, but if you’re interested then you can learn more in the React documentation.

    // What if you want a JSX expression to render, but only under certain circumstances? 
    // You can’t inject an if statement. 

    // What can you do?
    // How can you write a conditional, if you can’t inject an if statement into JSX?
    // Well, one option is to write an if statement, and not inject it into JSX.

    import React from 'react';
    import ReactDOM from 'react-dom';

    let message;

    if (user.age >= drinkingAge) {
        message = (
            <h1>Hey, check out this alcoholic beverage!</h1>
        );
    } else {
        message = (
            <h1>Hey, check out these earrings I got at Claire's!</h1>
        );
    }

    ReactDOM.render( message, document.getElementById('app'));

//#endregion

//#region JSX Conditionals: The Ternary Operator 

    // There’s a more compact way to write conditionals in JSX: the ternary operator.
    // The ternary operator works the same way in React as it does in regular JavaScript. 
    // However, it shows up in React surprisingly often.

    // Recall how it works: you write x ? y : z, where x, y, and z are all JavaScript expressions. 
    // When your code is executed, x is evaluated as either “truthy” or “falsy.” If x is truthy, then the entire ternary operator returns y. 
    // If x is falsy, then the entire ternary operator returns z. Here’s a nice explanation if you need a refresher.

    // Here’s how you might use the ternary operator in a JSX expression:

    const headline = (
        <h1>
            { age >= drinkingAge ? 'Buy Drink' : 'Do Teen Stuff' }
        </h1>
    );

    // In the above example, if age is greater than or equal to drinkingAge, then headline will equal <h1>Buy Drink</h1>. 
    // Otherwise, headline will equal <h1>Do Teen Stuff</h1>.

    import React from 'react';
    import ReactDOM from 'react-dom';

    function coinToss () {
        // Randomly return either 'heads' or 'tails'.
        return Math.random() < 0.5 ? 'heads' : 'tails';
    }

    const pics = {
        kitty: 'https://content.codecademy.com/courses/React/react_photo-kitty.jpg',
        doggy: 'https://content.codecademy.com/courses/React/react_photo-puppy.jpeg'
    };

    const img = <img src={pics[coinToss() === 'heads' ? 'kitty' : 'doggy']} />;

    ReactDOM.render(
        img, 
        document.getElementById('app')
    );

//#endregion

//#region JSX Conditionals: && 

    // We’re going to cover one final way of writing conditionals in React: the && operator.
    // Like the ternary operator, && is not React-specific, but it shows up in React surprisingly often.
    // In the last two lessons, you wrote statements that would sometimes render a kitty and other times render a doggy. 
    // && would not have been the best choice for those lessons.
    // && works best in conditionals that will sometimes do an action, but other times do nothing at all.

    // Here’s an example:

    const tasty = (
        <ul>
            <li>Applesauce</li>
            { !baby && <li>Pizza</li> }
            { age > 15 && <li>Brussels Sprouts</li> }
            { age > 20 && <li>Oysters</li> }
            { age > 25 && <li>Grappa</li> }
        </ul>
    );

    // If the expression on the left of the && evaluates as true, then the JSX on the right of the && will be rendered. 
    // If the first expression is false, however, then the JSX to the right of the && will be ignored and not rendered.


    import React from 'react';
    import ReactDOM from 'react-dom';

    // judgmental will be true half the time.
    const judgmental = Math.random() < 0.5;

    const favoriteFoods = 
    (
        <div>
            <h1>My Favorite Foods</h1>
            <ul>
            <li>Sushi Burrito</li>
            <li>Rhubarb Pie</li>
            {!judgmental && <li>Nacho Cheez Straight Out The Jar</li>}
            <li>Broiled Grapefruit</li>
            </ul>
        </div>
    );

    ReactDOM.render(
        favoriteFoods, 
        document.getElementById('app')
    );

//#endregion

//#region .map in JSX 

    // The array method .map() comes up often in React. 
    // It’s good to get in the habit of using it alongside JSX.

    // If you want to create a list of JSX elements, then .map() is often your best bet. 
    // It can look odd at first:

    const strings = ['Home', 'Shop', 'About Me'];
    const listItems = strings.map(string => <li>{string}</li>);
    <ul>{listItems}</ul>

    // In the above example, we start out with an array of strings. 
    // We call .map() on this array of strings, and the .map() call returns a new array of <li>s.

    // On the last line of the example, note that {listItems} will evaluate to an array, because it’s the returned value of .map()! 
    // JSX <li>s don’t have to be in an array like this, but they can be.
    // This is fine in JSX, not in an explicit array:
    
    <ul>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
    </ul>
    
    // This is also fine!
    
    const liArray = [
        <li>item 1</li>, 
        <li>item 2</li>, 
        <li>item 3</li>
    ];
    
    <ul>{liArray}</ul>

//#endregion

//#region Keys 

    // When you make a list in JSX, sometimes your list will need to include something called keys:

    <ul>
        <li key="li-01">Example1</li>
        <li key="li-02">Example2</li>
        <li key="li-03">Example3</li>
    </ul>

    // A key is a JSX attribute. 
    // The attribute’s name is key. 
    // The attribute’s value should be something unique, similar to an id attribute.
    // Keys don’t do anything that you can see! 
    // React uses them internally to keep track of lists. 
    // If you don’t use keys when you’re supposed to, React might accidentally scramble your list-items into the wrong order.

    // Not all lists need to have keys. 
        // 1. A list needs keys if either of the following are true:
        //    The list-items have memory from one render to the next. 
        //    For instance, when a to-do list renders, each item must “remember” whether it was checked off. 
        //    The items shouldn’t get amnesia when they render.

        // 2. A list’s order might be shuffled. 
        //    For instance, a list of search results might be shuffled from one render to the next.

    // If neither of these conditions are true, then you don’t have to worry about keys. 
    // If you aren’t sure then it never hurts to use them!

//#endregion

//#region React.createElement 

    // You can write React code without using JSX at all!
    // The majority of React programmers do use JSX, and we will use it for the remainder of this tutorial, 
    // but you should understand that it is possible to write React code without it.

    // The following JSX expression:

    const h1 = <h1>Hello world</h1>;

    // can be rewritten without JSX, like this:

    const h1 = React.createElement(
        "h1",
        null,
        "Hello world"
    );

    // When a JSX element is compiled, the compiler transforms the JSX element into the method that you see above: React.createElement(). 
    // Every JSX element is secretly a call to React.createElement().
    // We won’t go in-depth into how React.createElement() works, but you can start with the documentation if you’d like to learn more!

//#endregion

//#region Animal Fun Facts Project JSX


//#region app.js 

    import { animals } from "./animals";
    import React from "react";
    import ReactDOM from "react-dom";

    const title = "";
    const background = (
        <img className="background" alt="ocean" src="/images/ocean.jpg" />
    );


    const images = [];
    for (const animal in animals) {
        images.push(
            <img
                key = {animal}
                className = 'animal'
                alt = {animal}
                src = {animals[animal].image}
                aria-label = {animal}
                role = 'button'
                onClick = {displayFact}
            />
        )
    };

    function displayFact(e) {
        const facts = animals[e.target.alt].facts;
        const randomFactIndex = Math.floor(Math.random() * facts.length)
        const fact = facts[randomFactIndex];
        document.getElementById('fact').innerHTML = fact;
    }

    const animalFacts = (
        <div>
            <h1>{title === '' ? 'Click an animal for a fun fact' : title}</h1>
            {background}
            <img
                className='background'
                alt='ocean'
                src='/images/ocean.jpg' 
            />
            <div className='animals'>{images}</div>
            <p id='fact'></p>
        </div>
    );

    ReactDOM.render(animalFacts, document.getElementById("root"));

//#endregion

//#region animals.js 

    export const animals = {
        dolphin: {
            image: '/images/dolphin.jpg',
            facts: ['Dolphins have been shown to give distinct names to each other!', 'Dolphins are known to display their own culture!', 'Dolphins have two stomachs!']
        },
        lobster: {
            image: '/images/lobster.jpg',
            facts: ['Lobsters taste with their legs!', 'Lobsters chew with their stomachs!', 'Lobsters can live as long as 100 years.']
        },
        starfish: {
            image: '/images/starfish.jpg',
            facts: ['Starfish can have up to 40 arms!', 'Starfish have no brain and no blood!', 'Starfish can regenerate their own arms!']
        }
    };

//#endregion

//#region index.html 

    < !DOCTYPE html >
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <link rel="stylesheet" href="./styles.css" />
            </head>
            <body>
                <div id="root"></div>
                <script src="https://content.codecademy.com/courses/React/react-course-bundle.min.js"></script>
                <script src="/app.compiled.js"></script>
            </body>
        </html>

//#endregion


//#endregion


//#endregion

//#region React Components 

    //#region Introduction to React Components

        // React applications are made out of components.
        // What’s a component?
        // A component is a small, reusable chunk of code that is responsible for one job. 
        // That job is often to render some HTML.

        // Take a look at the code below. 
        // This code will create and render a new React component:

        import React from 'react';
        import ReactDOM from 'react-dom';
        
        class MyComponentClass extends React.Component {
            render() {
                return <h1>Hello world</h1>;
            }
        };
        
        ReactDOM.render(
            <MyComponentClass />,
            document.getElementById('app')
        );

        // A lot of that code is probably unfamiliar. 
        // However, you can recognize some JSX in there, as well as ReactDOM.render().

        // We are going to unpack that code, one small piece at a time. 
        // By the end of this lesson, you’ll understand how to build a React component!

        // A note from the Curriculum Developers: In this course, we teach both class components and function components. 
        // We start with class components because they are still widely used in legacy code, 
        // are common in tutorials/documentation found online, and are required for a few specific use-cases. 
        // In the module on Hooks, we introduce function components which are the recommended way of creating React components. 
        // From that point on, we use function components throughout the remainder of our React content.

        // To make a React component, you write a JSX element. 
        // Instead of naming your JSX element something like h1 or div like you’ve done before, give it the same name as a component class. 
        // Voilà, there’s your component instance!

        // JSX elements can be either HTML-like, or component instances. 
        // JSX uses capitalization to distinguish between the two! 
        // That is the React-specific reason why component class names must begin with capital letters. 
        // In a JSX element, that capitalized first letter says, “I will be a component instance and not an HTML tag.”

        // ReactDOM.render() will tell <MyComponentClass /> to call its render method.
        // <MyComponentClass /> will call its render method, which will return the JSX element <h1>Hello world</h1>. 
        // ReactDOM.render() will then take that resulting JSX element, and add it to the virtual DOM. 
        // This will make “Hello world” appear on the screen.


    //#endregion

    //#region Components and Advanced JSX 

        //#region Put Logic in a Render Function 

            // A render() function must have a return statement. However, that isn’t all that it can have.
            // A render() function can also be a fine place to put simple calculations that need to happen right before a component renders. 
            // Here’s an example of some calculations inside of a render function:

                class Random extends React.Component {
                    render() {
                        // First, some logic that must happen
                        // before rendering:
                        const n = Math.floor(Math.random() * 10 + 1);
                        // Next, a return statement
                        // using that logic:
                        return <h1>The number is {n}!</h1>;
                    }
                }

            // Watch out for this common mistake:

                class Random extends React.Component {
                    // This should be in the render function:
                    const n = Math.floor(Math.random() * 10 + 1);
                    
                    render() {
                        return <h1>The number is {n}!</h1>;
                    }
                };
            // In the above example, the line with the const n declaration will cause a syntax error, 
            // as it should not be part of the class declaration itself, but should occur in a method like render().

        //#endregion

        //#region Use a Conditional in a Render Function 

            // How might you use a conditional statement inside of a render() function?
            // Notice that the if statement is located inside of the render function, but before the return statement. 
            // This is pretty much the only way that you will ever see an if statement used in a render function.

            import React from 'react';
            import ReactDOM from 'react-dom';

            class TodaysPlan extends React.Component {
                render() {
                    let task;
                    if (!apocalypse) {
                        task = 'learn React.js'
                    } else {
                        task = 'run around'
                    }

                    return <h1>Today I am going to {task}!</h1>;
                }
            }

            ReactDOM.render(
                <TodaysPlan />,
                document.getElementById('app')
            );

        //#endregion

        //#region Use this in a Component 

            // The word this gets used in React a lot!
            // You are especially likely to see this inside of the body of a component class declaration. 
            // Here’s an example:

            class IceCreamGuy extends React.Component {
                get food() {
                    return 'ice cream';
                }
                
                render() {
                    return <h1>I like {this.food}.</h1>;
                }
            }

            // In the code, what does this mean?
            // The simple answer is that this refers to an instance of IceCreamGuy. 
            // The less simple answer is that this refers to the object on which this‘s enclosing method, in this case .render(), is called. 
            // It is almost inevitable that this object will be an instance of IceCreamGuy, but technically it could be something else.

            // Let’s assume that this refers to an instance of your component class, as will be the case in all examples in this course. 
            // IceCreamGuy has two methods: .food and .render(). 
            // Since this will evaluate to an instance of IceCreamGuy, this.food will evaluate to a call of IceCreamGuy‘s .food method. 
            // This method will, in turn, evaluate to the string “ice cream.”

            // Why don’t you need parentheses after this.food? Shouldn’t it be this.food()?
            // You don’t need those parentheses because .food is a getter method. 
            // You can tell this from the get in the above class declaration body.

            // There’s nothing React-specific about getter methods, nor about this behaving in this way! 
            // However, in React you will see this used in this way almost constantly.

        //#endregion

        //#region Use an Event Listener in a Component 

            // Render functions often contain event listeners. 
            // Here’s an example of an event listener in a render function:

            render() {
                return (
                    <div onHover={myFunc}></div>
                );
            }

            // Recall that an event handler is a function that gets called in response to an event. 
            // In the above example, the event handler is myFunc().

            // In React, you define event handlers as methods on a component class. 
            // Like this:

            class MyClass extends React.Component {
                myFunc() {
                    alert('Stop it.  Stop hovering.');
                }
                
                render() {
                    return (
                        <div onHover={this.myFunc}></div>
                    );
                }
            }

            // Notice that the component class has two methods: .myFunc() and .render(). 
            // .myFunc() is being used as an event handler. 
            // .myFunc() will be called any time that a user hovers over the rendered <div></div>.

        //#endregion

    //#endregion

    //#region Authorization Form Project

        import React from "react";
        import ReactDOM from "react-dom";

        class Contact extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    password: "swordfish",
                    authorized: false,
                };
                this.authorize = this.authorize.bind(this);
            }

            authorize(e) {
                const password = e.target.querySelector('input[type="password"]').value;
                const auth = password == this.state.password;
                this.setState({
                    authorized: auth,
                });
            }

            render() {
                const login = (
                    <form action="#" onSubmit={this.authorize}>
                        <input type="password" placeholder="Password" />
                        <input type="submit" />
                    </form>
                );

                const contactInfo = (
                    <ul>
                        <li>client@example.com</li>
                        <li>555.555.5555</li>
                    </ul>
                );

                return (
                    <div id="authorization">
                        <h1>{!this.state.authorized ? "Enter the Password" : "Contact"}</h1>
                        {this.state.authorized ? contactInfo : login}
                    </div>
                );
            }
        }

        ReactDOM.render(<Contact />, document.getElementById("app"));

    //#endregion

    //#region Creating a React App 


    //#region 1. Setting Up the Boilerplate Application 

        // When you install Node, you automatically get npm installed on your computer as well. 
        // However, npm is a separate project from Node.js, and tends to update more frequently. 
        // As a result, even if you’ve just installed Node (and therefore npm), it’s a good idea to update your npm. 
        // Luckily, npm knows how to update itself!

        // To upgrade to the latest version of npm on *nix (OSX, Linux, etc.), you can run this command in your terminal:
        // sudo npm install -g npm@latest

        // It is possible to manually create a React app, 
        // but Facebook has created a Node package create-react-app to generate a boilerplate version of a React application.
        // Besides providing something that works out-of-the-box, 
        // this has the added benefit of providing a consistent structure for React apps that you will recognize as you move between React projects. 
        // It also provides an out-of-the-box build script and development server.

        // We will use npx, a package runner tool that comes with npm 5.2+ and higher, to install and run create-react-app. 
        // This will ensure that the latest version of create-react-app is used.
        // Open up your terminal.
        // If you’ve never installed create-react-app before, you can simply run this command:
        // npx create-react-app myfirstreactapp

    //#endregion

    //#region 2. React App Structure 

        /*
            myfirstreactapp
            ├── node_modules
            ├── public
            │   ├── favicon.ico
            │   ├── index.html
            │   ├── logo192.png
            │   ├── logo512.png
            │   ├── manifest.json
            │   └── robots.txt
            ├── src
            │   ├── App.css
            │   ├── App.js
            │   ├── App.test.js
            │   ├── index.css
            │   ├── index.js
            │   ├── logo.svg
            │   ├── serviceWorker.js
            │   └── setupTests.js
            ├── .gititgnore
            ├── package.json
            ├── package-lock.json
            └── README.md
        */

        // create-react-app has taken care of setting up the main structure of the application as well as a couple of developer settings. 
        // Most of what you see will not be visible to the visitor of your web app. 
        // React uses a tool called webpack which transforms the directories and files here into static assets. 
        // Visitors to your site are served those static assets.

        // Don’t worry if you don’t understand too much about webpack for now. 
        // One of the benefits of using create-react-app to set up our React application is that 
        // we’re able to bypass any sort of manual configuration for webpack.

        // .gitignore
        // This is the standard file used by the source control tool git to determine which files and directories to ignore when committing code. 
        // While this file exists, create-react-app did not create a git repo within this folder. 
        // If you take a look at the file, it has taken care of ignoring a number of items (even .DS_Store for Mac users):

        // package.json
        // This file outlines all the settings for the React app.
        // - name: is the name of your app
        // - version: is the current version
        // - "private": true is a failsafe setting to avoid accidentally publishing your app as a public package within the npm ecosystem.
        // - dependencies: contains all the required Node modules and versions required for the application. 
        // - scripts: specifies aliases that you can use to access some of the react-scripts commands in a more efficient manner. 
        
        // node_modules
        // This directory contains dependencies and sub-dependencies of packages used by the current React app, 
        // as specified by package.json. 
        // If you take a look, you may be surprised by how many there are.
        // Running ls -1 | wc -l within the node_modules/ directory will yield more than 800 subfolders. 
        // This folder is automatically added to the .gitignore for good reason! 
        // Don’t worry, even with all these dependencies, 
        // the basic app will only be around 50 KB after being minified and compressed for production.

        // package-lock.json
        // This file contains the exact dependency tree installed in node_modules/. 
        // This provides a way for teams working on private apps to ensure that they have the same version of dependencies and sub-dependencies. 
        // It also contains a history of changes to package.json, so you can quickly look back at dependency changes.

        // public
        // This directory contains assets that will be served directly without additional processing by webpack. 
        // index.html provides the entry point for the web app. 
        // You will also see a favicon (header icon) and a manifest.json.
        // The manifest file configures how your web app will behave if it is added to an Android user’s home screen 
        // (Android users can “shortcut” web apps and load them directly from the Android UI). 
        // You can read more about it here.

        // src
        // This contains the JavaScript that will be processed by webpack and is the heart of the React app. 
        // Browsing this folder, you see the main App JavaScript component (App.js), 
        // its associated styles (App.css), and test suite (App.test.js). 
        // index.js and its styles (index.css) provide an entry into the App and also kick off the registerServiceWorker.js. 
        // This service worker takes care of caching and updating files for the end-user. 
        // It allows for offline capability and faster page loads after the initial visit. 

        // As your React app grows, it is common to add a components/ directory to organize components and component-related files 
        // and a views/ directory to organize React views and view-related files.

    //#endregion

    //#region 3. Starting the React App Development Server 

        // As was stated in the success message when you ran create-react-app, 
        // you just need to run npm start in your app directory to begin serving the development server. 
        // It should auto-open a tab in your browser that points to http://localhost:3000/ (if not, manually visit that address). 

        // As stated, any changes to the source code will live-update here. 
        // Let’s see that in action.
        // Leave the current terminal tab running (it’s busy serving the React app) and open src/App.js in your favorite text editor.
        // You’ll see what looks like a mashup of JavaScript and HTML. 
        // This is JSX, which is how React adds XML syntax to JavaScript. 
        // It provides an intuitive way to build React components and is compiled to JavaScript at runtime. 
        // We’ll delve deeper into this in other content, but for now, let’s make a simple edit and see the update in the browser.

    //#endregion


    //#endregion

//#endregion

//#region Components Interacting 


//#region Components Render Other Components

    // ProfilePage.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { NavBar } from './NavBar';

    class ProfilePage extends React.Component {
        render() {
            return (
                <div>
                    <NavBar />
                    <h1>All About Me!</h1>
                    <p>I like movies and blah blah blah blah blah</p>
                    <img src="https://content.codecademy.com/courses/React/react_photo-monkeyselfie.jpg" />
                </div>
            );
        }
    }

    ReactDOM.render(<ProfilePage />, document.getElementById('app'));

    // NavBar.js
    import React from 'react';
    export class NavBar extends React.Component {
        render() {
            const pages = ['home', 'blog', 'pics', 'bio', 'art', 'shop', 'about', 'contact'];
            const navLinks = pages.map(page => {
                return (
                    <a href={'/' + page}>{page}</a>
                )
            });
            return <nav>{navLinks}</nav>;
        }
    }


//#endregion

//#region this.Props 

    //#region Access a Component's props 

        // Previously, you learned one way that components can interact: a component can render another component.
        // In this lesson, you will learn another way that components can interact: a component can pass information to another component.
        // Information that gets passed from one component to another is known as “props.”

        // Every component has something called props.
        // A component’s props is an object. It holds information about that component.
        // To see a component’s props object, you use the expression this.props. 
        // Here’s an example of this.props being used inside of a render method:

        import React from 'react';
        import ReactDOM from 'react-dom';

        class PropsDisplayer extends React.Component {
            render() {
                const stringProps = JSON.stringify(this.props);
                return (
                    <div>
                        <h1>CHECK OUT MY PROPS OBJECT</h1>
                        <h2>{stringProps}</h2>
                    </div>
                );
            }
        }

        // ReactDOM.render goes here:
        ReactDOM.render(<PropsDisplayer myProp='Hello'/>,document.getElementById('app'))

        // Most of the information in this.props is pretty useless! But some of it is extremely important, as you’ll see.

    //#endregion

    //#region Pass `props` to a Component 

        // You can pass information to a React component.
        // How? By giving that component an attribute:

        <MyComponent foo="bar" />

        // Let’s say that you want to pass a component the message, "This is some top secret info.". 
        // Here’s how you could do it:

        <Example message="This is some top secret info." />

        // As you can see, to pass information to a component, you need a name for the information that you want to pass.
        // In the above example, we used the name message. You can use any name you want.
        // If you want to pass information that isn’t a string, then wrap that information in curly braces. 
        // Here’s how you would pass an array:

        <Greeting myInfo={["top", "secret", "lol"]} />

        // In this next example, we pass several pieces of information to <Greeting />. 
        // The values that aren’t strings are wrapped in curly braces:
        
        <Greeting name="Frarthur" town="Flundon" age={2} haunted={false} />

    //#endregion

    //#region Render a Component's props 

        // You just passed information to a component’s props object!
        // You will often want a component to display the information that you pass.
        // Here’s how to make a component display passed-in information:
        //     1 - Find the component class that is going to receive that information.
        //     2 - Include this.props.name-of-information in that component class’s render method’s return statement.

        import React from 'react';
        import ReactDOM from 'react-dom';

        class Greeting extends React.Component {
            render() {
                return <h1>Hi there, {this.props.firstName}!</h1>;
            }
        }

        ReactDOM.render(<Greeting firstName='Allison' />,document.getElementById('app'));

    //#endregion

    //#region Pass props From Component To Component 

        // The most common use of props is to pass information to a component, from a different component. 
        // You haven’t done that yet, but it’s very similar to what you’ve seen already.

        // A curmudgeonly clarification about grammar:
        // You may have noticed some loose usage of the words prop and props. 
        // Unfortunately, this is pretty inevitable.

        // props is the name of the object that stores passed-in information. 
        // this.props refers to that storage object. 
        // At the same time, each piece of passed-in information is called a prop. 
        // This means that props could refer to two pieces of passed-in information, 
        // or it could refer to the object that stores those pieces of information :(


        // Greeting.js
        import React from 'react';
        export class Greeting extends React.Component {
            render() {
                return <h1>Hi there, {this.props.name}!</h1>;
            }
        }

        // App.js
        import React from 'react';
        import ReactDOM from 'react-dom';
        import { Greeting } from './Greeting';

        class App extends React.Component {
            render() {
                return (
                    <div>
                        <h1>Hullo and, "Welcome to The Newzz," "On Line!"</h1>
                        <Greeting name='Nury' />
                        <article>Latest newzz:  where is my phone?</article>
                    </div>
                );
            }
        }

        ReactDOM.render(
            <App />,
            document.getElementById('app')
        );

    //#endregion

    //#region Put an Event Handler in a Component Class 

        // You can, and often will, pass functions as props. 
        // It is especially common to pass event handler functions.
        // In the next lesson, you will pass an event handler function as a prop. 
        // However, you have to define an event handler before you can pass one anywhere. 
        // In this lesson, you will define an event handler function.
        // How do you define an event handler in React?
        // You define an event handler as a method on the component class, just like the render method.

        import React from 'react';
        class Example extends React.Component {
            handleEvent() {
                alert(`I am an event handler. If you see this message, then I have been called.`);
            }

            render() {
                return (
                    <h1 onClick={this.handleEvent}>
                        Hello world
                    </h1>
                );
            }
        }

        // You can pass a method in the exact same way that you pass any other information. 
        // Behold, the mighty JavaScript.

        // Talker.js
        import React from 'react';
        import ReactDOM from 'react-dom';
        import { Button } from './Button';
        class Talker extends React.Component {
            talk() {
                let speech = '';
                for (let i = 0; i < 10000; i++) {
                    speech += 'blah ';
                }
                alert(speech);
            }
            render() {
                return <Button talk={this.talk} />;
            }
        }

        ReactDOM.render(<Talker />,document.getElementById('app'));

        // Button.js
        import React from 'react';
        export class Button extends React.Component {
            render() {
                return (
                    <button>Click me!</button>
                );
            }
        }

    //#endregion

    //#region Receive an Event Handler as a prop

        // Below at Button.js, notice that Button renders a <button></button> element.
        // If a user clicks on this <button></button> element, 
        // then you want your passed-in talk function to get called.
        // That means that you need to attach talk to the <button></button> as an event handler.

        // How do you do that? 
        // The same way that you attach any event handler to a JSX element: 
        // you give that JSX element a special attribute. 
        // The attribute’s name should be something like onClick or onHover. 
        // The attribute’s value should be the event handler that you want to attach.

            // Button.js
            import React from 'react';
            export class Button extends React.Component {
                render() {
                    return (
                        <button onClick={this.props.talk}>
                            Click me!
                        </button>
                    );
                }
            }

            // Talker.js
            import React from 'react';
            import ReactDOM from 'react-dom';
            import { Button } from './Button';
            class Talker extends React.Component {
                talk() {
                    let speech = '';
                    for (let i = 0; i < 10000; i++) {
                        speech += 'blah ';
                    }
                    alert(speech);
                }
                render() {
                    return <Button talk={this.talk} />;
                }
            }

            ReactDOM.render(<Talker />,document.getElementById('app'));

    //#endregion

    //#region handleEvent, onEvent, and this.props.onEvent 

        // When you pass an event handler as a prop, as you just did, there are two names that you have to choose.
        // Both naming choices occur in the parent component class - that is, 
        // in the component class that defines the event handler and passes it.
        // The first name that you have to choose is the name of the event handler itself.
        // Look at Talker.js, lines 6 through 12. This is our event handler. We chose to name it talk.
        // The second name that you have to choose is the name of the prop that you will use to pass the event handler. 
        // This is the same thing as your attribute name.
        // For our prop name, we also chose talk, as shown on line 15:

        return <Button talk={this.talk} />;

        // These two names can be whatever you want. 
        // However, there is a naming convention that they often follow. 
        // You don’t have to follow this convention, but you should understand it when you see it.

        // Here’s how the naming convention works: first, think about what type of event you are listening for. 
        // In our example, the event type was “click.”
        
        // If you are listening for a “click” event, then you name your event handler handleClick. 
        // If you are listening for a “keyPress” event, then you name your event handler handleKeyPress:

        class MyClass extends React.Component {
            handleHover() {
                alert('I am an event handler.');
                alert('I will be called in response to "hover" events.');
            }
        }

        // Your prop name should be the word on, plus your event type. 
        // If you are listening for a “click” event, then you name your prop onClick. 
        // If you are listening for a “keyPress” event, then you name your prop onKeyPress:

        class MyClass extends React.Component {
            handleHover() {
                alert('I am an event handler.');
                alert('I will listen for a "hover" event.');
            }
            render() {
                return <Child onHover={this.handleHover} />;
            }
        }

        // Talker.js
        import React from 'react';
        import ReactDOM from 'react-dom';
        import { Button } from './Button';
        class Talker extends React.Component {
            handleClick() {
                let speech = '';
                for (let i = 0; i < 10000; i++) {
                    speech += 'blah ';
                }
                alert(speech);
            }
            render() {
                return <Button onClick={this.handleClick} />;
            }
        }

        ReactDOM.render(<Talker />,document.getElementById('app'));

        // Button.js
        import React from 'react';
        export class Button extends React.Component {
            render() {
                return (
                    <button onClick={this.props.onClick}>
                        Click me!
                    </button>
                );
            }
        }

        // One major source of confusion is the fact that names like onClick have special meaning, 
        // but only if they’re used on HTML-like elements.
        // Look at Button.js. 
        // When you give a <button></button> an attribute named onClick, then the name onClick has special meaning. 
        // As you’ve learned, this special onClick attribute creates an event listener, 
        // listening for clicks on the <button></button>

        // Now look at Talker.js. 
        // Here, when you give <Button /> an attribute named onClick, then the name onClick doesn’t do anything special. 
        // The name onClick does not create an event listener when used on <Button /> - it’s just an arbitrary attribute name.

        // The reason for this is that <Button /> is not an HTML-like JSX element; it’s a component instance.
        // Names like onClick only create event listeners if they’re used on HTML-like JSX elements. 
        // Otherwise, they’re just ordinary prop names.

    //#endregion

//#region this.props.children 



//#endregion





//#endregion

//#endregion












//#endregion




















