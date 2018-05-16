import { NgModule } from '@angular/core';
import { Formacao4_3_3Component } from './formacao4-3-3/formacao4-3-3';
import { Formacao4_4_2Component } from './formacao4-4-2/formacao4-4-2';
import { Formacao4_5_1Component } from './formacao4-5-1/formacao4-5-1';
import { Formacao5_3_1Component } from './formacao5-3-1/formacao5-3-1';
import { Formacao5_3_2Component } from './formacao5-3-2/formacao5-3-2';
import { Formacao5_4_1Component } from './formacao5-4-1/formacao5-4-1';
@NgModule({
	declarations: [Formacao4_3_3Component,
    Formacao4_4_2Component,
    Formacao4_5_1Component,
    Formacao5_3_1Component,
    Formacao5_3_2Component,
    Formacao5_4_1Component],
	imports: [],
	exports: [Formacao4_3_3Component,
    Formacao4_4_2Component,
    Formacao4_5_1Component,
    Formacao5_3_1Component,
    Formacao5_3_2Component,
    Formacao5_4_1Component]
})
export class ComponentsModule {}
