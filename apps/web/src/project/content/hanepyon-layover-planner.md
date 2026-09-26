---
slug: hanepyon-layover-planner
title: Hanepyon Layover Planner
description: A mascot-led PWA that turns a Haneda layover into a 2-hour trip into Kamata.
tags: [React, TypeScript, Framer Motion, Mantine, Tailwind, Firebase]
order: 1
previewSrc: /previews/hanepyon-layover-planner.svg
previewAlt: A phone with a stack of swipe cards beside a dotted route that runs from a plane, past three numbered stops, to a shrine gate
githubUrl: https://github.com/rifandani/hackathon-2023
---

Your flight leaves in three hours. You can sit at the gate and watch the departures board. Or you can take a 12-minute train to Kamata, soak in a wood-fired sento, eat winged gyoza, and be back before boarding. Hanepyon Layover Planner is a phone app that makes the second choice feel easy.

## The brief

The hackathon ran for three days in November 2023 at Haneda Innovation City in Tokyo. The theme was "Trip". The organizers asked teams to connect travelers with Ota City, the ward around Haneda Airport. For many visitors, it is the first piece of Japan they touch, and most of them see the airport and nothing else.

Our answer was to give travelers with a few spare hours a short trip into the city, with the city's own mascot as the guide.

## The product

Hanepyon, the mascot of Ota City, talks the traveler through the whole flow. Each screen has its own voice line.

![Three phone screens: Hanepyon asks if your flight is still a few hours away, a Cultural category card to swipe, and a plan with its cost, duration, route map, and first stop](/images/projects/hanepyon-layover-planner/screens.webp)

1. **Landing.** "Hi bud, is your flight still few hours away?" There is one button: "YUPPP!"
2. **Avatar.** Pick your guide. Only Hanepyon was ready for the demo.
3. **Swipe tutorial.** Two practice cards teach the only gesture the app needs: swipe right to like, swipe left to pass.
4. **Next flight.** "When is your next flight?" In 3, 6, or 12 hours.
5. **Categories.** Full-screen photo cards for Culinary, Recreational, Relaxation, Shopping, and Cultural. Like three, and Hanepyon says "Great choice!"
6. **The plan.** One route with a cost, a duration, and a train time: ¥2,500, 2 hours 30 minutes, 12 minutes by train. It has three stops: Kamata Hachiman Shrine, the Taishoyu sento, and Shunkoen for winged gyoza. Tap the map to open transit directions from Haneda in Google Maps, or scan the QR code to take the plan with you.

There is no sign-up, no search box, and no list of 200 restaurants. There are only swipes and one plan.

## Ready before the clock started

In a three-day hackathon, the first hours usually go to setup. I did not want to spend them that way. The week before the event, I built a React template for hackathons, so that a small team could ship a full-stack app without a backend team:

- Vite, TypeScript, ESLint, and Prettier, with Husky and commitlint on every commit.
- Mantine and Tailwind for the UI, React Query and Zustand for state, Zod for validation, and React Hook Form for forms.
- Firebase for auth, Firestore, Storage, Realtime Database, and hosting.
- The Firebase Emulator Suite for local development. It imports seed data when it starts and exports the latest data when it stops, so every developer has the same data.
- PWA support with Workbox, and i18n for English and Indonesian.
- GitHub Actions that deploy to Firebase Hosting on every push to `main`, and to a preview channel on every pull request.

When the hackathon started, the base was done. From the first hour, we only had to add the business logic.

## How we built it

We were a team of six: two software engineers, one designer, and three system consultants. The consultants came up with the idea, built the pitch deck, and helped to pitch. The designer designed the screens. My fellow engineer built the swipe tutorial, the flight-time screen, and the plan page. He also recorded the mascot's voice himself, and he pitched the product on the last day.

I built the swipe engine, the screen flow, the landing, avatar, and category screens, and the map link.

Each category card uses Framer Motion drag. The card decides when you let go: more than 30px to the right is a like, and more than 30px to the left is a pass. The exit animation then throws the card off the screen in that direction.

```tsx title="Category.tsx" mark="onDragEnd"
<motion.div
  exit={{ x: leaveX, opacity: 0, scale: 0.5, transition: { duration: 1 } }}
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  onDragEnd={(_e, info) => {
    const liking = info.offset.x > 30;
    const skipping = info.offset.x < -30;

    if (liking) {
      setLeaveX(1000);
      onSwipe("liking");
    }
    if (skipping) {
      setLeaveX(-1000);
      onSwipe("skipping");
    }
  }}
>
```

The onboarding lives on one route. A `step` query parameter (`landing`, `avatar`, `how-to-use`, `time`, or `category`) picks the screen. The browser back button works, and during the pitch we could open any screen directly from its URL.

The audio was harder than we expected. Browsers block sound until the user touches the page, so the first voice line plays when you tap Hanepyon. After that tap, each screen can start its own line.

## Real and scripted

The demo is scripted. The plan screen always shows the same three stops. Your swipes and your flight time move you forward, but they do not change the result. We had three days, and we chose to spend them on how the app feels, not on a recommendation engine.

A real version needs four things:

- **Real data.** Spots with opening hours, prices, and photos that the city or the shops keep up to date.
- **Real ranking.** The liked categories and the free hours filter and order the spots. A 3-hour layover has no time for a 2-hour bath.
- **Real timing.** Live train times, and a buffer for the trip back through security, so that nobody misses a flight because of gyoza.
- **Real languages.** Japanese, and the languages of the travelers who pass through Haneda.

## The verdict

We did not win an award. We asked the judges for an honest review. They said that the UI and UX were appealing and that the idea was valid, but that it would be hard to build for real.

They were right, and the hard part is the list above. The screens were the easy part. The data, the timing, and the partnerships with local shops are the real product. In three days, we proved the experience. The engine is the work that remains.
