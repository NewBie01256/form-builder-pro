# CTNA Questionnaire Builder

A dynamic questionnaire and form builder with conditional branching, answer-level rules, and ITSM integration.

## Features

- **Multi-page Questionnaires**: Create complex forms with multiple pages and sections
- **Conditional Branching**: Show/hide questions based on previous answers
- **Answer-Level Rules**: Define conditional logic at the answer level
- **Dynamic Values**: Connect to external data sources for dropdown options
- **Action Records**: Attach actions to questions and answers
- **Export/Import**: Save and load questionnaire configurations as JSON
- **Draft Management**: Save work-in-progress as drafts
- **Publishing**: Publish questionnaires to make them active

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library

## Getting Started

### Prerequisites

- Node.js 18+ (recommend using [nvm](https://github.com/nvm-sh/nvm))
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/          # React components
│   ├── questionnaire/   # Questionnaire-specific components
│   └── ui/              # Reusable UI components (shadcn)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and business logic
│   ├── core/            # Core utilities (Result, Logger, ID)
│   ├── questionnaire/   # Questionnaire domain logic
│   └── storage/         # Persistence services
├── pages/               # Route pages
├── types/               # TypeScript type definitions
└── data/                # Sample data and fixtures
```

## Architecture

The project follows clean architecture principles:

- **Result Pattern**: Functional error handling with `success/failure` types
- **Service Pattern**: Business logic abstracted into services
- **Factory Pattern**: Centralized entity creation
- **Type Guards**: Runtime type validation

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

Proprietary - CTNA
