import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { MenuComponent } from './core/menu/menu.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { RequestDetailComponent } from './feature/request/request-detail/request-detail.component';
import { RequestEditComponent } from './feature/request/request-edit/request-edit.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { LineitemCreateComponent } from './feature/lineitem/lineitem-create/lineitem-create.component';
import { LineitemEditComponent } from './feature/lineitem/lineitem-edit/lineitem-edit.component';
import { LineitemDetailComponent } from './feature/lineitem/lineitem-detail/lineitem-detail.component';
import { UserLoginComponent } from './feature/user-login/user-login/user-login.component';
import { HomePageComponent } from './core/home/home-page/home-page.component';
import { RequestReviewComponent } from './feature/request/request-review/request-review.component';
import { RequestApproveComponent } from './feature/request/request-approve/request-approve.component';
import { RequestRejectComponent } from './feature/request/request-reject/request-reject.component';
import { RequestReviewsComponent } from './feature/request/request-reviews/request-reviews.component';
import { LineForProdComponent } from './feature/lineitem/line-for-prod/line-for-prod.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    MenuComponent,
    UserDetailComponent,
    VendorCreateComponent,
    VendorEditComponent,
    VendorDetailComponent,
    RequestDetailComponent,
    RequestEditComponent,
    RequestCreateComponent,
    RequestListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    VendorListComponent,
    ProductListComponent,
    LineitemCreateComponent,
    LineitemEditComponent,
    LineitemDetailComponent,
    UserLoginComponent,
    HomePageComponent,
    RequestReviewComponent,
    RequestApproveComponent,
    RequestRejectComponent,
    RequestReviewsComponent,
    LineForProdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
