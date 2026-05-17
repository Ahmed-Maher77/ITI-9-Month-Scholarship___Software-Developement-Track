// salary ,Nationality , street
class BasicTeacher {
    name;
    email;
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    getInfo() {
        return {
            name: this.name,
            email: this.email,
        };
    }
}
class TeacherSalaryDecorator {
    teacher;
    salary;
    constructor(teacher, salary) {
        this.teacher = teacher;
        this.salary = salary;
    }
    getInfo() {
        return {
            ...this.teacher.getInfo(),
            salary: this.salary,
        };
    }
}
class TeacherNationalityDecorator {
    teacher;
    nationality;
    constructor(teacher, nationality) {
        this.teacher = teacher;
        this.nationality = nationality;
    }
    getInfo() {
        return {
            ...this.teacher.getInfo(),
            nationality: this.nationality,
        };
    }
}
class TeacherStreetDecorator {
    teacher;
    street;
    constructor(teacher, street) {
        this.teacher = teacher;
        this.street = street;
    }
    getInfo() {
        return {
            ...this.teacher.getInfo(),
            street: this.street,
        };
    }
}
// client code
const teacher = new BasicTeacher('John Doe', 'Qxk3T@example.com');
const teacherWithSalary = new TeacherSalaryDecorator(teacher, 50000);
console.log(teacherWithSalary.getInfo());
const teacherWithNationality = new TeacherNationalityDecorator(teacherWithSalary, 'American');
console.log(teacherWithNationality.getInfo());
const teacherWithStreet = new TeacherStreetDecorator(teacherWithNationality, '123 Main St');
console.log(teacherWithStreet.getInfo());
export {};
// ============== Alternative => Builder Pattern (BONUS) ==============
/*
class Teacher {
    name!: string;
    salary?: number;
    nationality?: string;
    street?: string;
}

class TeacherBuilder {
    private teacher = new Teacher();

    setName(name: string) {
        this.teacher.name = name;
        return this;
    }

    setSalary(salary: number) {
        this.teacher.salary = salary;
        return this;
    }

    setNationality(nationality: string) {
        this.teacher.nationality = nationality;
        return this;
    }

    build() {
        return this.teacher;
    }
}

const teacher = new TeacherBuilder()
    .setName("Ahmed")
    .setSalary(10000)
    .setNationality("Egyptian")
    .build();

console.log(teacher);
*/ 
//# sourceMappingURL=decorator_pattern.js.map