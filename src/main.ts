import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CvService, CV } from './app/cv.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [CvService],
  template: `
    <div class="container">
      <!-- Personal Info Section -->
      <section class="section">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem">
          <div>
            <h1 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem">
              {{cv.personalInfo.name}}
            </h1>
            <h2 style="color: #4b5563; font-size: 1.25rem; margin-bottom: 1rem">
              {{cv.personalInfo.title}}
            </h2>
            <div class="contact-info" style="display: flex; gap: 1rem; flex-wrap: wrap">
              <p style="color: #6b7280; display: flex; align-items: center; gap: 0.25rem">
                <span>📍</span> {{cv.personalInfo.location}}
              </p>
              <p style="color: #6b7280; display: flex; align-items: center; gap: 0.25rem">
                <span>📧</span> {{cv.personalInfo.email}}
              </p>
            </div>
          </div>
          <button class="download-button" (click)="downloadCV()">
            <span>📄</span> Download CV
          </button>
        </div>
        <p style="margin-top: 1rem">{{cv.personalInfo.about}}</p>
      </section>

      <!-- Experience Section -->
      <section class="section">
        <h2 class="section-title">Experiencia Profesional</h2>
        <div class="timeline">
          @for (exp of cv.experience; track exp.company) {
            <div class="timeline-item">
              <h3 style="font-weight: 600">{{exp.title}}</h3>
              <h4 style="color: #4b5563">{{exp.company}}</h4>
              <p class="timeline-date">{{exp.period}}</p>
              <p>{{exp.description}}</p>
            </div>
          }
        </div>
      </section>

      <!-- Education Section -->
      <section class="section">
        <h2 class="section-title">Educación</h2>
        <div class="timeline">
          @for (edu of cv.education; track edu.school) {
            <div class="timeline-item">
              <h3 style="font-weight: 600">{{edu.degree}}</h3>
              <h4 style="color: #4b5563">{{edu.school}}</h4>
              <p class="timeline-date">{{edu.period}}</p>
              <p>{{edu.description}}</p>
            </div>
          }
        </div>
      </section>

      <!-- Skills Section -->
      <section class="section">
        <h2 class="section-title">Skills</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem">
          @for (skill of cv.skills; track skill) {
            <span class="skill-tag">{{skill}}</span>
          }
        </div>
      </section>
    </div>
  `,
})
export class App {
  cv: CV;

  constructor(private cvService: CvService) {
    this.cv = this.cvService.getCvData();
  }

  downloadCV() {
    const doc = new jsPDF();
    const lineHeight = 6;
    let y = 20;

    // Helper function to add text and manage vertical position
    const addText = (text: string, fontSize = 12, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.text(text, 20, y);
      y += lineHeight;
    };

    // Personal Info
    addText(this.cv.personalInfo.name, 24, true);
    addText(this.cv.personalInfo.title, 16);
    addText(`${this.cv.personalInfo.location} | ${this.cv.personalInfo.email}`);
    y += lineHeight;
    
    // About
    doc.setFontSize(12);
    const aboutLines = doc.splitTextToSize(this.cv.personalInfo.about, 170);
    doc.text(aboutLines, 20, y);
    y += aboutLines.length * lineHeight + lineHeight;

    // Experience
    addText('Experiencia Profesional', 16, true);
    y += lineHeight/2;
    this.cv.experience.forEach(exp => {
      addText(`${exp.title} - ${exp.company}`, 12, true);
      addText(exp.period);
      const descLines = doc.splitTextToSize(exp.description, 170);
      doc.text(descLines, 20, y);
      y += descLines.length * lineHeight + lineHeight;
    });

    // Education
    addText('Educación', 16, true);
    y += lineHeight/2;
    this.cv.education.forEach(edu => {
      addText(`${edu.degree} - ${edu.school}`, 12, true);
      addText(edu.period);
      const descLines = doc.splitTextToSize(edu.description, 170);
      doc.text(descLines, 20, y);
      y += descLines.length * lineHeight + lineHeight;
    });

    // Skills
    addText('Skills', 16, true);
    y += lineHeight/2;
    const skillsText = this.cv.skills.join(' • ');
    const skillsLines = doc.splitTextToSize(skillsText, 170);
    doc.text(skillsLines, 20, y);

    // Save the PDF
    doc.save('davidcuspoca_cv.pdf');
  }
}

bootstrapApplication(App);