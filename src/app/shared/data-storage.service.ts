import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeData() {
    return this.http.put('https://angularrecipe-3f76a.firebaseio.com/recipes.json', this.recipeService.getRecipe());
  }
  fetchData() {
    return this.http.get<Recipe[]>('https://angularrecipe-3f76a.firebaseio.com/recipes.json')
    .subscribe(
      (response: Recipe[]) => {
        const recipes: Recipe[] = response;
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
