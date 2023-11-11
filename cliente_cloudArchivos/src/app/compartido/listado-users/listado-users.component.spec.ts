import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsersComponent } from './listado-users.component';

describe('ListadoUsersComponent', () => {
  let component: ListadoUsersComponent;
  let fixture: ComponentFixture<ListadoUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoUsersComponent]
    });
    fixture = TestBed.createComponent(ListadoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
