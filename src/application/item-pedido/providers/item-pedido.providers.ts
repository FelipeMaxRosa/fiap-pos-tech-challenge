import { Provider } from '@nestjs/common';

import { ItemPedidoService } from 'src/application/item-pedido/service/item-pedido.service';
import { ItemPedido } from 'src/enterprise/item-pedido/model';
import {
   QuantidadeMinimaItemValidator,
   ItemPedidoExistenteValidator,
   AddItemPedidoValidator,
   EditarItemPedidoValidator,
} from 'src/application/item-pedido/validation';
import { IRepository } from 'src/enterprise/repository/repository';
import { ItemPedidoConstants } from 'src/shared/constants';
import { SalvarItemPedidoUseCase } from 'src/application/item-pedido/usecase/salvar-item-pedido.usecase';
import { EditarItemPedidoUseCase } from 'src/application/item-pedido/usecase/editar-item-pedido.usecase';
import { DeletarItemPedidoUseCase } from 'src/application/item-pedido/usecase/deletar-item-pedido.usecase';

export const ItemPedidoProviders: Provider[] = [
   { provide: ItemPedidoConstants.ISERVICE, useClass: ItemPedidoService },
   {
      provide: ItemPedidoConstants.ADD_ITEM_PEDIDO_VALIDATOR,
      useFactory: (): AddItemPedidoValidator[] => [new QuantidadeMinimaItemValidator()],
   },
   {
      provide: ItemPedidoConstants.EDITAR_ITEM_PEDIDO_VALIDATOR,
      inject: [ItemPedidoConstants.IREPOSITORY],
      useFactory: (repository: IRepository<ItemPedido>): EditarItemPedidoValidator[] => [
         new ItemPedidoExistenteValidator(repository),
      ],
   },
   {
      provide: ItemPedidoConstants.SALVAR_ITEM_PEDIDO_USECASE,
      inject: [ItemPedidoConstants.IREPOSITORY, ItemPedidoConstants.ADD_ITEM_PEDIDO_VALIDATOR],
      useFactory: (
         repository: IRepository<ItemPedido>,
         validators: AddItemPedidoValidator[],
      ): SalvarItemPedidoUseCase => new SalvarItemPedidoUseCase(repository, validators),
   },
   {
      provide: ItemPedidoConstants.EDITAR_ITEM_PEDIDO_USECASE,
      inject: [
         ItemPedidoConstants.IREPOSITORY,
         ItemPedidoConstants.ADD_ITEM_PEDIDO_VALIDATOR,
         ItemPedidoConstants.EDITAR_ITEM_PEDIDO_VALIDATOR,
      ],
      useFactory: (
         repository: IRepository<ItemPedido>,
         adicionarValidators: AddItemPedidoValidator[],
         editarValidators: EditarItemPedidoValidator[],
      ): EditarItemPedidoUseCase => new EditarItemPedidoUseCase(repository, adicionarValidators, editarValidators),
   },
   {
      provide: ItemPedidoConstants.DELETAR_ITEM_PEDIDO_USECASE,
      inject: [ItemPedidoConstants.IREPOSITORY],
      useFactory: (repository: IRepository<ItemPedido>): DeletarItemPedidoUseCase =>
         new DeletarItemPedidoUseCase(repository),
   },
];