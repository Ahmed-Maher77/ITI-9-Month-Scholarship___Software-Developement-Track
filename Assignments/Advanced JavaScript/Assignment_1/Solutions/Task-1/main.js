// Sorted Linked List Function
function createSortedLinkedList() {
    let head = null;
    let tail = null;
    let size = 0;

    // Check if value exists in list
    function contains(value) {
        let current = head;
        while (current !== null) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // Enqueue: Add a value in ascending order (must be in sequence)
    function enqueue(value) {
        if (contains(value)) {
            throw new Error(`Value ${value} already exists in the list`);
        }

        const newNode = { value: value, next: null };

        if (head === null) {
            head = newNode;
            tail = newNode;
        } else {
            let current = head;
            let previous = null;

            // Find correct position in sorted order
            while (current !== null && current.value < value) {
                previous = current;
                current = current.next;
            }

            if (previous === null) {
                // Insert at beginning
                newNode.next = head;
                head = newNode;
            } else {
                // Insert in middle
                newNode.next = current;
                previous.next = newNode;

                if (newNode.next === null) {
                    tail = newNode;
                }
            }
        }

        size++;
    }

    // Push: Add an item at the end of the list
    function push(value) {
        const newNode = { value: value, next: null };

        if (head === null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }

        size++;
    }
    
    // Dequeue: Remove an item from the beginning of the list
    function dequeue() {
        if (head === null) {
            return null;
        }

        const value = head.value;
        head = head.next;

        if (head === null) {
            tail = null;
        }

        size--;
        return value;
    }

    // Insert: Add an item at a specific index if value is missing
    function insert(index, value) {
        if (index < 0 || index > size) {
            throw new Error(`Index ${index} is out of bounds`);
        }

        if (contains(value)) {
            throw new Error(`Value ${value} already exists in the list`);
        }

        const newNode = { value: value, next: null };

        if (index === 0) {
            newNode.next = head;
            head = newNode;
            if (size === 0) {
                tail = newNode;
            }
        } else {
            let current = head;
            let previous;
            let count = 0;

            while (count < index) {
                previous = current;
                current = current.next;
                count++;
            }

            newNode.next = current;
            previous.next = newNode;

            if (newNode.next === null) {
                tail = newNode;
            }
        }

        size++;
    }

    // Pop: Remove an item from the end of the list
    function pop() {
        if (head === null) {
            return null;
        }

        if (head === tail) {
            const value = head.value;
            head = null;
            tail = null;
            size--;
            return value;
        }

        let current = head;
        while (current.next !== tail) {
            current = current.next;
        }

        const value = tail.value;
        current.next = null;
        tail = current;
        size--;
        return value;
    }

    // Remove: Remove an item from a specific index with the required value
    function remove(index) {
        if (index < 0 || index >= size) {
            return "data not found";
        }

        let current = head;
        let count = 0;

        if (index === 0) {
            head = current.next;
            if (size === 1) {
                tail = null;
            }
        } else {
            let previous;
            while (count < index) {
                previous = current;
                current = current.next;
                count++;
            }

            previous.next = current.next;
            if (current === tail) {
                tail = previous;
            }
        }

        size--;
        return current.value;
    }

    

    // Display the list
    function display() {
        let current = head;
        let result = [];
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        console.log(result.join(" <-> "));
    }

    // Get list size
    function getSize() {
        return size;
    }

    // Return public API
    return {
        enqueue: enqueue,
        push: push,
        insert: insert,
        pop: pop,
        remove: remove,
        dequeue: dequeue,
        display: display,
        getSize: getSize,
    };
}

// ===== Testing =====
console.log("=== Sorted Linked List Demo ===\n");

const list = createSortedLinkedList();

// Test Push
console.log("1. Testing Push:");
list.push(10);
list.push(20);
list.push(30);
console.log("After push(10), push(20), push(30):");
list.display();

// Test Enqueue (sorted insertion)
console.log("\n2. Testing Enqueue (sorted):");
try {
    list.enqueue(15);
    console.log("After enqueue(15):");
    list.display();
} catch (e) {
    console.log("Error:", e.message);
}

// Test Enqueue with duplicate
console.log("\n3. Testing Enqueue with duplicate:");
try {
    list.enqueue(15);
} catch (e) {
    console.log("Error:", e.message);
}

// Test Insert at specific index
console.log("\n4. Testing Insert:");
try {
    list.insert(2, 25);
    console.log("After insert(2, 25):");
    list.display();
} catch (e) {
    console.log("Error:", e.message);
}

// Test Pop
console.log("\n5. Testing Pop:");
const popped = list.pop();
console.log(`Popped value: ${popped}`);
console.log("After pop():");
list.display();

// Test Dequeue
console.log("\n6. Testing Dequeue:");
const dequeued = list.dequeue();
console.log(`Dequeued value: ${dequeued}`);
console.log("After dequeue():");
list.display();

// Test Remove at specific index
console.log("\n7. Testing Remove:");
const removed = list.remove(1);
console.log(`Removed value at index 1: ${removed}`);
console.log("After remove(1):");
list.display();

// Test Remove - data not found
console.log("\n8. Testing Remove with invalid index:");
const result = list.remove(100);
console.log(`Result: ${result}`);

// Test getSize
console.log("\n9. Current list size:", list.getSize());
