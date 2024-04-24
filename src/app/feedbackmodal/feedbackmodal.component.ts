import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Environment } from '../models/environment';
import { AppInitService } from '../services/appinit.service';
import { MasterService } from '../services/master.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-feedbackmodal',
  templateUrl: './feedbackmodal.component.html',
  styleUrl: './feedbackmodal.component.scss',
})
export class FeedbackmodalComponent implements OnInit {
  showform: boolean = true;
  showsuccess: boolean = false;
  showerror: boolean = false;
  showspinner: boolean = false;
  spinner: boolean = false;
  existinguser: boolean = false;
  feedbackQuestions: any;
  emoji: any;
  feedbackForm!: FormGroup;
  selectedOption: any[] = [];
  selectedEmoji: any;
  checkbox: any;
  emojiText: any;
  comments: string = '';
  environment: Environment | null = null;
  contactForms!: FormGroup;
  ageNumbers: number[] = Array.from({ length: 83 }, (_, index) => index + 18);
  constructor(
    private fb: FormBuilder,
    public modalService: ModalService,
    private master: MasterService,
    private serv: AppInitService
  ) {
    this.feedbackForm = this.fb.group({});
    this.environment = serv.config;
  }
  showfeedback: any;
  ngOnInit() {
    this.master.GetFeedbackQuestions().subscribe((result: any) => {
      this.createForm(result);
      this.feedbackQuestions = result.map((r: any) => {
        const opts = r.Options ? r.Options.split(',') : r.Options;
        return { ...r, Options: opts };
      });
      this.questionsForm();
    });
    this.emoji = {
      '1': 'fa-solid fa-face-sad-tear',
      '2': 'fa-solid fa-face-meh',
      '3': 'fa-solid fa-face-smile',
      '4': 'fa-solid fa-face-smile-beam',
    };
    this.emojiText = {
      '1': 'Poor',
      '2': 'Average',
      '3': 'Good',
      '4': 'Excellent'
    };
  }
  createForm(formData: any) {
    const formGroupConfig: any = {};
    formData.forEach((field: any) => {
      const validators = [];
      if (field.isRequired) {
        validators.push(Validators.required);
      }
      formGroupConfig[field.Name] = [field.Value || '', validators];
    });
    this.feedbackForm = this.fb.group(formGroupConfig);
  }
  closeModal() {
    this.modalService.showfeedback = false;
    this.feedbackForm.reset();
    this.clearSelectedEmojis();
    localStorage.setItem('showfeedback', '');
    this.showform = true;
    this.showsuccess = false;
    this.showerror = false;
    this.showsuccess = false;
    this.showspinner = false;
    this.existinguser = false;
  }
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey() {
    this.closeModal();
  }

  retryenquiry() {
    this.showerror = false;
    this.showform = false;
  }

  phonePattern(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  NamePattern(event: KeyboardEvent) {
    const pattern = /[a-zA-Z ]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  selectedEmojis: { [key: string]: string } = {};
  selectEmoji(option: string, question: any) {
    console.log("emojiQuestion", question);
    console.log("selectedmo", option);
    this.selectedEmojis[question.Name] = option; // Update selectedEmojis for this question
    const emojiQuestion: any = this.feedbackQuestions.find(
      (q: any) => q.Name === question.Name
    );
    if (emojiQuestion) {
      console.log("ifconditionemoji", emojiQuestion);
      emojiQuestion.Value = this.selectedEmojis[question.Name]; // Update Value for this question
    }
    console.log("emojiqvalue", emojiQuestion.Value);
    this.feedbackForm.controls?.[question.Name].setValue(this.selectedEmojis[question.Name]); // Set form control value
  }
  onSubmit() {
    this.feedbackQuestions.forEach((question: any) => {
      if (question) {
        question.Value = this.feedbackForm.controls[question.Name].value;
      }
    });
    const payload = this.feedbackQuestions.map((r: any) => {
      return { ...r, Options: r?.Options?.join() };
    });
    this.spinner = true;
    this.master
      .AddFeedbackQuestionTransaction(payload)
      .subscribe((result: any) => {
        this.spinner = false;
        try {
          if (result === 1) {
            this.showsuccess = true;
            this.showform = false;
            this.spinner = false;
            this.clearSelectedEmojis();
            this.feedbackForm.reset();
          } else if (result === 0) {
            this.showsuccess = false;
            this.showform = false;
            this.showerror = true;
            this.spinner = false;
            this.feedbackForm.reset();
            this.clearSelectedEmojis();
          }
        } catch (error) {
          this.showsuccess = false;
          this.showform = false;
          this.showerror = true;
          this.spinner = false;
          this.feedbackForm.reset();
          this.clearSelectedEmojis();
        }
      });
  }
  clearSelectedEmojis() {
    // Reset selectedEmojis to clear the selections
    this.selectedEmojis = {};
    // Update Value for each question in feedbackQuestions
    this.feedbackQuestions.forEach((question: any) => {
      const emojiQuestion: any = this.feedbackQuestions.find(
        (q: any) => q.Name === question.Name
      );
      if (emojiQuestion) {
        emojiQuestion.Value = null;
        this.feedbackForm.controls?.[question.Name].setValue(null); // Reset form control value
      }
    });
  }
  valuesetFn(event: any, question: any, option: any) {
    if (event.target.checked) {
      const existingOption = this.selectedOption.find(
        (r: any) => r.Id === question.ID
      );
      if (!existingOption) {
        this.selectedOption.push({
          Id: question.ID,
          Value: option,
          Name: question.Name,
        });
      } else {
        existingOption.Value += `,${option}`;
      }
    } else {
      const existingOption = this.selectedOption.find(
        (r: any) => r.Id === question.ID
      );
      if (existingOption) {
        existingOption.Value = existingOption.Value.split(',')
          .filter((x: any) => x !== option)
          .join();
      }
    }
    const kk =
      this.selectedOption.find((s) => s.Id === question.ID)?.Value || '';
    this.feedbackForm.controls?.[question.Name].setValue(kk);
  }
  questionsForm() {
    this.feedbackQuestions.forEach((a: any) => {
      this.feedbackForm?.addControl(a.Name, new FormControl());
      this.feedbackForm?.controls[a.Name].setValue(a.Value);
    });
    this.feedbackQuestions.forEach((a: any) => {
      const myselftry = a?.Type === 'Textarea';
      const validators = a.isRequired === true ? [Validators.required] : [];
      if (a.Type === 'Textarea') {
        this.feedbackForm.addControl(
          a.Name,
          new FormControl(a.Value || '', validators)
        );
      } else {
        this.feedbackForm.addControl(a.Name, new FormControl(a.Value || ''));
      }
    });
  }
  onNotes(event: any, question: any) {
    const updatedSelectedOptions = [...this.selectedOption];
    const existingOptionIndex = updatedSelectedOptions.findIndex(
      (r: any) => r.Id === question.ID
    );
    if (existingOptionIndex !== -1) {
      updatedSelectedOptions[existingOptionIndex].Value = event?.target?.value;
      const kk = updatedSelectedOptions.find(
        (s) => s.Id === question.ID
      )?.Value;
      this.feedbackForm.controls?.[question.Name].setValue(kk);
      this.selectedOption = updatedSelectedOptions;
    }
  }
}
