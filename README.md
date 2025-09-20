# E-Store - Modern E-commerce Website

A fully responsive e-commerce website built with Next.js 14, TypeScript, and Tailwind CSS. This project features a modern UI with product listings, detailed product pages, and a contact section.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-lightblue?style=for-the-badge&logo=tailwindcss)

## 📋 Features

- **Modern UI/UX Design** - Clean and responsive interface
- **Product Catalog** - Browse and search products
- **Product Details** - Detailed product pages with information
- **Contact Page** - Get in touch with the store
- **Responsive Design** - Works on all device sizes
- **Dark Mode** - Theme switching capability
- **Performance Optimized** - Built with Next.js for optimal performance

## 🛠️ Tech Stack

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com/)** - Reusable component library
- **[Lucide React](https://lucide.dev/)** - Icon library

## 📁 Project Structure

```
app/                  # Next.js app router pages
  ├── contact/        # Contact page
  ├── product/[id]/   # Dynamic product detail pages
  ├── shop/           # Shop/product listing page
  └── page.tsx        # Home page
components/           # Reusable UI components
  ├── ui/             # shadcn/ui components
  ├── header.tsx      # Site header/navigation
  ├── hero-carousel.tsx # Homepage hero section
  └── product-card.tsx # Product display component
lib/                  # Utility functions and data
public/               # Static assets
styles/               # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd E-Store
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 🎨 UI Components

This project uses shadcn/ui components which are built on top of Radix UI and Tailwind CSS. All components are located in the `components/ui/` directory and can be customized as needed.

## 🧪 Development

This project uses pnpm for package management. To add new dependencies:

```bash
pnpm add <package-name>
```

To run linting:

```bash
pnpm lint
```

## 📄 License

This project is licensed under the MIT License.