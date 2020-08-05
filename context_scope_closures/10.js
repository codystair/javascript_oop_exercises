var school = (function() {
  var VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
  var students = [];

  function getCourse(student, courseName) {
    return student.listCourses().filter(function(course) {
      return course.name === courseName;
    })[0];
  }

  return {
    addStudent: function(name, year) {
      if (VALID_YEARS.indexOf(year) >= 0) {
        var student = createStudent(name, year);
        students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    enrollStudent: function(student, courseName, courseCode) {
      student.addCourse({name: courseName, code: courseCode})
    },

    addGrade: function(student, courseName, grade) {
      var course = getCourse(student, courseName);

      if (course) {
        course.grade = grade;
      }
    },

    getReportCard: function(student) {
      student.listCourses().forEach(function(course) {
        if (course.grade) {
          console.log(course.name + ': ' + String(course.grade));
        } else {
          console.log(course.name + ': In progress');
        }
      });
    },

    courseReport: function(courseName) {
      var courseStudents = students.map(function(student) {
        var course = getCourse(student, courseName) || { grade: undefined };
        return { name: student.name, grade: course.grade };
      }).filter(function(student) {
        return student.grade;
      });

      if (courseStudents.length > 0) {
        console.log('=' + courseName + ' Grades=');

        var average = courseStudents.reduce(function(total, student) {
          console.log(student.name + ': ' + String(student.grade));
          return total + student.grade;
        }, 0) / courseStudents.length;

        console.log('---');
        console.log('Course Average: ' + String(average));
      }
    },
  };
})();
