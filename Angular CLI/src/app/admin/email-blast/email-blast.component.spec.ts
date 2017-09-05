import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailBlastComponent } from './email-blast.component';

describe('EmailBlastComponent', () => {
  let component: EmailBlastComponent;
  let fixture: ComponentFixture<EmailBlastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailBlastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailBlastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
