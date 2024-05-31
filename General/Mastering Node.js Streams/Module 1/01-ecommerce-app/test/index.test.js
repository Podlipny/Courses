import { expect, describe, test, jest } from '@jest/globals'
import Payment from '../src/events/payment.js'
import Marketing from '../src/observers/marketing.js'
import Shipment from '../src/observers/shipment.js'
import PaymentSubject from '../src/subjects/paymentSubject.js'



describe('Test Suite for Observer Pattern', () => {
  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'
    const expected = data

    subject.subscribe(observer)
    subject.notify(data)

    expect(observer.update).toBeCalledWith(expected)
  })
  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'hello world'
    
    subject.subscribe(observer)
    subject.unsubscribe(observer)

    subject.notify(data)

    expect(observer.update).not.toHaveBeenCalled()

  })
  test('#Payment should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)
    
    const paymentSubjectNotifierSpy = jest.spyOn(
      subject,
      subject.notify.name,
    )

    const data = { userName: 'erick', id: 3}
    payment.creditCard(data)

    expect(paymentSubjectNotifierSpy).toBeCalledWith(data)
  })
  test('#All should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject()
    const shiptment = new Shipment()
    const marketing = new Marketing()

    const shiptmentUpdateFnSpy = jest.spyOn(shiptment, shiptment.update.name)
    const marketingUpdateFnSpy = jest.spyOn(marketing, marketing.update.name)

    subject.subscribe(shiptment)
    subject.subscribe(marketing)

    const payment = new Payment(subject)
    const data = { id: 4, userName: 'mary'}
    payment.creditCard(data)

    expect(shiptmentUpdateFnSpy).toBeCalledWith(data)    
    expect(marketingUpdateFnSpy).toBeCalledWith(data)    
  })

})