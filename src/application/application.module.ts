import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { DomainModule } from 'src/domain/domain.module';
import { InfraestructureExceptionHandler } from './web/handler/infraestructure-exception.handler';
import { ValidationExceptionHandler } from './web/handler/validation-exception.handler';
import { ClienteController } from './web/cliente/controller/cliente.controller';
import { PedidoController } from './web/pedido/controller/pedido.controller';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { GeneralExceptionHandler } from './web/handler/general-exception.handler';
import { GeneralHttpExceptionHandler } from './web/handler/general-http-exception.handler';
import { ProdutoController } from './web/produto/controller/produto.controller';
import { CategoriaProdutoController } from './web/categoria/controller/categoria-produto.controller';
import { ItemPedidoController } from './web/item-pedido/controller/item-pedido.controller';
import { PagamentoController } from './web/pagamento/controller/pagamento.controller';

@Module({
   imports: [InfrastructureModule, DomainModule],
   providers: [
      { provide: APP_FILTER, useClass: GeneralExceptionHandler },
      { provide: APP_FILTER, useClass: GeneralHttpExceptionHandler },
      { provide: APP_FILTER, useClass: InfraestructureExceptionHandler },
      { provide: APP_FILTER, useClass: ValidationExceptionHandler },
   ],
   controllers: [
      ClienteController,
      PedidoController,
      ItemPedidoController,
      ProdutoController,
      CategoriaProdutoController,
      PagamentoController,
   ],
})
export class ApplicationModule {}
