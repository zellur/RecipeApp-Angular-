import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
// tslint:disable-next-line: max-line-length
 private recipes: Recipe[] = [new Recipe('Test',
  'This is Test Recipe',
  'https://media3.s-nbcnews.com/j/newscms/2019_15/1424559/tracy-morgan-today-main-190410-02_cdfb88ac1b33813396ae95d28d09e0cf.today-front-large.jpg',
  [new Ingredient('Bannana',5),new Ingredient('Tomato',50)]),
// tslint:disable-next-line: max-line-length
  new Recipe('Test Again',
   'This is Test Recipe',
   'https://media3.s-nbcnews.com/j/newscms/2019_15/1424559/tracy-morgan-today-main-190410-02_cdfb88ac1b33813396ae95d28d09e0cf.today-front-large.jpg',
   [new Ingredient('Apple',50),new Ingredient('mango',60)])];

   constructor(private slService: ShoppingListService) {}
  getRecipe() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsFromRecipe(ingredients);
  }
  getRecipeByid(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
