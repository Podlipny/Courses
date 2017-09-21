import { Component, OnInit } from '@angular/core';
import {UserService} from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductAdminService } from '../adminShared/product-admin.service';
import { Product } from '../adminShared/product';

@Component({
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})

export class ProductAdminComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    theProducts: Product[];
    formDisplay: boolean = true;
    singleProduct: Product;

    constructor( 
        private userSVC: UserService, 
        private router: Router, 
        private prodAdminSVC: ProductAdminService
    ){}

    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string){
        this.menuChoice = mode;
    }

    ngOnInit(){
        this.theUser = this.userSVC.loggedInUser;
        this.getProducts();
    }

    getProducts(){
        let dbRef = firebase.database().ref('products/');
        dbRef.once('value')
            .then((snapshot)=> {
                let tmp: string[] = snapshot.val();
                this.theProducts = Object.keys(tmp).map(key => tmp[key])
            });
    }

    editProduct(theProduct: Product){
        this.singleProduct = theProduct;
        this.formDisplay = false;
    }

    cancelEdit(){
        this.formDisplay = true;
    }

    updateProduct(singleProd: Product){
        this.prodAdminSVC.editProduct(singleProd);
        this.formDisplay = true;
    }

    deleteProduct(oneProduct: Product){
        let verify = confirm(`Are you sure you want to delete this product?`)
        if (verify == true) {
            this.prodAdminSVC.removeProduct(oneProduct);
            this.router.navigate(['/admin/']);
        } else {
            alert('Nothing deleted!');
        }
    }


     
}