export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject
  }

  creditCard({ id, userName, age }) {
    console.log(`\na payment ocurred from ${userName}`)
    this.paymentSubject.notify({ id, userName })
  }
}