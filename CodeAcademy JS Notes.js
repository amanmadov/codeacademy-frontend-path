
/*
    CodeAcademy Frontend Path JavaScript Notes
    by: Nury Amanmadov 2022
*/

//#region Vanilla Javascript 


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
    

//#endregion














// Fetch API
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


//#region React 

//#region Destructuring with JavaScript

    //Destructuring Arrays
    let cars = ['ferrari', 'tesla', 'cadillac'];
    let [car1, car2, car3] = cars;
    console.log(car1, car2, car3); // Prints: ferrari tesla cadillac

    //Destructuring Objects
    let destinations = { x: 'LA', y: 'NYC', z: 'MIA' };
    let { x, y, z } = destinations;
    console.log(x, y, z); // Prints LA NYC MIA

    //Destructuring Function Parameters
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
    images.push(<img
        key={animal}
        className='animal'
        alt={animal}
        src={animals[animal].image}
        aria-label={animal}
        role='button'
        onClick={displayFact}
    />)
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
            src='/images/ocean.jpg' />
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

//#region Authorization Form 

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





//#endregion




















