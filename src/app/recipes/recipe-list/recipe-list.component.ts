import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
subscription: Subscription;

// tslint:disable-next-line: max-line-length
  recipes: Recipe[];
  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
   this.subscription = this.recipeService.recipeChanged.subscribe(
      (upDatedRecipes: Recipe[]) => {
        this.recipes = upDatedRecipes;
      }
    );
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
