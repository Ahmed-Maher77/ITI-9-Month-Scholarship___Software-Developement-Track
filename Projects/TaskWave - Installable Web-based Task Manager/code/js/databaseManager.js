// create or open IndexedDB database
async function createOrOpenDB() {
    try {
        const db = await idb.open("todoListDB_iti", 1, (upgradeDB) => {
            if (!upgradeDB.objectStoreNames.contains("tasks")) {
                upgradeDB.createObjectStore("tasks", { keyPath: "id" });
            }
        });
        return db;
    } catch (error) {
        console.error("Error opening database:", error);
        throw error;
    }
}
createOrOpenDB();

// store task in IndexedDB
async function storeTaskInDB(task) {
    let tx;
    try {
        const db = await createOrOpenDB();
        tx = db.transaction("tasks", "readwrite");
        const store = tx.objectStore("tasks");
        store.add(task);
        await tx.complete;
    } catch (error) {
        if (tx) tx.abort();
        throw error;
    }
}

// Get all tasks from IndexedDB
async function getAllTasksFromDB() {
    let tx;
    try {
        const db = await createOrOpenDB();
        tx = db.transaction("tasks", "readonly");
        const store = tx.objectStore("tasks");
        const allTasks = await store.getAll();
        await tx.complete;
        return allTasks;
    } catch (error) {
        if (tx) tx.abort();
        throw error;
    }
}

// Get Tasks from IndexedDB
async function getTask(id) {
    let tx;
    try {
        const db = await createOrOpenDB();
        tx = db.transaction("tasks", "readonly");
        const store = tx.objectStore("tasks");
        const task = await store.get(id);
        await tx.complete;
        return task;
    } catch (error) {
        if (tx) tx.abort();
        throw error;
    }
}

// Update Task in IndexedDB
async function updateTask(newTask, id) {
    let tx;
    try {
        const db = await createOrOpenDB();
        tx = db.transaction("tasks", "readwrite");
        const store = tx.objectStore("tasks");
        const taskToSave = { ...newTask, id };
        store.put(taskToSave);
        await tx.complete;
    } catch (error) {
        if (tx) tx.abort();
        throw error;
    }
}

// Delete Task from IndexedDB
async function deleteTaskFromDB(id) {
    let tx;
    try {
        const db = await createOrOpenDB();
        tx = db.transaction("tasks", "readwrite");
        const store = tx.objectStore("tasks");
        store.delete(id);
        await tx.complete;
    } catch (error) {
        if (tx) tx.abort();
        throw error;
    }
}

export {
    storeTaskInDB,
    getAllTasksFromDB,
    getTask,
    updateTask,
    deleteTaskFromDB,
};
