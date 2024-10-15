
import { Avaliacao } from 'src/domain/entities/avaliacoes.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class AvaliacaoSubscriber implements EntitySubscriberInterface<Avaliacao> {
  listenTo() {
    return Avaliacao; 
  }

  afterInsert(event: InsertEvent<Avaliacao>) {
    console.log(`Avaliação inserida: `, event.entity);
   
  }
}
