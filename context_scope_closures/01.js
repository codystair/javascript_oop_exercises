var person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);
// NaN is logged becaust this references the global object
// so the value of this.firstName and this.lastName is
// undefined + undefined which is NaN
