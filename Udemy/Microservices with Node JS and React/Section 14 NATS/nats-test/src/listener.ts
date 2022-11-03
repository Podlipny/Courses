import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

// randomBytes(4).toString('hex') listener name aby jsme mohli zapojit vice listeneru
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  // rekneme NATS se ma clienta opdebrat z subscription
  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const options = stan
    .subscriptionOptions() // NATS chainuje options
    .setManualAckMode(true) // vyzarujeme potvrzeni zpracovani dat
    .setDeliverAllAvailable() // pokud bude sluzba offline NATS by mel poslat vsechny messages ktere se poslali, odesle vsehcny message ktere se kdy poslali
    .setDurableName('accounting-service'); // vytvori Durable Subscriptions 

  const subscription = stan.subscribe(
    'ticket:created',
    'queue-group-name', // timto rikame jake messages ma listener prijmout, pokud mame vice listeneru se stejnym queue name NATS je pouziva na preskacku
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack(); // potvrzujeme zpracovani dat, pokud neposleme NATS po 30s posle zpravu znovu
  });
});

// volame close pri interupt signal nebo term sigral
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
