import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

class FileSnippet {
  static readonly IMAGE_SIZE = { width: 950, height: 720 };
  pending: boolean = false;
  status: string = 'INIT';

  constructor(public src: string, public file: File) {
  }
}
@Component({
  selector: 'app-backend',
  templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {

  listing: any;
  listingData: any;
  show = false;
  hide=false;
  addListing = false;
  sendDeleteListingData: any;
  filePath: any;
  selectedFiles: any;
  currentFileUpload: any;
  imagePath: any;
  selectedFile: FileSnippet;
  imageChangedEvent: any;
  errorMessage: any = '';
  imageChangeFlag: boolean = false;
  imageURL: string;
  imageURL$: string;
  myfields:any=[];
  myform: FormGroup = new FormGroup({
    // name: new FormControl(null, [Validators.required]),
    value: new FormControl(null)
  }) ;
  addCustomizedFields: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    type: new FormControl(null, [Validators.required]),
    options: new FormControl(null, [Validators.required]),
  });
  constructor(private route: ActivatedRoute, private router: Router, private commonservice: CommonService) { }

  ngOnInit() {
    // this.getListingTypes();
  }
  // public getListingTypes() {
  //   // this.commonservice.getListingTypes().subscribe((data: any) => {
  //   //   this.listing = data.data;
  //   // }), error => {
  //   //   return error;
  //   // };
  // }
 
  public onFileSelect(event) {
    // this.processFile(event)
    let formData = new FormData();
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    formData.append('image', this.currentFileUpload,this.currentFileUpload.name);
    this.imagePath = formData;
    console.log(this.imagePath);
    this.imageChangeFlag = true;
    this.commonservice.uploadImage(this.imagePath).subscribe(
      async (data) => {
      this.filePath = await this.getImageURL(data)
      console.log(this.filePath);
    }
    )
  }
  async getImageURL(data) {
    return this.imageURL = await data.imageUrl;
  }


  refresh(): void {
    window.location.reload();
  }

}
