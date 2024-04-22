import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/model/vendor';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  title: string = 'Vendor Detail';
  vendor: Vendor = new Vendor();
  vendorId: number = 0;
  message?: string = undefined;


  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (parms) => {
        this.vendorId = parms['id'];
        this.vendorSvc.getVendorById(this.vendorId).subscribe({
          next: (parms) => {
            this.vendor = parms;
          },
          error: (err) => {
            console.log('Error getting vendor by id: ', err);
          },
          complete: () => { }
        });
      },
      error: (err) => {
        console.log('Error getting id from url: ', err)
      },
      complete: () => { },
    });
  }
  delete() {
    this.vendorSvc.deleteVendor(this.vendorId).subscribe({
      next: (resp) => {
        if (resp == false) {
          console.log('VendorDetailComponent - error deleting vendor.');
          this.message = 'VendorDetailComponent - error deleting vendor.';
        } else {
          this.router.navigateByUrl('vendor/list');
        }
      },
      error: (err) => {
        console.log(
          'VendorDetailComponent - Error deleting vendor: ' + err.message
        );
        this.message =
          'VendorDetailComponent - error deleting vendor: ' + err.message;
      },
      complete: () => { },
    });

  }
}
