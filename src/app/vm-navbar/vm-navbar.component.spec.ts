import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmNavbarComponent } from './vm-navbar.component';

describe('VmNavbarComponent', () => {
  let component: VmNavbarComponent;
  let fixture: ComponentFixture<VmNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
