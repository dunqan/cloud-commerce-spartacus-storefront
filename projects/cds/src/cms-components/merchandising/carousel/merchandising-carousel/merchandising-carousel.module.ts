import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, UrlModule } from '@spartacus/core';
import { CarouselModule, MediaModule } from '@spartacus/storefront';
import { MerchandisingCarouselComponent } from './merchandising-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    MediaModule,
    RouterModule,
    UrlModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MerchandisingCarouselComponent: {
          component: MerchandisingCarouselComponent,
        },
      },
    }),
  ],
  declarations: [MerchandisingCarouselComponent],
  entryComponents: [MerchandisingCarouselComponent],
  exports: [MerchandisingCarouselComponent],
})
export class MerchandisingCarouselModule {}
