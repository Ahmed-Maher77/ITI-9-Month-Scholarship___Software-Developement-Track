# CSS Preprocessors - Assignment 1

## Objective

Build and organize styles using Sass partials, variables, functions, nesting, loops, and responsive media queries.

## Starter Structure

Use and keep the following structure:

```text
solution/
	index.html
	styles/
		sass/
			main.scss
			abstracts/
				_variables.scss
				_functions.scss
			base/
				_reset.scss
				_typography.scss
			components/
				_buttons.scss
		css/
			main.css
```

## Required Tasks

1. Create Sass Variables

- In `abstracts/_variables.scss`, define at least:
    - `$primary-color`
    - `$secondary-color`

2. Use Nesting for Main Section

- In `base/_typography.scss`, style:
    - `.main-title` with the primary color
    - `.main-subtitle` with the secondary color
- Use Sass nesting with `&` (for example, `.main { &-title { ... } }`).

3. Style Buttons with Nesting

- In `components/_buttons.scss`, style `.main-btn`.
- Add hover state using nesting (`&:hover`) where colors are swapped or clearly changed.

4. Create and Use a Sass Function

- In `abstracts/_functions.scss`, create a function that returns half of a value.
- Use that function for responsive width behavior.

5. Responsive Finish Button

- Style `.finish-btn` so that:
    - On mobile: full width (`100%`)
    - On tablet and above (`min-width: 768px`): half width (`50%`)
- Use Sass media query syntax.

6. Generate Font Utility Classes with `@each`

- Generate classes for the content section:
    - `.font-18px`
    - `.font-16px`
    - `.font-14px`
- Each class should apply the corresponding `font-size`.
- Implement these classes using an `@each` loop (not manual repetition).

7. Organize Imports

- In `main.scss`, import partials in a clean order, for example:
    - base
    - components
    - abstracts (or abstracts first if your architecture requires it)
- Compile Sass output to `styles/css/main.css`.

## Acceptance Criteria

- All required selectors from `index.html` are styled.
- `@each` is used for all `.font-*` classes.
- A custom Sass function is created and used.
- Responsive behavior for `.finish-btn` works at `768px` breakpoint.
- Code is separated into partials and imported through `main.scss`.
- Compiled CSS file exists and reflects Sass changes.

## Bonus (Optional)

- Use `@extend` or mixins to reduce repetition.
- Add a small spacing scale variable map and generate utility classes.
- Add an extra breakpoint for desktop (`min-width: 992px`).

## Deliverables

- Updated Sass partials under `styles/sass/`
- Compiled CSS file in `styles/css/main.css`
- Working UI in `index.html`
