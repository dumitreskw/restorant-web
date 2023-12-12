import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() inEdit: boolean = false;
  constructor(public dialog: MatDialog,
    private authService: AuthenticationService,
    private productsService: ProductsService) {
    let dummyProduct = new Product();
    dummyProduct.name = 'Telescop';
    dummyProduct.description = 'ceva descriere 123 4 5 6';
    dummyProduct.price = 10.22;

    if (!this.product) {
      this.product = dummyProduct;
    }
  }

  onDelete() {
    this.productsService.deleteProduct(this.product._id as string).subscribe(
      res => window.location.reload()
    );
    
  }

  onOpenDialog() {
    if(this.authService.isAdmin()){
      const productId = this.product._id;
      this.dialog.open(ProductModalComponent, {
        data: {
          productId: productId,
        },
      });
    }
  }
}
