let invoices = {
  unpaid: [],
  paid: [],

  add(name, amount) {
    let newObject = {
      name,
      amount,
    };

    this.unpaid.push(newObject);
  },

  totalDue() {
    return this.unpaid.reduce((total, invoice) => total += invoice['amount'], 0);
  },

  payInvoice(name) {
    let remainingUnpaid = [];

    this.unpaid.forEach(invoice => {
      if (invoice['name'] === name) {
        this.paid.push(invoice);
      } else {
        remainingUnpaid.push(invoice);
      }
    });

    this.unpaid = remainingUnpaid;
  },

  totalPaid() {
    return this.paid.reduce((total, invoice) => total += invoice['amount'], 0);
  },
};

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);
console.log(invoices.totalDue()); // 737.5

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');
console.log(invoices.totalPaid()); // 550
console.log(invoices.totalDue()); // 187.5
