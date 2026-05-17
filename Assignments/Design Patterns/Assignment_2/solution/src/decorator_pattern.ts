// salary ,Nationality , street

interface ITeacher {
    getInfo(): any;
}

class BasicTeacher implements ITeacher {
    constructor(public name: string, public email: string) {}
    getInfo() {
        return {
            name: this.name,
            email: this.email,
        };
    }
}

class TeacherSalaryDecorator implements ITeacher {
    constructor(private teacher: ITeacher, public salary: number) {}
    getInfo() {
        return {
            ...this.teacher.getInfo(),
            salary: this.salary,
        }
    }
}

class TeacherNationalityDecorator implements ITeacher {
    constructor(private teacher: ITeacher, public nationality: string) {}
    getInfo() {
        return {
            ...this.teacher.getInfo(),
            nationality: this.nationality,
        }
    }
}

class TeacherStreetDecorator implements ITeacher {
    constructor(private teacher: ITeacher, public street: string) {}
    getInfo() {
        return {
            ...this.teacher.getInfo(),
            street: this.street,
        }
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