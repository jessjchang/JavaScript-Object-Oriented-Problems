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

let foo = createStudent('Foo', '1st');
foo.info(); // "Foo is a 1st year student"
console.log(foo.listCourses()); // []
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo.listCourses()); // [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes(); // "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advanced Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"
