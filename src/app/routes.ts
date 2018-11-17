import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderComponent } from './order/order.component';
import { ReviewsComponent } from './restaurants/restaurant-detail/reviews/reviews.component';
import { MenuComponent } from './restaurants/restaurant-detail/menu/menu.component';
import { RestaurantDetailComponent } from './restaurants/restaurant-detail/restaurant-detail.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import {Routes} from '@angular/router';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]},
    {path: 'order', component: OrderComponent},
    {path: 'order-summary', component: OrderSummaryComponent}

]
