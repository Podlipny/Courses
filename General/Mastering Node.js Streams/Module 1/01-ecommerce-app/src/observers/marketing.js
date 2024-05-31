export default class Marketing {
  update({ id, userName }) {
    /*
    its important to remember that the function [update] is responsible of
    handling his errors/exceptions

    our subject won't have any await there (or something that might block any exection)
    our subject is the engine to send data to all observers
    */

    console.log(`[${id}]: [marketing] will send an welcom email to [${userName}]`)
  }
}