# Contributing to HydroMate

Thank you for your interest in contributing to HydroMate! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/hobby.git
   cd hobby
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Code Style

- Use TypeScript for all new code
- Follow the existing code formatting
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Write unit tests for new features

## Commit Messages

Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for test changes

Example: `feat: add weather-based hydration recommendations`

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit a pull request with a clear description

## Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if relevant

## Feature Requests

Before submitting feature requests:
- Check if it already exists in issues
- Provide detailed use case description
- Explain why it would benefit users
- Consider implementation complexity

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow project guidelines

Thank you for contributing to HydroMate!