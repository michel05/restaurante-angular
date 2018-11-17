import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RestaurantsService } from './../../restaurants.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantService.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}
