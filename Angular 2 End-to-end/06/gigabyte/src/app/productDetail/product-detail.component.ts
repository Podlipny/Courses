import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Product } from '../admin/adminShared/product';
import { ShoppingCartService } from '../shared/shopping-cart.service';

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
 })

 export class ProductDetailComponent implements OnInit {
    singleProduct: Product;
    
    constructor( 
        private route: ActivatedRoute, 
        private router: Router,
        private cartSVC: ShoppingCartService
    ) {}

    ngOnInit(){
        let productId = this.route.snapshot.params['id'];
        this.getProduct(productId);
    }

    getProduct(id: string){
        let dbRef = firebase.database().ref('products');
        dbRef.orderByChild('id')
            .equalTo(id)
            .once('value')
            .then((snapshot)=>{
                let tmp = snapshot.val();
                let transform = Object.keys(tmp).map(key => tmp[key]);
                let name = transform[0].name;
                let desc = transform[0].desc;
                let imgTitle = transform[0].imgTitle;
                let img = transform[0].img;
                let price = transform[0].price;
                let id = transform[0].id;
                this.singleProduct = new Product (name,desc,imgTitle,img, price, id);
            });  
    };

    addProduct(id:string, name: string, price:number){
        this.cartSVC.addProduct(id,name,price);
    }

 }