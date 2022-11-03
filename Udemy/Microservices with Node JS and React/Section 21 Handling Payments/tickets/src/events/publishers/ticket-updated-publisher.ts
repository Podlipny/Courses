import { Publisher, Subjects, TicketUpdatedEvent } from '@cygnetops/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
