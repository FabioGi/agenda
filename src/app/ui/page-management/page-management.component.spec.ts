import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PageManagementComponent } from "./page-management.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PageManagementComponent", () => {

  let fixture: ComponentFixture<PageManagementComponent>;
  let component: PageManagementComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PageManagementComponent]
    });

    fixture = TestBed.createComponent(PageManagementComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
