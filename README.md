# MedAI Landing Page

A modern, responsive landing page for MedAI built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Lucide React** - Beautiful icons

## Features

- 🎨 Modern and responsive design
- 🎯 TypeScript for type safety
- 🚀 Fast development with Vite HMR
- 📱 Mobile-first responsive layout
- 🎭 shadcn/ui component library
- 🎪 Tailwind CSS for styling
- ♿ Accessible components

## Project Structure

```
src/
├── components/          # Custom React components
│   ├── ui/             # shadcn/ui components
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── MedAILanding.tsx # Main landing page component
├── lib/                # Utility functions
│   └── utils.ts        # Common utilities (cn function, etc.)
├── assets/             # Static assets
└── App.tsx             # Main app component
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medAi_landing
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development Guidelines

- Use TypeScript for all components
- Follow shadcn/ui patterns for consistent styling
- Use Tailwind CSS classes for styling
- Import icons from `lucide-react`
- Maintain responsive design principles
- Use the `cn()` utility function for conditional classes
- Follow React functional component patterns with hooks

## Component Usage

### Using shadcn/ui Components

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### Using Icons

```tsx
import { Heart, Star, ArrowRight } from "lucide-react"

export function IconExample() {
  return (
    <div className="flex items-center gap-2">
      <Heart className="h-4 w-4" />
      <Star className="h-4 w-4" />
      <ArrowRight className="h-4 w-4" />
    </div>
  )
}
```

## License

This project is licensed under the MIT License.
