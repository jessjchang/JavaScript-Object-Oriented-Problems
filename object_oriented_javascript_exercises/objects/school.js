let school = {
  students: [],

  addStudent(name, year) {
    const validYears = ['1st', '2nd', '3rd', '4th', '5th'];

    if (validYears.includes(year)) {
      let newStudent = createStudent(name, year);
      this.students.push(newStudent);
      return newStudent;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({ name: courseName, code: courseCode });
  },

  addGrade(student, courseName, grade) {
    let targetCourse = student.listCourses().filter(({name}) => name === courseName)[0];

    if (targetCourse) targetCourse.grade = grade;
  },

  getReportCard(student) {
    student.listCourses().forEach(({name, grade}) => {
      if (grade === 0 || grade) {
        console.log(`${name}: ${grade}`);
      } else {
        console.log(`${name}: In progress`);
      }
    });
  },

  courseReport(courseName) {
    let validStudents = this.students.filter(({courses}) => (courses.some(course => course.name === courseName && course.grade)));

    if (validStudents.length === 0) {
      console.log('undefined');
      return;
    }

    let allGrades = [];

    console.log(`=${courseName} Grades=`);

    validStudents.forEach(student => {
      let studentGrade = student.listCourses().filter(({name}) => name === courseName)[0].grade;
      allGrades.push(studentGrade);
      console.log(`${student.name}: ${String(studentGrade)}`);
    });

    console.log('---');

    let average = (allGrades.reduce((total, grade) => total + grade, 0)) / (allGrades.length);
    console.log(`Course Average: ${String(average)}`);
  },
};

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    addNote(code, note) {
      this.courses.forEach(course => {
        if (code === course.code) {
          if (Object.keys(course).includes('note')) {
            course.note += `; ${note}`;
          } else {
            course.note = note;
          }
        }
      });
    },

    updateNote(code, note) {
      this.courses.forEach(course => {
        if (code === course.code) course.note = note;
      })
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (Object.keys(course).includes('note')) console.log(`${course.name}: ${course.note}`);
      })
    },
  };
}

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);

school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);
school.addGrade(bar, 'Math', 91);
school.addGrade(qux, 'Math', 93);
school.addGrade(qux, 'Advanced Math', 90);

school.getReportCard(foo);
// Math: 95
// Advanced Math: 90
// Physics: In progress

school.courseReport('Math');
// =Math Grades=
// foo: 95
// bar: 91
// qux: 93
// ---
// Course Average: 93

school.courseReport('Advanced Math');
// =Advanced Math Grades=
// foo: 90
// qux: 90
// ---
// Course Average: 90

school.courseReport('Physics');
// undefined
