# Tech Talent Expo (35)

Build a modern, premium, futuristic full-stack web application called "Tech Talent Expo 2026" using the attached logo as the brand identity.

Design Inspiration:

- Match the high-end style and smooth animations shown in the provided YouTube reference.

- Theme: Purple, futuristic, AI-inspired, glassmorphism, neon glow, 3D elements.

- Fully responsive for desktop, tablet, and mobile.

Tech Stack:

- Next.js 15 (App Router)

- React

- TypeScript

- Tailwind CSS

- Framer Motion

- Shadcn/UI

- Prisma ORM

- PostgreSQL

- NextAuth/Auth.js

- Nodemailer with SMTP (or Resend)

- QRCode library

- PDFKit

Pages:

- Home

- About

- Event Schedule

- Categories

- Registration

- Gallery

- Sponsors

- Contact

- Login

- Admin Dashboard

- Judge Dashboard

Participant Registration:

Collect:

- Full Name

- University

- Faculty

- Department

- Student ID

- Email

- Phone

- Category

- Project Title

- Team/Individual

- Team Members

- Abstract PDF

- Profile Photo

After successful registration:

1. Save participant data to PostgreSQL.

2. Generate a unique Registration ID (e.g., TTE2026-0001).

3. Generate a QR code containing the Registration ID, Name, Email, and Category.

4. Automatically send a confirmation email with the QR code attached.

5. Allow participants to download a registration receipt.

Admin Dashboard:

- Secure authentication

- Dashboard analytics

- View/Edit/Delete participants

- Approve or reject registrations

- Export to Excel/PDF

- Resend confirmation emails

- Manage event categories, sponsors, gallery, and announcements

QR Attendance:

- Camera-based QR scanner

- Mark attendance

- Prevent duplicate check-ins

- Record timestamp

- Display participant details after scan

Judge Dashboard:

- View assigned projects

- Score participants

- Leave comments

- Auto-calculate rankings

Certificates:

- Generate PDF certificates dynamically

- Download and email certificates

UI Requirements:

- Purple neon color palette

- Glassmorphism cards

- Animated gradients

- Particle background

- Smooth page transitions

- Floating 3D logo section

- Modern typography

- Responsive navigation

- Dark mode

Code Requirements:

- Clean architecture

- Reusable components

- Prisma schema

- REST API or Server Actions

- Validation using Zod

- React Hook Form

- Type-safe code

- Production-ready folder structure

- Proper comments

- Environment variables

- README with setup instructions

Deliver a complete production-ready project with all frontend, backend, database schema, authentication, email integration, QR generation, attendance scanning, and deployment instructions.


https://youtu.be/jSCu1vcl5C8?feature=shared  refer the link and


notice these things
venue:university of vavuniya

date 20,21 august 2026

participants for the participants and other details refer the google form https://docs.google.com/forms/d/e/1FAIpQLScC5_gnnCp7ntaJrcNU1eVMmrP6YloNbUKsc3AjlSy_8VMSvw/viewform?usp=publish-editor


dont add the sponser details othe needed details get them from above slides

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://tech-spark-expo.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a8628b00-f6e1-4046-a167-6f1af2c6447d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
