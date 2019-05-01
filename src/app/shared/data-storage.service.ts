import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeData() {
    const token = this.authService.getToken();
    return this.http.put('https://angularrecipe-3f76a.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipe());
  }
  fetchData() {
    const token = this.authService.getToken();
    return this.http.get<Recipe[]>('https://angularrecipe-3f76a.firebaseio.com/recipes.json?auth=' + token)
    .subscribe(
      (response: Recipe[]) => {
        const recipes: Recipe[] = response;
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
