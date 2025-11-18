# Overview

This is an educational game application called "Penyelamat Abjad Hutan" (Forest Alphabet Savior) - a children's educational game designed to teach Indonesian alphabet and animal names through interactive 3D gameplay. The game presents animals and challenges players to spell their names by selecting the correct letters in sequence.

The application is built as a full-stack TypeScript project with a React + Three.js frontend for 3D rendering and an Express backend. It uses Drizzle ORM with PostgreSQL for data persistence and includes a comprehensive UI component library built with Radix UI primitives.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework Stack**: React 18 with TypeScript, using Vite as the build tool and development server

**3D Rendering Engine**: 
- React Three Fiber (@react-three/fiber) for declarative 3D scene management
- Three.js for low-level 3D graphics rendering
- React Three Drei (@react-three/drei) for helper components and utilities
- React Three Postprocessing for visual effects

**State Management**:
- Zustand with subscribeWithSelector middleware for game state management
- Two separate stores: `useForestGame` for the main game logic (animals, levels, scoring) and `useAudio` for sound management
- Local storage utilities for persisting user preferences

**UI Component System**:
- Radix UI primitives for accessible, unstyled components
- TailwindCSS for styling with custom design tokens
- Shadcn/ui pattern (component library built on Radix + Tailwind)
- Custom 3D components for game objects (animals, letter blocks, environment)

**Routing & Data Fetching**:
- TanStack Query (React Query) for server state management
- Custom API request wrapper with error handling and authentication

**Design Rationale**: The separation of 3D rendering (Canvas) from 2D UI overlay allows for optimal performance and independent rendering pipelines. Zustand was chosen over Redux for its simplicity and minimal boilerplate while still supporting advanced patterns like subscriptions.

## Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js

**Build System**:
- Development: tsx for TypeScript execution
- Production: esbuild for bundling with ESM output format
- Vite in middleware mode for hot module replacement during development

**API Structure**:
- RESTful API pattern with `/api` prefix for all endpoints
- Modular route registration system in `server/routes.ts`
- Storage abstraction layer (`IStorage` interface) for database operations
- In-memory storage implementation (`MemStorage`) as default with database migration path

**Development Features**:
- Custom request/response logging middleware
- Runtime error overlay plugin for development
- Source map support via @jridgewell/trace-mapping

**Design Rationale**: The storage abstraction layer allows switching between in-memory and database storage without changing application code. This is useful for development/testing (MemStorage) and production (database implementation). The Vite middleware integration provides a seamless development experience with HMR while serving the built static files in production.

## Data Storage

**ORM**: Drizzle ORM configured for PostgreSQL dialect

**Database Provider**: Neon Serverless (@neondatabase/serverless) for PostgreSQL compatibility with edge/serverless environments

**Schema Management**:
- Schema definitions in `shared/schema.ts` (shared between client and server)
- Drizzle-Zod integration for runtime validation from database schemas
- Migration files output to `./migrations` directory
- Push-based schema updates via `drizzle-kit push`

**Current Schema**:
- Users table with username/password authentication (basic structure)
- Designed for potential expansion to store game progress, scores, and achievements

**Design Rationale**: Drizzle provides type-safe database queries with minimal overhead compared to heavier ORMs. Neon Serverless allows PostgreSQL usage in serverless environments. The shared schema pattern ensures type consistency across the full stack.

## External Dependencies

**UI Component Libraries**:
- Radix UI (comprehensive set of 30+ unstyled primitives)
- Class Variance Authority for component variant management
- CMDK for command palette functionality
- Lucide React for iconography

**Styling & Theming**:
- TailwindCSS with PostCSS for utility-first styling
- Custom CSS variables for theming (HSL color system)
- Inter font via @fontsource
- Dark mode support configured

**3D & Graphics**:
- Three.js for WebGL rendering
- GLSL shader support via vite-plugin-glsl
- Post-processing effects pipeline
- Asset support for GLTF/GLB models and audio files

**Form & Data Validation**:
- React Hook Form for form state management
- Zod for schema validation
- Date-fns for date manipulation

**Session Management**:
- Connect-pg-simple for PostgreSQL-backed sessions (configured but not actively used)

**Development Tools**:
- @replit/vite-plugin-runtime-error-modal for error overlay
- TypeScript with strict mode enabled
- Path aliases (`@/` for client, `@shared/` for shared code)

**Audio**:
- Native HTML5 Audio API
- Custom audio management via Zustand store
- Supports background music, sound effects (hit, success)
- Mute/unmute functionality

**Design Rationale**: The extensive Radix UI library provides production-ready accessibility features without imposing styling constraints. The three separate sound channels (background, effects) allow independent volume control and mixing. Using native Audio API avoids additional dependencies while providing sufficient functionality for a simple game.