// #1

function makeList() {
  return {
    items: [],
    
    list() {
      if (this.items.length === 0) {
        console.log('The list is empty.');
      } else {
        this.items.forEach(item => console.log(item));
      }
    },

    add(newItem) {
      if (!this.items.includes(newItem)) {
        this.items.push(newItem);
        console.log(newItem + ' added!');
      }
    },

    remove(item) {
      let index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
        console.log(item + ' removed!');
      }
    },
  };
}

let list = makeList();
list.add('peas');
// = peas added!
list.list();
// = peas
list.add('corn');
// = corn added!
list.list();
// = peas
// = corn
list.remove('peas');
// = peas removed!
list.list();
// = corn


// #2

function makeList() {
  let items = [];

  return {
    list() {
      if (items.length === 0) {
        console.log('The list is empty.');
      } else {
        items.forEach(item => console.log(item));
      }
    },

    add(newItem) {
      if (!items.includes(newItem)) {
        items.push(newItem);
        console.log(newItem + ' added!');
      }
    },

    remove(item) {
      let index = items.indexOf(item);
      if (index !== -1) {
        items.splice(index, 1);
        console.log(item + ' removed!');
      }
    },
  };
}

let list = makeList();
list.add('peas');
// = peas added!
list.list();
// = peas
list.add('corn');
// = corn added!
list.list();
// = peas
// = corn
list.remove('peas');
// = peas removed!
list.list();
// = corn
