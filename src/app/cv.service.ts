import { Injectable } from '@angular/core';

export interface CV {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
    about: string;
  };
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    period: string;
    description: string;
  }>;
  skills: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CvService {
  getCvData(): CV {
    return {
      personalInfo: {
        name: 'David Cuspoca',
        title: 'FullStack Developer',
        email: 'david-cuspoca@hotmail.com',
        location: 'La Libertad, GT',
        about: 'Desarrollador FullStack con 5 años de experiencia, especializado en la creación de aplicaciones web escalables y robustas. Tengo un sólido conocimiento en el desarrollo de REST APIs y en la integración de tecnologías como React, Angular, Node.js y MongoDB. He liderado proyectos desde la concepción hasta la implementación, incluyendo la integración de pasarelas de pago y autenticación de terceros. Apasionado por la tecnología, siempre busco aprender y mejorar mis habilidades para ofrecer soluciones innovadoras.'
      },
      experience: [
        {
          title: 'Desarrollador de Software Independiente',
          company: 'David Cuspoca',
          period: '2021 - Present',
          description: 'Diseñé y desarrollé una aplicación multiplataforma para el manejo de carteras dirigida a negocios de préstamos de dinero. La aplicación permite gestionar créditos, clientes, pagos, gastos, inversiones y retiros, además de ofrecer funcionalidades para administrar clientes por ruta. Desarrollada con Ionic/Angular, la aplicación se distribuye mediante un modelo de suscripción, donde los usuarios pagan por su uso. Además, me encargué de la implementación de mejores prácticas de desarrollo, mantenimiento continuo y soporte técnico para los usuarios.'
        },
        {
          title: 'Teaching Assistant – Henry',
          company: 'Henry Bootcamp',
          period: 'Abril 2022 – Junio 2022',
          description: 'Coordiné un grupo de alumnos para fomentar la integración en equipos de estudio y la resolución colaborativa de ejercicios. Promoví buenas prácticas de programación y ayudé a los estudiantes a comprender conceptos técnicos avanzados. Además, propuse ideas para mejorar los procesos del Bootcamp, lo que me permitió desarrollar habilidades de mentoría y liderazgo, aplicadas posteriormente en mi rol como desarrollador independiente.'
        }
      ],
      education: [
        {
          degree: 'FullStack Web Developer',
          school: 'Henry Bootcamp',
          period: '2022',
          description: 'Completé más de 700 horas de formación teórica y práctica en desarrollo web FullStack. Desarrollé proyectos prácticos, incluyendo una aplicación de gestión de barberías con integración de pasarelas de pago y autenticación de terceros. Adquirí habilidades en tecnologías como React, Node.js, Express, y bases de datos SQL y NoSQL.'
        }
      ],
      skills: [
        'Angular',
        'TypeScript',
        'JavaScript',
        'HTML/CSS',
        'Digital Ocean',
        'Heroku',
        'MongoDB',
        'Express',
        'React',
        'Node.js',
        'Git',
        'Docker',
        'AWS',
        'Agile Methodologies'
      ]
    };
  }
}