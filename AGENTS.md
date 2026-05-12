# AGENTS.md

## Project

This repository contains Handover Notifier, a Google Apps Script web app that helps university club members manage handover reminders.

The app lets users register handover notifications from a web app. Based on the registered schedule, notifications are sent to Slack or Gmail on the specified date.

## Primary task

When working on the app introduction slide deck, follow the slide production plan below:

- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`

If the file is not present yet, create `docs/slide-deck/` and place the slide production plan there before starting slide implementation.

## Existing source of truth

Before designing or editing slides, inspect the existing app files:

- `README.md`
- `docs/handover-bot-spec.md`
- `docs/ARCHITECTURE.md`
- `bot-wireframe.jsx`
- `preview.html`
- `src/index.html`
- `src/app.html`
- `src/style.html`
- `src/Code.gs`
- `src/Models.gs`
- `src/Notifier.gs`

Also inspect existing screenshots:

- `docs/screenshot-home.png`
- `docs/screenshot-edit.png`
- `docs/screenshot-settings.png`

The actual app UI and screenshots are the primary design reference.

## Slide production policy

Create the slide deck using HTML/CSS or another deterministic layout system.

Use GPT Images or image generation only for:

- background visuals
- characters
- small robot illustrations
- decorative elements
- atmosphere-building visuals

Do not rely on image generation for:

- Japanese slide text
- detailed product explanations
- actual app UI
- exact forms, buttons, or settings screens
- feature diagrams that require product accuracy

Japanese text should be rendered as HTML/CSS text whenever possible.

## Design direction

The slide deck should feel like a clean Japanese IT service introduction for university club members.

Use the actual app design as the base. Preserve the app’s:

- main colors
- card style
- rounded corners
- soft shadows
- button style
- friendly but clean tone
- approachable web-app feel

The visual tone should be:

- friendly
- modern
- clean
- slightly playful
- not too corporate
- not childish

## Audience

The audience is Japanese university club members.

They are not necessarily engineers. Avoid overly technical explanations unless needed. Avoid corporate SaaS language that feels unnatural for a club context.

## Core deck message

The core message of the slide deck is:

> 探す引き継ぎから、届く引き継ぎへ。

The deck should make the audience feel:

- This solves a real handover problem.
- It is easy to use.
- It helps prevent missed handover tasks.
- It reduces the mental burden of always checking documents.
- It can be reused during yearly role transitions.

## Product accuracy rules

Correct claims:

- Users register notifications from the web app.
- Notifications can be sent to Slack or Gmail.
- Apps Script checks scheduled notifications.
- Notifications are sent on the specified date.
- The tool helps users remember handover tasks.
- The tool helps reduce missed tasks and mental burden.
- Previous year schedules can be reused for the next year.
- The app UI should be based on existing screenshots and source code.

Forbidden or misleading claims:

- Do not say the app automatically detects schedule changes.
- Do not say missed tasks become zero.
- Do not say it integrates with Google Calendar unless explicitly implemented.
- Do not imply normal users directly edit Google Sheets.
- Do not invent buttons, tabs, settings, workflows, or screens that do not exist.
- Do not use corporate-heavy wording such as “リードタイム” or “生産性を底上げ” unless explicitly requested.
- Do not make the tool look like a generic enterprise SaaS product.

## Slide text rules

For each slide:

- Use one clear message.
- Keep Japanese text short and natural.
- Use at most three bullet points.
- Avoid dense paragraphs.
- Avoid tiny text.
- Avoid generated Japanese text inside images.
- Keep the product name as `Handover Notifier`.

## Recommended slide structure

The planned deck has 9 slides:

1. 引き継ぎ、ちゃんと届いていますか？
2. 資料はある。でも見に行かない。
3. 抜け漏れは、努力不足ではなく仕組みの問題。
4. 引き継ぎを「通知」に変える。
5. 日付を決めれば、その日に届く。
6. 登録するのは、たったこれだけ。
7. もう、ずっと追い続けなくていい。
8. 来年の引き継ぎにも、そのまま使える。
9. 探す引き継ぎから、届く引き継ぎへ。

Use the detailed slide plan in:

- `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`

as the authoritative reference for slide objectives, wording, visual direction, and production workflow.

## Recommended repository additions

When implementing the slide deck, create files under dedicated slide directories rather than mixing them into the app source.

Recommended structure:

```text
docs/
  slide-deck/
    handover_notifier_slide_plan_for_codex.md
    app-design-summary.md
    design-tokens.md
    product-facts.md
    slides/
      01-title.md
      02-problem-drive.md
      03-problem-system.md
      04-solution-notification.md
      05-how-it-works.md
      06-easy-registration.md
      07-benefits.md
      08-year-transition.md
      09-summary.md

slide-assets/
  references/
  generated/
    backgrounds/
    characters/
    decorations/

slide-src/
  index.html
  styles.css
  slides/
  scripts/

slide-output/
  png/
  pdf/
```

## Workflow

For slide work, follow this process:

1. Read this `AGENTS.md`.
2. Read `docs/slide-deck/handover_notifier_slide_plan_for_codex.md`.
3. Inspect the app source and screenshots.
4. Summarize the app design into `docs/slide-deck/app-design-summary.md`.
5. Extract design tokens into `docs/slide-deck/design-tokens.md`.
6. Create per-slide specifications if they do not exist.
7. Implement slides using HTML/CSS.
8. Use actual screenshots for app UI.
9. Use generated visual assets only as supporting visuals.
10. Review each slide against its objective and product accuracy rules.

## Review checklist

Before considering a slide complete, check:

- Does the slide match its assigned role?
- Is the product explanation accurate?
- Does it avoid forbidden claims?
- Is the Japanese text natural and readable?
- Is the app UI based on actual source/screenshots?
- Does the slide match the app’s visual style?
- Are characters or robots supporting the message rather than distracting from it?
- Is the layout consistent with the rest of the deck?