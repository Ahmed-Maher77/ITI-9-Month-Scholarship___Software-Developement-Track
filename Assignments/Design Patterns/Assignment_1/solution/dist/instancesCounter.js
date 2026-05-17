class TestClass {
    static instancesCount = 0;
    constructor() {
        TestClass.instancesCount++;
    }
    static getInstancesCount() {
        return TestClass.instancesCount;
    }
    destroy() {
        TestClass.instancesCount--;
    }
}
console.log(TestClass.getInstancesCount());
const obj1 = new TestClass();
console.log(TestClass.getInstancesCount());
const obj2 = new TestClass();
console.log(TestClass.getInstancesCount());
obj1.destroy();
console.log(TestClass.getInstancesCount());
export {};
//# sourceMappingURL=instancesCounter.js.map