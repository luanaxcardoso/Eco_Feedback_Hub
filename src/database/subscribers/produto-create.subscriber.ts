import { Produto } from "src/domain/entities/produto.entity";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";

@EventSubscriber()
export class ProdutoSubscriber implements EntitySubscriberInterface<Produto> {
  listenTo() {
    return Produto;
  }

  afterInsert(event: InsertEvent<Produto>) {
    console.log(`Produto inserido: `, event.entity);
  }
}
