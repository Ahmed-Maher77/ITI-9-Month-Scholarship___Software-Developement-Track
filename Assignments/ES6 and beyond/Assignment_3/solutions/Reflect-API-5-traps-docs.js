const obj = {
    username: 'ahmed',
    password: '12345',
    age: 30
};


const handler = {
    // What should happen when someone checks if a property exists? => in operator
    has(target, prop) {              
        // Hide the password property
        if (prop === 'password') {
            return false;
        }
        return prop in target;
        // or: return target.hasOwnProperty(prop);
        // or: return Reflect.has(target, prop);
    },

    
    // What should happen when someone tries to delete a property?
    deleteProperty(target, prop) {   
        // Prevent deletion of the password property
        if (prop === 'password') {
            throw new Error(`Cannot delete property ${prop}`);
        }
        return delete target[prop];
        // or: return Reflect.deleteProperty(target, prop);
    },
    

    // What should happen when someone tries to list the properties of the object?
    ownKeys(target) {                
        // Exclude the password property from the list
        return Object.keys(target).filter(key => key !== 'password');
        // or: return Reflect.ownKeys(target).filter(key => key !== 'password');
    },
    

    // What should happen when someone tries to define a new property?
    defineProperty(target, prop, descriptor) { 
        if (prop === 'password') {
            throw new Error(`Cannot define property ${prop}`);
        }
        return Object.defineProperty(target, prop, descriptor);
        // or: return Reflect.defineProperty(target, prop, descriptor);
    },
    
    
    // What should happen when someone tries to get the property descriptor?
    getOwnPropertyDescriptor(target, prop) { 
        if (prop === 'password') {
            throw new Error(`Cannot get descriptor for property ${prop}`);
        }
        return Object.getOwnPropertyDescriptor(target, prop);
        // or: return Reflect.getOwnPropertyDescriptor(target, prop);
    }
}


const proxyObj = new Proxy(obj, handler);

export { proxyObj };
