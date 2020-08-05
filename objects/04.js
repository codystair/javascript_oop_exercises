function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    info: function() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },
    addCourse: function(course) {
      this.courses.push(course);
    },
    listCourses: function() {
      console.log(this.courses);
    },
    addNote: function(code, note) {
      var index = this.getIndex(code);

      if (this.courses[index].hasOwnProperty('note')) {
        this.courses[index].note.push(note);
      } else {
        this.courses[index].note = [note];
      }
    },
    updateNote: function(code, newNote) {
      var index = this.getIndex(code);
      this.courses[index].note = [newNote];
    },
    viewNotes: function() {
      this.courses.forEach(function (course) {
        if (course.note) {
          console.log(`${course.name}: ${course.note.join('; ')}`);
        }
      });
    },
    getIndex: function(code) {
      var index = -1;

      this.courses.forEach(function (course, i) {
        if (course.code === code) {
          index = i;
        }
      });

      return index;
    }
  };
}

var foo = createStudent('Foo', '1st');

foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });

foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.addNote(102, 'Difficult subject');
foo.updateNote(101, 'Fun course');
foo.viewNotes();
