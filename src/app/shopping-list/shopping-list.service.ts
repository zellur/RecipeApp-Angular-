import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    selectedItemIndex = new Subject<number>();
    private ingredients: Ingredient[] = [new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10)
    ];

    public getIngredients() {
        return this.ingredients.slice();
    }
    public addIngredients(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredientsFromRecipe(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
    public getIngredientsByIndex(index: number){
      return this.ingredients[index];
    }
    updateIngredients(index: number, newIngredients: Ingredient) {
      this.ingredients[index] = newIngredients;
      this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
}
