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

var foo = {
  name: 'foo',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
};

var bar = {
  name: 'bar',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
};

var qux = {
  name: 'qux',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
  ],
};

var school = {
  students: [foo, bar, qux],
  addStudent: function(name, year) {
    var newStudent;
    var validYears = ['1st', '2nd', '3rd', '4th', '5th'];

    if (!validYears.includes(year)) {
      console.log('Invalid Year');
      return;
    }

    newStudent = createStudent(name, year);
    this.students.push(newStudent);
    return newStudent;
  },
  enrollStudent: function(name, course) {
    this.students.forEach(function (student) {
      if (student.name === name) {
        student.addCourse(course);
      }
    });
  },
  addGrade: function(name, code, grade) {
    this.students.forEach(function (student) {
      student.courses.forEach(function (course) {
        if (course.code === code) {
          course.grade = grade;
        }
      });
    });
  },
  getReportCard(student) {
    var grade;

    student.courses.forEach(function (course) {
      if (course.grade) {
        grade = course.grade;
      } else {
        grade = 'In progress';
      }

      console.log(`${course.name}: ${grade}`);
    });
  },
  courseReport: function(courseName) {
    console.log(`=${courseName} Grades=`);
    this.students.forEach(function (student) {
      student.courses.forEach(function (course) {
        if (course.name === courseName) {
          console.log(`${student.name}: ${course.grade}`);
        }
      });
    });
  },
};

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');
