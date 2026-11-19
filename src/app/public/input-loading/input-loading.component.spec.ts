import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { root, select } from '../pro-form.testing';
import { InputLoadingComponent } from './input-loading.component';

@Component({
  selector: 'pro-test-host',
  imports: [InputLoadingComponent],
  template: `
    <pro-input-loading
      [hideHint]="hideHint()"
      [hint]="hint()"
      [label]="label()"
    />
  `,
})
class TestHostComponent {
  public readonly hideHint = signal(false);

  public readonly hint = signal<string | undefined>('Fetching data');

  public readonly label = signal<string | undefined>('Name');
}

describe('InputLoadingComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  const input = (): HTMLInputElement =>
    select<HTMLInputElement>(fixture, 'input');

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a disabled input', () => {
    expect(input().disabled).toBe(true);
  });

  it('animates the loading text with the label', () => {
    vi.advanceTimersByTime(500);
    expect(input().value).toBe('Loading "Name".');

    vi.advanceTimersByTime(500);
    expect(input().value).toBe('Loading "Name"..');

    vi.advanceTimersByTime(500);
    expect(input().value).toBe('Loading "Name"...');
  });

  it('uses plain loading text without a label', () => {
    fixture.componentInstance.label.set(undefined);
    fixture.detectChanges();

    vi.advanceTimersByTime(500);
    expect(input().value).toBe('Loading.');
  });

  it('shows the hint and hides it on request', () => {
    expect(select(fixture, 'mat-hint').textContent).toContain('Fetching data');

    fixture.componentInstance.hideHint.set(true);
    fixture.detectChanges();
    expect(root(fixture).querySelector('mat-hint')).toBeNull();
    expect(select(fixture, 'pro-input-loading').classList).toContain(
      'hide-hint',
    );
  });

  it('stops the timer when destroyed', () => {
    const setValue = vi.spyOn(FormControl.prototype, 'setValue');
    vi.advanceTimersByTime(500);
    expect(setValue).toHaveBeenCalledTimes(1);

    setValue.mockClear();
    fixture.destroy();
    vi.advanceTimersByTime(2000);
    expect(setValue).not.toHaveBeenCalled();
    setValue.mockRestore();
  });
});
