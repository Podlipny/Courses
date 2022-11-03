import { Publisher, Subjects, TicketCreatedEvent } from '@cygnetops/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
