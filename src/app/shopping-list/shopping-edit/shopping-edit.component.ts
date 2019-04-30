import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') formData: NgForm;
  editMode = false;
  subscription: Subscription;
  editItemIndex: number;
  ingredient: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.selectedItemIndex.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.ingredient = this.slService.getIngredientsByIndex(this.editItemIndex);
        this.formData.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
      }
    );
  }

  onAddIngredient(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredients(this.editItemIndex, ingredient);
    } else {
      this.slService.addIngredients(ingredient);
    }
    form.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onClear() {
    this.formData.reset();
    this.editMode = false;
  }

  onDelete() {
    console.log(this.editItemIndex);
  this.slService.deleteIngredient(this.editItemIndex);
  this.onClear();
  }

}
